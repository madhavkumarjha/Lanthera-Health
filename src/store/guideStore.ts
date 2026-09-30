import { create } from 'zustand';
import { GuideState, GuideResult, Locale } from '../types';
import { evaluateGuideState } from '../data/guide-rules';

interface GuideStoreState {
  currentStep: number; // 0 = Red Flags, 1 = For Whom, 2 = Duration & Impact, 3 = Conditions, 4 = Result
  redFlags: string[];
  forWhom: 'self' | 'child' | 'older' | 'pregnant';
  duration: '<1d' | '1-7d' | '>1w';
  impact: 0 | 1 | 2 | 3;
  conditions: string[];
  locale: Locale;

  // Actions
  setRedFlags: (flags: string[]) => void;
  toggleRedFlag: (flagId: string) => void;
  setForWhom: (whom: 'self' | 'child' | 'older' | 'pregnant') => void;
  setDuration: (dur: '<1d' | '1-7d' | '>1w') => void;
  setImpact: (imp: 0 | 1 | 2 | 3) => void;
  setConditions: (conds: string[]) => void;
  toggleCondition: (condId: string) => void;
  setLocale: (loc: Locale) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  getResult: () => GuideResult;
}

const initialGuideState = {
  currentStep: 0,
  redFlags: [],
  forWhom: 'self' as const,
  duration: '1-7d' as const,
  impact: 1 as const,
  conditions: [],
  locale: 'en' as const,
};

export const useGuideStore = create<GuideStoreState>((set, get) => ({
  ...initialGuideState,

  setRedFlags: (flags) => {
    // If any red flag is ticked, immediately jump to Result step (4)
    if (flags.length > 0) {
      set({ redFlags: flags, currentStep: 4 });
    } else {
      set({ redFlags: flags });
    }
  },

  toggleRedFlag: (flagId) => {
    const current = get().redFlags;
    const exists = current.includes(flagId);
    const updated = exists ? current.filter((id) => id !== flagId) : [...current, flagId];

    if (updated.length > 0) {
      set({ redFlags: updated, currentStep: 4 });
    } else {
      set({ redFlags: updated });
    }
  },

  setForWhom: (forWhom) => set({ forWhom }),
  setDuration: (duration) => set({ duration }),
  setImpact: (impact) => set({ impact }),
  setConditions: (conditions) => set({ conditions }),

  toggleCondition: (condId) => {
    const current = get().conditions;
    const exists = current.includes(condId);
    const updated = exists ? current.filter((id) => id !== condId) : [...current, condId];
    set({ conditions: updated });
  },

  setLocale: (locale) => set({ locale }),

  nextStep: () => {
    const { currentStep, redFlags } = get();
    // If on step 0 and redFlags present, jump to result
    if (currentStep === 0 && redFlags.length > 0) {
      set({ currentStep: 4 });
    } else {
      set({ currentStep: Math.min(4, currentStep + 1) });
    }
  },

  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  goToStep: (step) => set({ currentStep: step }),

  reset: () => set({ ...initialGuideState }),

  getResult: () => {
    const { redFlags, forWhom, duration, impact, conditions, locale } = get();
    const state: GuideState = { redFlags, forWhom, duration, impact, conditions, locale };
    return evaluateGuideState(state);
  },
}));
