import 'server-only';
import { enquiryMode } from '@/lib/env';

/* Enquiry delivery boundary. Returns the honest outcome; the page shows exactly
   that. 'preview-log' (preview only) is labelled "not delivered". */
export interface Enquiry { kind: 'question' | 'interest' | 'match'; program: string; name: string; email: string; stage: string; message: string; context: string }
export type DeliveryResult =
  | { ok: true; ref: string; delivered: true }
  | { ok: true; ref: string; delivered: false; reason: 'preview' }
  | { ok: false; reason: 'not-configured' | 'failed' };

const ref = () => 'ENQ-' + Date.now().toString(36).toUpperCase();

export async function deliverEnquiry(e: Enquiry): Promise<DeliveryResult> {
  const mode = enquiryMode();
  try {
    if (mode === 'webhook'){
      const r = await fetch(process.env.ENQUIRY_WEBHOOK_URL!, { method: 'POST', headers: { 'content-type': 'application/json', ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) },
        body: JSON.stringify({ source: 'bridgr-society', ref: ref(), ...e }), signal: AbortSignal.timeout(8000) });
      if (!r.ok) return { ok: false, reason: 'failed' };
      return { ok: true, ref: ref(), delivered: true };
    }
    if (mode === 'resend'){
      const id = ref();
      const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({ from: process.env.ENQUIRY_FROM_EMAIL, to: [process.env.ENQUIRY_TO_EMAIL], reply_to: e.email, subject: `[Society ${e.kind}] ${e.name}${e.program ? ' — ' + e.program : ''} (${id})`,
          text: [`Kind: ${e.kind}`, `Program: ${e.program || '—'}`, `Name: ${e.name}`, `Email: ${e.email}`, `Stage: ${e.stage || '—'}`, e.context ? `Context: ${e.context}` : '', '', e.message || '(no message)'].filter(x => x !== '').join('\n') }),
        signal: AbortSignal.timeout(8000) });
      if (!r.ok) return { ok: false, reason: 'failed' };
      return { ok: true, ref: id, delivered: true };
    }
    if (mode === 'preview-log') return { ok: true, ref: ref(), delivered: false, reason: 'preview' };
    return { ok: false, reason: 'not-configured' };
  } catch { return { ok: false, reason: 'failed' }; }
}
