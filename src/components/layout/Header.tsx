import { portfolioContent } from '@/content/portfolio';
import { cn } from '@/lib/utils/cn';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { bio } = portfolioContent;

  return (
    <header
      className={cn(
        'flex items-center justify-between px-4 md:px-6 h-14 border-b border-gray-200 bg-white',
        className
      )}
    >
      {/* Logo / Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
          {bio.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="hidden sm:block">
          <h1 className="font-semibold text-gray-900">{bio.name}</h1>
          <p className="text-xs text-gray-500">{bio.title}</p>
        </div>
      </div>

      {/* Right side - could add theme toggle or other actions */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 hidden md:block">
          AI-Powered Portfolio
        </span>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="AI Online" />
      </div>
    </header>
  );
}
