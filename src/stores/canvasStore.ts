import { create } from 'zustand';
import type { CanvasViewType, CanvasData } from '@/content/types';

interface CanvasStore {
  // State
  currentView: CanvasViewType;
  data: CanvasData | null;
  isTransitioning: boolean;
  history: CanvasViewType[];

  // Actions
  setView: (view: CanvasViewType, data?: Partial<Omit<CanvasData, 'type'>>) => void;
  setTransitioning: (transitioning: boolean) => void;
  goBack: () => void;
  reset: () => void;
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  // Initial state
  currentView: 'welcome',
  data: null,
  isTransitioning: false,
  history: [],

  // Set a new view with optional data
  setView: (view, data) => {
    const current = get().currentView;
    const history = get().history;

    set({
      currentView: view,
      data: { type: view, ...data },
      // Only add to history if navigating away from a non-welcome view
      history: current !== 'welcome' ? [...history, current] : history,
    });
  },

  // Toggle transitioning state for animations
  setTransitioning: (transitioning) => {
    set({ isTransitioning: transitioning });
  },

  // Go back to previous view
  goBack: () => {
    const history = get().history;

    if (history.length > 0) {
      const previous = history[history.length - 1];
      set({
        currentView: previous,
        data: { type: previous },
        history: history.slice(0, -1),
      });
    } else {
      // Default to welcome if no history
      set({
        currentView: 'welcome',
        data: null,
        history: [],
      });
    }
  },

  // Reset to initial state
  reset: () => {
    set({
      currentView: 'welcome',
      data: null,
      isTransitioning: false,
      history: [],
    });
  },
}));
