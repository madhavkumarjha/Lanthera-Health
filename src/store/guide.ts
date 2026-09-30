import { create } from 'zustand';
import { GuideState, GuideResult } from '../types';

interface GuideStore {
  state: GuideState;
  result: GuideResult | null;
  step: number;
  setRedFlags: (flags: string[]) => void;
  setForWhom: (forWhom: GuideState['forWhom']) => void;
  setDuration: (duration: GuideState['duration']) => void;
  setImpact: (impact: GuideState['impact']) => void;
  setConditions: (conditions: string[]) => void;
  setResult: (result: GuideResult | null) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const initialGuideState: GuideState = {
  redFlags: [],
  forWhom: 'self',
  duration: '<1d',
  impact: 0,
  conditions: [],
  locale: 'en',
};

export const useGuideStore = create<GuideStore>((set) => ({
  state: initialGuideState,
  result: null,
  step: 0,
  setRedFlags: (redFlags) => set((s) => ({ state: { ...s.state, redFlags } })),
  setForWhom: (forWhom) => set((s) => ({ state: { ...s.state, forWhom } })),
  setDuration: (duration) => set((s) => ({ state: { ...s.state, duration } })),
  setImpact: (impact) => set((s) => ({ state: { ...s.state, impact } })),
  setConditions: (conditions) => set((s) => ({ state: { ...s.state, conditions } })),
  setResult: (result) => set({ result }),
  setStep: (step) => set({ step }),
  reset: () => set({ state: initialGuideState, result: null, step: 0 }),
}));
