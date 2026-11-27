import Link from 'next/link';
import { notFound } from 'next/navigation';
import { destinations, programTypes } from '@/content/taxonomy';
import { programs } from '@/content/programs';
import { destinationBySlug } from '@/lib/catalog';
import { Crumbs, Scene, ProgramCard } from '@/components/ui';
import { Icon } from '@/components/Icon';
export function generateStaticParams(){ return destinations.map(d => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }){ const d = destinationBySlug((await params).slug); return d ? { title: `${d.name} programs`, description: d.tagline } : {}; }
export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }){
  const d = destinationBySlug((await params).slug); if (!d) notFound();
  const ps = programs.filter(p => p.destination === d.slug);
  return (<>
    <section className="d-hero"><Scene kind={d.scene} photo={d.photo} className="d-hero-img" sizes="100vw" priority /><div className="d-hero-ov"><div className="wrap"><Crumbs items={[['/', 'Home'], ['/destinations', 'Destinations'], ['', d.name]]} /><h1>{d.name}</h1><p className="lead">{d.tagline}</p></div></div></section>
    <div className="wrap detail">
      <div className="detail-main">
        <section><h2>Why {d.name}</h2><p>{d.intro}</p></section>
        <section><h2>Language at work</h2><p className="note"><Icon name="lang" /><span>{d.work}</span></p></section>
        <section><h2>Cities</h2><div className="chips">{d.cities.map(c => <span key={c} className="chip static"><Icon name="pin" />{c}</span>)}</div></section>
        <section><h2>Practical notes</h2><ul className="ticks muted">{d.practical.map(x => <li key={x}><Icon name="info" />{x}</li>)}</ul></section>
      </div>
      <aside className="detail-side"><div className="side-card"><h2 className="h3">Programs in {d.name}</h2>
        <p>{ps.length} sample programs: {programTypes.map(t => `${ps.filter(p => p.type === t.slug).length} ${t.name.toLowerCase()}`).join(', ')}.</p>
        <Link className="btn btn-primary btn-block" href={`/programs?destination=${d.slug}`}>See {d.name} programs</Link><Link className="btn btn-ghost btn-block" href={`/enquire?destination=${d.slug}`}>Ask about {d.name}</Link></div></aside>
    </div>
    <section className="wrap sec"><div className="sec-head"><h2>Sample programs in {d.name}</h2></div><div className="pgrid">{ps.map(p => <ProgramCard key={p.slug} p={p} />)}</div></section>
  </>);
}
