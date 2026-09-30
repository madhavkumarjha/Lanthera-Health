import { useEffect } from 'react';
import { usePrefsStore } from '../store/prefs';

export function useTheme() {
  const theme = usePrefsStore((s) => s.theme);
  const setTheme = usePrefsStore((s) => s.setTheme);
  const textSize = usePrefsStore((s) => s.textSize);
  const calmMode = usePrefsStore((s) => s.calmMode);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') {
      const hour = new Date().getHours();
      const isNight = hour >= 19 || hour < 6;
      root.setAttribute('data-theme', isNight ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${textSize}%`;
  }, [textSize]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('calm-mode', calmMode);
  }, [calmMode]);

  return { theme, setTheme };
}
