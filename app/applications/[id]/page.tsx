import Link from 'next/link';
import { requireApplicant, fmtDate } from '@/lib/applications/guard';
import { APP_STATUS, type AppStatus, type Application } from '@/lib/applications/types';
import { programBySlug, placeLine, destinationBySlug, levelBySlug } from '@/lib/catalog';
import { NotConnected, AcademyBand } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { toggleCheck, revokeHandoff } from '../actions';
import { sharedSummary } from '@/lib/applications/types';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Application', robots: { index: false } };

export default async function AppDetail({ params }: { params: Promise<{ id: string }> }){
  const { id } = await params;
  const ctx = await requireApplicant(`/applications/${id}`);
  if (!ctx) return <NotConnected title="Applications aren’t available yet" />;
  const a = await ctx.store.get(ctx.user, id);
  if (!a) return <NotConnected title="Application not found">We couldn’t find that application in your account.</NotConnected>;
  const p = programBySlug(a.program)!, st = APP_STATUS[a.status], order: AppStatus[] = ['draft', 'submitted', 'review', 'action'], cur = order.indexOf(a.status);
  const Tick = ({ k, label }: { k: keyof Application['checks']; label?: string }) => <form action={toggleCheck} className="inline-form"><input type="hidden" name="id" value={a.id} /><input type="hidden" name="k" value={k} /><button className="btn btn-text btn-sm" type="submit" aria-pressed={a.checks[k]}>{a.checks[k] ? 'Undo' : label ?? 'Mark done'}</button></form>;
  const Item = ({ done, label, note, act }: { done: boolean; label: string; note?: string; act?: React.ReactNode }) => <li className={done ? 'is-done' : ''}><span className="ck">{done && <Icon name="check" />}</span><span><b>{label}</b>{note && <i>{note}</i>}</span>{act}</li>;
  return (
    <div className="app-wrap">
      <Link className="back" href="/applications"><Icon name="left" />My applications</Link>
      <div className="app-head"><h1>{p.title}</h1><p>{placeLine(p)} · {a.id}{p.sample ? ' · sample program' : ''}</p></div>
      <div className="app-grid">
        <div className="stack">
          <section className="card"><h2 className="h3">Status</h2>
            <ol className="status-line">{order.map((s, i) => <li key={s} className={cur > i ? 'is-done' : s === a.status ? 'now' : ''} aria-current={s === a.status ? 'step' : undefined}><span /><b>{APP_STATUS[s].label}</b></li>)}</ol>
            <div className="next-box"><span className={`app-st ${st.cls}`}>{st.label}</span><p><b>Next required action:</b> {st.next}</p>{a.status === 'draft' && <Link className="btn btn-primary" href={`/apply/${p.slug}/${a.step}`}>Continue my application</Link>}</div>
            <p className="fine">Submitted, under review or next step needed — none of these mean a place is confirmed.</p></section>
          <section className="card"><h2 className="h3">Preparation checklist</h2><ul className="checklist">
            <Item done={a.status !== 'draft'} label="Submit your application" note={a.status !== 'draft' ? 'Done' : 'Required'} act={a.status === 'draft' ? <Link className="btn btn-text btn-sm" href={`/apply/${p.slug}/${a.step}`}>Continue</Link> : undefined} />
            <Item done={a.status === 'action' && a.checks.call} label="Speak with an advisor" note={a.status === 'action' ? 'Your next step — request a call' : 'After submission'} act={a.status === 'action' ? <Tick k="call" label="Request call" /> : undefined} />
            <Item done={a.checks.cv} label="Update your CV" note="Your own tracking" act={<Tick k="cv" />} />
            <Item done={a.checks.passport} label="Check your passport’s validity" note="Visa requirements are to be confirmed" act={<Tick k="passport" />} />
            <Item done={a.checks.practical} label={`Read ${destinationBySlug(p.destination)!.name} practical notes`} act={<><Link className="btn btn-text btn-sm" href={`/destinations/${p.destination}`}>Open</Link><Tick k="practical" /></>} />
            <Item done={a.handoffs.some(h => !h.revoked)} label="Optional: Mandarin preparation with Bridgr Academy" note="Not required" act={<Link className="btn btn-text btn-sm academy-link" href={`/applications/${a.id}/prepare`}>Explore</Link>} />
          </ul></section>
          <section className="card"><h2 className="h3">Your answers</h2><dl className="review compact">{([['Stage', a.data.stage], ['Field or role', a.data.study], ['Goals', a.data.goals.join(', ')], ['Preferred start', a.data.start], ['Mandarin (self-reported)', levelBySlug(a.data.mandarin)?.name ?? '']] as [string, string][]).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v || '—'}</dd></div>)}</dl></section>
        </div>
        <aside className="stack">
          <AcademyBand compact lessonsHref={`/applications/${a.id}/prepare`} offerHref={`/applications/${a.id}/prepare`} />
          <section className="card"><h2 className="h3">Shared with other Bridgr products</h2>
            {a.handoffs.length ? <ul className="share-log">{a.handoffs.map(h => <li key={h.id}><b>Bridgr Academy · {fmtDate(h.at)}</b><span>{sharedSummary(h)}</span>
              {h.revoked ? <i>Stopped</i> : <form action={revokeHandoff}><input type="hidden" name="id" value={a.id} /><input type="hidden" name="hid" value={h.id} /><button className="btn btn-text btn-sm" type="submit">Stop sharing</button></form>}</li>)}</ul>
              : <p className="soft">Nothing. Your application stays with Society.</p>}</section>
          <section className="card"><h2 className="h3">History</h2><ul className="hist">{a.history.slice().reverse().map((h, i) => <li key={i}><b>{fmtDate(h.at)}</b><span>{h.text}</span></li>)}</ul></section>
        </aside>
      </div>
    </div>
  );
}
