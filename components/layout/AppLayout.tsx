'use client';

import { WorkspaceCanvas } from '@/components/workspace';
import { CommandPalette } from '@/components/command-palette';
import { MinimalHeader } from './MinimalHeader';

/**
 * Canvas-first layout architecture:
 * - Canvas as the base layer (constrained width on desktop)
 * - Command Palette as centered pill overlay at bottom
 * - Minimal header for branding/navigation
 */
export function AppLayout() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-surface-canvas">
      {/* Minimal header */}
      <MinimalHeader className="absolute top-0 left-0 right-0 z-40" />

      {/* Canvas container - full width, content constrained inside */}
      <div className="h-full w-full pt-14 pb-[132px]">
        <WorkspaceCanvas className="h-full w-full" />
      </div>

      {/* Command Palette overlay */}
      <CommandPalette />
    </div>
  );
}
