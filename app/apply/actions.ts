'use server';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { applicationStore } from '@/lib/applications/store';
import { validateStep, LIMITS } from '@/lib/applications/validate';
import type { AppStep } from '@/lib/applications/types';
import { programBySlug } from '@/lib/catalog';

export interface StepState { errors: Record<string, string> }
const NEXT: Record<AppStep, AppStep | 'submitted'> = { background: 'availability', availability: 'review', review: 'submitted' };
const PREV: Record<AppStep, AppStep | null> = { background: null, availability: 'background', review: 'availability' };

export async function saveStep(_p: StepState, fd: FormData): Promise<StepState> {
  const user = await getSession(); if (!user) redirect('/account');
  const store = applicationStore();
  const app = await store.get(user, String(fd.get('id'))); if (!app) redirect('/applications');   // only the owner's applications are ever found
  const p = programBySlug(app.program)!, step = app.step, intent = String(fd.get('intent') ?? 'continue');
  if (app.status !== 'draft') redirect(`/applications/${app.id}`);
  const s = (k: string, max: number) => String(fd.get(k) ?? '').slice(0, max);
  const d = app.data;
  if (step === 'background'){ d.stage = s('stage', 80); d.study = s('study', LIMITS.study + 50); d.motivation = s('motivation', LIMITS.motivation + 200); d.goals = fd.getAll('goals').map(String).slice(0, 10); }
  if (step === 'availability'){ d.start = s('start', 40); d.commit = fd.get('commit') === 'on'; d.mandarin = s('mandarin', 30); d.otherLangs = s('otherLangs', LIMITS.otherLangs + 50); }
  if (step === 'review') d.accurate = fd.get('accurate') === 'on';
  if (intent === 'back' && PREV[step]){ app.step = PREV[step]!; await store.save(user, app); redirect(`/apply/${p.slug}/${app.step}`); }
  if (intent === 'exit'){ await store.save(user, app); redirect('/applications?saved=1'); }
  if (intent === 'prepare'){ await store.save(user, app); redirect(`/applications/${app.id}/prepare`); }
  const errors = validateStep(d, step, p);
  if (Object.keys(errors).length){ await store.save(user, app); return { errors }; }
  const nxt = NEXT[step];
  if (nxt === 'submitted'){ app.status = 'submitted'; app.history.push({ at: Date.now(), text: 'Application submitted for review' }); await store.save(user, app); redirect(`/apply/${p.slug}/submitted`); }
  app.step = nxt; await store.save(user, app); redirect(`/apply/${p.slug}/${nxt}`);
}
