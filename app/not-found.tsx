import Link from 'next/link';
export default function NotFound(){
  return <div className="wrap sec narrow"><div className="empty"><h1 className="h2">Page not found</h1><p>The page may have moved. Try the programs list or the homepage.</p>
    <div className="empty-acts"><Link className="btn btn-primary" href="/programs">Browse programs</Link><Link className="btn btn-ghost" href="/">Home</Link></div></div></div>;
}
