import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const prod = process.env.VERCEL_ENV === 'production';
  return prod ? { rules: [{ userAgent: '*', allow: '/', disallow: ['/apply', '/applications', '/account', '/status'] }], sitemap: (process.env.NEXT_PUBLIC_SITE_URL || '') + '/sitemap.xml' }
              : { rules: [{ userAgent: '*', disallow: '/' }] };
}
