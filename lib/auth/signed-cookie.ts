import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/* Tamper-evident cookie values: base64url(json).base64url(hmac). Used only for
   the preview test-data session and test applications. Not encryption — never
   put secrets inside. */
const b64 = (b: Buffer) => b.toString('base64url');
export function sign(value: unknown, secret: string): string {
  const body = b64(Buffer.from(JSON.stringify(value)));
  const mac = b64(createHmac('sha256', secret).update(body).digest());
  return `${body}.${mac}`;
}
export function verify<T>(token: string | undefined, secret: string): T | null {
  if (!token) return null;
  const [body, mac] = token.split('.');
  if (!body || !mac) return null;
  const want = createHmac('sha256', secret).update(body).digest();
  const got = Buffer.from(mac, 'base64url');
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null;
  try { return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as T; } catch { return null; }
}
