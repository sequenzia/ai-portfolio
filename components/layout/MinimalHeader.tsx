'use client';

import { portfolioContent } from '@/lib/content/portfolio';
import { cn } from '@/lib/utils/cn';
import { useCanvasStore } from '@/stores/canvasStore';
import { useThemeStore } from '@/stores/themeStore';
import { ChevronLeft, Home, Sun, Moon } from 'lucide-react';

interface MinimalHeaderProps {
  className?: string;
}

export function MinimalHeader({ className }: MinimalHeaderProps) {
  const { bio } = portfolioContent;
  const { currentView, goBack, reset, history } = useCanvasStore();
  const { theme, toggleTheme } = useThemeStore();

  const showBackButton = currentView !== 'welcome' && history.length > 0;
  const showHomeButton = currentView !== 'welcome';

  return (
    <header
      className={cn(
        'flex items-center justify-between px-4 md:px-6 h-14 bg-surface-canvas/80 backdrop-blur-sm border-b border-border/50',
        className
      )}
    >
      {/* Left side - navigation */}
      <div className="flex items-center gap-2">
        {showBackButton && (
          <button
            onClick={goBack}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {showHomeButton && (
          <button
            onClick={reset}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Go home"
          >
            <Home className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Center - branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
          {bio.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="hidden sm:block">
          <h1 className="font-semibold text-foreground text-sm">{bio.name}</h1>
        </div>
      </div>

      {/* Right side - theme toggle and status */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
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
