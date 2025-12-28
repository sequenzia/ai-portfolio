import { type ReactNode } from 'react';
import { useBreakpoints } from '@/hooks/useMediaQuery';
import { Header } from './Header';

interface AppLayoutProps {
  chatPanel: ReactNode;
  canvasPanel: ReactNode;
}

export function AppLayout({ chatPanel, canvasPanel }: AppLayoutProps) {
  const { isDesktop } = useBreakpoints();

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

  // Mobile/Tablet: stacked layout with chat on top (25%), canvas below (75%)
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Panel - 25% */}
        <div className="h-1/4 min-h-[150px] border-b border-gray-200 bg-surface-chat flex flex-col">
          {chatPanel}
        </div>
        {/* Canvas Panel - 75% */}
        <div className="h-3/4 bg-surface-canvas overflow-hidden">
          {canvasPanel}
        </div>
      </div>
    </div>
  );
}
