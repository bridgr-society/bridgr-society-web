import Link from 'next/link';
import { requireApplicant, fmtDate } from '@/lib/applications/guard';
import { APP_STATUS } from '@/lib/applications/types';
import { programBySlug, placeLine } from '@/lib/catalog';
import { NotConnected } from '@/components/ui';
import { Icon } from '@/components/Icon';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'My applications', robots: { index: false } };
export default async function Applications({ searchParams }: { searchParams: Promise<{ saved?: string; full?: string }> }){
  const ctx = await requireApplicant('/applications');
  if (!ctx) return <NotConnected title="My applications isn’t available yet" />;
  const apps = await ctx.store.list(ctx.user), { saved, full } = await searchParams;
  return (
    <div className="app-wrap"><div className="app-head"><h1>My applications</h1><p>{ctx.user.source === 'preview-demo' ? 'Preview test data — stored in this browser only, never sent anywhere.' : 'Saved to your Bridgr account.'}</p></div>
      {full && <p className="note warn" role="status"><Icon name="info" /><span>Preview test data holds up to 3 applications. Clear preview data on the status page to start another.</span></p>}
      {saved && <p className="note ok" role="status"><Icon name="check" /><span>Draft saved.</span></p>}
      {apps.length ? <div className="app-list">{apps.map(a => { const p = programBySlug(a.program)!, st = APP_STATUS[a.status];
        return <article key={a.id} className="card app-card"><div className="app-card-main"><span className={`app-st ${st.cls}`}>{st.label}</span>
          <h2 className="h3"><Link href={`/applications/${a.id}`}>{p.title}</Link></h2><p className="sub">{placeLine(p)} · {a.id} · updated {fmtDate(a.updated)}</p>
          <p className="next"><Icon name="right" /><span><b>Next:</b> {st.next}</span></p></div>
          <div className="app-card-acts">{a.status === 'draft' ? <Link className="btn btn-primary" href={`/apply/${p.slug}/${a.step}`}>Continue application</Link> : <Link className="btn btn-ghost" href={`/applications/${a.id}`}>View</Link>}</div></article>; })}</div>
        : <div className="empty card"><h2>No applications yet</h2><p>Find a program that’s open for applications to start one.</p><Link className="btn btn-primary" href="/programs">Explore programs</Link></div>}
    </div>
  );
}
