'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { submitEnquiry, type EnquiryState } from '@/app/enquire/actions';
import { Icon } from './Icon';

interface Opt { slug: string; label: string }
export function EnquiryForm({ initial, programs, stages, enabled, previewOnly }: { initial: Record<string, string>; programs: Opt[]; stages: string[]; enabled: boolean; previewOnly: boolean }){
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { errors: {}, values: initial });
  const v = state.values, e = state.errors, n = Object.keys(e).length;
  const kind = v.kind || 'question';
  const er = (k: string) => e[k] ? <p className="error" id={`er-${k}`}><Icon name="info" /><span>{e[k]}</span></p> : null;
  const inv = (k: string) => e[k] ? { 'aria-invalid': true as const, 'aria-describedby': `er-${k}` } : {};
  return (
    <form className="card form" action={action} noValidate key={JSON.stringify(v) + n}>
      {n > 0 && <div className="error-sum" role="alert" tabIndex={-1}><b>Please check {n} {n === 1 ? 'field' : 'fields'}</b><ul>{Object.entries(e).map(([k, m]) => <li key={k}><a href={`#en-${k}`}>{m}</a></li>)}</ul></div>}
      {state.failure && <div className="error-sum" role="alert"><b>Not sent.</b> {state.failure} {!enabled && <>You can still <Link href="/programs">browse programs</Link>.</>}</div>}
      <fieldset className="seg-field"><legend>What would you like to do?</legend><div className="seg">{[['question', 'Ask a question'], ['interest', 'Register interest'], ['match', 'Get help choosing']].map(([k, l]) =>
        <label key={k}><input type="radio" name="kind" value={k} defaultChecked={kind === k} />{l}</label>)}</div></fieldset>
      <label className="field"><span>Program <i>(optional)</i></span><select className="input" id="en-program" name="program" defaultValue={v.program || ''}><option value="">Not about a specific program</option>{programs.map(p => <option key={p.slug} value={p.slug}>{p.label}</option>)}</select></label>
      <div className="two-col">
        <label className="field"><span>Full name</span><input className="input" id="en-name" name="name" defaultValue={v.name} autoComplete="name" required {...inv('name')} />{er('name')}</label>
        <label className="field"><span>Email</span><input className="input" id="en-email" name="email" type="email" defaultValue={v.email} autoComplete="email" required {...inv('email')} />{er('email')}</label>
      </div>
      <label className="field"><span>Where are you now? <i>(optional)</i></span><select className="input" name="stage" defaultValue={v.stage || ''}><option value="">Choose</option>{stages.map(s => <option key={s}>{s}</option>)}</select></label>
      <label className="field"><span>Your message <i>(optional when registering interest)</i></span><textarea className="input" id="en-message" name="message" rows={4} defaultValue={v.message} maxLength={3000} {...inv('message')} />{er('message')}</label>
      <input type="hidden" name="context" value={v.context || ''} />
      <div className="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="check"><input type="checkbox" id="en-consent" name="consent" defaultChecked={!!v.consent} {...inv('consent')} /><span>Bridgr Society may contact me about this enquiry. <Link className="link" href="/privacy">Privacy (draft)</Link></span></label>{er('consent')}
      <div className="form-foot"><button className="btn btn-primary btn-lg" type="submit" disabled={!enabled || pending}>{pending ? 'Sending…' : 'Send'}</button>
        {previewOnly && <span className="preview-label">Preview: enquiries are not delivered</span>}</div>
    </form>
  );
}
