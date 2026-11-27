import Link from 'next/link';
import { PageHero, Faq } from '@/components/ui';
import { Icon } from '@/components/Icon';
export const metadata = { title: 'How it works' };
const STEPS: [string, string, string?, string?][] = [
  ['Explore', 'Browse programs by destination, field and type, or use Help me choose. No account needed.', '/programs', 'Explore programs'],
  ['Apply or register interest', 'Open programs take an application, saved as a draft with your Bridgr account. Programs that aren’t open yet take a short interest form.'],
  ['Speak with an advisor', 'An advisor reviews your goals and talks through fit, timing, language and practical questions like visas and housing.'],
  ['Placement or place confirmed', 'Hosts decide. If you’re offered a place, you’ll get the details — dates, fees, inclusions — in writing before you commit.'],
  ['Prepare to go', 'Work through your preparation checklist. Mandarin lessons through Bridgr Academy are optional.', '/mandarin', 'Mandarin preparation']];
export default function How(){
  return (<>
    <PageHero crumbs={[['/', 'Home'], ['', 'How it works']]} title="How it works" lead="A clear, step-by-step process. Nothing is confirmed until a host offers a place in writing." />
    <div className="wrap sec narrow">
      <ol className="timeline">{STEPS.map(([h, p, href, l], i) => <li key={h}><span className="step-n">{i + 1}</span><div><h2 className="h3">{h}</h2><p>{p}</p>{href && <Link className="link" href={href}>{l} <Icon name="right" /></Link>}</div></li>)}</ol>
      <h2 className="mt">Eligibility at a glance</h2>
      <ul className="ticks"><li><Icon name="check" />Students and early-career professionals (each program says who it’s for)</li><li><Icon name="check" />Language requirements are specific to each program</li><li><Icon name="check" />Visa, work-authorisation and insurance requirements depend on your nationality — confirmed with an advisor</li></ul>
      <h2 className="mt">FAQ</h2><Faq />
    </div>
  </>);
}
