'use client';

import { useSyncExternalStore, useCallback, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

function subscribeTheme(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('theme-changed', callback);
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('theme-changed', callback);
    mediaQuery.removeEventListener('change', callback);
  };
}

function getThemeSnapshot(): Theme {
  try {
    return (localStorage.getItem('djhs_theme') as Theme) || 'system';
  } catch {
    return 'system';
  }
}

function getServerThemeSnapshot(): Theme {
  return 'system';
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const isClient = typeof window !== 'undefined';
  const systemPrefersDark = isClient && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolvedTheme: 'light' | 'dark' =
    theme === 'dark' || (theme === 'system' && systemPrefersDark) ? 'dark' : 'light';

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const changeTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem('djhs_theme', newTheme);
      window.dispatchEvent(new Event('theme-changed'));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    changeTheme(next);
  }, [resolvedTheme, changeTheme]);

  return { theme, resolvedTheme, changeTheme, toggleDarkMode };
}
