'use client';

import { useCallback, useEffect, useState } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
): { ref: React.RefCallback<T>; isVisible: boolean } {
  const [node, setNode] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useCallback((el: T | null) => {
    setNode((prev) => (prev === el ? prev : el));
  }, []);

  useEffect(() => {
    if (isVisible) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);
    const fallback = window.setTimeout(() => {
      try {
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || 0;
        if (rect.bottom > 0 && rect.top < vh) setIsVisible(true);
      } catch { /* noop */ }
    }, 600);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold, node, isVisible]);

  return { ref, isVisible };
}

export function useScrollRevealGroup<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  _itemCount = 0,
): { containerRef: React.RefCallback<T>; visibleIndices: Set<number> } {
  const [container, setContainer] = useState<T | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  const containerRef = useCallback((el: T | null) => {
    setContainer((prev) => (prev === el ? prev : el));
  }, []);

  useEffect(() => {
    if (!container) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const children = container.querySelectorAll('[data-reveal-index]');
      const all = new Set<number>();
      children.forEach((child) => all.add(parseInt(child.getAttribute('data-reveal-index') || '0', 10)));
      setVisibleIndices(all);
      return;
    }
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).getAttribute('data-reveal-index') || '0', 10);
            setVisibleIndices((prev) => { const next = new Set(prev); next.add(idx); return next; });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );

    container.querySelectorAll('[data-reveal-index]').forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [threshold, _itemCount, container]);

  return { containerRef, visibleIndices };
}
