import Link from 'next/link';
import { careerFields } from '@/content/taxonomy';
import { programs } from '@/content/programs';
import { PageHero } from '@/components/ui';
import { Icon, type IconName } from '@/components/Icon';
export const metadata = { title: 'Career fields' };
export default function Fields(){
  return (<>
    <PageHero crumbs={[['/', 'Home'], ['', 'Career fields']]} title="Career fields" lead="Categories to help you browse. They describe the kind of work, not confirmed vacancies." />
    <div className="wrap sec"><ul className="fgrid-cards">{careerFields.map(f => { const n = programs.filter(p => p.field === f.slug).length;
      return <li key={f.slug}><Link className="field-card" href={`/career-fields/${f.slug}`}><span className="field-ic"><Icon name={f.icon as IconName} /></span><b>{f.name}</b><span>{f.blurb}</span><i>{n} sample {n === 1 ? 'program' : 'programs'}</i></Link></li>; })}</ul></div>
  </>);
}
