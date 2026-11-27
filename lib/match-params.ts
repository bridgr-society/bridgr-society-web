import type { MatchAnswers } from './match';
import { stages, destinations, careerFields, startPeriods, durations, mandarinLevels, goals } from '@/content/taxonomy';
/* Answers travel in the URL so results are shareable, survive sign-in, and need no storage. */
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
export function parseAnswers(sp: Record<string, string | string[] | undefined>): MatchAnswers {
  const pick = (v: string, ok: string[]) => ok.includes(v) ? v : '';
  return {
    stage: pick(one(sp.stage), stages), dest: pick(one(sp.dest), ['any', ...destinations.map(d => d.slug)]),
    fields: one(sp.fields).split(',').filter(f => careerFields.some(c => c.slug === f)),
    type: pick(one(sp.type), ['internship', 'immersion', 'either']), start: pick(one(sp.start), startPeriods),
    duration: pick(one(sp.duration), ['any', ...durations.map(d => d.slug)]), mandarin: pick(one(sp.mandarin), mandarinLevels.map(m => m.slug)), goal: pick(one(sp.goal), goals)
  };
}
export const complete = (a: MatchAnswers) => !!(a.stage && a.dest && a.fields.length && a.type && a.start && a.duration && a.mandarin && a.goal);
export const answersQuery = (a: MatchAnswers) => new URLSearchParams({ ...a, fields: a.fields.join(',') } as Record<string, string>).toString();
