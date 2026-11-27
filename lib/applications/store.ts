import 'server-only';
import { cookies } from 'next/headers';
import { sessionSecret, deployEnv, capabilities } from '@/lib/env';
import { sign, verify } from '@/lib/auth/signed-cookie';
import type { SessionUser } from '@/lib/auth/session';
import { emptyData, type Application } from './types';

/* Application storage boundary.
   - PreviewCookieStore: test data in signed, per-application cookies (preview only).
   - Production: no store until the shared Bridgr backend is chosen; callers must
     check capabilities().applications and show "not connected".
   Every method takes the signed-in user and only ever returns that user's data. */
export interface ApplicationStore {
  list(user: SessionUser): Promise<Application[]>;
  get(user: SessionUser, id: string): Promise<Application | null>;
  create(user: SessionUser, program: string): Promise<Application>;
  save(user: SessionUser, app: Application): Promise<void>;
}
export class NotConnectedError extends Error { constructor(){ super('Application storage is not connected in this environment.'); } }

const MAX = 3, PREFIX = 'bs_app_';
const SLOTS = Array.from({ length: MAX }, (_, i) => PREFIX + (i + 1));

class PreviewCookieStore implements ApplicationStore {
  constructor(private secret: string){}
  private async all(): Promise<{ slot: string; app: Application }[]> {
    const jar = await cookies();
    return SLOTS.map(slot => ({ slot, app: verify<Application>(jar.get(slot)?.value, this.secret) })).filter((x): x is { slot: string; app: Application } => !!x.app);
  }
  async list(user: SessionUser){ return (await this.all()).map(x => x.app).filter(a => a.userId === user.id).sort((a, b) => b.updated - a.updated); }
  async get(user: SessionUser, id: string){ return (await this.all()).map(x => x.app).find(a => a.id === id && a.userId === user.id) ?? null; }
  async create(user: SessionUser, program: string){
    const mine = await this.list(user);
    const existing = mine.find(a => a.program === program); if (existing) return existing;
    const used = (await this.all()).map(x => x.slot), slot = SLOTS.find(s => !used.includes(s));
    if (!slot) throw new Error(`Preview test data holds up to ${MAX} applications. Reset preview data to start another.`);
    const now = Date.now();
    const app: Application = { id: 'APP-' + slot.slice(PREFIX.length) + '-' + now.toString(36).slice(-4).toUpperCase(), userId: user.id, program, status: 'draft', step: 'background',
      data: emptyData(), history: [{ at: now, text: 'Draft started' }], checks: { cv: false, passport: false, practical: false, call: false }, handoffs: [], created: now, updated: now };
    await this.write(slot, app); return app;
  }
  async save(user: SessionUser, app: Application){
    if (app.userId !== user.id) throw new Error('Not your application.');
    const hit = (await this.all()).find(x => x.app.id === app.id && x.app.userId === user.id);
    if (!hit) throw new Error('Application not found.');
    app.updated = Date.now(); await this.write(hit.slot, app);
  }
  private async write(slot: string, app: Application){
    const jar = await cookies();
    jar.set(slot, sign(app, this.secret), { httpOnly: true, sameSite: 'lax', secure: deployEnv() !== 'development', path: '/', maxAge: 30 * 86400 });
  }
}

export async function clearPreviewData(){ const jar = await cookies(); SLOTS.forEach(s => jar.delete(s)); }

export function applicationStore(): ApplicationStore {
  if (!capabilities().applications) throw new NotConnectedError();
  return new PreviewCookieStore(sessionSecret()!);
}
