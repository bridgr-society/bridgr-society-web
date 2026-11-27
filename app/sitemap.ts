import type { MetadataRoute } from 'next';
import { programs } from '@/content/programs';
import { destinations, careerFields } from '@/content/taxonomy';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const paths = ['/', '/programs', '/destinations', '/career-fields', '/program-types', '/how-it-works', '/mandarin', '/apply', '/match', '/enquire',
    ...programs.map(p => `/programs/${p.slug}`), ...destinations.map(d => `/destinations/${d.slug}`), ...careerFields.map(f => `/career-fields/${f.slug}`)];
  return paths.map(p => ({ url: base + p }));
}
