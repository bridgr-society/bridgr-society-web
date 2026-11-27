'use server';
import { redirect } from 'next/navigation';
import { deliverApplication } from '@/lib/enquiries/deliver';
import { readForm, validate, toSections, type Values } from '@/lib/applications/public-form';

export interface PublicApplyState { errors: Record<string, string>; values: Values; failure?: string }

export async function submitPublicApplication(_prev: PublicApplyState, fd: FormData): Promise<PublicApplyState> {
  const values = readForm(fd);
  if (String(fd.get('website') ?? '')) return { errors: {}, values };          // honeypot
  const errors = validate(values);
  if (Object.keys(errors).length) return { errors, values };
  const { program, sections } = toSections(values);
  const r = await deliverApplication({ name: `${values.first} ${values.last}`, email: String(values.email), program, sections });
  if (!r.ok) return { errors: {}, values, failure: r.reason === 'not-configured' ? 'Applications aren’t connected to our inbox yet, so nothing was sent.' : 'We couldn’t send your application just now. Nothing was submitted — please try again in a moment.' };
  redirect(`/apply/sent?ref=${encodeURIComponent(r.ref)}&delivered=${r.delivered ? 1 : 0}`);
}
