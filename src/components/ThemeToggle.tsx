'use client';

import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('wl-theme');
    if (saved === 'light') {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('wl-theme', next);
  };

  const isDark = theme === 'dark';

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} title={isDark ? 'Light mode' : 'Dark mode'}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1C12 1 10 2 10 3.5V4H14V3.5C14 2 12 1 12 1Z" fill="currentColor" opacity={isDark ? 1 : 0.5} />
        <path d="M9 4H15V5H9V4Z" fill="currentColor" opacity={isDark ? 1 : 0.5} />
        <path d="M8 5H16L15 7H9L8 5Z" fill="currentColor" opacity={isDark ? 1 : 0.5} />
        <path d="M9 7H15V18H9V7Z" fill={isDark ? 'url(#wlLanternGlow)' : 'url(#wlLanternDim)'} stroke="currentColor" strokeWidth="0.5" opacity={isDark ? 1 : 0.7} />
        <g style={{ opacity: isDark ? 1 : 0.35, transition: 'opacity 0.4s ease' }}>
          <ellipse cx="12" cy="13" rx="2.5" ry="4" fill={isDark ? 'url(#wlFlameGlow)' : 'url(#wlFlameDim)'} opacity="0.6">
            <animate attributeName="rx" values="2.5;2.8;2.5" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="ry" values="4;4.5;4" dur="0.8s" repeatCount="indefinite" />
          </ellipse>
          <path d="M12 9C12 9 10 11 10 13C10 14.5 10.8 15.5 12 16C13.2 15.5 14 14.5 14 13C14 11 12 9 12 9Z" fill={isDark ? 'url(#wlFlameInner)' : 'url(#wlFlameInnerDim)'}>
            <animate attributeName="d" values="M12 9C12 9 10 11 10 13C10 14.5 10.8 15.5 12 16C13.2 15.5 14 14.5 14 13C14 11 12 9 12 9Z;M12 8.5C12 8.5 9.5 11 9.5 13C9.5 14.8 10.5 16 12 16.5C13.5 16 14.5 14.8 14.5 13C14.5 11 12 8.5 12 8.5Z;M12 9C12 9 10 11 10 13C10 14.5 10.8 15.5 12 16C13.2 15.5 14 14.5 14 13C14 11 12 9 12 9Z" dur="1s" repeatCount="indefinite" />
          </path>
          <ellipse cx="12" cy="14" rx="1" ry="1.5" fill={isDark ? '#fff' : 'rgba(255,255,255,0.6)'}>
            <animate attributeName="ry" values="1.5;2;1.5" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
        </g>
        <path d="M9 18H15L16 20H8L9 18Z" fill="currentColor" opacity={isDark ? 1 : 0.5} />
        <path d="M10 20H14V21C14 21.5 13.5 22 13 22H11C10.5 22 10 21.5 10 21V20Z" fill="currentColor" opacity={isDark ? 1 : 0.5} />
        <defs>
          <radialGradient id="wlLanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8d48a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#c9a227" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b6914" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="wlFlameGlow" cx="50%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wlFlameInner" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#e8d48a" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
          <radialGradient id="wlLanternDim" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8d48a" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c9a227" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b6914" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="wlFlameDim" cx="50%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wlFlameInnerDim" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#e8d48a" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}
