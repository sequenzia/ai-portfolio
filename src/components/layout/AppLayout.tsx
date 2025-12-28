import { type ReactNode } from 'react';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-surface-canvas">
      <Header />
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-3xl mx-auto bg-surface-chat">
          {children}
        </div>
      </div>
    </div>
  );
}
