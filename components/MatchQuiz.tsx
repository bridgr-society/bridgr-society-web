'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { MatchAnswers } from '@/lib/match';
import { answersQuery } from '@/lib/match-params';
import { Icon } from './Icon';

interface Opt { id: string; name: string; desc?: string }
interface Q { k: keyof MatchAnswers; q: string; hint?: string; multi?: boolean; dates?: boolean; opts?: Opt[] }
export function MatchQuiz({ questions, starts, durations, initial }: { questions: Q[]; starts: string[]; durations: Opt[]; initial: MatchAnswers }){
  const router = useRouter();
  const [a, setA] = useState<MatchAnswers>(initial);
  const [i, setI] = useState(0);
  const [err, setErr] = useState('');
  const q = questions[i];
  const answered = (q: Q) => q.multi ? a.fields.length > 0 : q.dates ? !!a.start && !!a.duration : !!a[q.k];
  const set = (k: keyof MatchAnswers, v: string) => { setA({ ...a, [k]: v }); setErr(''); };
  const toggle = (v: string) => { setA({ ...a, fields: a.fields.includes(v) ? a.fields.filter(x => x !== v) : [...a.fields, v] }); setErr(''); };
  const next = () => {
    if (!answered(q)){ setErr(q.multi ? 'Choose at least one option.' : 'Choose an option to continue.'); return; }
    if (i === questions.length - 1) router.push('/match/results?' + answersQuery(a)); else { setI(i + 1); window.scrollTo(0, 0); }
  };
  const radio = (k: keyof MatchAnswers, o: Opt, name: string) => (
    <label key={o.id} className="opt"><input type="radio" name={name} value={o.id} checked={a[k] === o.id} onChange={() => set(k, o.id)} /><span><b>{o.name}</b>{o.desc && <i>{o.desc}</i>}</span></label>);
  return (
    <div className="wrap sec narrow match">
      <div className="m-prog"><span>Question {i + 1} of {questions.length}</span><div className="bar" role="progressbar" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={i + 1} aria-label="Progress"><i style={{ width: `${((i + 1) / questions.length) * 100}%` }} /></div></div>
      <h1 tabIndex={-1} key={i}>{q.q}</h1>{q.hint && <p className="lead">{q.hint}</p>}
      {err && <p className="error" role="alert"><Icon name="info" /><span>{err}</span></p>}
      {q.dates ? <>
        <fieldset className="opts"><legend className="h3">Start</legend>{starts.map(s => radio('start', { id: s, name: s }, 'm-start'))}</fieldset>
        <fieldset className="opts mt"><legend className="h3">Length</legend>{[...durations, { id: 'any', name: 'Not sure yet' }].map(d => radio('duration', d, 'm-dur'))}</fieldset></>
      : <fieldset className={`opts${q.multi ? ' multi' : ''}`}><legend className="sr">{q.q}</legend>
          {q.opts!.map(o => q.multi
            ? <label key={o.id} className="opt"><input type="checkbox" value={o.id} checked={a.fields.includes(o.id)} onChange={() => toggle(o.id)} /><span><b>{o.name}</b>{o.desc && <i>{o.desc}</i>}</span></label>
            : radio(q.k, o, 'm-' + q.k))}</fieldset>}
      <div className="m-nav">{i ? <button className="btn btn-ghost" type="button" onClick={() => setI(i - 1)}><Icon name="left" />Back</button> : <Link className="btn btn-text" href="/">Cancel</Link>}
        <button className="btn btn-primary btn-lg" type="button" onClick={next}>{i === questions.length - 1 ? 'See suggestions' : 'Continue'}</button></div>
      <p className="fine">No account needed. Your answers are only kept in the page address.</p>
    </div>
  );
}
