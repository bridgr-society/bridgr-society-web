/* Pure helpers over content — safe in server and client code. */
import { programs } from '@/content/programs';
import { destinations, careerFields, programTypes, durations, startPeriods, mandarinRequirements, mandarinLevels } from '@/content/taxonomy';
import type { Program } from '@/content/types';

export const TBC = 'To be confirmed';
export const programBySlug = (s: string) => programs.find(p => p.slug === s) ?? null;
export const destinationBySlug = (s: string) => destinations.find(d => d.slug === s) ?? null;
export const fieldBySlug = (s: string) => careerFields.find(f => f.slug === s) ?? null;
export const typeBySlug = (s: string) => programTypes.find(t => t.slug === s) ?? null;
export const requirementOf = (p: Program) => mandarinRequirements.find(m => m.slug === p.mandarinRequirement)!;
export const levelBySlug = (s: string) => mandarinLevels.find(m => m.slug === s) ?? null;
export const placeLine = (p: Program) => `${p.city ? p.city + ', ' : ''}${destinationBySlug(p.destination)?.name ?? ''}`;

export const STATUS: Record<Program['status'], { label: string; cls: string; action: string }> = {
  open:    { label: 'Open for applications', cls: 'st-open', action: 'Apply' },
  soon:    { label: 'Opening soon',          cls: 'st-soon', action: 'Register interest' },
  enquiry: { label: 'Enquiries only',        cls: 'st-enq',  action: 'Register interest' }
};

export const MY_MANDARIN = [
  { slug: 'none', name: 'None yet', rank: 0 }, { slug: 'basic', name: 'Basic', rank: 1 },
  { slug: 'conversational', name: 'Conversational', rank: 2 }, { slug: 'professional', name: 'Professional', rank: 3 }
];

export const FILTERS = [
  { key: 'destination', label: 'Destination', options: destinations.map(d => ({ slug: d.slug, name: d.name })) },
  { key: 'field', label: 'Career field', options: careerFields.map(f => ({ slug: f.slug, name: f.name })) },
  { key: 'type', label: 'Program type', options: programTypes.map(t => ({ slug: t.slug, name: t.name })) },
  { key: 'duration', label: 'Duration', options: durations },
  { key: 'start', label: 'Start period', options: startPeriods.map(s => ({ slug: s, name: s })) },
  { key: 'mandarin', label: 'My Mandarin', options: MY_MANDARIN.map(({ slug, name }) => ({ slug, name })) }
] as const;
export type FilterKey = typeof FILTERS[number]['key'] | 'q';
export type Filters = Partial<Record<FilterKey, string>>;

/** Keep only known keys and known option values — never trust the URL. */
export function cleanFilters(raw: Record<string, string | string[] | undefined>): Filters {
  const out: Filters = {};
  for (const f of FILTERS){
    const v = raw[f.key]; const s = Array.isArray(v) ? v[0] : v;
    if (s && f.options.some(o => o.slug === s)) out[f.key] = s;
  }
  const q = Array.isArray(raw.q) ? raw.q[0] : raw.q;
  if (q && q.trim()) out.q = q.trim().slice(0, 80);
  return out;
}

export function filterPrograms(f: Filters, list: Program[] = programs): Program[] {
  const q = (f.q ?? '').toLowerCase();
  const myRank = f.mandarin ? MY_MANDARIN.find(m => m.slug === f.mandarin)!.rank : null;
  return list.filter(p =>
    (!f.destination || p.destination === f.destination) && (!f.field || p.field === f.field) && (!f.type || p.type === f.type) &&
    (!f.duration || p.duration === f.duration) && (!f.start || p.starts.includes(f.start)) &&
    (myRank === null || requirementOf(p).rank <= myRank) &&
    (!q || [p.title, p.city, destinationBySlug(p.destination)?.name, fieldBySlug(p.field)?.name, typeBySlug(p.type)?.name, p.summary].join(' ').toLowerCase().includes(q)));
}

export const filterLabel = (key: FilterKey, value: string) => key === 'q' ? `“${value}”` : (FILTERS.find(f => f.key === key)?.options.find(o => o.slug === value)?.name ?? value);
export const toQuery = (f: Filters) => new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]).toString();
