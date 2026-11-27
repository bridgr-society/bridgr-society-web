/* Original illustrations standing in for licensed photography. Static strings, no user input. */
const esc = (v: string) => v.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" } as Record<string, string>)[c]);
export const SCENES = {
  taiwan:   { alt:'Illustration of a city skyline with a tall stepped tower and green hills', sky:['#d9f2ec', '#bfe0ff'] },
  china:    { alt:'Illustration of a waterfront skyline at dusk', sky:['#ffe3c4', '#cfe0ff'] },
  singapore:{ alt:'Illustration of a bay-side skyline with garden structures', sky:['#cdeeff', '#e7f7f3'] },
  office:   { alt:'Illustration of two colleagues working at a desk by a window', sky:['#eef4ff', '#e7f7f3'] },
  meeting:  { alt:'Illustration of a small team meeting around a table', sky:['#eef4ff', '#f1f5f9'] },
  studio:   { alt:'Illustration of a design studio with screens and sketches', sky:['#e7f7f3', '#eef4ff'] },
  tech:     { alt:'Illustration of an engineer at a desk with two monitors', sky:['#e5f0ff', '#e7f7f3'] },
  finance:  { alt:'Illustration of an analyst reviewing charts with a city view', sky:['#e5f0ff', '#f8fafc'] }
};
export function sceneSvg(kind: string): string {
  const s = (SCENES as Record<string, { alt: string; sky: string[] }>)[kind] || SCENES.office, id = 'sc-' + kind;
  const g = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.sky[0]}"/><stop offset="1" stop-color="${s.sky[1]}"/></linearGradient></defs><rect width="400" height="250" fill="url(#${id})"/>`;
  const person = (x: number, y: number, c: string, sh: string) => `<circle cx="${x}" cy="${y}" r="13" fill="#f2c9a5"/><path d="M${x - 14} ${y - 4}q14-18 28 0" fill="${sh}"/><path d="M${x - 24} ${y + 50}q0-34 24-34t24 34z" fill="${c}"/>`;
  const art = ({
    taiwan: `<path d="M0 190 Q60 120 130 170 T260 150 T400 165 V250 H0z" fill="#7fcbb8"/><path d="M0 210 Q90 170 180 200 T400 195 V250 H0z" fill="#0D9488" opacity=".55"/>
      <g fill="#0f3b6e"><rect x="190" y="60" width="24" height="150"/><rect x="186" y="80" width="32" height="8"/><rect x="186" y="105" width="32" height="8"/><rect x="186" y="130" width="32" height="8"/><rect x="186" y="155" width="32" height="8"/><rect x="199" y="30" width="6" height="32"/>
      <rect x="120" y="150" width="30" height="60"/><rect x="150" y="135" width="22" height="75"/><rect x="232" y="140" width="26" height="70"/><rect x="262" y="160" width="34" height="50"/><rect x="300" y="150" width="20" height="60"/></g>
      <rect y="208" width="400" height="42" fill="#0F766E" opacity=".35"/>`,
    china: `<circle cx="320" cy="70" r="26" fill="#ffb86b" opacity=".8"/><g fill="#1e3a6e"><rect x="40" y="120" width="30" height="90"/><rect x="76" y="90" width="22" height="120"/><path d="M118 210V60l14-22 14 22v150z"/><rect x="160" y="110" width="34" height="100"/><rect x="200" y="70" width="26" height="140"/><circle cx="213" cy="62" r="12"/><rect x="232" y="130" width="40" height="80"/><rect x="280" y="100" width="24" height="110"/><rect x="310" y="140" width="40" height="70"/></g>
      <rect y="206" width="400" height="44" fill="#006CFF" opacity=".25"/><path d="M0 222h400M30 234h140M220 236h150" stroke="#fff" stroke-width="2" opacity=".6"/>`,
    singapore: `<g fill="#0f4c5c"><rect x="60" y="110" width="26" height="100"/><rect x="90" y="85" width="22" height="125"/><rect x="118" y="120" width="30" height="90"/><rect x="250" y="100" width="18" height="110"/><rect x="272" y="100" width="18" height="110"/><rect x="294" y="100" width="18" height="110"/><rect x="244" y="90" width="74" height="10" rx="5"/></g>
      <g fill="#0D9488"><path d="M170 210l8-70h6l8 70z"/><ellipse cx="181" cy="138" rx="22" ry="8"/><path d="M200 210l6-55h5l6 55z"/><ellipse cx="208" cy="153" rx="17" ry="6"/><path d="M330 210l7-60h5l7 60z"/><ellipse cx="340" cy="148" rx="19" ry="7"/></g>
      <rect y="206" width="400" height="44" fill="#006CFF" opacity=".22"/>`,
    office: `<rect x="230" y="30" width="140" height="110" rx="6" fill="#fff" opacity=".8"/><path d="M300 30v110M230 85h140" stroke="#cfe0ff" stroke-width="3"/><g fill="#9ec5ff" opacity=".7"><rect x="240" y="95" width="12" height="40"/><rect x="256" y="80" width="12" height="55"/><rect x="310" y="90" width="14" height="45"/><rect x="330" y="70" width="12" height="65"/></g>
      <rect x="30" y="170" width="340" height="12" rx="4" fill="#0F766E"/><rect x="60" y="182" width="8" height="60" fill="#0F766E"/><rect x="332" y="182" width="8" height="60" fill="#0F766E"/>
      ${person(120, 120, '#006CFF', '#3b2a20')}${person(250, 125, '#0D9488', '#1d1d1d')}<rect x="150" y="140" width="56" height="32" rx="3" fill="#1e293b"/><rect x="146" y="168" width="64" height="5" rx="2" fill="#475569"/>`,
    meeting: `<ellipse cx="200" cy="190" rx="150" ry="26" fill="#0F766E"/>${person(110, 120, '#006CFF', '#2b2b2b')}${person(200, 105, '#0D9488', '#5a3825')}${person(290, 120, '#7c93b8', '#1d1d1d')}
      <rect x="160" y="168" width="40" height="14" rx="2" fill="#fff"/><rect x="215" y="172" width="34" height="10" rx="2" fill="#e5f0ff"/><rect x="300" y="30" width="80" height="54" rx="4" fill="#fff"/><path d="M312 72l14-16 12 9 16-22" stroke="#0D9488" stroke-width="3" fill="none"/>`,
    studio: `<rect x="40" y="40" width="120" height="80" rx="6" fill="#fff"/><circle cx="75" cy="78" r="18" fill="#0D9488" opacity=".7"/><rect x="100" y="60" width="44" height="40" rx="4" fill="#006CFF" opacity=".6"/>
      <rect x="250" y="50" width="110" height="70" rx="6" fill="#1e293b"/><rect x="262" y="62" width="40" height="8" rx="2" fill="#5eead4"/><rect x="262" y="78" width="80" height="6" rx="2" fill="#93c5fd"/><rect x="262" y="90" width="60" height="6" rx="2" fill="#93c5fd"/>
      <rect x="20" y="180" width="360" height="10" rx="4" fill="#0F766E"/>${person(200, 125, '#006CFF', '#3b2a20')}`,
    tech: `<rect x="90" y="70" width="100" height="66" rx="5" fill="#1e293b"/><rect x="200" y="70" width="100" height="66" rx="5" fill="#1e293b"/><g fill="#5eead4"><rect x="100" y="82" width="50" height="5"/><rect x="100" y="94" width="70" height="5"/><rect x="210" y="82" width="40" height="5"/></g><g fill="#93c5fd"><rect x="110" y="106" width="60" height="5"/><rect x="210" y="94" width="76" height="5"/><rect x="220" y="106" width="50" height="5"/></g>
      <rect x="30" y="180" width="340" height="10" rx="4" fill="#0F766E"/>${person(195, 175, '#0D9488', '#1d1d1d')}`,
    finance: `<rect x="40" y="40" width="150" height="100" rx="6" fill="#fff"/><path d="M55 120l30-30 25 18 30-40 35 20" stroke="#006CFF" stroke-width="4" fill="none"/><g fill="#0D9488"><rect x="230" y="90" width="18" height="50"/><rect x="254" y="70" width="18" height="70"/><rect x="278" y="100" width="18" height="40"/><rect x="302" y="60" width="18" height="80"/></g>
      <rect x="30" y="180" width="340" height="10" rx="4" fill="#0F766E"/>${person(110, 175, '#006CFF', '#5a3825')}`
  } as Record<string, string>)[kind] || '';
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(s.alt)}">${g}${art}</svg>`;
}
