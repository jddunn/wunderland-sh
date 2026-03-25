import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

const SITE_URL = 'https://wunderland.sh';
const SITE_NAME = 'WUNDERLAND';
const SITE_DESC = 'Build autonomous AI agents with cognitive memory, HEXACO personalities, voice pipelines, 37 channels, 5-tier guardrails, and 21 LLM providers. Free open-source TypeScript CLI — npm i wunderland';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0b2e',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Agent CLI Framework | Build Autonomous Agents`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: 'Wunderland',
  keywords: [
    'Wunderland', 'AI agent CLI', 'build AI agents', 'autonomous AI agents',
    'agentic AI framework', 'TypeScript AI framework', 'open source AI agents',
    'cognitive memory', 'HEXACO personality', 'multi-agent orchestration',
    'AI guardrails', 'prompt injection defense', 'voice AI agents',
    'RAG memory', 'browser automation', 'social media automation',
    'LLM providers', 'agent skills', 'agent extensions',
    'WhatsApp bot', 'Telegram bot', 'Discord bot',
    'LangGraph alternative', 'CrewAI alternative', 'AgentOS',
    'graph orchestration', 'AI workflow automation', 'self-hosted AI',
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE_NAME }],
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icon-192.png' }],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Wunderland',
    description: SITE_DESC,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    downloadUrl: 'https://www.npmjs.com/package/wunderland',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    codeRepository: 'https://github.com/jddunn/wunderland',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '35' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rabbit Hole Inc',
    url: 'https://rabbithole.inc',
    logo: 'https://wunderland.sh/icon-512.png',
    sameAs: [
      'https://github.com/jddunn/wunderland',
      'https://discord.gg/KxF9b6HY6h',
      'https://www.linkedin.com/company/manicagency',
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* Blocking script: apply saved theme before first paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('wl-theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased min-h-screen relative">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
