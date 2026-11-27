export type AppStatus = 'draft' | 'submitted' | 'review' | 'action';
export type AppStep = 'background' | 'availability' | 'review';
export interface ApplicationData {
  stage: string; study: string; motivation: string; goals: string[];
  start: string; commit: boolean; mandarin: string; otherLangs: string; accurate: boolean;
}
export interface Handoff { id: string; at: number; share: { level: boolean; goals: string[]; req: boolean }; revoked: boolean }
export interface Application {
  id: string; userId: string; program: string; status: AppStatus; step: AppStep;
  data: ApplicationData; history: { at: number; text: string }[];
  checks: Record<'cv' | 'passport' | 'practical' | 'call', boolean>;
  handoffs: Handoff[]; created: number; updated: number;
}
export const STEPS: [AppStep | 'program', string][] = [['program', 'Program'], ['background', 'Background & goals'], ['availability', 'Availability & language'], ['review', 'Review']];
export const APP_STATUS: Record<AppStatus, { label: string; cls: string; next: string }> = {
  draft:     { label: 'Draft',            cls: 'as-draft', next: 'Finish and submit your application.' },
  submitted: { label: 'Submitted',        cls: 'as-sub',   next: 'Nothing needed yet. An advisor will contact you to arrange a call.' },
  review:    { label: 'Under review',     cls: 'as-rev',   next: 'Your application is being reviewed. We’ll email you if we need anything.' },
  action:    { label: 'Next step needed', cls: 'as-act',   next: 'Book your advisor call.' }
};
export const emptyData = (): ApplicationData => ({ stage: '', study: '', motivation: '', goals: [], start: '', commit: false, mandarin: '', otherLangs: '', accurate: false });

export const sharedSummary = (h: Handoff) => { const x: string[] = []; if (h.share.level) x.push('Mandarin level (self-reported)'); if (h.share.goals.length) x.push('learning goals'); if (h.share.req) x.push('program language requirement'); return x.length ? 'Shared: ' + x.join(', ') : 'Account only — no application details'; };
