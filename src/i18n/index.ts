import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './en/common.json';
import hiCommon from './hi/common.json';
import arCommon from './ar-stub/common.json';

const resources = {
  en: { common: enCommon },
  hi: { common: hiCommon },
  ar: { common: arCommon },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
