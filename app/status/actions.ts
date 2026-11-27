'use server';
import { redirect } from 'next/navigation';
import { previewDemoEnabled } from '@/lib/env';
import { getSession } from '@/lib/auth/session';
import { applicationStore, clearPreviewData } from '@/lib/applications/store';
import { APP_STATUS } from '@/lib/applications/types';
/* Reviewer controls. Each one refuses to run unless preview test-data mode is on,
   which is impossible in production (lib/env.ts). */
export async function advanceStatus(){
  if (!previewDemoEnabled()) return;
  const user = await getSession(); if (!user) redirect('/account?next=/status');
  const store = applicationStore(), a = (await store.list(user)).find(x => x.status !== 'draft');
  if (!a) redirect('/status?msg=submit-first');
  const next = ({ submitted: 'review', review: 'action', action: 'action' } as const)[a.status as 'submitted' | 'review' | 'action'];
  a.status = next; a.history.push({ at: Date.now(), text: `Status: ${APP_STATUS[next].label} (preview control)` });
  await store.save(user, a); redirect(`/applications/${a.id}`);
}
export async function resetPreview(){ if (!previewDemoEnabled()) return; await clearPreviewData(); redirect('/status?msg=reset'); }
