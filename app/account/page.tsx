import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { capabilities } from '@/lib/env';
import { LogoMark, NotConnected } from '@/components/ui';
import { SignInForm } from '@/components/SignInForm';
import { signOutAction } from './actions';
import { programBySlug } from '@/lib/catalog';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Bridgr account', robots: { index: false } };
export default async function Account({ searchParams }: { searchParams: Promise<{ next?: string }> }){
  const cap = capabilities(), user = await getSession(), next = (await searchParams).next || '/applications';
  if (!cap.signIn) return <NotConnected title="Bridgr sign-in isn’t connected yet" pending={cap.authPending}>One Bridgr account will work across Society, Academy and Connect. It isn’t connected to this site yet, so there’s nothing to sign in to. You can browse everything and register interest without an account.</NotConnected>;
  if (user) return (
    <div className="app-wrap"><div className="app-head"><h1>Bridgr account</h1><p>Signed in as {user.name} · {user.email} {user.source === 'preview-demo' && <span className="preview-label">Preview test account</span>}</p></div>
      <div className="app-grid"><section className="card"><h2 className="h3">Your Bridgr products</h2>
        <ul className="products"><li><b>Bridgr Society</b><span><span className="pill ok">Applicant</span></span><i>Applications and preparation</i></li>
          <li className="academy"><b>Bridgr Academy</b><span><span className="pill off">Not connected</span></span><i>Will use the same account once linked</i></li>
          <li><b>Bridgr Connect</b><span><span className="pill off">Not connected</span></span><i>Business matching</i></li></ul>
        <p className="fine">Roles belong to each product. Being in one product never opens another product’s data.</p></section>
        <form action={signOutAction}><button className="btn btn-ghost btn-block" type="submit">Sign out</button></form></div></div>);
  const m = next.match(/^\/apply\/([\w-]+)/), p = m ? programBySlug(m[1]) : null;
  return (
    <div className="wrap sec auth"><div className="auth-card card">
      <span className="auth-mark"><LogoMark size={40} /></span>
      <h1>Continue with your Bridgr account</h1>
      <p className="lead">{p ? <>Sign in to save your application for <b>{p.title}</b>.</> : 'Sign in to see your applications.'} You’ll return to where you were.</p>
      <p className="note warn"><span><b>Preview environment:</b> this is a test sign-in, not the real Bridgr account. Use test details only — nothing is stored beyond this browser.</span></p>
      <SignInForm next={next} />
      <p className="fine"><Link className="link" href="/programs">Keep browsing without signing in</Link></p>
    </div></div>
  );
}
