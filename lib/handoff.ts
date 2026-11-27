/* Society → Academy handoff: the MINIMUM information, nothing else.
   Always: same account (no copy), a yes/no/undetermined offer answer, a return link.
   Only with consent: self-reported level, chosen learning goals, one-line requirement. */
import { applicantOffer } from '@/content/offer';
import type { Application } from '@/lib/applications/types';
import { programBySlug, requirementOf, levelBySlug } from './catalog';

export type Eligibility = 'not-determined' | 'eligible' | 'not-eligible';
/** Answers only whether the offer can apply — never exposes the application. */
export function offerEligibility(_app: Application, approved = process.env.ACADEMY_OFFER_APPROVED === 'true'): Eligibility {
  if (!applicantOffer.active || !approved) return 'not-determined';
  return 'not-determined';   // rules not defined yet — deliberately never "eligible"
}
export interface HandoffPayload { account: 'same-bridgr-account'; returnPath: string; offerEligibility: Eligibility; mandarinLevel?: string; learningGoals?: string[]; languageRequirement?: string }
export function buildHandoffPayload(app: Application, share: { level: boolean; goals: string[]; req: boolean }): HandoffPayload {
  const p = programBySlug(app.program)!;
  const out: HandoffPayload = { account: 'same-bridgr-account', returnPath: app.status === 'draft' ? `/apply/${app.program}/${app.step}` : `/applications/${app.id}`, offerEligibility: offerEligibility(app) };
  if (share.level && app.data.mandarin) out.mandarinLevel = levelBySlug(app.data.mandarin)!.name + ' (self-reported)';
  if (share.goals.length) out.learningGoals = share.goals.slice(0, 6);
  if (share.req) out.languageRequirement = requirementOf(p).name;
  return out;
}
