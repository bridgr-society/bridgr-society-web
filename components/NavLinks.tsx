'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV: [string, string][] = [['/programs', 'Programs'], ['/destinations', 'Destinations'], ['/career-fields', 'Career fields'], ['/how-it-works', 'How it works'], ['/about', 'About']];
export function NavLinks({ signedIn }: { signedIn: boolean }){
  const path = usePathname() || '/';
  const sec = '/' + (path.split('/')[1] || '');
  const items: [string, string][] = signedIn ? [...NAV, ['/applications', 'My applications']] : NAV;
  return <>{items.map(([h, l]) => <Link key={h} href={h} className={sec === h ? 'on' : ''} aria-current={sec === h ? 'page' : undefined}>{l}</Link>)}</>;
}
