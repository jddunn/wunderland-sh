'use client';

import Link from 'next/link';
import { WunderlandIcon } from '@/components/brand';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BLOG_POSTS } from '@/data/blog-posts';

function tagColor(tag: string): string {
  const colors: Record<string, string> = {
    'wunderland': 'var(--primary-light)',
    'openclaw': 'var(--accent)',
    'AI agents': 'var(--emerald)',
    'security': 'var(--rose)',
    'RAG': 'var(--cyan)',
    'HEXACO': 'var(--primary)',
    'TypeScript': 'var(--primary-light)',
    'messaging': 'var(--accent-light)',
    'channels': 'var(--emerald)',
    'personality': 'var(--rose)',
  };
  return colors[tag] || 'var(--text-tertiary)';
}

export default function BlogIndex() {
  return (
    <div className="relative min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--bg-void)]/80 border-b border-[var(--border-glass)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <WunderlandIcon size={34} id="blog-nav-wl" />
            <span className="font-display-syne font-bold text-base tracking-wide">WUNDERLAND</span>
          </a>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm font-mono text-[var(--primary-light)]">Blog</Link>
            <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline">Docs</a>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline">GitHub</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--primary-light)] mb-3">Engineering Blog</div>
          <h1 className="font-display-syne font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4">
            <span className="gradient-text">Building the Future of AI Agents</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Deep dives into autonomous AI, agentic architecture, open-source development, and the technology behind Wunderland.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex flex-col gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block glass-card p-6 sm:p-8 hover:border-[var(--border-glow)] transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <time className="text-xs font-mono text-[var(--text-tertiary)]">{post.date}</time>
                <span className="text-xs font-mono text-[var(--text-tertiary)]">{post.readTime} read</span>
              </div>
              <h2 className="font-display-syne font-bold text-xl sm:text-2xl mb-3 group-hover:text-[var(--primary-light)] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.625rem] font-mono px-2 py-0.5 rounded-full border border-[var(--border-glass)]"
                    style={{ color: tagColor(tag) }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-glass)] py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <WunderlandIcon size={20} id="blog-footer-wl" />
            <span className="font-display-syne font-semibold text-xs text-[var(--text-tertiary)]">WUNDERLAND</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[var(--text-tertiary)]">
            <a href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</a>
            <a href="https://docs.wunderland.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Docs</a>
            <a href="https://github.com/jddunn/wunderland" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">GitHub</a>
            <a href="https://github.com/manicinc" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Manic Inc</a>
            <a href="https://www.linkedin.com/company/manicagency" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
            <a href="https://rabbithole.inc" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Rabbit Hole</a>
            <a href="mailto:hi@rabbithole.inc" className="hover:text-[var(--text-primary)] transition-colors">hi@rabbithole.inc</a>
          </div>
          <div className="text-xs text-[var(--text-tertiary)]">
            MIT License &middot; Built by AI agents
          </div>
        </div>
      </footer>
    </div>
  );
}
