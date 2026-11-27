# Authentication boundary

`getSession()` in `session.ts` is the only way the app learns who is signed in.

| Mode | When | What it is |
|---|---|---|
| `none` | Production today | Nobody can sign in. Application pages say sign-in isn't connected yet and offer an enquiry. |
| `preview-demo` | Preview/staging with `SOCIETY_PREVIEW_DEMO=true` | A **test identity** in a signed cookie, labelled on every page. Cannot be enabled in production (`lib/env.ts`). |
| `bridgr` | After the shared Bridgr identity is confirmed | **Not implemented.** Setting `BRIDGR_AUTH_*` disables preview mode and shows "sign-in pending". |

## Plan for the shared Bridgr identity (blocked on the production repository)

1. Inspect `bridgr-three.vercel.app`: provider, user-ID format, session handling, roles.
2. Society becomes an OpenID Connect client of the central Bridgr sign-in. Cross-domain:
   Society redirects to the central sign-in; if already signed in there, it returns
   immediately with a one-time code; Society's server exchanges it and sets **its own**
   first-party session cookie. No reliance on third-party cookies.
3. Map the Bridgr user ID to `SessionUser.id`. Society roles (`applicant`, `advisor`,
   `reviewer`, `admin`) live in Society's own membership table — no global role field.
4. Sign-out ends the Society session and calls the central end-session endpoint.
