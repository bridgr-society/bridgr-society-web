'use client';
import { useActionState } from 'react';
import { previewSignIn, type SignInState } from '@/app/account/actions';
import { Icon } from './Icon';
export function SignInForm({ next }: { next: string }){
  const [s, action, pending] = useActionState<SignInState, FormData>(previewSignIn, { errors: {}, values: { name: 'Test Applicant', email: 'test.applicant@example.com' } });
  const er = (k: string) => s.errors[k] ? <p className="error" id={`si-${k}`}><Icon name="info" /><span>{s.errors[k]}</span></p> : null;
  return (
    <form className="form" action={action} noValidate>
      {s.errors.form && <div className="error-sum" role="alert">{s.errors.form}</div>}
      <input type="hidden" name="next" value={next} />
      <label className="field"><span>Name</span><input className="input" name="name" defaultValue={s.values.name} autoComplete="name" aria-invalid={!!s.errors.name} />{er('name')}</label>
      <label className="field"><span>Email <i>(use a test address)</i></span><input className="input" name="email" type="email" defaultValue={s.values.email} autoComplete="email" aria-invalid={!!s.errors.email} />{er('email')}</label>
      <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Continue with test account'}</button>
    </form>
  );
}
