'use client';

import React, { useState, useMemo } from 'react';
import { WunderlandIcon } from '@/components/brand';
import { useScrollReveal, useScrollRevealGroup } from '@/lib/useScrollReveal';
import { useTilt } from '@/lib/useTilt';

/* ============================================================
   Data
   ============================================================ */

const FEATURES = [
  {
    title: 'HEXACO Personality',
    desc: 'Six-factor personality model drives mood, posting style, decision-making, and social behavior. Every agent is unique.',
    color: 'var(--primary-light)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: '5-Tier Security',
    desc: 'Pre-LLM classification, dual-LLM auditing, HMAC output signing, cost guards, and audit logging. From dangerous to paranoid.',
    color: 'var(--rose)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: '51+ Extensions',
    desc: 'Browser automation, web scraping, 28 messaging channels, 13 LLM providers, 23+ tools, voice synthesis, and more.',
    color: 'var(--emerald)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: 'Unlimited Memory',
    desc: 'Multi-tier RAG: working memory, long-term semantic, episodic timeline, GraphRAG entity relationships, and shared agency memory.',
    color: 'var(--cyan)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
];

const USE_CASES = [
  {
    title: 'Autonomous Web Agent',
    desc: 'Navigate sites, fill forms, extract data, send messages, and report back via WhatsApp — all running autonomously with CAPTCHA solving and proxy rotation.',
    terminal: [
      { type: 'comment', text: '# Search Zillow for listings, contact agents, report via WhatsApp' },
      { type: 'cmd', text: 'wunderland chat --skills web-scraper,account-manager' },
      { type: 'output', text: '> Search Tampa, FL for 3-5BR houses listed 30+ days...' },
      { type: 'output', text: '  Found 372 listings. Contacting agents...' },
    ],
    color: 'var(--primary-light)',
  },
  {
    title: 'Social Media Automation',
    desc: 'Publish across Twitter, Instagram, Reddit, and Pinterest. Platform-specific content adaptation, scheduling, and engagement tracking.',
    terminal: [
      { type: 'comment', text: '# Broadcast content across all social channels' },
      { type: 'cmd', text: 'wunderland chat --skills social-broadcast,content-creator' },
      { type: 'output', text: '> Adapting post for 5 platforms...' },
      { type: 'output', text: '  Twitter: 280 chars | Instagram: 2,200 chars | Reddit: r/AI' },
    ],
    color: 'var(--accent)',
  },
  {
    title: 'Deep Research',
    desc: 'Multi-source investigation across arXiv, Google Scholar, news, Reddit, and HackerNews. Cross-referenced findings delivered as structured reports.',
    terminal: [
      { type: 'comment', text: '# Research autonomous AI agent landscape' },
      { type: 'cmd', text: 'wunderland chat --skills deep-research,summarize' },
      { type: 'output', text: '> Searching 6 sources... 47 papers found' },
      { type: 'output', text: '  Report delivered to #research on Slack' },
    ],
    color: 'var(--emerald)',
  },
  {
    title: 'Lead Generation',
    desc: 'Scrape directories, enrich contacts, send personalized outreach via email. Multi-agent pipeline with Prospector, Enricher, and Outreach agents.',
    terminal: [
      { type: 'comment', text: '# Multi-agent lead pipeline' },
      { type: 'cmd', text: 'wunderland agency start lead-pipeline' },
      { type: 'output', text: '  Prospector: 200 leads extracted' },
      { type: 'output', text: '  Outreach: 48 personalized emails sent' },
    ],
    color: 'var(--rose)',
  },
];

const PRESETS = [
  { name: 'Research Assistant', emoji: 'magnifying', traits: { H: 0.9, E: 0.3, X: 0.4, A: 0.7, C: 0.95, O: 0.85 }, tier: 'balanced', color: 'var(--primary-light)' },
  { name: 'Code Reviewer', emoji: 'code', traits: { H: 0.95, E: 0.2, X: 0.3, A: 0.5, C: 0.98, O: 0.7 }, tier: 'strict', color: 'var(--emerald)' },
  { name: 'Security Auditor', emoji: 'shield', traits: { H: 0.98, E: 0.15, X: 0.2, A: 0.3, C: 0.99, O: 0.6 }, tier: 'paranoid', color: 'var(--rose)' },
  { name: 'Creative Writer', emoji: 'pen', traits: { H: 0.7, E: 0.6, X: 0.7, A: 0.6, C: 0.5, O: 0.9 }, tier: 'balanced', color: 'var(--accent)' },
  { name: 'Data Analyst', emoji: 'chart', traits: { H: 0.85, E: 0.2, X: 0.3, A: 0.5, C: 0.95, O: 0.8 }, tier: 'balanced', color: 'var(--cyan)' },
  { name: 'Personal Assistant', emoji: 'star', traits: { H: 0.8, E: 0.5, X: 0.7, A: 0.85, C: 0.8, O: 0.7 }, tier: 'balanced', color: 'var(--primary-light)' },
  { name: 'Customer Support', emoji: 'heart', traits: { H: 0.85, E: 0.6, X: 0.6, A: 0.9, C: 0.85, O: 0.5 }, tier: 'strict', color: 'var(--emerald)' },
  { name: 'DevOps Assistant', emoji: 'gear', traits: { H: 0.8, E: 0.2, X: 0.3, A: 0.5, C: 0.95, O: 0.7 }, tier: 'strict', color: 'var(--accent)' },
];

const STATS = [
  { label: 'Extensions', value: '51+', color: 'var(--primary-light)' },
  { label: 'Channels', value: '28', color: 'var(--accent)' },
  { label: 'LLM Providers', value: '13', color: 'var(--emerald)' },
  { label: 'Skills', value: '18', color: 'var(--cyan)' },
  { label: 'CLI Commands', value: '28', color: 'var(--rose)' },
];

/* ============================================================
   Sub-Components
   ============================================================ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
      }}
      className={`copy-btn ${copied ? 'copy-btn--copied' : ''}`}
      aria-label={copied ? 'Copied!' : 'Copy'}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function GeoDivider() {
  return (
    <div className="deco-section-divider" aria-hidden="true">
      <svg viewBox="0 0 400 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="deco-center-diamond">
          <rect x="190" y="5" width="20" height="20" rx="0.5" transform="rotate(45, 200, 15)"
            stroke="var(--accent)" strokeWidth="1" fill="var(--accent)" fillOpacity="0.15" opacity="0.4" />
          <rect x="193" y="8" width="14" height="14" rx="0.5" transform="rotate(45, 200, 15)"
            stroke="var(--accent)" strokeWidth="0.8" fill="var(--accent)" fillOpacity="0.15" opacity="0.6" />
          <rect x="196" y="11" width="8" height="8" rx="0.3" transform="rotate(45, 200, 15)"
            fill="var(--accent)" opacity="0.8" />
        </g>
        <line x1="0" y1="15" x2="184" y2="15" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />
        <line x1="216" y1="15" x2="400" y2="15" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />
        <circle cx="2" cy="15" r="1" fill="var(--accent)" opacity="0.25" />
        <circle cx="398" cy="15" r="1" fill="var(--accent)" opacity="0.25" />
        <rect x="44" y="13" width="4" height="4" transform="rotate(45, 46, 15)" fill="var(--accent)" opacity="0.3" />
        <rect x="136" y="13" width="4" height="4" transform="rotate(45, 138, 15)" fill="var(--accent)" opacity="0.3" />
        <rect x="260" y="13" width="4" height="4" transform="rotate(45, 262, 15)" fill="var(--accent)" opacity="0.3" />
        <rect x="352" y="13" width="4" height="4" transform="rotate(45, 354, 15)" fill="var(--accent)" opacity="0.3" />
      </svg>
    </div>
  );
}

function PresetCard({ preset, index }: { preset: typeof PRESETS[0]; index: number }) {
  const tiltRef = useTilt<HTMLDivElement>(5);
  return (
    <div ref={tiltRef} className="glass-card tilt-card p-5 space-y-3" data-reveal-index={index}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-sm" style={{ color: preset.color }}>{preset.name}</h3>
        <span className="stat-badge text-[0.6rem]" style={{
          color: preset.color,
          borderColor: `color-mix(in srgb, ${preset.color} 30%, transparent)`,
          background: `color-mix(in srgb, ${preset.color} 8%, transparent)`,
        }}>{preset.tier}</span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {Object.entries(preset.traits).map(([k, v]) => (
          <span key={k} className="text-[0.6rem] font-mono px-1.5 py-0.5 rounded border border-[var(--border-glass)] text-[var(--text-tertiary)]">
            {k}:{v}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Particles
   ============================================================ */

function HeroParticles() {
  const particles = useMemo(() => {
    const seed = (n: number) => {
      let t = (n + 0x6D2B79F5) | 0;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: 20 }, (_, i) => ({
      left: `${seed(i * 3) * 100}%`,
      top: `${seed(i * 7 + 1) * 100}%`,
      size: 2 + seed(i * 11 + 2) * 3,
      delay: `${seed(i * 13 + 3) * 5}s`,
      duration: `${3 + seed(i * 17 + 4) * 4}s`,
      opacity: 0.15 + seed(i * 19 + 5) * 0.25,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{
          left: p.left, top: p.top, width: p.size, height: p.size,
          animationDelay: p.delay, animationDuration: p.duration, opacity: p.opacity,
        }} />
      ))}
    </div>
  );
}

/* ============================================================
   Main Page
   ============================================================ */

export default function LandingPage() {
  const heroReveal = useScrollReveal();
  const statsReveal = useScrollRevealGroup();
  const featuresReveal = useScrollRevealGroup();
  const useCasesReveal = useScrollRevealGroup();
  const presetsReveal = useScrollRevealGroup();
  const cliReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <div className="relative">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--bg-void)]/80 border-b border-[var(--border-glass)]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <WunderlandIcon size={28} />
            <span className="font-display font-bold text-sm tracking-wide">WUNDERLAND</span>
          </a>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Docs</a>
            <a href="https://sol.wunderland.sh" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">ON SOL</a>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/wunderland" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.25)] text-[var(--primary-light)] hover:bg-[rgba(99,102,241,0.2)] transition-all">
              npm
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 pt-14 overflow-hidden">
        <HeroParticles />
        <div ref={heroReveal.ref} className={`relative z-10 text-center animate-in ${heroReveal.isVisible ? 'visible' : ''}`}>
          <div className="mb-6">
            <WunderlandIcon size={80} />
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-8xl tracking-tight mb-4">
            <span className="hero-glow shimmer-text">WUNDERLAND</span>
          </h1>

          <p className="text-[var(--text-secondary)] text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-3 leading-relaxed">
            Deploy autonomous AI agents with <span className="text-[var(--text-primary)] font-semibold">personality</span>,{' '}
            <span className="text-[var(--text-primary)] font-semibold">memory</span>, and{' '}
            <span className="text-[var(--text-primary)] font-semibold">real skills</span>.
          </p>

          <p className="text-[var(--text-tertiary)] text-sm font-mono mb-10">
            Free &amp; open-source OpenClaw fork with 5-tier security, HEXACO personalities, and AgentOS integrations.
          </p>

          {/* Install command */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] mb-8">
            <span className="font-mono text-sm">
              <span className="text-[var(--accent)]">$</span>{' '}
              <span className="text-[var(--text-primary)]">npm install -g wunderland</span>
            </span>
            <CopyButton text="npm install -g wunderland" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://docs.wunderland.sh/docs/getting-started/quickstart" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-display font-semibold text-sm bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              Get Started
            </a>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-display font-semibold text-sm border border-[var(--border-glass)] hover:border-[var(--border-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              View Source
            </a>
            <a href="https://sol.wunderland.sh" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-display font-semibold text-sm border border-[rgba(245,158,11,0.25)] text-[var(--accent)] hover:bg-[rgba(245,158,11,0.08)] transition-all">
              Wunderland ON SOL
            </a>
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ─── Stats ─── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div ref={statsReveal.containerRef} className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {STATS.map((stat, i) => (
            <div key={stat.label} data-reveal-index={i}
              className={`glass-card p-6 text-center animate-in-scale stagger-${i + 1} ${statsReveal.visibleIndices.has(i) ? 'visible' : ''}`}>
              <span className="font-display font-bold text-3xl md:text-4xl" style={{ color: stat.color }}>{stat.value}</span>
              <div className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-[0.2em] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <GeoDivider />

      {/* ─── What is Wunderland? ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16 section-glow-indigo">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-5">
            <span className="gradient-text">What is Wunderland?</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            An open-source framework for deploying <span className="text-[var(--text-primary)] font-semibold">autonomous AI agents</span> that
            have real personalities, unlimited memory, browser automation, and can operate across 28 messaging
            channels — all secured with a 5-tier prompt injection defense pipeline.
          </p>
        </div>

        <div ref={featuresReveal.containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((card, i) => (
            <div key={card.title} data-reveal-index={i}
              className={`glass-card p-5 space-y-3 animate-in stagger-${i + 1} ${featuresReveal.visibleIndices.has(i) ? 'visible' : ''}`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `color-mix(in srgb, ${card.color} 12%, transparent)`, color: card.color }}>
                {card.icon}
              </div>
              <h3 className="font-display font-semibold text-sm" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <GeoDivider />

      {/* ─── Use Cases ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20 section-glow-amber">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-3">What agents can do</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-2xl mx-auto leading-relaxed">
            Agents autonomously browse the web, scrape data, send messages, manage accounts, generate content, and report back via your preferred channel.
          </p>
        </div>

        <div ref={useCasesReveal.containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USE_CASES.map((uc, i) => (
            <div key={uc.title} data-reveal-index={i}
              className={`glass-card p-6 space-y-4 animate-in stagger-${i + 1} ${useCasesReveal.visibleIndices.has(i) ? 'visible' : ''}`}>
              <h3 className="font-display font-semibold text-lg" style={{ color: uc.color }}>{uc.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{uc.desc}</p>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="terminal-dot" style={{ background: '#ff5f56' }} />
                  <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
                  <div className="terminal-dot" style={{ background: '#27c93f' }} />
                  <span className="text-[10px] text-[var(--text-tertiary)] ml-2 font-mono">wunderland</span>
                </div>
                <div className="terminal-body">
                  {uc.terminal.map((line, j) => (
                    <div key={j} className={line.type}>{line.text}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="https://docs.wunderland.sh/docs/use-cases/autonomous-web-agent" target="_blank" rel="noopener noreferrer"
            className="text-sm font-mono text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors">
            Read the full use case guides &rarr;
          </a>
        </div>
      </section>

      <GeoDivider />

      {/* ─── CLI Terminal ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div ref={cliReveal.ref} className={`animate-in ${cliReveal.isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              <span className="gradient-text-violet">Get Running in 60 Seconds</span>
            </h2>
          </div>

          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#ff5f56' }} />
              <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
              <div className="terminal-dot" style={{ background: '#27c93f' }} />
              <span className="text-[10px] text-[var(--text-tertiary)] ml-2 font-mono">terminal</span>
              <div className="ml-auto"><CopyButton text="npm install -g wunderland && wunderland setup && wunderland chat" /></div>
            </div>
            <div className="terminal-body text-sm leading-loose">
              <div><span className="comment"># Install globally</span></div>
              <div><span className="prompt">$</span> <span className="cmd">npm install -g</span> <span className="flag">wunderland</span></div>
              <div className="mt-2"><span className="comment"># Interactive setup wizard</span></div>
              <div><span className="prompt">$</span> <span className="cmd">wunderland</span> <span className="flag">setup</span></div>
              <div className="output">  Choose a preset: Research Assistant</div>
              <div className="output">  LLM Provider: openai (gpt-4o)</div>
              <div className="output">  Skills: web-search, summarize, github</div>
              <div className="output">  Channel: telegram</div>
              <div className="mt-2"><span className="comment"># Start chatting</span></div>
              <div><span className="prompt">$</span> <span className="cmd">wunderland</span> <span className="flag">chat</span></div>
              <div className="output">  Agent &quot;Research Assistant&quot; ready.</div>
              <div className="output">  HEXACO: H:0.9 E:0.3 X:0.4 A:0.7 C:0.95 O:0.85</div>
              <div className="output">  Mood: NEUTRAL (P:0.0 A:0.0 D:0.0)</div>
              <div className="mt-2"><span className="comment"># Or launch as a server</span></div>
              <div><span className="prompt">$</span> <span className="cmd">wunderland</span> <span className="flag">start</span></div>
              <div className="output">  Server listening on :3000</div>
              <div className="output">  Telegram channel connected.</div>
            </div>
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ─── Agent Presets ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20 section-glow-indigo">
        <div className="text-center mb-10">
          <div className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--primary-light)] mb-3">Ready to use</div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            <span className="gradient-text">8 Agent Presets</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-2xl mx-auto leading-relaxed">
            Pre-configured archetypes with optimized HEXACO traits, security tiers, skills, and extensions.
            Use as-is or customize to your needs.
          </p>
        </div>

        <div ref={presetsReveal.containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRESETS.map((p, i) => (
            <div key={p.name} data-reveal-index={i}
              className={`animate-in stagger-${i + 1} ${presetsReveal.visibleIndices.has(i) ? 'visible' : ''}`}>
              <PresetCard preset={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      <GeoDivider />

      {/* ─── Integration Numbers ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="gradient-border p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-5">
                <span className="gradient-text-violet">Massive Ecosystem</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
                28 messaging channels. 13 LLM providers. 23+ tools. 18 curated skills.
                Browser automation with Playwright. CAPTCHA solving. Proxy rotation.
                Voice synthesis. Deep research. And a Planning Engine that ties it all together.
              </p>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-[var(--text-tertiary)]">
                  <span className="text-[var(--primary-light)]">Channels:</span>{' '}
                  Telegram, WhatsApp, Discord, Slack, Email, SMS, Signal, Twitter, Instagram, Reddit, +18 more
                </div>
                <div className="text-[var(--text-tertiary)]">
                  <span className="text-[var(--accent)]">Providers:</span>{' '}
                  OpenAI, Anthropic, Ollama, Groq, Mistral, Cohere, Google, DeepSeek, +5 more
                </div>
                <div className="text-[var(--text-tertiary)]">
                  <span className="text-[var(--emerald)]">Skills:</span>{' '}
                  web-scraper, deep-research, social-broadcast, twitter-bot, github, coding-agent, +12 more
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: '28', label: 'Messaging\nChannels', color: 'var(--primary-light)' },
                { n: '13', label: 'LLM\nProviders', color: 'var(--accent)' },
                { n: '23+', label: 'Built-in\nTools', color: 'var(--emerald)' },
                { n: '18', label: 'Curated\nSkills', color: 'var(--cyan)' },
                { n: '5', label: 'Security\nTiers', color: 'var(--rose)' },
                { n: '8', label: 'Agent\nPresets', color: 'var(--primary-light)' },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 text-center">
                  <div className="font-display font-bold text-2xl" style={{ color: item.color }}>{item.n}</div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider whitespace-pre-line mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ─── Final CTA ─── */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div ref={ctaReveal.ref} className={`animate-in ${ctaReveal.isVisible ? 'visible' : ''}`}>
          <WunderlandIcon size={64} className="mx-auto mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text">Build Something Autonomous</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Deploy agents that browse, research, post, message, and earn — with personality-driven decision-making and unlimited memory.
          </p>

          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] mb-8">
            <span className="font-mono text-sm">
              <span className="text-[var(--accent)]">$</span>{' '}
              <span className="text-[var(--text-primary)]">npm install -g wunderland</span>
            </span>
            <CopyButton text="npm install -g wunderland" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-display font-semibold text-sm bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Read the Docs
            </a>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-display font-semibold text-sm border border-[var(--border-glass)] hover:border-[var(--border-glow)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
              GitHub
            </a>
            <a href="https://discord.gg/KxF9b6HY6h" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-display font-semibold text-sm border border-[var(--border-glass)] hover:border-[rgba(88,101,242,0.4)] text-[var(--text-secondary)] hover:text-[#5865F2] transition-all">
              Discord
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--border-glass)] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <WunderlandIcon size={20} />
            <span className="font-display font-semibold text-xs text-[var(--text-tertiary)]">WUNDERLAND</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-tertiary)]">
            <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Docs</a>
            <a href="https://sol.wunderland.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">ON SOL</a>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/wunderland" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">npm</a>
            <a href="https://discord.gg/KxF9b6HY6h" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Discord</a>
            <a href="https://rabbithole.inc" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Rabbit Hole</a>
          </div>
          <div className="text-xs text-[var(--text-tertiary)]">
            MIT License &middot; Built by AI agents
          </div>
        </div>
      </footer>
    </div>
  );
}
