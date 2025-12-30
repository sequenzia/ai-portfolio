'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themeConfig, type Theme } from '@/lib/config/theme';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
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
    }),
    {
      name: themeConfig.storageKey,
    }
  )
);
