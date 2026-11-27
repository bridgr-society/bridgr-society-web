import 'server-only';
import { redirect } from 'next/navigation';
import { capabilities } from '@/lib/env';
import { getSession, type SessionUser } from '@/lib/auth/session';
import { applicationStore, type ApplicationStore } from './store';

/** For signed-in pages: returns null when applications aren't connected (page shows NotConnected). */
export async function requireApplicant(next: string): Promise<{ user: SessionUser; store: ApplicationStore } | null> {
  if (!capabilities().applications) return null;
  const user = await getSession(); if (!user) redirect(`/account?next=${encodeURIComponent(next)}`);
  return { user, store: applicationStore() };
}
export const fmtDate = (ts: number) => new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' });
