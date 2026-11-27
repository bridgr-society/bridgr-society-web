/* Line icons (18px grid). Static markup only. */
const P = {
 "pin": "<path d=\"M9 16s5-4.6 5-8.6A5 5 0 004 7.4C4 11.4 9 16 9 16z\"/><circle cx=\"9\" cy=\"7.4\" r=\"1.8\"/>",
 "brief": "<rect x=\"2.5\" y=\"5.5\" width=\"13\" height=\"9\" rx=\"1.6\"/><path d=\"M6.5 5.5V4a1 1 0 011-1h3a1 1 0 011 1v1.5M2.5 9.5h13\"/>",
 "mega": "<path d=\"M3 7.5v3h2.5l6 3.5v-10l-6 3.5zM14 7a3 3 0 010 4\"/>",
 "pen": "<path d=\"M3.5 14.5l1-3.6 7.7-7.7a1.8 1.8 0 012.6 2.6l-7.7 7.7z\"/>",
 "code": "<path d=\"M6 5L2.5 9 6 13M12 5l3.5 4-3.5 4M10 3.5l-2 11\"/>",
 "chart": "<path d=\"M3 15V9M7.5 15V5M12 15v-4M16 15V3\"/>",
 "film": "<rect x=\"2.5\" y=\"4\" width=\"13\" height=\"10\" rx=\"1.5\"/><path d=\"M2.5 7h13M6 4l-1.5 3M10 4L8.5 7M14 4l-1.5 3\"/>",
 "clock": "<circle cx=\"9\" cy=\"9\" r=\"6.3\"/><path d=\"M9 5.4V9l2.4 1.6\"/>",
 "lang": "<path d=\"M2.5 4.5h7M6 3v1.5c0 3-1.7 5.5-3.5 6.5M4.2 7.4c.8 1.5 2.2 2.6 3.8 3.1M9 15l3-7 3 7M10 13h4\"/>",
 "cal": "<rect x=\"3\" y=\"4\" width=\"12\" height=\"11\" rx=\"2\"/><path d=\"M3 7.6h12M6.3 2.6v2.6M11.7 2.6v2.6\"/>",
 "right": "<path d=\"M7 4.5L11.5 9 7 13.5\"/>",
 "left": "<path d=\"M11 4.5L6.5 9 11 13.5\"/>",
 "check": "<path d=\"M3.8 9.4l3.3 3.2 7.1-7.4\"/>",
 "close": "<path d=\"M4.5 4.5l9 9M13.5 4.5l-9 9\"/>",
 "menu": "<path d=\"M3 5h12M3 9h12M3 13h12\"/>",
 "info": "<circle cx=\"9\" cy=\"9\" r=\"6.3\"/><path d=\"M9 8.3v4M9 5.8v.2\"/>",
 "lock": "<rect x=\"3.6\" y=\"8\" width=\"10.8\" height=\"7.4\" rx=\"1.6\"/><path d=\"M6 8V5.8a3 3 0 016 0V8\"/>",
 "user": "<circle cx=\"9\" cy=\"6.2\" r=\"3\"/><path d=\"M3.5 15.4c.8-3 3-4.6 5.5-4.6s4.7 1.6 5.5 4.6\"/>",
 "search": "<circle cx=\"8\" cy=\"8\" r=\"4.7\"/><path d=\"M11.6 11.6L15 15\"/>",
 "filter": "<path d=\"M3 4.5h12M5.5 9h7M8 13.5h2\"/>",
 "doc": "<path d=\"M5 2.8h5.2L13.5 6v9.2H5z\"/><path d=\"M10 2.8V6h3.5\"/>",
 "heart": "<path d=\"M9 15S2.8 11.3 2.8 6.8A3.3 3.3 0 019 5a3.3 3.3 0 016.2 1.8C15.2 11.3 9 15 9 15z\"/>",
 "spark": "<path d=\"M9 2.5v3M9 12.5v3M2.5 9h3M12.5 9h3M4.5 4.5l2 2M11.5 11.5l2 2M13.5 4.5l-2 2M6.5 11.5l-2 2\"/>",
 "globe": "<circle cx=\"9\" cy=\"9\" r=\"6.3\"/><path d=\"M2.7 9h12.6M9 2.7c1.8 1.9 2.6 4 2.6 6.3S10.8 13.4 9 15.3C7.2 13.4 6.4 11.3 6.4 9S7.2 4.6 9 2.7z\"/>",
 "mail": "<rect x=\"2.5\" y=\"4\" width=\"13\" height=\"10\" rx=\"1.6\"/><path d=\"M3 5l6 4.5L15 5\"/>",
 "book": "<path d=\"M3 3.5h4.5A1.5 1.5 0 019 5v10a1.5 1.5 0 00-1.5-1.5H3zM15 3.5h-4.5A1.5 1.5 0 009 5v10a1.5 1.5 0 011.5-1.5H15z\"/>",
 "shield": "<path d=\"M9 2.5l5.5 2v4.3c0 3.3-2.3 5.8-5.5 6.7-3.2-.9-5.5-3.4-5.5-6.7V4.5z\"/><path d=\"M6.5 9l1.8 1.8L11.8 7\"/>",
 "swap": "<path d=\"M4 6h10l-3-3M14 12H4l3 3\"/>",
 "plus": "<path d=\"M9 3.5v11M3.5 9h11\"/>",
 "edit": "<path d=\"M3.5 14.5l1-3.6 7.7-7.7a1.8 1.8 0 012.6 2.6l-7.7 7.7z\"/><path d=\"M10.8 4.6l2.6 2.6\"/>",
 "share": "<circle cx=\"13\" cy=\"4.5\" r=\"2\"/><circle cx=\"5\" cy=\"9\" r=\"2\"/><circle cx=\"13\" cy=\"13.5\" r=\"2\"/><path d=\"M6.8 8l4.4-2.5M6.8 10l4.4 2.5\"/>",
 "out": "<path d=\"M7 3.5H4a1 1 0 00-1 1v9a1 1 0 001 1h3M11 6l3 3-3 3M14 9H7\"/>"
} as const;
export type IconName = keyof typeof P;
export function Icon({ name, size = 18 }: { name: IconName; size?: number }){
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: P[name] }} />;
}
