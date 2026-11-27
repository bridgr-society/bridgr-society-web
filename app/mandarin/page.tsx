import Link from 'next/link';
import { PageHero, tbc } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { applicantOffer } from '@/content/offer';
import { getSession } from '@/lib/auth/session';
import { capabilities } from '@/lib/env';
import { applicationStore } from '@/lib/applications/store';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Mandarin preparation' };
export default async function Mandarin(){
  const user = await getSession();
  const app = user && capabilities().applications ? (await applicationStore().list(user))[0] : null;
  return (<>
    <PageHero className="academy-hero" crumbs={[['/', 'Home'], ['', 'Mandarin preparation']]} title="Prepare your Mandarin, at your own pace"
      lead="Bridgr Academy is Bridgr’s language-learning product. With the same Bridgr account you’ll be able to book live lessons focused on what you’ll actually need at work."><span className="ac-tag"><Icon name="book" />With Bridgr Academy</span></PageHero>
    <div className="wrap sec narrow">
      <div className="three">{[['Workplace introductions', 'Introduce yourself, your role and your goals with confidence.'], ['Everyday conversation', 'Get around, order food and chat with colleagues.'], ['Industry vocabulary', 'Key terms for marketing, business, design, tech or finance.']].map(([h, p]) => <div key={h} className="mini-card"><h3>{h}</h3><p>{p}</p></div>)}</div>
      <h2 className="mt">Optional — and honest about what it means</h2>
      <ul className="ticks"><li><Icon name="check" />Academy lessons are optional for every program.</li><li><Icon name="check" />Where a program has a language requirement, you can meet it however you like — you don’t need to buy our lessons.</li>
        <li><Icon name="check" />Your self-assessed level is kept separate from any verified readiness check, and completing lessons doesn’t guarantee eligibility or a placement.</li></ul>
      <section id="offer" className="offer-card" aria-labelledby="of-h"><span className="ac-tag"><Icon name="spark" />Applicant learning offer</span><h2 id="of-h">{applicantOffer.label}</h2>
        <p>We’re planning a learning offer for some Society applicants. Eligibility, amount and validity haven’t been decided, so not every applicant may qualify.</p>
        <dl className="facts"><div><dt>Status</dt><dd><span className="pill off"><Icon name="lock" />Not active</span></dd></div><div><dt>Amount</dt><dd>{tbc(applicantOffer.amount)}</dd></div><div><dt>Who’s eligible</dt><dd>{tbc(applicantOffer.eligibility)}</dd></div><div><dt>Valid until</dt><dd>{tbc(applicantOffer.validity)}</dd></div></dl>
        <button className="btn btn-ghost" disabled>Offer not available yet</button></section>
      <p className="note mt"><Icon name="info" /><span>Bridgr Academy isn’t linked to this site yet. When it is, “Explore Mandarin lessons” will open Academy with your Bridgr account — no new registration.</span></p>
      <div className="ac-acts mt">{app ? <Link className="btn btn-primary" href={`/applications/${app.id}`}>Continue my application</Link> : <Link className="btn btn-primary" href="/programs">Browse programs</Link>}<Link className="btn btn-ghost" href="/enquire?kind=question">Ask about Mandarin preparation</Link></div>
    </div>
  </>);
}
