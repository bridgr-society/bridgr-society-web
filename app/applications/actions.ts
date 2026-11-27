'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { applicationStore } from '@/lib/applications/store';
import { learningGoals } from '@/content/taxonomy';

async function mine(id: string){
  const user = await getSession(); if (!user) redirect('/account');
  const store = applicationStore(), app = await store.get(user, id);
  if (!app) redirect('/applications');                // never reveals whether another user's ID exists
  return { user, store, app };
}
export async function toggleCheck(fd: FormData){
  const { user, store, app } = await mine(String(fd.get('id')));
  const k = String(fd.get('k')) as keyof typeof app.checks;
  if (!(k in app.checks)) return;
  if (k === 'call' && app.status !== 'action') return;
  app.checks[k] = !app.checks[k];
  if (k === 'call' && app.checks.call) app.history.push({ at: Date.now(), text: 'Advisor call requested' });
  await store.save(user, app); revalidatePath(`/applications/${app.id}`);
}
export async function openHandoff(fd: FormData){
  const { user, store, app } = await mine(String(fd.get('id')));
  const share = { level: fd.get('level') === 'on' && !!app.data.mandarin, goals: fd.getAll('goals').map(String).filter(g => learningGoals.includes(g)), req: fd.get('req') === 'on' };
  const h = { id: 'H' + (app.handoffs.length + 1), at: Date.now(), share, revoked: false };
  app.handoffs.push(h); app.history.push({ at: h.at, text: 'Opened Bridgr Academy preparation' });
  await store.save(user, app);
  redirect(`/academy-handoff/${app.id}/${h.id}`);
}
export async function revokeHandoff(fd: FormData){
  const { user, store, app } = await mine(String(fd.get('id')));
  const h = app.handoffs.find(x => x.id === String(fd.get('hid'))); if (!h) return;
  h.revoked = true; app.history.push({ at: Date.now(), text: 'Stopped sharing with Bridgr Academy' });
  await store.save(user, app); revalidatePath(`/applications/${app.id}`);
}
