import type { Metadata } from 'next';
import { PublicApplyForm } from '@/components/PublicApplyForm';
import { Crumbs } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { capabilities } from '@/lib/env';
import { programBySlug } from '@/lib/catalog';
import { programOptions, options, GENDERS, ENGLISH, HEARD, COUNTRIES, GRAD_YEARS, NOT_SURE } from '@/lib/applications/public-form';

export const metadata: Metadata = { title: 'Apply', description: 'Apply for a Bridgr Society internship or immersion program in Taiwan, China or Singapore.' };

export default async function Apply({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }){
  const sp = await searchParams, cap = capabilities();
  const one = (k: string) => { const x = sp[k]; return Array.isArray(x) ? x[0] : x ?? ''; };
  const p = programBySlug(one('program'));
  const initial = { program: p?.slug ?? (one('program') === NOT_SURE ? NOT_SURE : ''), destinations: p ? [p.destination] : [], ptype: p?.type ?? '' };
  return (
    <div className="wrap sec ap-wrap">
      <aside className="ap-intro">
        <Crumbs items={[['/', 'Home'], ['', 'Apply']]} />
        <span className="eyebrow">Application form</span>
        <h1>Start your application</h1>
        <p className="lead">Complete the required fields and our team will review your program interests, preferred destination and next steps.</p>
        <ul className="ap-facts">
          <li><Icon name="clock" /><span>Takes about 10 minutes. No account needed.</span></li>
          <li><Icon name="user" /><span>An advisor replies by email, usually within a few working days.</span></li>
          <li><Icon name="pin" /><span>Programs in Taipei, Taichung, Shanghai, Shenzhen and Singapore.</span></li>
        </ul>
        <p className="fine">Programs shown are samples while hosts and terms are confirmed. Applying doesn’t guarantee a placement.</p>
      </aside>
      <div>
        {!cap.enquiries && <p className="note warn"><Icon name="info" /><span><b>Applications aren’t connected yet.</b> This form can’t be sent until delivery is set up.</span></p>}
        <PublicApplyForm enabled={cap.enquiries} previewOnly={cap.enquiries && !cap.enquiriesReal} initial={initial}
          o={{ programs: programOptions(), ...options, genders: GENDERS, english: ENGLISH, heard: HEARD, countries: COUNTRIES, gradYears: GRAD_YEARS }} />
      </div>
    </div>
  );
}
