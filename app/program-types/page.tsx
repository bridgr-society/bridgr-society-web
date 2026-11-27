import Link from 'next/link';
import { programTypes } from '@/content/taxonomy';
import { PageHero } from '@/components/ui';
import { Icon } from '@/components/Icon';
export const metadata = { title: 'Internships vs immersion' };
export default function Types(){
  const rows: [string, string[]][] = [['What it is', programTypes.map(t => t.desc)], ['Typical length', ['8 to 24 weeks', '2 to 4 weeks']], ['You’ll be', ['Working with a host team on real tasks', 'In a small group with visits, workshops and activities']],
    ['Mandarin', ['Set per placement — from none to professional', 'Usually none required; practice built in']], ['Not included', programTypes.map(t => t.not)]];
  return (<>
    <PageHero crumbs={[['/', 'Home'], ['', 'Internships vs immersion']]} title="Internships vs immersion" lead="Two different kinds of experience. Pick the one that matches how much time you have and what you want to come back with." />
    <div className="wrap sec"><div className="cmp" role="table" aria-label="Internships compared with immersion programs">
      <div className="cmp-row head" role="row"><span role="columnheader" /> {programTypes.map(t => <span key={t.slug} role="columnheader"><span className={`type-ic ${t.slug}`}><Icon name={t.slug === 'internship' ? 'brief' : 'globe'} /></span>{t.name}</span>)}</div>
      {rows.map(([h, v]) => <div key={h} className="cmp-row" role="row"><b role="rowheader">{h}</b>{v.map(x => <span key={x} role="cell">{x}</span>)}</div>)}
      <div className="cmp-row" role="row"><span role="cell" />{programTypes.map(t => <span key={t.slug} role="cell"><Link className="btn btn-primary" href={`/programs?type=${t.slug}`}>Browse {t.name.toLowerCase()}s</Link></span>)}</div>
    </div></div>
  </>);
}
