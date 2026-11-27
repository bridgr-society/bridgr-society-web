import Link from 'next/link';
import { Icon } from '@/components/Icon';
export const metadata = { title: 'Application sent', robots: { index: false } };
export default async function Sent({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }){
  const sp = await searchParams, ref = (sp.ref ?? '').replace(/[^A-Z0-9-]/gi, '').slice(0, 24), delivered = sp.delivered === '1';
  return (
    <div className="wrap sec narrow"><div className="card done-card">
      <span className="done-ic"><Icon name="check" /></span>
      <h1 className="h2">{delivered ? 'Application sent' : 'Application received (preview)'}</h1>
      <p className="lead">{delivered ? 'Thank you — your application is with our team. An advisor will review it and reply by email.' : 'Preview mode: your answers were checked but not delivered.'}</p>
      {ref && <p>Your reference: <b>{ref}</b></p>}
      <p className="fine">This isn’t an offer or a confirmed placement. Check your spam folder if you don’t hear from us within a few working days.</p>
      <div className="empty-acts"><Link className="btn btn-primary" href="/programs">Browse more programs</Link><Link className="btn btn-ghost" href="/">Back to home</Link></div>
    </div></div>
  );
}
