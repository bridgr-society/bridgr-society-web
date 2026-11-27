import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { programs } from '@/content/programs';
import { programBySlug, placeLine, fieldBySlug, typeBySlug, requirementOf, STATUS, TBC } from '@/lib/catalog';
import { Crumbs, Scene, TypeTag, SampleTag, StatusPill, AcademyBand, ProgramCard, tbc } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { capabilities } from '@/lib/env';

export function generateStaticParams(){ return programs.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = programBySlug((await params).slug); return p ? { title: `${p.title} — ${placeLine(p)}`, description: p.summary } : {};
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }){
  const p = programBySlug((await params).slug); if (!p) notFound();
  const req = requirementOf(p), cap = capabilities();
  const similar = programs.filter(x => x.slug !== p.slug && (x.destination === p.destination || x.field === p.field)).slice(0, 3);
  const canApply = p.status === 'open';
  const primary = canApply
    ? <Link className="btn btn-primary btn-lg btn-block" href={`/apply/${p.slug}`}>Apply now</Link>
    : <Link className="btn btn-primary btn-lg btn-block" href={`/enquire?program=${p.slug}&kind=interest`}>Register interest</Link>;
  return (<>
    <section className="p-hero"><div className="wrap p-hero-in">
      <div><Crumbs items={[['/', 'Home'], ['/programs', 'Programs'], ['', p.title]]} />
        <div className="tags"><TypeTag type={p.type} />{p.sample && <SampleTag />}</div>
        <h1>{p.title}</h1><p className="p-place"><Icon name="pin" />{placeLine(p)} · <Link className="link" href={`/career-fields/${p.field}`}>{fieldBySlug(p.field)!.name}</Link></p>
        <p className="lead">{p.summary}</p></div>
      <div className="p-hero-img"><Scene kind={p.scene} /><span className="img-note">Illustration — placeholder for licensed photography</span></div>
    </div></section>
    <div className="wrap detail">
      <div className="detail-main">
        <nav className="toc" aria-label="On this page">{[['ov', 'Overview'], ['act', 'Activities'], ['lang', 'Language & eligibility'], ['dates', 'Dates'], ['fees', 'Fees'], ['steps', 'How to apply']].map(([h, l]) => <a key={h} href={`#${h}`}>{l}</a>)}</nav>
        <section id="ov"><h2>Overview</h2><p>{p.summary}</p><h3>Who it’s for</h3><p>{p.audience}</p></section>
        <section id="act"><h2>Example activities</h2><ul className="ticks">{p.activities.map(a => <li key={a}><Icon name="check" />{a}</li>)}</ul>
          <h3>What you could take away</h3><ul className="ticks">{p.outcomes.map(a => <li key={a}><Icon name="check" />{a}</li>)}</ul>
          <p className="fine">Activities are examples. Actual tasks depend on the host organisation.</p></section>
        <section id="lang"><h2>Language and eligibility</h2>
          <div className="req-box"><span className={`req-lvl lv-${p.mandarinRequirement}`}><Icon name="lang" />{req.name}</span><p><b>Working language:</b> {p.workingLanguage}</p></div>
          <ul className="ticks">{p.eligibility.map(a => <li key={a}><Icon name="check" />{a}</li>)}</ul>
          {req.rank > 0 ? <AcademyBand compact /> : <p className="note"><Icon name="info" /><span>No Mandarin is required for this program. If you’d like to use the language more while you’re there, <Link className="link" href="/mandarin">Mandarin preparation</Link> is optional.</span></p>}</section>
        <section id="dates"><h2>Duration and dates</h2><dl className="facts"><div><dt>Duration</dt><dd>{p.durationText}</dd></div><div><dt>Intended start</dt><dd>{p.starts.join(', ')}</dd></div><div><dt>Exact dates</dt><dd>{tbc(p.confirmed.dates)}</dd></div></dl></section>
        <section id="fees"><h2>Fees and inclusions</h2><dl className="facts"><div><dt>Program fee</dt><dd>{tbc(p.confirmed.fee)}</dd></div><div><dt>Included</dt><dd>{p.confirmed.inclusions?.join(', ') ?? TBC}</dd></div><div><dt>Host organisation</dt><dd>{tbc(p.confirmed.host)}</dd></div>
          <div><dt>Pay / stipend</dt><dd>Not offered unless confirmed by the host</dd></div><div><dt>Visa, accommodation, credit</dt><dd>Not promised — discuss with an advisor</dd></div></dl></section>
        <section id="steps"><h2>How to apply</h2><ol className="steps compact">{p.steps.map((s, i) => <li key={s}><span className="step-n">{i + 1}</span><p>{s}</p></li>)}</ol></section>
      </div>
      <div className="detail-side"><aside className="side-card" aria-label="Apply or ask">
        <StatusPill status={p.status} />
        <dl className="mini-facts"><div><dt>Type</dt><dd>{typeBySlug(p.type)!.name}</dd></div><div><dt>Where</dt><dd>{placeLine(p)}</dd></div><div><dt>Duration</dt><dd>{p.durationText}</dd></div><div><dt>Starts</dt><dd>{p.starts.join(', ')}</dd></div><div><dt>Fees</dt><dd>{tbc(p.confirmed.fee)}</dd></div><div><dt>Mandarin</dt><dd>{req.name}</dd></div></dl>
        {primary}
        <Link className="btn btn-ghost btn-block" href={`/enquire?program=${p.slug}`}>Ask a question</Link>
        <p className="fine">{canApply ? (cap.applications ? 'Applying uses your Bridgr account so your draft is saved. Applying doesn’t guarantee a place.' : 'Online applications open once Bridgr sign-in is connected. You can register interest now.') : `${STATUS[p.status].label}. No account needed to register interest.`}</p>
      </aside></div>
    </div>
    {similar.length > 0 && <section className="wrap sec"><div className="sec-head"><h2>Similar programs</h2></div><div className="pgrid">{similar.map(x => <ProgramCard key={x.slug} p={x} />)}</div></section>}
    <div className="mobile-cta">{canApply ? <Link className="btn btn-primary btn-block" href={`/apply/${p.slug}`}>Apply now</Link> : <Link className="btn btn-primary btn-block" href={`/enquire?program=${p.slug}&kind=interest`}>Register interest</Link>}</div>
  </>);
}
