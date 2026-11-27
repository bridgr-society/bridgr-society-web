'use server';
import { redirect } from 'next/navigation';
import { startPreviewSession, endSession } from '@/lib/auth/session';
import { capabilities } from '@/lib/env';

const safeNext = (n: string) => /^\/(?!\/)[\w\-/?=&.%]*$/.test(n) ? n : '/applications';   // same-site paths only

export interface SignInState { errors: Record<string, string>; values: { name: string; email: string } }
export async function previewSignIn(_p: SignInState, fd: FormData): Promise<SignInState> {
  if (!capabilities().signIn) return { errors: { form: 'Sign-in is not available in this environment.' }, values: { name: '', email: '' } };
  const name = String(fd.get('name') ?? '').trim().slice(0, 80), email = String(fd.get('email') ?? '').trim().slice(0, 200);
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Enter a valid email address.';
  if (Object.keys(errors).length) return { errors, values: { name, email } };
  await startPreviewSession(name, email);
  redirect(safeNext(String(fd.get('next') ?? '')));
}
export async function signOutAction(){ await endSession(); redirect('/'); }
