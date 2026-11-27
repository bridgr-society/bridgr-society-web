import { describe, it, expect, vi, beforeEach } from 'vitest';
/* Ownership: a user can only ever read or write their own applications. */
const jar = new Map<string, string>();
vi.mock('next/headers', () => ({ cookies: async () => ({
  get: (k: string) => jar.has(k) ? { value: jar.get(k) } : undefined,
  set: (k: string, v: string) => { jar.set(k, v); }, delete: (k: string) => { jar.delete(k); }
}) }));

describe('preview application store', () => {
  beforeEach(() => { jar.clear(); vi.unstubAllEnvs(); vi.resetModules();
    vi.stubEnv('VERCEL_ENV', 'preview'); vi.stubEnv('SOCIETY_PREVIEW_DEMO', 'true'); vi.stubEnv('SOCIETY_SESSION_SECRET', 'k'.repeat(40)); });
  const alice = { id: 'preview-alice', name: 'Alice', email: 'a@example.com', source: 'preview-demo' as const };
  const bob = { id: 'preview-bob', name: 'Bob', email: 'b@example.com', source: 'preview-demo' as const };

  it('returns only the owner’s applications', async () => {
    const { applicationStore } = await import('@/lib/applications/store');
    const s = applicationStore();
    const a = await s.create(alice, 'taipei-marketing');
    expect((await s.list(alice)).map(x => x.id)).toEqual([a.id]);
    expect(await s.list(bob)).toEqual([]);
    expect(await s.get(bob, a.id)).toBeNull();
  });
  it('refuses to save someone else’s application', async () => {
    const { applicationStore } = await import('@/lib/applications/store');
    const s = applicationStore(), a = await s.create(alice, 'taipei-marketing');
    await expect(s.save(bob, { ...a })).rejects.toThrow();
    await expect(s.save(bob, { ...a, userId: bob.id })).rejects.toThrow();
  });
  it('rejects a tampered cookie', async () => {
    const { applicationStore } = await import('@/lib/applications/store');
    const s = applicationStore(), a = await s.create(alice, 'taipei-marketing');
    const [k, v] = [...jar.entries()][0];
    const body = JSON.parse(Buffer.from(v.split('.')[0], 'base64url').toString()); body.userId = bob.id;
    jar.set(k, Buffer.from(JSON.stringify(body)).toString('base64url') + '.' + v.split('.')[1]);
    expect(await s.get(bob, a.id)).toBeNull();
    expect(await s.get(alice, a.id)).toBeNull();
  });
  it('is unavailable in production', async () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    const { applicationStore, NotConnectedError } = await import('@/lib/applications/store');
    expect(() => applicationStore()).toThrow(NotConnectedError);
  });
});
