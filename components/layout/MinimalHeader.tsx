'use client';

import { portfolioContent } from '@/lib/content/portfolio';
import { cn } from '@/lib/utils/cn';
import { useCanvasStore } from '@/stores/canvasStore';
import { useThemeStore } from '@/stores/themeStore';
import { ChevronLeft, Sun, Moon, Palette } from 'lucide-react';

interface MinimalHeaderProps {
  className?: string;
}

const themeIcons = {
  light: Moon,
  dark: Palette,
  dracula: Sun,
};

const themeLabels = {
  light: 'Dark',
  dark: 'Dracula',
  dracula: 'Light',
};

export function MinimalHeader({ className }: MinimalHeaderProps) {
  const { bio } = portfolioContent;
  const { currentView, goBack, reset, history } = useCanvasStore();
  const { theme, cycleTheme } = useThemeStore();

  const showBackButton = currentView !== 'welcome' && history.length > 0;
  const ThemeIcon = themeIcons[theme];

  return (
    <header
      className={cn(
        'flex items-center justify-between px-4 md:px-6 h-14 bg-surface-canvas/80 backdrop-blur-sm border-b border-border/50',
        className
      )}
    >
      {/* Left side - branding as home link */}
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button
            onClick={goBack}
            className="p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={reset}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          title="Go home"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {bio.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <h1 className="hidden sm:block font-semibold text-foreground text-sm">
            {bio.name}
          </h1>
        </button>
      </div>

      {/* Right side - theme toggle and status */}
      <div className="flex items-center gap-2">
        <button
          onClick={cycleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={`Switch to ${themeLabels[theme]} mode`}
        >
          <ThemeIcon className="h-4 w-4" />
        </button>
        <span className="text-xs text-muted-foreground hidden md:block">
          AI Portfolio
        </span>
        <div
          className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
          title="AI Online"
        />
      </div>
    </header>
  );
}
