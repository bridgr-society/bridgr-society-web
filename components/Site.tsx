import Link from 'next/link';
import { Brand } from './ui';
import { Icon } from './Icon';
import { NavLinks } from './NavLinks';
import { getSession } from '@/lib/auth/session';
import { capabilities } from '@/lib/env';
import { signOutAction } from '@/app/account/actions';

export async function Header(){
  const user = await getSession(), cap = capabilities();
  const initials = user ? user.name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() : '';
  return (
    <header className="hdr"><div className="hdr-in">
      <Brand />
      <nav className="hdr-nav" aria-label="Main"><NavLinks signedIn={!!user} /></nav>
      <div className="hdr-right">
        {user ? (
          <details className="menu-wrap acct">
            <summary className="avatar-btn" aria-label="Account menu"><span className="avatar" aria-hidden="true">{initials}</span></summary>
            <div className="pop" role="menu" aria-label="Account">
              <div className="pop-who"><span className="avatar" aria-hidden="true">{initials}</span><div><b>{user.name}</b><i>{user.source === 'preview-demo' ? 'Preview test account' : 'Bridgr account'}</i></div></div>
              <Link role="menuitem" className="pop-item" href="/applications"><Icon name="doc" />My applications</Link>
              <Link role="menuitem" className="pop-item" href="/account"><Icon name="user" />Bridgr account</Link>
              <form action={signOutAction}><button role="menuitem" className="pop-item" type="submit"><Icon name="out" />Sign out</button></form>
            </div>
          </details>
        ) : cap.signIn ? <Link className="btn btn-ghost btn-sm" href="/account">Sign in</Link> : null}
        <Link className="btn btn-primary btn-sm hdr-apply" href="/apply">Apply now</Link>
        <details className="menu-wrap mnav">
          <summary className="icon-btn hdr-burger" aria-label="Menu"><Icon name="menu" /></summary>
          <nav className="mnav-panel" aria-label="Main (mobile)"><NavLinks signedIn={!!user} />{!user && cap.signIn && <Link href="/account">Sign in</Link>}<Link href="/apply">Apply now</Link></nav>
        </details>
      </div>
    </div></header>
  );
}

export function Footer(){
  return (
    <footer className="ftr"><div className="ftr-in">
      <div className="ftr-brand"><Brand /><p>Internships and immersion programs in Taiwan, China and Singapore — with optional Mandarin preparation through Bridgr Academy.</p></div>
      <div className="ftr-cols">
        <div><h2 className="ftr-h">Explore</h2><ul><li><Link href="/programs">Programs</Link></li><li><Link href="/destinations">Destinations</Link></li><li><Link href="/career-fields">Career fields</Link></li><li><Link href="/program-types">Internships vs immersion</Link></li><li><Link href="/match">Help me choose</Link></li></ul></div>
        <div><h2 className="ftr-h">Support</h2><ul><li><Link href="/how-it-works">How it works</Link></li><li><Link href="/mandarin">Mandarin preparation</Link></li><li><Link href="/apply">Apply</Link></li><li><Link href="/enquire">Ask a question</Link></li></ul></div>
        <div><h2 className="ftr-h">The Bridgr family</h2><ul><li><span>Bridgr Global</span></li><li><span>Bridgr Academy — language learning</span></li><li><span>Bridgr Society — internships &amp; immersion</span></li><li><span>Bridgr Connect — business matching</span></li></ul></div>
        <div><h2 className="ftr-h">Legal</h2><ul><li><Link href="/privacy">Privacy (draft)</Link></li><li><Link href="/terms">Terms (draft)</Link></li></ul></div>
      </div>
      <p className="ftr-legal">© {new Date().getFullYear()} Bridgr Society. Programs shown are samples until hosts and terms are confirmed.</p>
    </div></footer>
  );
}

/** Visible on every page outside production, so test data is never mistaken for the real service. */
export function EnvBanner(){
  const cap = capabilities();
  if (cap.env === 'production') return null;
  return <div className="env-banner" role="note"><Icon name="info" /><span><b>{cap.env === 'preview' ? 'Preview' : 'Development'} environment.</b> {cap.previewDemo ? 'Sign-in, applications and enquiries use test data — nothing is real or delivered.' : 'Sign-in and applications are not connected.'} <Link href="/status">Environment status</Link></span></div>;
}
