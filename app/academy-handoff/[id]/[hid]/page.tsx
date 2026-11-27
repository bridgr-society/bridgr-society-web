import Link from 'next/link';
import { requireApplicant } from '@/lib/applications/guard';
import { buildHandoffPayload } from '@/lib/handoff';
import { programBySlug, fieldBySlug, TBC } from '@/lib/catalog';
import { applicantOffer } from '@/content/offer';
import { NotConnected, LogoMark } from '@/components/ui';
import { Icon } from '@/components/Icon';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Bridgr Academy handoff', robots: { index: false } };
/* What Academy WOULD receive. There is no live Academy integration yet; this page
   never claims one. The payload is built by lib/handoff.ts (minimum information only). */
export default async function Handoff({ params }: { params: Promise<{ id: string; hid: string }> }){
  const { id, hid } = await params;
  const ctx = await requireApplicant(`/applications/${id}`);
  if (!ctx) return <NotConnected title="Academy preparation isn’t connected yet" />;
  const a = await ctx.store.get(ctx.user, id), h = a?.handoffs.find(x => x.id === hid);
  if (!a || !h) return <NotConnected title="Not found">We couldn’t find that handoff in your account.</NotConnected>;
  const payload = buildHandoffPayload(a, h.revoked ? { level: false, goals: [], req: false } : h.share);
  const p = programBySlug(a.program)!;
  const focus = [...(payload.learningGoals?.length ? payload.learningGoals : ['Workplace introductions']), ...(payload.languageRequirement ? [`${fieldBySlug(p.field)!.name} vocabulary`] : [])];
  return (
    <div className="wrap sec">
      <p className="note warn"><Icon name="info" /><span><b>Bridgr Academy isn’t connected yet.</b> This page shows exactly what Academy would receive and how the return journey works. When the shared Bridgr account is live, this step opens Academy on its own website, already signed in.</span></p>
      <div className="ac-frame" aria-label="What Bridgr Academy would show">
        <div className="ac-bar"><span className="dots"><i /><i /><i /></span><span className="ac-url"><Icon name="lock" />Bridgr Academy — not yet connected</span></div>
        <div className="ac-body">
          <div className="ac-head"><LogoMark size={28} /><b>Bridgr <span>Academy</span></b><span className="ac-who">{ctx.user.name} · same Bridgr account</span></div>
          <h1>Prepare your Mandarin for your experience</h1>
          <p className="lead">No new registration — Academy would use your Bridgr account and keep its learning records separate from your Society application.</p>
          <div className="ac-grid">
            <section className="ac-card"><h2 className="h3">What Academy would receive</h2><ul className="ticks small">
              {payload.mandarinLevel && <li><Icon name="check" />Mandarin level: {payload.mandarinLevel}</li>}
              {payload.learningGoals && <li><Icon name="check" />Goals: {payload.learningGoals.join(', ')}</li>}
              {payload.languageRequirement && <li><Icon name="check" />Requirement: {payload.languageRequirement}</li>}
              <li><Icon name="check" />Applicant offer: not determined</li><li><Icon name="check" />A return link to your Society application</li></ul>
              {h.revoked && <p className="fine">You stopped sharing — only your account would be known.</p>}</section>
            <section className="ac-card"><h2 className="h3">Suggested focus</h2><ul className="ticks small">{focus.map(x => <li key={x}><Icon name="spark" />{x}</li>)}</ul><p className="fine">A suggestion, not a requirement.</p></section>
            <section className="ac-card offer"><h2 className="h3">{applicantOffer.label}</h2><p>We’re planning an offer for some Society applicants. Not every applicant may qualify.</p>
              <dl className="facts"><div><dt>Your eligibility</dt><dd>Not determined — terms undecided</dd></div><div><dt>Amount</dt><dd>{applicantOffer.amount ?? TBC}</dd></div><div><dt>Valid until</dt><dd>{applicantOffer.validity ?? TBC}</dd></div></dl>
              <button className="btn btn-ghost" disabled><Icon name="lock" />Offer not active yet</button></section>
          </div>
          <div className="ac-acts"><Link className="btn btn-text" href="/mandarin#offer">View applicant learning offer</Link><Link className="btn btn-primary" href={payload.returnPath}><Icon name="left" />Continue my application</Link></div>
        </div>
      </div>
    </div>
  );
}
