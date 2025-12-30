'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themeConfig, themes, type Theme } from '@/lib/config/theme';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: themeConfig.defaultTheme,

      setTheme: (theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        const current = get().theme;
        set({ theme: current === 'light' ? 'dark' : 'light' });
      },

      cycleTheme: () => {
        const current = get().theme;
        const currentIndex = themes.indexOf(current);
        const nextIndex = (currentIndex + 1) % themes.length;
        set({ theme: themes[nextIndex] });
      },
    }),
    {
      name: themeConfig.storageKey,
    }
  )
);
