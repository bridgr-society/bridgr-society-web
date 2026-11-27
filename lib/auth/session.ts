import 'server-only';
import { cookies } from 'next/headers';
import { authMode, sessionSecret, deployEnv } from '@/lib/env';
import { sign, verify } from './signed-cookie';

/* Session boundary. Today: a PREVIEW-ONLY test identity. Later: the shared
   Bridgr identity (see lib/auth/README.md). Everything else in the app calls
   getSession() and never knows which one is active. */
export interface SessionUser { id: string; name: string; email: string; source: 'preview-demo' | 'bridgr' }
const COOKIE = 'bs_session';

export async function getSession(): Promise<SessionUser | null> {
  if (authMode() !== 'preview-demo') return null;          // no real provider connected yet
  const secret = sessionSecret(); if (!secret) return null;
  const jar = await cookies();
  const v = verify<SessionUser & { exp: number }>(jar.get(COOKIE)?.value, secret);
  if (!v || v.exp < Date.now() || v.source !== 'preview-demo') return null;
  return { id: v.id, name: v.name, email: v.email, source: v.source };
}

export async function startPreviewSession(name: string, email: string): Promise<SessionUser> {
  if (authMode() !== 'preview-demo') throw new Error('Preview sign-in is disabled in this environment.');
  const secret = sessionSecret(); if (!secret) throw new Error('SOCIETY_SESSION_SECRET is missing.');
  const id = 'preview-' + Buffer.from(email.toLowerCase()).toString('base64url').slice(0, 24);
  const user: SessionUser = { id, name, email, source: 'preview-demo' };
  const jar = await cookies();
  jar.set(COOKIE, sign({ ...user, exp: Date.now() + 7 * 864e5 }, secret), { httpOnly: true, sameSite: 'lax', secure: deployEnv() !== 'development', path: '/', maxAge: 7 * 86400 });
  return user;
}

export async function endSession(){ const jar = await cookies(); jar.delete(COOKIE); }
