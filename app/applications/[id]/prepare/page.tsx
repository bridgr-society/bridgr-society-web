import Link from 'next/link';
import { requireApplicant } from '@/lib/applications/guard';
import { APP_STATUS, STEPS } from '@/lib/applications/types';
import { programBySlug, requirementOf, levelBySlug } from '@/lib/catalog';
import { learningGoals } from '@/content/taxonomy';
import { NotConnected } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { openHandoff } from '../../actions';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Prepare with Bridgr Academy', robots: { index: false } };
export default async function Prepare({ params }: { params: Promise<{ id: string }> }){
  const { id } = await params;
  const ctx = await requireApplicant(`/applications/${id}/prepare`);
  if (!ctx) return <NotConnected title="Academy preparation isn’t connected yet" />;
  const a = await ctx.store.get(ctx.user, id);
  if (!a) return <NotConnected title="Application not found">We couldn’t find that application in your account.</NotConnected>;
  const p = programBySlug(a.program)!, lv = levelBySlug(a.data.mandarin);
  return (
    <div className="app-wrap">
      <Link className="back" href={`/applications/${a.id}`}><Icon name="left" />Application</Link>
      <div className="app-head"><h1>Prepare with Bridgr Academy</h1><p>Optional. Choose exactly what Academy can see before you go.</p></div>
      <div className="app-grid"><div className="stack">
        <p className="note ok"><Icon name="check" /><span><b>Your application is saved</b> — {APP_STATUS[a.status].label.toLowerCase()}{a.status === 'draft' ? `, on “${STEPS.find(s => s[0] === a.step)![1]}”` : ''}. You can come straight back to it.</span></p>
        <form className="card form" action={openHandoff}>
          <input type="hidden" name="id" value={a.id} />
          <h2 className="h3">Share with Bridgr Academy (optional)</h2>
          <p className="sub">Ticking these helps Academy suggest relevant lessons. Leave them all unticked to share nothing beyond your account.</p>
          <label className="check"><input type="checkbox" name="level" disabled={!lv} /><span><b>My Mandarin level</b> — {lv ? lv.name : 'not answered yet'} <i>(self-reported, not verified)</i></span></label>
          <fieldset className="field"><legend><b>My learning goals</b></legend><div className="chips">{learningGoals.map(g => <label key={g} className="chip-check"><input type="checkbox" name="goals" value={g} /><span>{g}</span></label>)}</div></fieldset>
          <label className="check"><input type="checkbox" name="req" /><span><b>The program’s language requirement</b> — “{requirementOf(p).name}” (one line, no other program details)</span></label>
          <div className="two-col lists">
            <div><h3 className="h4">Always included</h3><ul className="ticks small"><li><Icon name="check" />Your Bridgr account — the same identity, not a copy</li><li><Icon name="check" />Whether the applicant learning offer can apply: currently <b>not determined</b></li><li><Icon name="check" />A link back to this application</li></ul></div>
            <div><h3 className="h4">Never shared</h3><ul className="ticks small no"><li><Icon name="lock" />Your motivation and other answers</li><li><Icon name="lock" />Documents and advisor notes</li><li><Icon name="lock" />Application status details and program choice</li></ul></div>
          </div>
          <div className="form-foot"><Link className="btn btn-ghost" href={`/applications/${a.id}`}><Icon name="left" />Back to application</Link><span className="spacer" /><button className="btn btn-academy btn-lg" type="submit">Continue to Bridgr Academy</button></div>
          <p className="fine">Bridgr Academy isn’t linked to this site yet. Continuing records your choice and shows what Academy would receive.</p>
        </form></div>
        <aside className="stack"><section className="card"><h2 className="h3">Why Academy?</h2><p>Live Mandarin lessons with tutors, focused on what this program needs. It’s optional and doesn’t affect your application.</p><p className="fine">Lessons don’t guarantee eligibility or a placement.</p></section></aside>
      </div>
    </div>
  );
}
