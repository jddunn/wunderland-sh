import { LandingPageClient } from '@/components/LandingPageClient';

/**
 * Server component for the landing page.
 * Renders static SEO-critical content (headings, features, stats) as plain HTML
 * for crawlers via noscript, plus the full interactive client component that hydrates on top.
 */
export default function Page() {
  return (
    <>
      {/* Static SEO content visible to crawlers without JS */}
      <noscript>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
          <h1>WUNDERLAND — Autonomous AI Agent Framework</h1>
          <p>
            The open-source OpenClaw fork for deploying autonomous AI agents with personality,
            memory, and real skills. Free and open-source TypeScript CLI.
          </p>
          <p>npm install -g wunderland</p>
          <h2>Key Features</h2>
          <ul>
            <li>HEXACO Personality — Six-factor personality model drives mood, posting style, decision-making</li>
            <li>5-Tier Security — Pre-LLM classification, dual-LLM auditing, HMAC output signing</li>
            <li>100+ Extensions — Browser automation, web scraping, 37 messaging channels, 21 LLM providers</li>
            <li>Email Intelligence — Gmail integration with AI-powered project intelligence</li>
            <li>Channel Integrations — WhatsApp, Slack, Signal, Telegram, Discord, Gmail, and 31 more</li>
            <li>Voice and Speech — TTS and STT with OpenAI, ElevenLabs, Piper, Whisper, Deepgram</li>
            <li>Unlimited Memory — Multi-tier RAG: working, long-term semantic, episodic, GraphRAG</li>
          </ul>
          <h2>By the Numbers</h2>
          <ul>
            <li>100+ Extensions</li>
            <li>37 Channels</li>
            <li>21 LLM Providers</li>
            <li>80 Skills</li>
            <li>46 CLI Commands</li>
          </ul>
          <h2>Use Cases</h2>
          <ul>
            <li>Autonomous Web Agent — Navigate sites, fill forms, extract data, send messages</li>
            <li>Social Media Automation — Publish across Twitter, Instagram, LinkedIn, and more</li>
            <li>Deep Research — Multi-source investigation across arXiv, Google Scholar, news</li>
            <li>Lead Generation — Scrape directories, enrich contacts, send personalized outreach</li>
          </ul>
          <h2>8 Agent Presets</h2>
          <p>Research Assistant, Code Reviewer, Security Auditor, Creative Writer, Data Analyst, Personal Assistant, Customer Support, DevOps Assistant</p>
          <h2>Built on AgentOS</h2>
          <p>Wunderland is built on AgentOS, an open-source operating system for autonomous AI agents.</p>
          <p>
            <a href="https://docs.wunderland.sh">Documentation</a> |{' '}
            <a href="https://github.com/jddunn/wunderland">GitHub</a> |{' '}
            <a href="https://discord.gg/KxF9b6HY6h">Discord</a>
          </p>
        </div>
      </noscript>
      <LandingPageClient />
    </>
  );
}
