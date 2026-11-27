import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { capabilities } from '@/lib/env';
import { getSession } from '@/lib/auth/session';
import { applicationStore } from '@/lib/applications/store';
import { programBySlug, placeLine, requirementOf, TBC } from '@/lib/catalog';
import { STEPS } from '@/lib/applications/types';
import { stages, goals, mandarinLevels, mandarinRequirements } from '@/content/taxonomy';
import { NotConnected } from '@/components/ui';
import { ApplyForm } from '@/components/ApplyForm';
import { Icon } from '@/components/Icon';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Application', robots: { index: false } };

export default async function ApplyStep({ params }: { params: Promise<{ slug: string; step: string }> }){
  const { slug, step } = await params, p = programBySlug(slug); if (!p) notFound();
  const cap = capabilities(); if (!cap.applications || step === 'closed') return <NotConnected title="Online applications aren’t open yet" pending={cap.authPending} />;
  const user = await getSession(); if (!user) redirect(`/account?next=/apply/${slug}`);
  const app = (await applicationStore().list(user)).find(a => a.program === slug);
  if (!app) redirect(`/apply/${slug}`);
  if (step === 'submitted'){
    if (app.status === 'draft') redirect(`/apply/${slug}/${app.step}`);
    return <div className="app-wrap"><div className="card done-card">
      <span className="done-ic"><Icon name="check" /></span><h1>Application submitted</h1>
      <p className="lead">Your application for <b>{p.title}</b> ({placeLine(p)}) has been submitted for review.</p>
      <p className="note"><Icon name="info" /><span>This isn’t an offer or a confirmed placement. An advisor will contact you to talk it through.{user.source === 'preview-demo' && ' (Preview: test data — no one will contact you.)'}</span></p>
      <div className="empty-acts"><Link className="btn btn-primary" href={`/applications/${app.id}`}>Go to my application</Link><Link className="btn btn-ghost" href="/programs">Explore more programs</Link></div></div></div>;
  }
  if (app.status !== 'draft') redirect(`/applications/${app.id}`);
  if (step !== app.step) redirect(`/apply/${slug}/${app.step}`);   // steps unlock in order; the saved step is the source of truth
  const ci = STEPS.findIndex(s => s[0] === step);
  return (
    <div className="app-wrap">
      <Link className="back" href={`/programs/${slug}`}><Icon name="left" />Back to program</Link>
      <div className="app-head"><h1>Apply: {p.title}</h1><p>{placeLine(p)}{p.sample ? ' · Sample program' : ''} · Draft saved to your {user.source === 'preview-demo' ? 'preview test account' : 'Bridgr account'}</p></div>
      <ol className="stepper" aria-label="Application steps">{STEPS.map(([k, l], i) => <li key={k} className={i < ci ? 'is-done' : i === ci ? 'now' : ''} aria-current={i === ci ? 'step' : undefined}><span>{i < ci ? <Icon name="check" /> : i + 1}</span><b>{l}</b></li>)}</ol>
      <div className="app-grid">
        <ApplyForm app={app} program={{ slug: p.slug, title: p.title, place: placeLine(p), durationText: p.durationText, starts: p.starts, reqRank: requirementOf(p).rank, reqName: requirementOf(p).name, sample: p.sample }}
          stages={stages} goals={goals} levels={mandarinLevels} reqs={mandarinRequirements} />
        <aside className="side-card slim"><h2 className="h3">{p.title}</h2><p className="sub">{placeLine(p)}</p>
          <dl className="mini-facts"><div><dt>Duration</dt><dd>{p.durationText}</dd></div><div><dt>Mandarin</dt><dd>{requirementOf(p).name}</dd></div><div><dt>Fees</dt><dd>{p.confirmed.fee ?? TBC}</dd></div></dl>
          <p className="fine"><Icon name="lock" /> Your answers are seen by Society advisors only — not by Bridgr Academy or Connect.</p></aside>
      </div>
    </div>
  );
}
