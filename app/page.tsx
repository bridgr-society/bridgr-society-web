import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/content/programs';
import { destinations, programTypes } from '@/content/taxonomy';
import { ProgramCard, Scene, Tag, AcademyBand, Faq } from '@/components/ui';
import { Finder } from '@/components/Finder';
import { Icon } from '@/components/Icon';

export default function Home(){
  const featured = programs.filter(p => p.featured);
  return (<>
    <section className="hero hero-photo">
      <Image className="hero-bg" src="/images/hero-taipei.webp" alt="Three young professionals working together at a table in a bright Taipei office, with the city skyline in the window" fill priority sizes="100vw" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-in">
        <div className="hero-copy">
          <span className="eyebrow">Internships &amp; immersion · Taiwan · China · Singapore</span>
          <h1>Build your skills. <span>Experience a new working world.</span></h1>
          <p className="lead">Professional placements and short immersion programs for students and early-career professionals — with real chances to use and grow your Mandarin, at the level each program needs.</p>
          <div className="hero-cta"><Link className="btn btn-primary btn-xl" href="/programs">Explore programs <Icon name="right" /></Link><Link className="btn btn-ghost btn-xl" href="/match">Help me choose</Link></div>
          <p className="fine"><Tag>Sample programs</Tag> Programs shown are examples. Dates, fees and hosts are to be confirmed.</p>
        </div>
        <div className="hero-floats" aria-hidden="true">
          <div className="float-card fc1"><b>Marketing Internship</b><i>Taipei · 8–12 weeks</i></div>
          <div className="float-card fc2"><b>Mandarin: basic helpful</b><i>Requirements set per program</i></div>
        </div>
      </div>
    </section>

    <section className="band finder-band" aria-labelledby="pf-h"><div className="wrap">
      <div className="sec-head"><span className="eyebrow">Program finder</span><h2 id="pf-h">Find a program that fits your goals</h2></div>
      <Finder />
    </div></section>

    <section className="wrap sec" aria-labelledby="d-h">
      <div className="sec-head row"><div><span className="eyebrow">Destinations</span><h2 id="d-h">Three places, three ways of working</h2></div><Link className="link" href="/destinations">All destinations <Icon name="right" /></Link></div>
      <ul className="dgrid">{destinations.map(d => <li key={d.slug}><Link className="dcard" href={`/destinations/${d.slug}`}><Scene kind={d.scene} photo={d.photo} /><span className="dcard-body"><b>{d.name}</b><i>{d.cities.join(' · ')}</i><span>{d.tagline}</span></span></Link></li>)}</ul>
    </section>

    <section className="wrap sec" aria-labelledby="fp-h">
      <div className="sec-head row"><div><span className="eyebrow">Featured</span><h2 id="fp-h">Sample programs</h2></div><Link className="link" href="/programs">View all programs <Icon name="right" /></Link></div>
      <div className="pgrid">{featured.map(p => <ProgramCard key={p.slug} p={p} />)}</div>
    </section>

    <section className="band tint" aria-labelledby="t-h"><div className="wrap">
      <div className="sec-head"><span className="eyebrow">Two ways to go</span><h2 id="t-h">Internship or immersion?</h2></div>
      <div className="two">{programTypes.map(t => <article key={t.slug} className="type-card"><span className={`type-ic ${t.slug}`}><Icon name={t.slug === 'internship' ? 'brief' : 'globe'} /></span><h3>{t.name}s</h3><p className="sub">{t.short}</p><p>{t.desc}</p><p className="fine">{t.not}</p>
        <Link className="btn btn-ghost" href={`/programs?type=${t.slug}`}>Browse {t.name.toLowerCase()}s <Icon name="right" /></Link></article>)}</div>
      <p className="center"><Link className="link" href="/program-types">Compare the two in detail</Link></p>
    </div></section>

    <section className="wrap sec" aria-labelledby="hw-h">
      <div className="sec-head"><span className="eyebrow">How it works</span><h2 id="hw-h">From first click to first day</h2></div>
      <ol className="steps">{[['Explore', 'Browse programs or answer a few questions to see suggestions.'], ['Apply or register interest', 'Tell us about yourself and the program you want.'], ['Speak with an advisor', 'We review your goals and talk through fit, timing and requirements.'], ['Prepare to go', 'Work through your checklist. Mandarin preparation is optional.']]
        .map(([h, p], i) => <li key={h}><span className="step-n">{i + 1}</span><h3>{h}</h3><p>{p}</p></li>)}</ol>
      <p className="fine center">Applying doesn’t guarantee a placement. Places are confirmed by hosts, in writing.</p>
    </section>

    <section className="wrap sec"><AcademyBand /></section>

    <section className="wrap sec narrow" aria-labelledby="faq-h"><div className="sec-head"><span className="eyebrow">FAQ</span><h2 id="faq-h">Good questions to ask first</h2></div><Faq /></section>

    <section className="band grad-band"><div className="wrap cta-row">
      <div><h2>Not sure where to start?</h2><p>Ask us anything about programs, timing or language requirements. No account needed.</p></div>
      <div className="cta-acts"><Link className="btn btn-white btn-lg" href="/enquire">Ask a question</Link><Link className="btn btn-outline-white btn-lg" href="/match">Help me choose</Link></div>
    </div></section>
  </>);
}
