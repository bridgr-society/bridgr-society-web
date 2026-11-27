import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { sceneSvg, SCENES } from './scenes';
import type { Program, Photo } from '@/content/types';
import { faqs } from '@/content/taxonomy';
import { STATUS, TBC, placeLine, fieldBySlug, typeBySlug, requirementOf } from '@/lib/catalog';

/* ---------- brand ---------- */
export function LogoMark({ size = 30 }: { size?: number }){
  return (
    <svg width={size} height={size} viewBox="0 0 112 112" fill="none" aria-hidden="true">
      <rect width="112" height="112" rx="9" fill="#006CFF" />
      <mask id="bridgr-mark" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="17" y="42" width="95" height="70"><path d="M111.43 42.6H17.2v68.9h94.23z" fill="#fff" /></mask>
      <g mask="url(#bridgr-mark)"><path d="M17.2 63.9h16.7v17.3c5.5-12.6 14.8-17.3 30.5-17.3h117.5v16.8c-3.1-.2-117.1-.3-119.3-.3-18.4 0-28 9.7-28 27.7v38.6H17.2z" fill="#fff" /><path d="M181.9 59.2V42.5H17.2v16.7z" fill="#fff" /></g>
    </svg>
  );
}
export const Brand = () => <Link className="brand" href="/" aria-label="Bridgr Society home"><LogoMark /><span className="brand-name">Bridgr <b>Society</b></span></Link>;

/* ---------- small pieces ---------- */
export function Scene({ kind, className = '', photo, sizes = '(max-width: 700px) 100vw, 33vw', priority }: { kind: string; className?: string; photo?: Photo; sizes?: string; priority?: boolean }){
  if (photo) return <figure className={`scene photo ${className}`}><Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} /></figure>;
  const alt = (SCENES as Record<string, { alt: string }>)[kind]?.alt ?? 'Illustration';
  return <figure className={`scene ${className}`} role="img" aria-label={alt}><span aria-hidden="true" dangerouslySetInnerHTML={{ __html: sceneSvg(kind) }} /></figure>;
}
export const Tag = ({ children }: { children: ReactNode }) => <span className="demo-tag"><Icon name="info" size={13} />{children}</span>;
export const SampleTag = () => <span className="sample-tag">Sample program</span>;
export const StatusPill = ({ status }: { status: Program['status'] }) => <span className={`status ${STATUS[status].cls}`}>{STATUS[status].label}</span>;
export const TypeTag = ({ type }: { type: Program['type'] }) => <span className={`ptype-tag ${type}`}>{typeBySlug(type)!.name}</span>;
export const tbc = (v: string | null | undefined) => v ?? TBC;

export function Crumbs({ items }: { items: [string, string][] }){
  return <nav className="crumbs" aria-label="Breadcrumb"><ol>{items.map(([href, label], i) => i === items.length - 1
    ? <li key={label} aria-current="page">{label}</li> : <li key={label}><Link href={href}>{label}</Link></li>)}</ol></nav>;
}
export function PageHero({ crumbs, title, lead, slim, children, className = '' }: { crumbs?: [string, string][]; title: ReactNode; lead?: ReactNode; slim?: boolean; children?: ReactNode; className?: string }){
  return <section className={`page-hero ${slim ? 'slim' : ''} ${className}`}><div className="wrap">{crumbs && <Crumbs items={crumbs} />}{children && <div className="ph-top">{children}</div>}<h1>{title}</h1>{lead && <p className="lead">{lead}</p>}</div></section>;
}

export function ProgramCard({ p, extra }: { p: Program; extra?: ReactNode }){
  const f = fieldBySlug(p.field)!;
  return (
    <article className="pcard">
      <Link className="pcard-img" href={`/programs/${p.slug}`} tabIndex={-1} aria-hidden="true"><Scene kind={p.scene} photo={p.photo} /><TypeTag type={p.type} /></Link>
      <div className="pcard-body">
        <div className="pcard-top">{p.sample && <SampleTag />}<StatusPill status={p.status} /></div>
        <h3><Link href={`/programs/${p.slug}`}>{p.title}</Link></h3>
        <p className="pcard-place"><Icon name="pin" /><span>{placeLine(p)}</span></p>
        <ul className="pcard-facts">
          <li><Icon name={f.icon as IconName} /><span>{f.name}</span></li>
          <li><Icon name="clock" /><span>{p.durationText} · {p.starts.join(', ')}</span></li>
          <li><Icon name="lang" /><span>{p.workingLanguage} · <b>{requirementOf(p).name}</b></span></li>
        </ul>
        {extra}
        <Link className="btn btn-ghost btn-block" href={`/programs/${p.slug}`}>View program <Icon name="right" /></Link>
      </div>
    </article>
  );
}

export function Faq(){
  return <div className="faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}<Icon name="right" /></summary><p>{a}</p></details>)}</div>;
}

/* The only place Academy purple appears on public pages. */
export function AcademyBand({ compact, lessonsHref = '/mandarin', offerHref = '/mandarin#offer' }: { compact?: boolean; lessonsHref?: string; offerHref?: string }){
  return (
    <aside className={`academy${compact ? ' compact' : ''}`} aria-label="Mandarin preparation with Bridgr Academy">
      <div className="ac-copy"><span className="ac-tag"><Icon name="book" />Bridgr Academy</span>
        <h2>Not confident in Mandarin yet?</h2>
        <p>Prepare for your experience with Bridgr Academy — live lessons focused on workplace introductions, everyday conversation and the vocabulary of your field.</p>
        <p className="fine">Optional. Lessons don’t replace a program’s language requirement or guarantee eligibility.</p>
        <div className="ac-acts"><Link className="btn btn-academy" href={lessonsHref}>Explore Mandarin lessons</Link><Link className="btn btn-text" href={offerHref}>View applicant learning offer</Link></div></div>
      {!compact && <div className="ac-art" aria-hidden="true"><span>你好</span><i>nǐ hǎo · hello</i></div>}
    </aside>
  );
}

export function Empty({ icon = 'search', title, children, actions }: { icon?: IconName; title: string; children?: ReactNode; actions?: ReactNode }){
  return <div className="empty"><span className="empty-ic"><Icon name={icon} /></span><h2>{title}</h2>{children && <p>{children}</p>}{actions && <div className="empty-acts">{actions}</div>}</div>;
}

/** Shown wherever a feature needs infrastructure that isn't connected yet. Honest, with a useful alternative. */
export function NotConnected({ title, children, pending }: { title: string; children?: ReactNode; pending?: boolean }){
  return (
    <div className="wrap sec narrow"><div className="card notconn">
      <span className="empty-ic"><Icon name="lock" /></span>
      <h1 className="h2">{title}</h1>
      <p className="lead">{children ?? 'Online applications open once Bridgr sign-in is connected to this site. Until then, register your interest and an advisor will contact you.'}</p>
      {pending && <p className="fine">Sign-in is configured for this deployment but the shared Bridgr account integration hasn’t been completed.</p>}
      <div className="empty-acts left"><Link className="btn btn-primary" href="/apply">Apply now</Link><Link className="btn btn-ghost" href="/programs">Browse programs</Link></div>
    </div></div>
  );
}
