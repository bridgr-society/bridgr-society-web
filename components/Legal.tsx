export function Legal({ title }: { title: string }){
  return <div className="wrap sec narrow"><span className="pill off">Draft placeholder — not legal text</span><h1 className="mt">{title}</h1>
    <p className="lead">This page is a placeholder. It has not been written or reviewed by a lawyer and must be replaced before launch.</p>
    <p className="mt">A reviewed version needs to cover what personal data Society collects, why, who can see it (including which Bridgr products and staff), how long it’s kept, where it’s processed, and how to access or delete it. Requirements in Thailand, Singapore, Taiwan and China should be checked.</p></div>;
}
