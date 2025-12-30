'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { themeConfig, themes } from '@/lib/config/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Remove all existing theme classes
    themes.forEach((t) => root.classList.remove(t));

    // Apply current theme
    root.classList.add(theme);
  }, [theme, mounted]);

  // Handle system preference detection on initial load only
  useEffect(() => {
    if (!mounted || !themeConfig.useSystemPreference) return;

    // Only apply system preference if no stored preference exists
    const stored = localStorage.getItem(themeConfig.storageKey);
    if (stored) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = mediaQuery.matches ? 'dark' : 'light';

    useThemeStore.getState().setTheme(systemTheme);
  }, [mounted]);

  return <>{children}</>;
}
