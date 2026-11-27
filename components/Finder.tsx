import { destinations, careerFields, programTypes } from '@/content/taxonomy';
import { Icon } from './Icon';
/* Plain GET form to /programs — works without JavaScript and keeps shareable URLs. */
export function Finder(){
  const sel = (name: string, label: string, opts: { slug: string; name: string }[]) => (
    <label className="ff"><span>{label}</span><select className="input" name={name} defaultValue=""><option value="">Any</option>{opts.map(o => <option key={o.slug} value={o.slug}>{o.name}</option>)}</select></label>);
  return (
    <form className="finder" action="/programs" method="get" aria-label="Program finder">
      {sel('destination', 'Destination', destinations)}{sel('field', 'Career field', careerFields)}{sel('type', 'Program type', programTypes)}
      <button className="btn btn-primary btn-lg" type="submit"><Icon name="search" /><span>Find programs</span></button>
    </form>
  );
}
