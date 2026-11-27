import Link from 'next/link';
import { redirect } from 'next/navigation';
import { parseAnswers, complete, answersQuery } from '@/lib/match-params';
import { suggest, type MatchResult } from '@/lib/match';
import { destinationBySlug, fieldBySlug, typeBySlug, levelBySlug } from '@/lib/catalog';
import { PageHero, ProgramCard, Empty } from '@/components/ui';
import { Icon } from '@/components/Icon';
export const metadata = { title: 'Suggested programs', robots: { index: false } };

function Reasons({ x }: { x: MatchResult }){
  return <ul className="reasons">{x.ok.map(r => <li key={r} className="yes"><Icon name="check" /><span>{r}</span></li>)}{x.miss.map(r => <li key={r} className="no"><Icon name="info" /><span>{r}</span></li>)}</ul>;
}
export default async function Results({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }){
  const a = parseAnswers(await searchParams);
  if (!complete(a)) redirect('/match?' + answersQuery(a));
  const { good, near } = suggest(a);
  const summary = [a.dest !== 'any' ? destinationBySlug(a.dest)?.name : 'any destination', a.fields.map(f => fieldBySlug(f)?.name).join(' or '), a.type === 'either' ? 'internship or immersion' : typeBySlug(a.type)?.name.toLowerCase(), 'Mandarin: ' + levelBySlug(a.mandarin)?.name.toLowerCase()].join(' · ');
  return (<>
    <PageHero slim crumbs={[['/', 'Home'], ['/match', 'Help me choose'], ['', 'Suggestions']]} title={good.length ? `${good.length} ${good.length === 1 ? 'program fits' : 'programs fit'} your answers` : 'No exact match yet'} lead={`Based on what you told us: ${summary}.`} />
    <div className="wrap sec">
      <div className="hero-cta ph-acts"><Link className="btn btn-ghost" href={'/match?' + answersQuery(a)}>Change answers</Link><span className="fine">Bookmark this page to come back to these suggestions.</span></div>
      {good.length ? <div className="pgrid mt">{good.map(x => <ProgramCard key={x.program.slug} p={x.program} extra={<Reasons x={x} />} />)}</div>
        : <Empty title="We don’t have a program that fits all your answers" actions={<><Link className="btn btn-primary" href={`/enquire?kind=match${a.dest !== 'any' ? '&destination=' + a.dest : ''}${a.fields[0] ? '&field=' + a.fields[0] : ''}`}>Ask an advisor</Link><Link className="btn btn-ghost" href="/programs">Browse all programs</Link></>}>We won’t stretch a match to fill the page. Tell an advisor what you’re looking for, or see the closest options below.</Empty>}
      {near.length > 0 && <><h2 className="mt">Close, with one difference</h2><p className="sub">Each of these misses one of your answers — shown with an info icon.</p><div className="pgrid mt">{near.map(x => <ProgramCard key={x.program.slug} p={x.program} extra={<Reasons x={x} />} />)}</div></>}
    </div>
  </>);
}
