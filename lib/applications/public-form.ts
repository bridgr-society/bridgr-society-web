/* Options + validation for the public application form (/apply).
   Pure functions so they can be unit-tested; used by the server action. */
import { programs } from '@/content/programs';
import { destinations, programTypes, durations, startPeriods, mandarinLevels, stages, careerFields } from '@/content/taxonomy';
import { placeLine } from '@/lib/catalog';

export const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer to self-describe', 'Prefer not to say'];
export const ENGLISH = ['Native', 'Fluent', 'Professional working', 'Conversational', 'Basic'];
export const HEARD = ['Search engine', 'Social media', 'University or careers office', 'Friend or classmate', 'Bridgr Academy', 'Event or fair', 'Other'];
export const NOT_SURE = 'not-sure';
export const COUNTRIES = ['Thailand', 'Taiwan', 'China', 'Hong Kong', 'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam', 'Cambodia', 'Laos', 'Myanmar', 'Japan', 'South Korea', 'India', 'Australia', 'New Zealand', 'United Kingdom', 'Ireland', 'France', 'Germany', 'Netherlands', 'Spain', 'Italy', 'Sweden', 'United States', 'Canada', 'Mexico', 'Brazil', 'Other'];
const year = new Date().getFullYear();
export const GRAD_YEARS = [...Array.from({ length: 9 }, (_, i) => String(year - 2 + i)), 'Already graduated earlier', 'Not applicable'];

export const programOptions = () => [...programs.map(p => ({ value: p.slug, label: `${p.title} — ${placeLine(p)}` })), { value: NOT_SURE, label: 'Not sure yet — help me choose' }];
export const options = { destinations: destinations.map(d => ({ value: d.slug, label: d.name })), types: [...programTypes.map(t => ({ value: t.slug, label: t.name })), { value: 'either', label: 'Either' }],
  durations: durations.map(d => ({ value: d.slug, label: d.name })), starts: startPeriods, mandarin: mandarinLevels.map(m => ({ value: m.slug, label: m.name })), stages, fields: careerFields.map(f => ({ value: f.slug, label: f.name })) };

export type Values = Record<string, string | string[]>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+\d[\d\s().-]{6,20}$/;
const URL_RE = /^https?:\/\/\S+\.\S+/;

export function readForm(fd: FormData): Values {
  const s = (k: string, max = 200) => String(fd.get(k) ?? '').trim().slice(0, max);
  const m = (k: string) => fd.getAll(k).map(x => String(x).slice(0, 40));
  return { first: s('first', 80), last: s('last', 80), email: s('email'), email2: s('email2'), phone: s('phone', 30), gender: s('gender', 40), genderSelf: s('genderSelf', 80),
    nationality: s('nationality', 60), residence: s('residence', 60), dob: s('dob', 10),
    stage: s('stage', 80), institution: s('institution', 160), study: s('study', 160), gradYear: s('gradYear', 40), experience: s('experience', 2000), link: s('link', 300),
    program: s('program', 60), destinations: m('destinations'), ptype: s('ptype', 20), start: s('start', 40), duration: s('duration', 20), fields: m('fields'),
    mandarin: s('mandarin', 20), english: s('english', 40), otherLangs: s('otherLangs', 200),
    motivation: s('motivation', 3000), heard: s('heard', 60), notes: s('notes', 2000),
    accurate: fd.get('accurate') ? 'on' : '', consent: fd.get('consent') ? 'on' : '' };
}

export function validate(v: Values): Record<string, string> {
  const e: Record<string, string> = {}, s = (k: string) => String(v[k] ?? ''), arr = (k: string) => (Array.isArray(v[k]) ? v[k] : []) as string[];
  const inList = (x: string, list: string[]) => list.includes(x);
  if (s('first').length < 1) e.first = 'Enter your first name.';
  if (s('last').length < 1) e.last = 'Enter your last name.';
  if (!EMAIL.test(s('email'))) e.email = 'Enter an email address like name@example.com.';
  else if (s('email2').toLowerCase() !== s('email').toLowerCase()) e.email2 = 'The two email addresses don’t match.';
  if (!PHONE.test(s('phone'))) e.phone = 'Enter a phone number starting with + and your country code, e.g. +66 81 234 5678.';
  if (!inList(s('gender'), GENDERS)) e.gender = 'Choose an option (you can choose “Prefer not to say”).';
  if (!inList(s('nationality'), COUNTRIES)) e.nationality = 'Choose your nationality.';
  if (!inList(s('residence'), COUNTRIES)) e.residence = 'Choose where you live now.';
  const d = Date.parse(s('dob')); const age = (Date.now() - d) / 31557600000;
  if (!s('dob') || isNaN(d)) e.dob = 'Enter your date of birth.'; else if (age < 16 || age > 80) e.dob = 'Check your date of birth — applicants must be at least 16.';
  if (!inList(s('stage'), options.stages)) e.stage = 'Choose where you are right now.';
  if (s('institution').length < 2) e.institution = 'Enter your university, school or employer.';
  if (s('study').length < 2) e.study = 'Enter your field of study or current role.';
  if (!inList(s('gradYear'), GRAD_YEARS)) e.gradYear = 'Choose your graduation year.';
  if (s('link') && !URL_RE.test(s('link'))) e.link = 'Enter a full link starting with https://';
  if (!inList(s('program'), programOptions().map(o => o.value))) e.program = 'Choose a program, or “Not sure yet”.';
  if (!arr('destinations').length || !arr('destinations').every(x => inList(x, options.destinations.map(o => o.value)))) e.destinations = 'Choose at least one destination.';
  if (!inList(s('ptype'), options.types.map(o => o.value))) e.ptype = 'Choose a program type.';
  if (!inList(s('start'), options.starts)) e.start = 'Choose when you’d like to start.';
  if (s('duration') && !inList(s('duration'), options.durations.map(o => o.value))) e.duration = 'Choose a duration.';
  if (!inList(s('mandarin'), options.mandarin.map(o => o.value))) e.mandarin = 'Choose your Mandarin level.';
  if (!inList(s('english'), ENGLISH)) e.english = 'Choose your English level.';
  if (s('motivation').length < 50) e.motivation = 'Tell us a bit more about why you’re applying (at least 50 characters).';
  if (s('heard') && !inList(s('heard'), HEARD)) e.heard = 'Choose an option.';
  if (!s('accurate')) e.accurate = 'Confirm your answers are accurate.';
  if (!s('consent')) e.consent = 'Tick to let Bridgr Society use your details to review your application and contact you.';
  return e;
}

export function toSections(v: Values){
  const s = (k: string) => String(v[k] ?? ''), arr = (k: string) => ((Array.isArray(v[k]) ? v[k] : []) as string[]);
  const lab = (list: { value: string; label: string }[], x: string) => list.find(o => o.value === x)?.label ?? x;
  const program = lab(programOptions(), s('program'));
  return { program, sections: [
    { title: 'Personal information', rows: [['Name', `${s('first')} ${s('last')}`], ['Email', s('email')], ['Phone', s('phone')], ['Gender', s('gender') === 'Prefer to self-describe' && s('genderSelf') ? `Self-described: ${s('genderSelf')}` : s('gender')], ['Nationality', s('nationality')], ['Country of residence', s('residence')], ['Date of birth', s('dob')]] as [string, string][] },
    { title: 'Education & experience', rows: [['Current stage', s('stage')], ['University / school / employer', s('institution')], ['Field of study or role', s('study')], ['Graduation year', s('gradYear')], ['Experience', s('experience')], ['LinkedIn / portfolio', s('link')]] as [string, string][] },
    { title: 'Program preferences', rows: [['Program', program], ['Destinations', arr('destinations').map(x => lab(options.destinations, x)).join(', ')], ['Program type', lab(options.types, s('ptype'))], ['Preferred start', s('start')], ['Preferred duration', s('duration') ? lab(options.durations, s('duration')) : ''], ['Career fields', arr('fields').map(x => lab(options.fields, x)).join(', ')]] as [string, string][] },
    { title: 'Languages', rows: [['Mandarin (self-reported)', lab(options.mandarin, s('mandarin'))], ['English', s('english')], ['Other languages', s('otherLangs')]] as [string, string][] },
    { title: 'Motivation', rows: [['Why this program', s('motivation')], ['How they heard about us', s('heard')], ['Anything else', s('notes')]] as [string, string][] },
  ] };
}
