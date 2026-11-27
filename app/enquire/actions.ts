'use server';
import { redirect } from 'next/navigation';
import { deliverEnquiry, type Enquiry } from '@/lib/enquiries/deliver';
import { programBySlug } from '@/lib/catalog';
import { stages } from '@/content/taxonomy';

export interface EnquiryState { errors: Record<string, string>; values: Record<string, string>; failure?: string }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitEnquiry(_prev: EnquiryState, fd: FormData): Promise<EnquiryState> {
  const v = (k: string, max: number) => String(fd.get(k) ?? '').trim().slice(0, max);
  const values = { kind: v('kind', 20), program: v('program', 60), name: v('name', 100), email: v('email', 200), stage: v('stage', 80), message: v('message', 3000), context: v('context', 300), consent: fd.get('consent') ? 'on' : '' };
  if (v('website', 200)) return { errors: {}, values };                       // honeypot: silently ignore bots
  const kind = (['question', 'interest', 'match'].includes(values.kind) ? values.kind : 'question') as Enquiry['kind'];
  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = 'Enter your name.';
  if (!EMAIL.test(values.email)) errors.email = 'Enter an email address like name@example.com.';
  if (kind !== 'interest' && values.message.length < 10) errors.message = 'Tell us a little more (at least 10 characters).';
  if (!values.consent) errors.consent = 'Tick to let us contact you about this enquiry.';
  if (values.program && !programBySlug(values.program)) values.program = '';
  if (values.stage && !stages.includes(values.stage)) values.stage = '';
  if (Object.keys(errors).length) return { errors, values };
  const r = await deliverEnquiry({ kind, program: values.program, name: values.name, email: values.email, stage: values.stage, message: values.message, context: values.context });
  if (!r.ok) return { errors: {}, values, failure: r.reason === 'not-configured' ? 'This form isn’t connected to our inbox yet, so your enquiry was not sent.' : 'We couldn’t send your enquiry just now. Nothing was submitted — please try again.' };
  redirect(`/enquire/sent?ref=${encodeURIComponent(r.ref)}&delivered=${r.delivered ? 1 : 0}&kind=${kind}`);
}
