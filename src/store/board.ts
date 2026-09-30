import { create } from 'zustand';
import { WaitToken } from '../types';

interface BoardStore {
  tokens: WaitToken[];
  trackedTokenId: string | null;
  setTokens: (tokens: WaitToken[]) => void;
  setTrackedTokenId: (id: string | null) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  tokens: [
    { id: 'L-204', stage: 'procedure', updatedAt: '11:15' },
    { id: 'L-205', stage: 'prep', updatedAt: '11:18' },
    { id: 'L-201', stage: 'recovery', updatedAt: '11:00' },
    { id: 'L-198', stage: 'ready', updatedAt: '10:45' },
  ],
  trackedTokenId: null,
  setTokens: (tokens) => set({ tokens }),
  setTrackedTokenId: (trackedTokenId) => set({ trackedTokenId }),
}));
