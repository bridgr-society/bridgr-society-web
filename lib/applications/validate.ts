import type { ApplicationData, AppStep } from './types';
import { stages, goals as GOALS, mandarinLevels } from '@/content/taxonomy';
import type { Program } from '@/content/types';

/* Server-side validation — the browser checks are a convenience only. */
export const LIMITS = { study: 120, motivation: 1500, otherLangs: 120 };
export function validateStep(d: ApplicationData, step: AppStep, p: Program): Record<string, string> {
  const err: Record<string, string> = {};
  if (step === 'background'){
    if (!stages.includes(d.stage)) err.stage = 'Choose where you are right now.';
    if (!d.study.trim()) err.study = 'Tell us your field of study or current role.';
    if (d.study.length > LIMITS.study) err.study = `Keep this under ${LIMITS.study} characters.`;
    if (d.motivation.trim().length < 40) err.motivation = `Write at least 40 characters about why this program (${d.motivation.trim().length} so far).`;
    if (d.motivation.length > LIMITS.motivation) err.motivation = `Keep this under ${LIMITS.motivation} characters.`;
    if (!d.goals.length || d.goals.some(g => !GOALS.includes(g))) err.goals = 'Choose at least one goal.';
  }
  if (step === 'availability'){
    if (![...p.starts, 'Flexible'].includes(d.start)) err.start = 'Choose a preferred start.';
    if (!d.commit) err.commit = 'Confirm you could commit to the full duration, or ask us first.';
    if (!mandarinLevels.some(m => m.slug === d.mandarin)) err.mandarin = 'Describe your Mandarin — “Not sure” is fine.';
    if (d.otherLangs.length > LIMITS.otherLangs) err.otherLangs = `Keep this under ${LIMITS.otherLangs} characters.`;
  }
  if (step === 'review'){
    const a = validateStep(d, 'background', p), b = validateStep(d, 'availability', p);
    Object.assign(err, a, b);
    if (!d.accurate) err.accurate = 'Confirm your answers are accurate to submit.';
  }
  return err;
}
