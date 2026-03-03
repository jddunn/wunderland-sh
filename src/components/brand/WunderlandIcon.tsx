'use client';

import { useState, useEffect } from 'react';

interface WunderlandIconProps {
  size?: number;
  className?: string;
  id?: string;
}

export function WunderlandIcon({ size = 64, className = '', id = 'wl-icon' }: WunderlandIconProps) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains('light'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Adaptive frame colors
  const frameStart = isLight ? '#d4c5a0' : '#1e1b4b';
  const frameMid = isLight ? '#e8ddd0' : '#0f0b2e';
  const frameEnd = isLight ? '#d4c5a0' : '#1e1b4b';
  const mirrorStart = isLight ? 'rgba(107, 79, 32, 0.3)' : 'rgba(49, 46, 129, 0.7)';
  const mirrorMid = isLight ? 'rgba(107, 79, 32, 0.15)' : 'rgba(67, 56, 202, 0.4)';
  const mirrorEnd = isLight ? 'rgba(107, 79, 32, 0.05)' : 'rgba(49, 46, 129, 0.15)';
  const shadowOpacity = isLight ? '0.15' : '0.5';

  // Stroke colors adapt
  const indigoStart = isLight ? '#7a5a18' : '#6366f1';
  const indigoMid = isLight ? '#8b6914' : '#818cf8';
  const indigoEnd = isLight ? '#a67c40' : '#a78bfa';
  const amberStart = isLight ? '#996b08' : '#d97706';
  const amberMid = isLight ? '#b8860b' : '#f59e0b';
  const amberEnd = isLight ? '#c49a52' : '#fbbf24';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`grad-indigo-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={indigoStart} />
          <stop offset="50%" stopColor={indigoMid} />
          <stop offset="100%" stopColor={indigoEnd} />
        </linearGradient>
        <linearGradient id={`grad-amber-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={amberStart} />
          <stop offset="50%" stopColor={amberMid} />
          <stop offset="100%" stopColor={amberEnd} />
        </linearGradient>
        <linearGradient id={`grad-frame-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={frameStart} />
          <stop offset="50%" stopColor={frameMid} />
          <stop offset="100%" stopColor={frameEnd} />
        </linearGradient>
        <linearGradient id={`grad-mirror-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={mirrorStart} />
          <stop offset="50%" stopColor={mirrorMid} />
          <stop offset="100%" stopColor={mirrorEnd} />
        </linearGradient>
        <linearGradient id={`grad-shimmer-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={indigoStart} stopOpacity="0.2" />
          <stop offset="30%" stopColor={indigoMid} stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="70%" stopColor={amberEnd} stopOpacity="0.8" />
          <stop offset="100%" stopColor={amberMid} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`grad-reflect-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={indigoMid} stopOpacity="0.5" />
          <stop offset="40%" stopColor={indigoStart} stopOpacity="0.25" />
          <stop offset="100%" stopColor={indigoStart} stopOpacity="0.06" />
        </linearGradient>
        <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity={shadowOpacity} />
        </filter>
      </defs>

      <polygon points="50,2 84,18 98,50 84,82 50,98 16,82 2,50 16,18"
        fill={`url(#grad-frame-${id})`} filter={`url(#shadow-${id})`} />
      <polygon points="50,2 84,18 98,50 84,82 50,98 16,82 2,50 16,18"
        fill="none" stroke={`url(#grad-indigo-${id})`} strokeWidth="1.5" />
      <polygon points="50,10 76,22 88,50 76,78 50,90 24,78 12,50 24,22"
        fill={`url(#grad-mirror-${id})`} />
      <polygon points="50,10 76,22 88,50 76,78 50,90 24,78 12,50 24,22"
        fill="none" stroke={`url(#grad-indigo-${id})`} strokeWidth="2" />

      {/* The W */}
      <path d="M24,28 L34,50 L50,32 L66,50 L76,28" fill="none"
        stroke={`url(#grad-indigo-${id})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Mirror line */}
      <line x1="16" y1="50" x2="84" y2="50"
        stroke={`url(#grad-shimmer-${id})`} strokeWidth="2.5" />

      {/* Reflected W */}
      <path d="M24,72 L34,50 L50,68 L66,50 L76,72" fill="none"
        stroke={`url(#grad-reflect-${id})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Corner accents */}
      <line x1="50" y1="2" x2="50" y2="10" stroke={`url(#grad-amber-${id})`} strokeWidth="2" />
      <line x1="50" y1="90" x2="50" y2="98" stroke={`url(#grad-amber-${id})`} strokeWidth="2" />
      <line x1="2" y1="50" x2="12" y2="50" stroke={`url(#grad-amber-${id})`} strokeWidth="2" />
      <line x1="88" y1="50" x2="98" y2="50" stroke={`url(#grad-amber-${id})`} strokeWidth="2" />
    </svg>
  );
}
