'use client';
import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { saveStep, type StepState } from '@/app/apply/actions';
import type { Application } from '@/lib/applications/types';
import type { MandarinLevel, MandarinRequirement } from '@/content/types';
import { Icon } from './Icon';

interface ProgramInfo { slug: string; title: string; place: string; durationText: string; starts: string[]; reqRank: number; reqName: string; sample: boolean }
const TITLES = { background: 'Background & goals', availability: 'Availability & language', review: 'Review' } as const;

export function ApplyForm({ app, program, stages, goals, levels }: { app: Application; program: ProgramInfo; stages: string[]; goals: string[]; levels: MandarinLevel[]; reqs: MandarinRequirement[] }){
  const [state, action, pending] = useActionState<StepState, FormData>(saveStep, { errors: {} });
  const [level, setLevel] = useState(app.data.mandarin);
  const sumRef = useRef<HTMLDivElement>(null);
  const e = state.errors, n = Object.keys(e).length, d = app.data, step = app.step;
  useEffect(() => { if (n) sumRef.current?.focus(); }, [state, n]);
  const er = (k: string) => e[k] ? <p className="error" id={`ae-${k}`}><Icon name="info" /><span>{e[k]}</span></p> : null;
  const inv = (k: string) => e[k] ? { 'aria-invalid': true as const, 'aria-describedby': `ae-${k}` } : {};

  const lv = levels.find(l => l.slug === level);
  const short = lv ? (lv.slug === 'unsure' ? program.reqRank > 0 : lv.rank < program.reqRank) : false;
  const readiness = lv && (
    <>
      <div className={`readiness ${short ? 'gap' : 'fit'}`} role="status"><p><Icon name={short ? 'info' : 'check'} /><span>
        <b>{program.reqRank === 0 ? 'This program doesn’t require Mandarin.' : lv.slug === 'unsure' ? `This program needs: ${program.reqName.toLowerCase()}. An advisor can help you check your level.` : lv.rank >= program.reqRank ? `You described a level that meets “${program.reqName.toLowerCase()}”.` : `This program asks for “${program.reqName.toLowerCase()}”. You described ${lv.name.toLowerCase()}.`}</b>
        {' '}This is self-reported, not a verified assessment.{short ? ' You can still apply — an advisor will discuss options with you.' : ''}</span></p></div>
      {(short || lv.rank <= 1) && <aside className="academy compact inline" aria-label="Optional Mandarin preparation"><div className="ac-copy"><span className="ac-tag"><Icon name="book" />Bridgr Academy · optional</span>
        <h2 className="h3">Not confident in Mandarin yet? Prepare for your experience with Bridgr Academy.</h2>
        <p>We’ll save your application first, so you can come straight back.</p>
        <div className="ac-acts"><button className="btn btn-academy" type="submit" name="intent" value="prepare">Explore Mandarin lessons</button><button className="btn btn-text" type="submit" name="intent" value="prepare">View applicant learning offer</button><a className="btn btn-text" href="#app-continue">Continue my application</a></div></div></aside>}
    </>);

  return (
    <form className="card form" action={action} noValidate>
      <input type="hidden" name="id" value={app.id} />
      {/* Pressing Enter should continue, not trigger the first visible button (Back or Academy). */}
      <button type="submit" name="intent" value="continue" className="sr" tabIndex={-1} aria-hidden="true" />
      <h2>{TITLES[step]}</h2>
      {n > 0 && <div className="error-sum" role="alert" tabIndex={-1} ref={sumRef}><b>Please check {n} {n === 1 ? 'answer' : 'answers'}</b><ul>{Object.entries(e).map(([k, m]) => <li key={k}><a href={`#af-${k}`}>{m}</a></li>)}</ul></div>}

      {step === 'background' && <>
        <fieldset className="field"><legend>Where are you right now?</legend><div className="opts compact">{stages.map((s, i) => <label key={s} className="opt"><input type="radio" name="stage" id={i === 0 ? 'af-stage' : undefined} value={s} defaultChecked={d.stage === s} /><span>{s}</span></label>)}</div>{er('stage')}</fieldset>
        <label className="field"><span>Field of study or current role</span><input className="input" id="af-study" name="study" defaultValue={d.study} placeholder="e.g. BBA Marketing, year 3" maxLength={170} {...inv('study')} />{er('study')}</label>
        <label className="field"><span>Why this program? <i>A few sentences</i></span><textarea className="input" id="af-motivation" name="motivation" rows={5} defaultValue={d.motivation} maxLength={1700} {...inv('motivation')} /><span className="help">At least 40 characters. Only Society advisors see this.</span>{er('motivation')}</label>
        <fieldset className="field"><legend>Your goals</legend><div className="chips">{goals.map((g, i) => <label key={g} className="chip-check"><input type="checkbox" name="goals" id={i === 0 ? 'af-goals' : undefined} value={g} defaultChecked={d.goals.includes(g)} /><span>{g}</span></label>)}</div>{er('goals')}</fieldset>
      </>}

      {step === 'availability' && <>
        <fieldset className="field"><legend>Preferred start</legend><div className="opts compact">{[...program.starts, 'Flexible'].filter((x, i, a) => a.indexOf(x) === i).map((s, i) => <label key={s} className="opt"><input type="radio" name="start" id={i === 0 ? 'af-start' : undefined} value={s} defaultChecked={d.start === s} /><span>{s}</span></label>)}</div><p className="help">Exact dates are to be confirmed.</p>{er('start')}</fieldset>
        <label className="check"><input type="checkbox" id="af-commit" name="commit" defaultChecked={d.commit} {...inv('commit')} /><span>I could commit to the full {program.durationText} if offered a place.</span></label>{er('commit')}
        <fieldset className="field mt"><legend>Your Mandarin <i>(self-reported)</i></legend><div className="opts compact">{levels.map((m, i) => <label key={m.slug} className="opt"><input type="radio" name="mandarin" id={i === 0 ? 'af-mandarin' : undefined} value={m.slug} defaultChecked={d.mandarin === m.slug} onChange={() => setLevel(m.slug)} /><span><b>{m.name}</b><i>{m.desc}</i></span></label>)}</div>{er('mandarin')}</fieldset>
        {readiness}
        <label className="field"><span>Other languages <i>(optional)</i></span><input className="input" id="af-otherLangs" name="otherLangs" defaultValue={d.otherLangs} maxLength={170} placeholder="e.g. Thai (native), English (fluent)" />{er('otherLangs')}</label>
      </>}

      {step === 'review' && <>
        <dl className="review">{([['Program', `${program.title} — ${program.place}${program.sample ? ' (sample)' : ''}`], ['Stage', d.stage], ['Field or role', d.study], ['Why this program', d.motivation], ['Goals', d.goals.join(', ')],
          ['Preferred start', d.start], ['Full duration', d.commit ? 'Yes' : 'No'], ['Mandarin (self-reported)', levels.find(l => l.slug === d.mandarin)?.name ?? ''], ['Other languages', d.otherLangs || '—']] as [string, string][])
          .map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v || '—'}</dd><span /></div>)}</dl>
        <p className="help">To change an answer, use Back.</p>
        <p className="note"><Icon name="info" /><span>Submitting sends your application for review. It doesn’t mean you’ve been accepted or that a placement is confirmed.</span></p>
        <label className="check"><input type="checkbox" id="af-accurate" name="accurate" defaultChecked={d.accurate} {...inv('accurate')} /><span>My answers are accurate to the best of my knowledge.</span></label>{er('accurate')}
      </>}

      <div className="form-foot">
        {step === 'background' ? <Link className="btn btn-ghost" href={`/programs/${program.slug}`}><Icon name="left" />Program</Link> : <button className="btn btn-ghost" type="submit" name="intent" value="back" formNoValidate><Icon name="left" />Back</button>}
        <span className="spacer" />
        <button className="btn btn-text" type="submit" name="intent" value="exit">Save and exit</button>
        <button className="btn btn-primary btn-lg" id="app-continue" type="submit" name="intent" value="continue" disabled={pending}>{pending ? 'Saving…' : step === 'review' ? 'Submit application' : 'Save and continue'}</button>
      </div>
    </form>
  );
}
