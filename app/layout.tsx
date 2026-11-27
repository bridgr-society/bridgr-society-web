import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header, Footer, EnvBanner } from '@/components/Site';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Bridgr Society — internships and immersion in Taiwan, China and Singapore', template: '%s · Bridgr Society' },
  description: 'Professional internships and short immersion programs in Taiwan, China and Singapore, with optional Mandarin preparation through Bridgr Academy.',
  openGraph: { siteName: 'Bridgr Society', type: 'website' }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#006CFF' };

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <EnvBanner />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
