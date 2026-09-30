import { create } from 'zustand';
import { Locale } from '../types';

interface PrefsState {
  locale: Locale;
  theme: 'light' | 'dark' | 'auto';
  motion: 'full' | 'reduced' | 'off';
  textSize: 100 | 115 | 130;
  consent: boolean;
  calmMode: boolean;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setMotion: (motion: 'full' | 'reduced' | 'off') => void;
  setTextSize: (textSize: 100 | 115 | 130) => void;
  setConsent: (consent: boolean) => void;
  setCalmMode: (calm: boolean) => void;
}

export const usePrefsStore = create<PrefsState>((set) => ({
  locale: 'en',
  theme: 'dark',
  motion: 'full',
  textSize: 100,
  consent: false,
  calmMode: false,
  setLocale: (locale) => set({ locale }),
  setTheme: (theme) => set({ theme }),
  setMotion: (motion) => set({ motion }),
  setTextSize: (textSize) => set({ textSize }),
  setConsent: (consent) => set({ consent }),
  setCalmMode: (calmMode) => set({ calmMode }),
}));
