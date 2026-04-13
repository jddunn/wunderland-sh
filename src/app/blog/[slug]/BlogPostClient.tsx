'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { WunderlandIcon, RabbitHoleIcon } from '@/components/brand';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { BlogPost } from '@/data/blog-posts';

function renderMarkdown(content: string): string {
  return content
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="blog-code"><code>$2</code></pre>')
    // Tables
    .replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g, (_, header, body) => {
      const heads = header.split('|').map((h: string) => h.trim()).filter(Boolean);
      const rows = body.trim().split('\n').map((row: string) =>
        row.split('|').map((c: string) => c.trim()).filter(Boolean)
      );
      return `<table class="blog-table"><thead><tr>${heads.map((h: string) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r: string[]) => `<tr>${r.map((c: string) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="blog-inline-code">$1</code>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>')
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>')
    // H4
    .replace(/^#### (.+)$/gm, '<h4 class="blog-h4">$1</h4>')
    // List items
    .replace(/^- (.+)$/gm, '<li class="blog-li">$1</li>')
    // Paragraphs (lines that aren't tags)
    .replace(/^(?!<[a-z])((?!^\s*$).+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return `<p class="blog-p">${match}</p>`;
    })
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, '<ul class="blog-ul">$1</ul>');
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="relative min-h-screen">
      {/* Nav — matches main page */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--bg-void)]/80 border-b border-[var(--border-glass)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <WunderlandIcon size={34} id="post-nav-wl" />
            <span className="font-display-syne font-bold text-base tracking-wide">WUNDERLAND</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 text-sm font-mono">
            <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Docs</a>
            <Link href="/blog" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Blog</Link>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/wunderland" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.25)] text-[var(--primary-light)] hover:bg-[rgba(99,102,241,0.2)] transition-all">
              npm
            </a>
            <a href="https://rabbithole.inc/app" target="_blank" rel="noopener noreferrer"
              className="nav-rabbithole-btn">
              <RabbitHoleIcon size={18} transparent id="post-nav-rh" />
              <span>Try the Web UI</span>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile hamburger + theme */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button type="button" onClick={() => setMobileMenuOpen(o => !o)} className="mobile-hamburger" aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
              <span className={`hamburger-line ${mobileMenuOpen ? 'hamburger-open' : ''}`} />
              <span className={`hamburger-line ${mobileMenuOpen ? 'hamburger-open' : ''}`} />
              <span className={`hamburger-line ${mobileMenuOpen ? 'hamburger-open' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden mobile-menu-overlay" onClick={closeMobileMenu}>
            <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
              <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="mobile-menu-link">Docs</a>
              <a href="/blog" onClick={closeMobileMenu} className="mobile-menu-link">Blog</a>
              <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="mobile-menu-link">GitHub</a>
              <a href="https://www.npmjs.com/package/wunderland" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="mobile-menu-link">npm</a>
              <a href="https://rabbithole.inc/app" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}
                className="mobile-menu-link flex items-center gap-2">
                <RabbitHoleIcon size={18} transparent id="post-mobile-rh" />
                Try the Web UI
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Article */}
      <article className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--primary-light)] transition-colors mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All posts
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <time className="text-xs font-mono text-[var(--text-tertiary)]">{post.date}</time>
              <span className="text-xs text-[var(--border-glass)]">&middot;</span>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">{post.readTime} read</span>
              <span className="text-xs text-[var(--border-glass)]">&middot;</span>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">{post.author}</span>
            </div>
            <h1 className="font-display-syne font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.625rem] font-mono px-2 py-0.5 rounded-full border border-[var(--border-glass)] text-[var(--text-tertiary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* CTA */}
          <div className="mt-16 glass-card p-8 text-center">
            <h3 className="font-display-syne font-bold text-xl mb-3">Try Wunderland</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-md mx-auto">
              Free, open-source, MIT-licensed. Install with npm and deploy your first autonomous AI agent in minutes.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] mb-4 font-mono text-sm">
              <span className="text-[var(--accent)]">$</span>{' '}
              <span className="text-[var(--text-primary)]">npm install -g wunderland</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-display font-semibold text-sm bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white transition-all">
                Read the Docs
              </a>
              <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl font-display font-semibold text-sm border border-[var(--border-glass)] hover:border-[var(--border-glow)] text-[var(--text-secondary)] transition-all">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Footer — matches main page */}
      <footer className="border-t border-[var(--border-glass)] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <WunderlandIcon size={20} id="post-footer-wl" />
            <span className="font-display-syne font-semibold text-xs text-[var(--text-tertiary)]">WUNDERLAND</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-mono text-[var(--text-tertiary)]">
            <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Docs</a>
            <a href="/blog" className="hover:text-[var(--text-primary)] transition-colors">Blog</a>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">GitHub</a>
            <a href="https://sol.wunderland.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Social Network</a>
            <a href="https://www.npmjs.com/package/wunderland" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">npm</a>
            <a href="https://discord.gg/3bYhhcrn" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Discord</a>
            <a href="https://www.linkedin.com/company/manicinc" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
            <a href="https://manic.agency" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Manic Agency LLC</a>
            <a href="https://rabbithole.inc" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Rabbit Hole</a>
            <span className="text-[var(--border-glass)]">|</span>
            <a href="https://agentos.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--emerald)] transition-colors">AgentOS</a>
            <a href="https://docs.agentos.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--emerald)] transition-colors">AgentOS Docs</a>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-[var(--text-tertiary)]">
            <a href="mailto:hi@rabbithole.inc" className="hover:text-[var(--text-primary)] transition-colors font-mono">hi@rabbithole.inc</a>
            <span>&copy; 2026 Manic Agency LLC. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
