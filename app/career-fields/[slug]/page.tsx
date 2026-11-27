import Link from 'next/link';
import { notFound } from 'next/navigation';
import { careerFields } from '@/content/taxonomy';
import { programs } from '@/content/programs';
import { fieldBySlug } from '@/lib/catalog';
import { PageHero, ProgramCard, Empty } from '@/components/ui';
import { Icon, type IconName } from '@/components/Icon';
export function generateStaticParams(){ return careerFields.map(f => ({ slug: f.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }){ const f = fieldBySlug((await params).slug); return f ? { title: `${f.name} programs` } : {}; }
export default async function FieldPage({ params }: { params: Promise<{ slug: string }> }){
  const f = fieldBySlug((await params).slug); if (!f) notFound();
  const ps = programs.filter(p => p.field === f.slug);
  return (<>
    <PageHero crumbs={[['/', 'Home'], ['/career-fields', 'Career fields'], ['', f.name]]} title={f.name} lead={`${f.blurb} Language requirements differ by host.`}><span className="field-ic big"><Icon name={f.icon as IconName} /></span></PageHero>
    <section className="wrap sec">
      <div className="hero-cta ph-acts"><Link className="btn btn-primary" href={`/programs?field=${f.slug}`}>See {f.name.toLowerCase()} programs</Link><Link className="btn btn-ghost" href="/match">Help me choose</Link></div>
      {ps.length ? <div className="pgrid mt">{ps.map(p => <ProgramCard key={p.slug} p={p} />)}</div>
        : <Empty title="No sample programs in this field yet" actions={<Link className="btn btn-primary" href={`/enquire?kind=interest&field=${f.slug}`}>Register interest</Link>}>Tell us what you’re looking for and we’ll let you know if something comes up.</Empty>}
    </section>
  </>);
}
