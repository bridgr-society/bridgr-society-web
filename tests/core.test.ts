import { describe, it, expect, vi, beforeEach } from 'vitest';
import { programs } from '@/content/programs';
import { cleanFilters, filterPrograms, programBySlug } from '@/lib/catalog';
import { suggest, evaluate } from '@/lib/match';
import { validateStep } from '@/lib/applications/validate';
import { emptyData, type Application } from '@/lib/applications/types';
import { buildHandoffPayload, offerEligibility } from '@/lib/handoff';
import { sign, verify } from '@/lib/auth/signed-cookie';
import { applicantOffer } from '@/content/offer';

const app = (over: Partial<Application> = {}): Application => ({ id: 'APP-1-X', userId: 'u1', program: 'taipei-marketing', status: 'draft', step: 'availability',
  data: { ...emptyData(), stage: 'Undergraduate student', study: 'BBA', motivation: 'x'.repeat(50), goals: ['Explore a career field'], start: 'Summer 2027', commit: true, mandarin: 'beginner' },
  history: [], checks: { cv: false, passport: false, practical: false, call: false }, handoffs: [], created: 0, updated: 0, ...over });

describe('content honesty', () => {
  it('every program is flagged as a sample with unconfirmed business facts', () => {
    expect(programs.length).toBe(9);
    for (const p of programs){ expect(p.sample).toBe(true); expect(p.confirmed).toEqual({ dates: null, fee: null, inclusions: null, host: null }); }
  });
  it('the applicant offer is inactive with no terms', () => {
    expect(applicantOffer.active).toBe(false);
    expect([applicantOffer.amount, applicantOffer.eligibility, applicantOffer.validity]).toEqual([null, null, null]);
  });
});

describe('program discovery', () => {
  it('drops unknown filter values from the URL', () => {
    expect(cleanFilters({ destination: 'mars', field: 'design', q: '  shanghai ', evil: '<x>' })).toEqual({ field: 'design', q: 'shanghai' });
  });
  it('filters combine', () => {
    expect(filterPrograms({ destination: 'taiwan', type: 'internship' }).length).toBe(3);
    expect(filterPrograms({ destination: 'taiwan', type: 'internship', mandarin: 'basic' }).map(p => p.slug)).toEqual(['taipei-marketing']);
    expect(filterPrograms({ q: 'shanghai' }).length).toBe(2);
    expect(filterPrograms({ field: 'finance', destination: 'china' })).toEqual([]);
  });
});

describe('guided matching', () => {
  const base = { stage: 'Recent graduate (within 2 years)', dest: 'singapore', fields: ['finance'], type: 'internship', start: 'Summer 2027', duration: 'medium', mandarin: 'none', goal: 'Build work experience abroad' };
  it('suggests only full fits, with reasons', () => {
    const r = suggest(base);
    expect(r.good.map(x => x.program.slug)).toEqual(['singapore-finance']);
    expect(r.good[0].ok).toContain('In Singapore, as you chose');
  });
  it('never invents a match', () => {
    const r = suggest({ ...base, fields: ['production'], type: 'immersion' });
    expect(r.good).toEqual([]);
  });
  it('states a language gap instead of hiding it', () => {
    const x = evaluate(programBySlug('taipei-production')!, { ...base, dest: 'any', fields: ['production'], mandarin: 'beginner' });
    expect(x.miss.join()).toMatch(/Professional working Mandarin/);
  });
});

describe('application validation (server side)', () => {
  const p = programBySlug('taipei-marketing')!;
  it('requires each background answer', () => {
    expect(Object.keys(validateStep(emptyData(), 'background', p)).sort()).toEqual(['goals', 'motivation', 'stage', 'study']);
  });
  it('rejects values not offered by the form', () => {
    const d = { ...app().data, start: 'Winter 2099', mandarin: 'fluent-ish' };
    expect(Object.keys(validateStep(d, 'availability', p)).sort()).toEqual(['mandarin', 'start']);
  });
  it('review re-checks every step and needs confirmation', () => {
    expect(validateStep(app().data, 'review', p)).toEqual({ accurate: 'Confirm your answers are accurate to submit.' });
  });
});

describe('Academy handoff', () => {
  it('shares nothing beyond the account without consent', () => {
    const out = buildHandoffPayload(app(), { level: false, goals: [], req: false });
    expect(out).toEqual({ account: 'same-bridgr-account', returnPath: '/apply/taipei-marketing/availability', offerEligibility: 'not-determined' });
    expect(JSON.stringify(out)).not.toMatch(/motivation|BBA|Summer|xxxx/);
  });
  it('shares only the ticked items', () => {
    const out = buildHandoffPayload(app(), { level: true, goals: ['Industry vocabulary'], req: true });
    expect(out.mandarinLevel).toBe('Beginner (self-reported)');
    expect(out.learningGoals).toEqual(['Industry vocabulary']);
    expect(out.languageRequirement).toBe('Basic Mandarin helpful');
  });
  it('returns to the dashboard once submitted', () => {
    expect(buildHandoffPayload(app({ status: 'submitted' }), { level: false, goals: [], req: false }).returnPath).toBe('/applications/APP-1-X');
  });
  it('eligibility is never “eligible” while terms are undecided, even if the flag is set', () => {
    expect(offerEligibility(app(), true)).toBe('not-determined');
    expect(offerEligibility(app(), false)).toBe('not-determined');
  });
});

describe('signed cookies', () => {
  it('round-trips and rejects tampering or the wrong secret', () => {
    const t = sign({ id: 'u1' }, 's'.repeat(32));
    expect(verify(t, 's'.repeat(32))).toEqual({ id: 'u1' });
    expect(verify(t.replace(/^./, c => c === 'e' ? 'f' : 'e'), 's'.repeat(32))).toBeNull();
    expect(verify(t, 'x'.repeat(32))).toBeNull();
    expect(verify('garbage', 's'.repeat(32))).toBeNull();
  });
});

describe('environment safety', () => {
  beforeEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });
  it('preview test data can never be enabled in production', async () => {
    vi.stubEnv('VERCEL_ENV', 'production'); vi.stubEnv('SOCIETY_PREVIEW_DEMO', 'true'); vi.stubEnv('SOCIETY_SESSION_SECRET', 'z'.repeat(40));
    const env = await import('@/lib/env');
    expect(env.previewDemoEnabled()).toBe(false);
    expect(env.capabilities()).toMatchObject({ signIn: false, applications: false, enquiries: false });
  });
  it('preview with the flag and a secret enables test data, labelled as not real', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview'); vi.stubEnv('SOCIETY_PREVIEW_DEMO', 'true'); vi.stubEnv('SOCIETY_SESSION_SECRET', 'z'.repeat(40));
    const env = await import('@/lib/env');
    expect(env.capabilities()).toMatchObject({ env: 'preview', signIn: true, applications: true, enquiries: true, enquiriesReal: false });
  });
  it('preview without a strong secret keeps sign-in off', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview'); vi.stubEnv('SOCIETY_PREVIEW_DEMO', 'true'); vi.stubEnv('SOCIETY_SESSION_SECRET', 'short');
    const env = await import('@/lib/env');
    expect(env.capabilities().signIn).toBe(false);
  });
  it('configuring Bridgr auth turns preview sign-in off until the adapter exists', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview'); vi.stubEnv('SOCIETY_PREVIEW_DEMO', 'true'); vi.stubEnv('SOCIETY_SESSION_SECRET', 'z'.repeat(40));
    vi.stubEnv('BRIDGR_AUTH_ISSUER', 'https://example.invalid'); vi.stubEnv('BRIDGR_AUTH_CLIENT_ID', 'x');
    const env = await import('@/lib/env');
    expect(env.capabilities()).toMatchObject({ signIn: false, authPending: true });
  });
});
