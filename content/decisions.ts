/* Open production decisions — shown on /status in non-production environments
   and tracked in LAUNCH-CHECKLIST.md. */
export const unresolved: [string, string][] = [
  ['Shared Bridgr sign-in', 'Needs the bridgr-three.vercel.app repository to confirm the identity provider, user-ID model and how cross-domain sign-in works.'],
  ['Domains and DNS', 'Exact Society domain, who controls DNS, and the domain for the central Bridgr sign-in.'],
  ['Application storage', 'Which database and access rules hold Society applications (shared Bridgr backend or a Society schema).'],
  ['Society staff permissions', 'Who reviews applications and documents, and which applicant data each staff role can see.'],
  ['Enquiry delivery', 'Which inbox or CRM receives enquiries, and the provider credentials.'],
  ['Document uploads', 'Not built. Needs private storage, virus scanning and retention rules before any upload is accepted.'],
  ['Connect “Hire an Intern” overlap', 'Unchanged. Decide how it relates to Society placements.'],
  ['Applicant learning offer', 'Amount, eligibility and validity undecided. Inactive.'],
  ['Program details', 'Hosts, dates, fees, inclusions, visa routes and accommodation are unconfirmed for every sample program.'],
  ['Legal pages', 'Privacy and terms are draft placeholders pending legal review.']
];
