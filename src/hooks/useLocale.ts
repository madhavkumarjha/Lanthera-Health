import { usePrefsStore } from '../store/prefs';
import { useTranslation } from 'react-i18next';

export function useLocale() {
  const locale = usePrefsStore((s) => s.locale);
  const setLocale = usePrefsStore((s) => s.setLocale);
  const { i18n } = useTranslation();

  const changeLocale = (newLocale: 'en' | 'hi') => {
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
    document.documentElement.setAttribute('lang', newLocale);
  };

  return { locale, changeLocale };
}
