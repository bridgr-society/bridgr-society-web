import 'server-only';
/* One place that decides what is real, what is preview-only, and what is not
   connected. Read on the server only — nothing here reaches browser code. */

export type DeployEnv = 'production' | 'preview' | 'development';
export function deployEnv(): DeployEnv {
  const v = process.env.VERCEL_ENV;
  if (v === 'production') return 'production';
  if (v === 'preview') return 'preview';
  return process.env.NODE_ENV === 'production' && process.env.SOCIETY_ENV !== 'preview' ? 'production' : (process.env.SOCIETY_ENV === 'preview' ? 'preview' : 'development');
}

/** Preview test-data mode. Impossible in production, whatever the env says. */
export function previewDemoEnabled(): boolean {
  return deployEnv() !== 'production' && process.env.SOCIETY_PREVIEW_DEMO === 'true';
}

export type AuthMode = 'none' | 'preview-demo' | 'bridgr';
export function authMode(): AuthMode {
  if (process.env.BRIDGR_AUTH_ISSUER && process.env.BRIDGR_AUTH_CLIENT_ID) return 'bridgr';   // shared Bridgr identity — adapter pending
  return previewDemoEnabled() ? 'preview-demo' : 'none';
}

export type EnquiryMode = 'webhook' | 'resend' | 'preview-log' | 'none';
export function enquiryMode(): EnquiryMode {
  if (process.env.ENQUIRY_WEBHOOK_URL) return 'webhook';
  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL && process.env.ENQUIRY_FROM_EMAIL) return 'resend';
  return previewDemoEnabled() ? 'preview-log' : 'none';
}

export function sessionSecret(): string | null {
  const s = process.env.SOCIETY_SESSION_SECRET;
  if (s && s.length >= 32) return s;
  if (deployEnv() === 'development') return 'development-only-secret-not-for-deployment-000';
  return null;
}

export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** What the site can honestly offer right now. Pages read this, never env vars directly. */
export function capabilities(){
  const auth = authMode();
  const signIn = auth === 'preview-demo' && !!sessionSecret();
  return {
    env: deployEnv(),
    previewDemo: previewDemoEnabled(),
    signIn,                                   // false until the shared Bridgr identity adapter exists
    applications: signIn,                     // applications need an owner
    enquiries: enquiryMode() !== 'none',
    enquiriesReal: enquiryMode() === 'webhook' || enquiryMode() === 'resend',
    academyHandoff: signIn,
    authPending: auth === 'bridgr'            // configured, but the adapter is not implemented yet
  };
}
export type Capabilities = ReturnType<typeof capabilities>;
