/* Help me choose — deterministic suggestions with plain-language reasons.
   A program is suggested only if it misses none of the answers; programs that
   miss exactly one are shown separately with the difference stated. */
import { programs } from '@/content/programs';
import type { Program } from '@/content/types';
import { destinationBySlug, fieldBySlug, typeBySlug, requirementOf, levelBySlug } from './catalog';

export interface MatchAnswers { stage: string; dest: string; fields: string[]; type: string; start: string; duration: string; mandarin: string; goal: string }
export interface MatchResult { program: Program; ok: string[]; miss: string[] }

export function evaluate(p: Program, a: MatchAnswers): MatchResult {
  const ok: string[] = [], miss: string[] = [];
  const req = requirementOf(p), lvl = levelBySlug(a.mandarin);
  if (a.dest && a.dest !== 'any'){ const d = destinationBySlug(p.destination)!.name; if (p.destination === a.dest) ok.push(`In ${d}, as you chose`); else miss.push(`In ${d}, not ${destinationBySlug(a.dest)?.name}`); }
  if (a.type && a.type !== 'either'){ const t = typeBySlug(p.type)!.name; if (p.type === a.type) ok.push(`${t}, as you chose`); else miss.push(`An ${t.toLowerCase()}, not an ${typeBySlug(a.type)?.name.toLowerCase()}`); }
  if (a.fields.length){ const f = fieldBySlug(p.field)!.name; if (a.fields.includes(p.field)) ok.push(`${f} — one of your interests`); else miss.push(`${f} isn’t one of your chosen fields`); }
  if (req.rank === 0) ok.push('No Mandarin required');
  else if (!lvl || lvl.slug === 'unsure') ok.push(`${req.name} — an advisor can help you check your level`);
  else if (lvl.rank >= req.rank) ok.push(`${req.name} — fits the level you described`);
  else miss.push(`${req.name}; you described ${lvl.name.toLowerCase()}`);
  if (a.start && a.start !== 'Flexible' && p.starts.includes(a.start)) ok.push(`Starts ${a.start}`);
  if (a.duration && a.duration !== 'any' && p.duration === a.duration) ok.push(`${p.durationText} — your preferred length`);
  return { program: p, ok, miss };
}
export function suggest(a: MatchAnswers, list: Program[] = programs){
  const all = list.map(p => evaluate(p, a));
  return {
    good: all.filter(x => !x.miss.length).sort((x, y) => y.ok.length - x.ok.length),
    near: all.filter(x => x.miss.length === 1).sort((x, y) => y.ok.length - x.ok.length).slice(0, 3)
  };
}
