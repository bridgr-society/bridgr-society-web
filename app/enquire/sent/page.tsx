import Link from 'next/link';
import { Icon } from '@/components/Icon';
export const metadata = { title: 'Enquiry', robots: { index: false } };
export default async function Sent({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }){
  const sp = await searchParams, delivered = sp.delivered === '1', ref = (sp.ref || '').replace(/[^\w-]/g, '').slice(0, 30);
  return <div className="wrap sec narrow done-card">
    <span className={`done-ic${delivered ? '' : ' warn'}`}><Icon name={delivered ? 'check' : 'info'} /></span>
    <h1>{delivered ? (sp.kind === 'interest' ? 'Interest registered' : 'Enquiry sent') : 'Preview only — not sent'}</h1>
    <p className="lead">{delivered ? 'Thanks. An advisor will reply by email. Reference ' + ref + '.' : 'This is a preview environment, so your enquiry was checked but not delivered to anyone.'}</p>
    <div className="empty-acts"><Link className="btn btn-primary" href="/programs">Keep exploring</Link><Link className="btn btn-ghost" href="/">Home</Link></div>
  </div>;
}
