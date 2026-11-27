import { notFound } from 'next/navigation';
import { capabilities, enquiryMode, authMode } from '@/lib/env';
import { unresolved } from '@/content/decisions';
import { advanceStatus, resetPreview } from './actions';
import { Icon } from '@/components/Icon';
export const metadata = { title: 'Environment status', robots: { index: false } };
export const dynamic = 'force-dynamic';
/* Not available in production. Shows flags only — never secret values. */
export default async function Status({ searchParams }: { searchParams: Promise<{ msg?: string }> }){
  const c = capabilities(); if (c.env === 'production') notFound();
  const msg = (await searchParams).msg;
  const row = (k: string, v: string, good: boolean) => <div key={k}><dt>{k}</dt><dd><span className={`pill ${good ? 'ok' : 'off'}`}>{v}</span></dd></div>;
  return (
    <div className="wrap sec narrow">
      <h1>Environment status</h1><p className="lead">{c.env} environment. This page is not available in production.</p>
      {msg && <p className="note" role="status"><Icon name="info" /><span>{msg === 'reset' ? 'Preview test data cleared.' : 'Submit an application first.'}</span></p>}
      <dl className="facts mt">{row('Sign-in', authMode() === 'preview-demo' ? 'Preview test identity' : authMode() === 'bridgr' ? 'Bridgr configured — adapter pending' : 'Not connected', c.signIn)}
        {row('Applications', c.applications ? 'Preview test data (signed cookies)' : 'Not connected', c.applications)}
        {row('Enquiries', { webhook: 'Delivered via webhook', resend: 'Delivered via email', 'preview-log': 'Preview — not delivered', none: 'Not connected' }[enquiryMode()], c.enquiriesReal)}
        {row('Academy handoff', c.academyHandoff ? 'Shows payload only — Academy not linked' : 'Not connected', false)}
        {row('Document uploads', 'Not built', false)}</dl>
      {c.previewDemo && <><h2 className="mt">Reviewer controls (preview only)</h2><div className="empty-acts left">
        <form action={advanceStatus}><button className="btn btn-ghost" type="submit">Advance latest application status</button></form>
        <form action={resetPreview}><button className="btn btn-ghost" type="submit">Clear preview applications</button></form></div></>}
      <h2 className="mt">Unresolved production decisions</h2>
      <ol className="decisions">{unresolved.map(([h, p]) => <li key={h}><b>{h}</b><span>{p}</span></li>)}</ol>
    </div>
  );
}
