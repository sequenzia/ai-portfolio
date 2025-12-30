'use client';

import { create } from 'zustand';

/**
 * UI states for the command palette as defined in the design spec:
 * - idle: Collapsed pill with search icon
 * - thinking: Active processing animation on the border
 * - streaming: Pill expands to show text status updates
 * - actionRequired: Notification indicator appears
 * - error: Status change indicating failed execution
 */
export type CommandPaletteState =
  | 'idle'
  | 'thinking'
  | 'streaming'
  | 'actionRequired'
  | 'error';

interface CommandPaletteStore {
  // State
  isExpanded: boolean;
  uiState: CommandPaletteState;
  statusMessage: string | null;

  // Actions
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  setUIState: (state: CommandPaletteState) => void;
  setStatusMessage: (message: string | null) => void;
  reset: () => void;
}

export const useCommandPaletteStore = create<CommandPaletteStore>((set) => ({
  // Initial state
  isExpanded: false,
  uiState: 'idle',
  statusMessage: null,

  // Expand the command shell
  expand: () => set({ isExpanded: true }),

  // Collapse back to pill
  collapse: () => set({ isExpanded: false, statusMessage: null }),

  // Toggle between expanded/collapsed
  toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),

  // Set the UI state (idle, thinking, streaming, etc.)
  setUIState: (uiState) => set({ uiState }),

  // Set status message shown during streaming
  setStatusMessage: (statusMessage) => set({ statusMessage }),

  // Reset to initial state
  reset: () =>
    set({
      isExpanded: false,
      uiState: 'idle',
      statusMessage: null,
    }),
}));
