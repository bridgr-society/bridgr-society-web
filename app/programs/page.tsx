import Link from 'next/link';
import type { Metadata } from 'next';
import { FILTERS, cleanFilters, filterPrograms, filterLabel, toQuery, type FilterKey } from '@/lib/catalog';
import { PageHero, ProgramCard, Empty } from '@/components/ui';
import { AutoSubmitSelect } from '@/components/AutoSubmit';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = { title: 'Programs', description: 'Search internships and immersion programs in Taiwan, China and Singapore by destination, field, type, duration, start and Mandarin level.' };

export default async function Programs({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }){
  const f = cleanFilters(await searchParams);
  const list = filterPrograms(f);
  const active = (Object.keys(f) as FilterKey[]).map(k => [k, f[k]!] as const);
  const without = (k: FilterKey) => { const n = { ...f }; delete n[k]; const q = toQuery(n); return '/programs' + (q ? '?' + q : ''); };
  const nFilters = active.filter(([k]) => k !== 'q').length;
  const controls = FILTERS.map(fl => (
    <label key={fl.key} className="ff"><span>{fl.label}</span>
      <AutoSubmitSelect className="input" name={fl.key} defaultValue={f[fl.key] ?? ''}><option value="">{fl.key === 'mandarin' ? 'Any level' : 'Any'}</option>{fl.options.map(o => <option key={o.slug} value={o.slug}>{o.name}</option>)}</AutoSubmitSelect></label>));
  return (<>
    <PageHero slim crumbs={[['/', 'Home'], ['', 'Programs']]} title="Programs" lead="Internships and immersion programs in Taiwan, China and Singapore. All programs shown are samples until hosts and terms are confirmed." />
    <div className="wrap list-wrap">
      <form className="fbar" action="/programs" method="get" aria-label="Filter programs">
        <label className="ff fsearch"><span>Search</span><span className="fs-in"><Icon name="search" /><input className="input" id="p-q" name="q" type="search" placeholder="Title, city or field" defaultValue={f.q ?? ''} /></span></label>
        <input type="checkbox" id="ftoggle" className="sr ftoggle" aria-controls="fgrid" />
        <label htmlFor="ftoggle" className="btn btn-ghost fsheet-btn"><Icon name="filter" /><span>Filters{nFilters ? ` · ${nFilters}` : ''}</span></label>
        <div className="fgrid" id="fgrid">{controls}</div>
        <div className="fbar-acts"><button className="btn btn-primary" type="submit">Show results</button></div>
      </form>
      <div className="list-meta" role="status"><b>{list.length} {list.length === 1 ? 'program' : 'programs'}</b>
        {active.length > 0 && <span className="chips">{active.map(([k, v]) => <Link key={k} className="chip" href={without(k)} aria-label={`Remove filter: ${filterLabel(k, v)}`}>{filterLabel(k, v)} <Icon name="close" /></Link>)}<Link className="btn btn-text" href="/programs">Clear all</Link></span>}
        <span className="fine">Fees for every sample program are to be confirmed, so prices aren’t compared.</span></div>
      {list.length ? <div className="pgrid">{list.map(p => <ProgramCard key={p.slug} p={p} />)}</div>
        : <Empty title="No programs match all of these filters" actions={<>
            {active.length > 0 && <Link className="btn btn-ghost" href={without(active[active.length - 1][0])}>Remove “{filterLabel(active[active.length - 1][0], active[active.length - 1][1])}”</Link>}
            <Link className="btn btn-primary" href={`/enquire?kind=match&${toQuery(f)}`}>Ask an advisor</Link></>}>Try removing a filter, or tell us what you’re looking for and an advisor will reply.</Empty>}
    </div>
  </>);
}
