import type { NextConfig } from 'next';

/* Security headers for every route. Preview deployments are also kept out of
   search engines (see app/robots.ts and the X-Robots-Tag below). */
const isProd = process.env.VERCEL_ENV === 'production';

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ...(isProd ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }])
      ]
    }];
  }
};
export default config;
