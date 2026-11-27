# Bridgr Society — launch checklist

Legend: ✅ done and tested locally · ⏳ ready, needs your approval or input · ⛔ blocked

## A. Completed locally (nothing published)

- ✅ Multi-file Next.js + TypeScript app in `society-web/`, separate from the prototypes.
- ✅ Approved blue/teal design ported; responsive at desktop and phone sizes.
- ✅ Public pages: home, programs (6 filters + search, shareable URLs, no-match state), 9 program
  pages, 3 destinations, 6 career fields, internships vs immersion, how it works, Mandarin
  preparation, about, Help me choose (reasons + honest no-match), legal drafts.
- ✅ Content in typed files; every program `sample: true`; unknown facts render "To be confirmed".
- ✅ Applicant offer inactive ("details coming soon"); eligibility can only return "not determined".
- ✅ Integration boundaries isolated: `lib/auth`, `lib/applications`, `lib/enquiries`, `lib/handoff.ts`.
- ✅ Production without integrations: application pages and sign-in say "not connected" and offer
  register-interest; enquiry form disabled with an explanation; `/status` returns 404; no
  environment banner, no test sign-in, no reviewer controls.
- ✅ Preview test-data mode: full journey — apply → sign-in → steps with server validation →
  save → Academy consent (nothing pre-ticked) → handoff page showing only consented data →
  return to the same step → submit ("not an offer") → dashboard → demo status change.
- ✅ Access control: a second browser/test user gets "Application not found" for another user's
  application; tampered cookies are rejected (unit + e2e tests).
- ✅ Security headers; preview deployments `noindex`; robots disallow signed-in routes.
- ✅ Secret scan: test secrets and secret variable names do not appear in browser bundles.
- ✅ `.env.example` (names/placeholders only), `README.md`, this checklist.
- ✅ Results: production build passes; 23 unit tests; e2e 16/16 in production mode and 16/16 in
  preview mode (desktop + mobile projects).

## B. Needs your input

- ⏳ **Repository for `bridgr-three.vercel.app`** (URL + access) — required for shared sign-in and data.
- ⏳ **Git home for this app.** The local `bridgr` folder's Git repo has no commits and is read-only
  from my side. Options: a new branch `society-web` in the production repo (preferred once
  shared code is known), or a new repository. I won't push anything without approval.
- ⏳ **Exact domain** for Society and **who controls its DNS** (domain ownership ≠ DNS access).
- ⏳ **Vercel team + project.** Proposal: a **new** project (e.g. `bridgr-society`), Root Directory
  `society-web`, so the existing Bridgr deployment is untouched.
- ⏳ **Enquiry destination**: CRM/automation webhook URL, or Resend + verified sending domain and the
  receiving inbox.
- ⏳ **Legal text** for privacy and terms (current pages are drafts).
- ⏳ **Real program content**: hosts, dates, fees, inclusions; licensed photography to replace illustrations.

## C. Blocked on the production repository

- ⛔ Shared Bridgr sign-in (OIDC client of the central Bridgr sign-in; Society keeps its own first-party
  session cookie; sign-out ends both). Adapter slot: `lib/auth/session.ts`.
- ⛔ Application storage in the shared backend, with Society-scoped tables and row-level access rules;
  replaces `PreviewCookieStore` behind the same `ApplicationStore` interface.
- ⛔ Society staff roles (advisor/reviewer/admin) and a staff review screen.
- ⛔ Live Academy handoff: Academy endpoint that accepts the minimum payload from `lib/handoff.ts`,
  an eligibility check that answers yes/no only, and a return link.
- ⛔ Document uploads: private storage, size/type limits, malware scanning, retention — not built.

## D. Proposed deployment steps (awaiting approval — nothing done)

1. Push `society-web/` to the approved repo/branch.
2. Create Vercel project → Root Directory `society-web`, Framework Next.js, Node 20+.
3. Environment variables
   - **Preview:** `SOCIETY_PREVIEW_DEMO=true`, `SOCIETY_SESSION_SECRET=<random>`, `NEXT_PUBLIC_SITE_URL=<preview URL>`.
   - **Production:** `NEXT_PUBLIC_SITE_URL=https://<domain>`; enquiry variables only once the destination is real.
     Do **not** set `SOCIETY_PREVIEW_DEMO`.
4. Deploy a Preview; review with test data; run the e2e suite against the preview URL.
5. Production deploy on the Vercel URL first; verify `/api/health` shows `signIn:false` (until Bridgr auth) and
   enquiries `delivered` (if configured).
6. Domain: add in Vercel, then the DNS owner creates the records Vercel shows (A/CNAME). **No DNS change without approval.**
7. No production database migrations exist yet; any future migration will be presented for approval first.

## E. Before switching on real applications (later)

- [ ] Shared identity integrated and tested across domains (sign-in, return journey, sign-out)
- [ ] Applications stored server-side with per-user access rules; staff permissions defined
- [ ] Privacy notice covers applications and cross-product sharing
- [ ] Remove preview test-data code paths from the production bundle, or keep them provably disabled (as now)
- [ ] Load, accessibility and security review
