import Link from 'next/link';
import { destinations } from '@/content/taxonomy';
import { programs } from '@/content/programs';
import { PageHero, Scene } from '@/components/ui';
export const metadata = { title: 'Destinations' };
export default function Destinations(){
  return (<>
    <PageHero crumbs={[['/', 'Home'], ['', 'Destinations']]} title="Destinations" lead="Each destination works differently — including how much Mandarin you’ll use at work. Start with the place, then find a program." />
    <div className="wrap sec"><ul className="dgrid big">{destinations.map(d => { const n = programs.filter(p => p.destination === d.slug).length;
      return <li key={d.slug}><Link className="dcard" href={`/destinations/${d.slug}`}><Scene kind={d.scene} /><span className="dcard-body"><b>{d.name}</b><i>{d.cities.join(' · ')} · {n} sample {n === 1 ? 'program' : 'programs'}</i><span>{d.tagline}</span></span></Link></li>; })}</ul></div>
  </>);
}
