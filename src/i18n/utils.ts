import { ui, defaultLang, showDefaultLang } from './ui';
import type { UILanguages } from './ui';

// export function getLangFromUrl(url: URL) {
//   // const lang = Astro.currentLocale || 'en';
//   const [, lang] = url.pathname.split('/');
//   if (lang in ui) return lang as keyof typeof ui;
//   return defaultLang;
// }

export function useTranslations(lang: string) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function usePageTranslations(lang: string, page_ui: UILanguages) {
  return function t(key: keyof typeof page_ui[typeof defaultLang]) {
    return page_ui[lang][key] || page_ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: string) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}