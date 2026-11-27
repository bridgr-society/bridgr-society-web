import { PageHero } from '@/components/ui';
import { EnquiryForm } from '@/components/EnquiryForm';
import { programs } from '@/content/programs';
import { stages } from '@/content/taxonomy';
import { programBySlug, placeLine, cleanFilters, filterLabel, type FilterKey } from '@/lib/catalog';
import { capabilities } from '@/lib/env';
import { Icon } from '@/components/Icon';
export const metadata = { title: 'Ask a question or register interest' };
export default async function Enquire({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }){
  const sp = await searchParams, cap = capabilities();
  const one = (k: string) => { const x = sp[k]; return Array.isArray(x) ? x[0] : x ?? ''; };
  const p = programBySlug(one('program'));
  const kind = ['interest', 'match', 'question'].includes(one('kind')) ? one('kind') : 'question';
  const f = cleanFilters(sp);
  const context = (Object.keys(f) as FilterKey[]).map(k => filterLabel(k, f[k]!)).join(', ');
  const title = kind === 'interest' ? 'Register interest' : kind === 'match' ? 'Ask an advisor to help' : 'Ask a question';
  return (<>
    <PageHero slim crumbs={[['/', 'Home'], ['', title]]} title={title} lead={kind === 'interest' ? 'We’ll let you know when applications open. No account needed.' : 'We reply by email. No account needed.'} />
    <div className="wrap sec narrow">
      {!cap.enquiries && <p className="note warn"><Icon name="info" /><span><b>This form isn’t connected yet.</b> Enquiry delivery hasn’t been set up for this site, so the form can’t be sent.</span></p>}
      {p && <p className="note"><Icon name="info" /><span>About: {p.title} — {placeLine(p)}{p.sample ? ' (sample program)' : ''}.</span></p>}
      <EnquiryForm enabled={cap.enquiries} previewOnly={cap.enquiries && !cap.enquiriesReal}
        initial={{ kind, program: p?.slug ?? '', name: '', email: '', stage: '', message: context ? `I couldn’t find a program matching: ${context}.` : '', context, consent: '' }}
        programs={programs.map(x => ({ slug: x.slug, label: `${x.title} — ${placeLine(x)}${x.sample ? ' (sample)' : ''}` }))} stages={stages} />
    </div>
  </>);
}
