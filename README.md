# Bridgr Society — website (`society-web/`)

The deployable Bridgr Society site, converted from the approved design prototype
(`../bridgr-society.html`). Next.js (App Router) + TypeScript, built for Vercel.

> **Status:** public pages are ready. Shared Bridgr sign-in, real application
> storage and the live Academy handoff are **not connected** — they wait on the
> production Bridgr repository (`bridgr-three.vercel.app`). See `LAUNCH-CHECKLIST.md`.

## What's real, what's preview-only, what's not connected

| Feature | Production today | Preview (`SOCIETY_PREVIEW_DEMO=true`) |
|---|---|---|
| Public pages, program discovery, filters, guided matching | ✅ Real | ✅ |
| Enquiry / register interest | ✅ Real **only when** a webhook or Resend is configured; otherwise the form is disabled and says so | Validated, **not delivered**, labelled |
| Bridgr sign-in | ❌ Not connected — pages say so | Test identity (signed cookie), labelled |
| Applications, dashboard, ownership checks | ❌ Not connected | Test data in signed per-application cookies |
| Academy handoff | ❌ Not connected | Shows the minimum payload Academy *would* receive + return path |
| Applicant learning offer | Inactive ("details coming soon") | Inactive |
| Document uploads | Not built | Not built |

Preview test-data mode **cannot** be switched on in production: `lib/env.ts`
ignores `SOCIETY_PREVIEW_DEMO` when `VERCEL_ENV=production`, and every preview page
shows an environment banner.

## Local setup

Requires Node 20.9+.

```bash
cd society-web
npm ci
cp .env.example .env.local        # fill in only what you need
npm run dev                        # http://localhost:3000
```

To try the full applicant journey locally, set in `.env.local`:

```
SOCIETY_ENV=preview
SOCIETY_PREVIEW_DEMO=true
SOCIETY_SESSION_SECRET=<32+ random characters>
```

## Checks

```bash
npm run typecheck   # TypeScript
npm test            # unit tests: filters, matching, validation, handoff minimum data,
                    # signed cookies, environment safety, application ownership
npm run build       # production build
```

### End-to-end tests (Playwright)

Run against a **production build** in each mode:

```bash
# 1) Production, nothing configured
VERCEL_ENV=production npm run build && VERCEL_ENV=production npx next start -p 3100
E2E_MODE=production E2E_BASE_URL=http://localhost:3100 npm run e2e

# 2) Preview test-data mode (runtime env must match build env)
export VERCEL_ENV=preview SOCIETY_PREVIEW_DEMO=true SOCIETY_SESSION_SECRET=$(openssl rand -base64 32)
npm run build && npx next start -p 3200
E2E_MODE=preview E2E_BASE_URL=http://localhost:3200 npm run e2e
```

First run: `npx playwright install chromium`. Offline sandboxes: add `E2E_BLOCK_FONTS=1`.

## Project structure

```
app/                 routes (one folder per URL)
  page.tsx           home
  programs/          listing (filters in the URL) and [slug] detail
  destinations/ career-fields/ program-types/ how-it-works/ mandarin/ about/
  match/             Help me choose (client quiz) + results (server, shareable URL)
  enquire/           form + server action + confirmation
  account/           sign-in boundary (preview test identity only)
  apply/[slug]       route handler: start/resume a draft
  apply/[slug]/[step] application steps
  applications/      dashboard, detail, prepare (Academy consent)
  academy-handoff/   what Academy would receive + return path
  status/            environment status + reviewer controls (404 in production)
  api/health         capability flags for monitoring (no secret values)
components/          shared UI (header/footer, cards, icons, illustrations, forms)
content/             programs, taxonomy, offer, open decisions — typed, CMS-ready
lib/
  env.ts             the single source of "what is real here"
  catalog.ts match.ts   pure discovery + matching logic
  auth/              session boundary (README explains the Bridgr plan)
  applications/      types, server validation, storage boundary, guards
  enquiries/         delivery boundary (webhook / Resend / preview / none)
  handoff.ts         Academy minimum-data payload + eligibility (always "not determined")
tests/  e2e/         unit + end-to-end tests
```

## Editing content

Programs live in `content/programs.ts`. Keep `sample: true` until a host and terms are
confirmed. Business facts go in `confirmed` (`dates`, `fee`, `inclusions`, `host`);
`null` renders as "To be confirmed". A CMS can replace these files later by returning
the same `Program` shape from `content/types.ts`.

## Deploying to Vercel (not done — needs approval)

See `LAUNCH-CHECKLIST.md` for the exact proposed steps. Summary: a **new** Vercel
project with Root Directory `society-web`, Preview environment with test-data mode,
Production with integrations off until they're real, then the domain.
