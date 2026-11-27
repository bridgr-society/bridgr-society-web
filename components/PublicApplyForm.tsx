'use client';
import { createContext, useActionState, useContext, useEffect, useRef, type ReactNode } from 'react';
import Link from 'next/link';
import { submitPublicApplication, type PublicApplyState } from '@/app/apply/public-actions';
import type { Values } from '@/lib/applications/public-form';
import { Icon } from './Icon';

type Opt = { value: string; label: string };
export interface ApplyOptions { programs: Opt[]; destinations: Opt[]; types: Opt[]; durations: Opt[]; starts: string[]; mandarin: Opt[]; stages: string[]; fields: Opt[]; genders: string[]; english: string[]; heard: string[]; countries: string[]; gradYears: string[] }

const LABELS: Record<string, string> = { first: 'First name', last: 'Last name', email: 'Email', email2: 'Confirm email', phone: 'Phone', gender: 'Gender', nationality: 'Nationality', residence: 'Country of residence', dob: 'Date of birth',
  stage: 'Current stage', institution: 'University / employer', study: 'Field of study', gradYear: 'Graduation year', link: 'Link', program: 'Program', destinations: 'Destinations', ptype: 'Program type', start: 'Start', duration: 'Duration',
  mandarin: 'Mandarin', english: 'English', motivation: 'Motivation', heard: 'How you heard', accurate: 'Accuracy', consent: 'Consent' };


/* Module-level helpers (not defined inside the form) so React never remounts the uncontrolled inputs. */
type Ctx = { v: Values; e: Record<string, string> };
const Ctx = createContext<Ctx>({ v: {}, e: {} });
const useF = () => { const { v, e } = useContext(Ctx);
  return { s: (k: string) => String(v[k] ?? ''), has: (k: string, x: string) => (Array.isArray(v[k]) ? v[k] as string[] : []).includes(x),
    er: (k: string) => e[k] ? <p className="error" id={`ap-err-${k}`}><Icon name="info" /><span>{e[k]}</span></p> : null,
    inv: (k: string) => e[k] ? { 'aria-invalid': true as const, 'aria-describedby': `ap-err-${k}` } : {} }; };
const Req = () => <b className="req" aria-hidden="true">*</b>;
function Field({ k, label, req, opt, help, children }: { k: string; label: string; req?: boolean; opt?: boolean; help?: string; children: ReactNode }){
  const { er } = useF();
  return <label className="field"><span>{label}{req && <Req />}{opt && <i> (optional)</i>}</span>{children}{help && <span className="help">{help}</span>}{er(k)}</label>;
}
function Select({ k, list, placeholder = 'Please select' }: { k: string; list: (string | Opt)[]; placeholder?: string }){
  const { s, inv } = useF();
  return <select className="input" id={`ap-${k}`} name={k} defaultValue={s(k)} {...inv(k)}><option value="">{placeholder}</option>{list.map(x => typeof x === 'string' ? <option key={x}>{x}</option> : <option key={x.value} value={x.value}>{x.label}</option>)}</select>;
}
function Section({ num, title, count, children }: { num: number; title: string; count: number; children: ReactNode }){
  return <section className="ap-sec" aria-labelledby={`ap-s${num}`}><h2 className="ap-sec-h" id={`ap-s${num}`}><span className="ap-sec-n">{num}</span>{title} <i>({count})</i></h2><div className="ap-sec-body">{children}</div></section>;
}

export function PublicApplyForm({ initial, o, enabled, previewOnly }: { initial: Values; o: ApplyOptions; enabled: boolean; previewOnly: boolean }){
  const [state, action, pending] = useActionState<PublicApplyState, FormData>(submitPublicApplication, { errors: {}, values: initial });
  const v = state.values, e = state.errors, n = Object.keys(e).length;
  const sumRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (n || state.failure) sumRef.current?.focus(); }, [state, n]);
  const ctx = { v, e };
  const s = (k: string) => String(v[k] ?? ''); const has = (k: string, x: string) => (Array.isArray(v[k]) ? v[k] as string[] : []).includes(x);
  const er = (k: string) => e[k] ? <p className="error" id={`ap-err-${k}`}><Icon name="info" /><span>{e[k]}</span></p> : null;
  const inv = (k: string) => e[k] ? { 'aria-invalid': true as const, 'aria-describedby': `ap-err-${k}` } : {};
  return (
    <Ctx.Provider value={ctx}><form className="card form ap-form" action={action} noValidate key={JSON.stringify(v) + n}>
      {(n > 0 || state.failure) && <div className="error-sum" role="alert" tabIndex={-1} ref={sumRef}>
        {state.failure ? <><b>Not sent.</b> {state.failure}</> : <><b>Please check {n} {n === 1 ? 'answer' : 'answers'}</b><ul>{Object.entries(e).map(([k, m]) => <li key={k}><a href={`#ap-${k}`}>{LABELS[k] ?? k}: {m}</a></li>)}</ul></>}</div>}
      <p className="fine ap-req-note"><Req /> Required</p>

      <Section num={1} title="Personal information" count={7}>
        <fieldset className="field"><legend>Name<Req /></legend><div className="two-col">
          <div><input className="input" id="ap-first" name="first" placeholder="First" aria-label="First name" autoComplete="given-name" defaultValue={s('first')} {...inv('first')} />{er('first')}</div>
          <div><input className="input" id="ap-last" name="last" placeholder="Last" aria-label="Last name" autoComplete="family-name" defaultValue={s('last')} {...inv('last')} />{er('last')}</div></div></fieldset>
        <div className="two-col">
          <Field k="email" label="Email" req><input className="input" id="ap-email" name="email" type="email" autoComplete="email" placeholder="name@example.com" defaultValue={s('email')} {...inv('email')} /></Field>
          <Field k="email2" label="Confirm email" req><input className="input" id="ap-email2" name="email2" type="email" autoComplete="off" defaultValue={s('email2')} {...inv('email2')} /></Field>
        </div>
        <Field k="phone" label="Phone number" req help="Include your country code, e.g. +66 or +44."><input className="input" id="ap-phone" name="phone" type="tel" autoComplete="tel" placeholder="+66 81 234 5678" defaultValue={s('phone')} {...inv('phone')} /></Field>
        <fieldset className="field"><legend>Gender<Req /></legend><div className="opts compact">{o.genders.map((g, i) =>
          <label key={g} className="opt"><input type="radio" name="gender" id={i === 0 ? 'ap-gender' : undefined} value={g} defaultChecked={s('gender') === g} /><span>{g}</span></label>)}</div>
          <label className="field mt ap-gender-self"><span>How do you describe your gender? <i>(optional)</i></span><input className="input" name="genderSelf" defaultValue={s('genderSelf')} maxLength={80} /></label>{er('gender')}</fieldset>
        <div className="two-col">
          <Field k="nationality" label="Nationality" req><Select k="nationality" list={o.countries} /></Field>
          <Field k="residence" label="Country of residence" req><Select k="residence" list={o.countries} /></Field>
        </div>
        <Field k="dob" label="Date of birth" req><input className="input ap-date" id="ap-dob" name="dob" type="date" autoComplete="bday" defaultValue={s('dob')} {...inv('dob')} /></Field>
      </Section>

      <Section num={2} title="Education & experience" count={6}>
        <Field k="stage" label="Where are you right now?" req><Select k="stage" list={o.stages} /></Field>
        <div className="two-col">
          <Field k="institution" label="University, school or employer" req><input className="input" id="ap-institution" name="institution" defaultValue={s('institution')} maxLength={160} {...inv('institution')} /></Field>
          <Field k="study" label="Field of study or current role" req><input className="input" id="ap-study" name="study" placeholder="e.g. BBA Marketing" defaultValue={s('study')} maxLength={160} {...inv('study')} /></Field>
        </div>
        <Field k="gradYear" label="Graduation year" req><Select k="gradYear" list={o.gradYears} /></Field>
        <Field k="experience" label="Relevant experience" opt help="Internships, part-time work, projects, clubs or volunteering."><textarea className="input" id="ap-experience" name="experience" rows={3} maxLength={2000} defaultValue={s('experience')} /></Field>
        <Field k="link" label="LinkedIn, CV or portfolio link" opt help="A link we can open, e.g. LinkedIn or a shared Google Drive file."><input className="input" id="ap-link" name="link" type="url" placeholder="https://" defaultValue={s('link')} {...inv('link')} /></Field>
      </Section>

      <Section num={3} title="Program preferences" count={6}>
        <Field k="program" label="Which program are you applying for?" req><Select k="program" list={o.programs} /></Field>
        <fieldset className="field"><legend>Preferred destinations<Req /> <i>— choose all that apply</i></legend><div className="chips">{o.destinations.map((d, i) =>
          <label key={d.value} className="chip-check"><input type="checkbox" name="destinations" id={i === 0 ? 'ap-destinations' : undefined} value={d.value} defaultChecked={has('destinations', d.value)} /><span>{d.label}</span></label>)}</div>{er('destinations')}</fieldset>
        <fieldset className="field"><legend>Program type<Req /></legend><div className="opts compact">{o.types.map((t, i) =>
          <label key={t.value} className="opt"><input type="radio" name="ptype" id={i === 0 ? 'ap-ptype' : undefined} value={t.value} defaultChecked={s('ptype') === t.value} /><span>{t.label}</span></label>)}</div>{er('ptype')}</fieldset>
        <div className="two-col">
          <Field k="start" label="Preferred start" req><Select k="start" list={o.starts} /></Field>
          <Field k="duration" label="Preferred length" opt><Select k="duration" list={o.durations} placeholder="No preference" /></Field>
        </div>
        <fieldset className="field"><legend>Career fields you’re interested in <i>(optional)</i></legend><div className="chips">{o.fields.map(f =>
          <label key={f.value} className="chip-check"><input type="checkbox" name="fields" value={f.value} defaultChecked={has('fields', f.value)} /><span>{f.label}</span></label>)}</div></fieldset>
      </Section>

      <Section num={4} title="Languages" count={3}>
        <div className="two-col">
          <Field k="mandarin" label="Mandarin level (self-reported)" req><Select k="mandarin" list={o.mandarin} /></Field>
          <Field k="english" label="English level" req><Select k="english" list={o.english} /></Field>
        </div>
        <Field k="otherLangs" label="Other languages" opt><input className="input" name="otherLangs" placeholder="e.g. Thai (native), Japanese (basic)" defaultValue={s('otherLangs')} maxLength={200} /></Field>
        <p className="note"><Icon name="book" /><span>Not confident in Mandarin yet? You can still apply. <Link className="link" href="/mandarin">Bridgr Academy</Link> offers optional preparation.</span></p>
      </Section>

      <Section num={5} title="About you" count={3}>
        <Field k="motivation" label="Why do you want to join this program?" req help="A few sentences about your goals and what you hope to gain. At least 50 characters."><textarea className="input" id="ap-motivation" name="motivation" rows={5} maxLength={3000} defaultValue={s('motivation')} {...inv('motivation')} /></Field>
        <Field k="heard" label="How did you hear about us?" opt><Select k="heard" list={o.heard} /></Field>
        <Field k="notes" label="Anything else we should know?" opt><textarea className="input" name="notes" rows={3} maxLength={2000} defaultValue={s('notes')} /></Field>
      </Section>

      <div className="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="note"><Icon name="info" /><span>Submitting sends your application to our team for review. It isn’t an offer or a confirmed placement — an advisor will contact you about fit, timing and next steps.</span></p>
      <label className="check"><input type="checkbox" id="ap-accurate" name="accurate" defaultChecked={!!s('accurate')} {...inv('accurate')} /><span>My answers are accurate to the best of my knowledge.<Req /></span></label>{er('accurate')}
      <label className="check"><input type="checkbox" id="ap-consent" name="consent" defaultChecked={!!s('consent')} {...inv('consent')} /><span>Bridgr Society may use these details to review my application and contact me. <Link className="link" href="/privacy">Privacy (draft)</Link><Req /></span></label>{er('consent')}
      <div className="form-foot"><button className="btn btn-primary btn-lg" type="submit" disabled={!enabled || pending}>{pending ? 'Sending…' : 'Submit application'}</button>
        {previewOnly && <span className="preview-label">Preview: applications are not delivered</span>}</div>
    </form></Ctx.Provider>
  );
}
