import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

const SITE_URL = 'https://wunderland.sh';
const SITE_NAME = 'WUNDERLAND';
const SITE_DESC = 'Free open-source autonomous AI agent framework with HEXACO personalities, 5-tier security, 51+ extensions, 28 messaging channels, browser automation, and unlimited RAG memory. Deploy via npm CLI.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0b2e',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Autonomous AI Agent Framework | npm CLI`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: 'Wunderland',
  keywords: [
    'AI agents', 'autonomous agents', 'agent framework', 'agentic AI',
    'HEXACO personality', 'browser automation', 'web scraping',
    'AI agent CLI', 'npm CLI', 'open source AI',
    'Wunderland', 'OpenClaw fork', 'AgentOS',
    'prompt injection defense', 'agent security',
    'multi-channel AI', 'WhatsApp bot', 'Telegram bot', 'Discord bot',
    'RAG memory', 'agent skills', 'agent extensions',
  ],
  authors: [{ name: 'Rabbit Hole Inc', url: 'https://rabbithole.inc' }],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    siteName: 'Wunderland',
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESC,
    site: '@wunderlandsh',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icon-192.png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'wunderland',
  description: SITE_DESC,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Linux, Windows',
  downloadUrl: 'https://www.npmjs.com/package/wunderland',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  codeRepository: 'https://github.com/jddunn/wunderland',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen relative">
        {children}
      </body>
    </html>
  );
}
