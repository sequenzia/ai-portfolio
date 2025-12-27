import { type ReactNode, useState } from 'react';
import { useBreakpoints } from '@/hooks/useMediaQuery';
import { Header } from './Header';
import { MobileToggle } from './MobileToggle';
import { cn } from '@/lib/utils/cn';

interface AppLayoutProps {
  chatPanel: ReactNode;
  canvasPanel: ReactNode;
}

export function AppLayout({ chatPanel, canvasPanel }: AppLayoutProps) {
  const { isDesktop } = useBreakpoints();
  const [activeView, setActiveView] = useState<'chat' | 'canvas'>('chat');

  // Desktop: side-by-side layout (40% chat, 60% canvas)
  if (isDesktop) {
    return (
      <div className="flex h-screen flex-col bg-gray-50">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Panel */}
          <div className="w-2/5 min-w-[320px] max-w-[500px] border-r border-gray-200 bg-surface-chat flex flex-col">
            {chatPanel}
          </div>
          {/* Canvas Panel */}
          <div className="flex-1 bg-surface-canvas overflow-hidden">
            {canvasPanel}
          </div>
        </div>
      </div>
    );
  }

  // Mobile/Tablet: stacked layout with toggle
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <MobileToggle activeView={activeView} onToggle={setActiveView} />
      <div className="flex-1 overflow-hidden">
        <div
          className={cn(
            'h-full transition-opacity duration-200',
            activeView === 'chat' ? 'block' : 'hidden'
          )}
        >
          <div className="h-full bg-surface-chat flex flex-col">{chatPanel}</div>
        </div>
        <div
          className={cn(
            'h-full transition-opacity duration-200',
            activeView === 'canvas' ? 'block' : 'hidden'
          )}
        >
          <div className="h-full bg-surface-canvas overflow-hidden">{canvasPanel}</div>
        </div>
      </div>
    </div>
  );
}
