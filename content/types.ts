/* Content model. A future CMS should return exactly these shapes. */
export type Slug = string;
export type ProgramStatus = 'open' | 'soon' | 'enquiry';
export type SceneKind = 'taiwan' | 'china' | 'singapore' | 'office' | 'meeting' | 'studio' | 'tech' | 'finance';

export interface Program {
  slug: Slug;
  title: string;
  sample: boolean;                 // true until a real host and terms are confirmed
  type: 'internship' | 'immersion';
  destination: Slug;
  city: string;
  field: Slug;
  duration: Slug;
  durationText: string;
  starts: string[];
  workingLanguage: string;
  mandarinRequirement: 'none' | 'basic' | 'conversational' | 'professional';
  status: ProgramStatus;
  featured: boolean;
  scene: SceneKind;
  summary: string;
  audience: string;
  activities: string[];
  outcomes: string[];
  eligibility: string[];
  steps: string[];
  /** Business-supplied facts. null = "To be confirmed". Never invent values. */
  confirmed: { dates: string | null; fee: string | null; inclusions: string[] | null; host: string | null };
}
export interface Destination { slug: Slug; name: string; cities: string[]; scene: SceneKind; tagline: string; intro: string; work: string; practical: string[] }
export interface CareerField { slug: Slug; name: string; icon: string; blurb: string }
export interface ProgramType { slug: 'internship' | 'immersion'; name: string; short: string; desc: string; not: string }
export interface Option { slug: Slug; name: string }
export interface MandarinRequirement { slug: Program['mandarinRequirement']; rank: number; name: string }
export interface MandarinLevel { slug: string; rank: number; name: string; desc: string }
