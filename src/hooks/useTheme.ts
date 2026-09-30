import { useEffect } from 'react';
import { usePrefsStore } from '../store/prefs';

export function useTheme() {
  const theme = usePrefsStore((s) => s.theme);
  const setTheme = usePrefsStore((s) => s.setTheme);

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

  return { theme, setTheme };
}
