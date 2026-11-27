import { PageHero } from '@/components/ui';
export const metadata = { title: 'About' };
export default function About(){
  return (<>
    <PageHero crumbs={[['/', 'Home'], ['', 'About']]} title="About Bridgr Society" lead="Bridgr Society helps students and early-career professionals gain work and cultural experience in Taiwan, China and Singapore." />
    <div className="wrap sec narrow">
      <p>Society is part of the Bridgr family. Each product has its own website and purpose, and one Bridgr account is planned to work across all of them.</p>
      <ul className="family">{[['Bridgr Global', 'The parent brand.', ''], ['Bridgr Academy', 'Language and skills learning — including Mandarin preparation for Society applicants.', 'academy'], ['Bridgr Society', 'Internships and immersion programs.', 'society'], ['Bridgr Connect', 'Business matching for startups, investors and advisors.', '']]
        .map(([n, d, c]) => <li key={n} className={c}><b>{n}</b><span>{d}</span></li>)}</ul>
      <h2 className="mt">One account, separate products</h2>
      <p>Your basic profile — name, photo and contact details — will be shared across Bridgr products. Everything else stays with the product it belongs to: your Society application isn’t visible to Academy tutors, and your Academy learning notes aren’t visible to Society staff. When something does need to move between products, we ask you first.</p>
    </div>
  </>);
}
