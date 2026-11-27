import { capabilities } from '@/lib/env';
export const dynamic = 'force-dynamic';
/* Health check for uptime monitors. Reports capability flags only — never values. */
export function GET(){
  const c = capabilities();
  return Response.json({ ok: true, env: c.env, signIn: c.signIn, applications: c.applications, enquiries: c.enquiriesReal ? 'delivered' : c.enquiries ? 'preview-only' : 'not-configured' });
}
