type TranslationKeys = {
  [key: string]: string;
}

export type UILanguages = {
  en: TranslationKeys;
  th: TranslationKeys;
}

export const languages = {
  en: 'English',
  th: 'ไทย',
};

export const showDefaultLang = false;

export const defaultLang = 'en';

export const ui: UILanguages = {
  en: {
    'general.start_trial': 'Start 14-day trial'
  },
  th: {
    'general.start_trial': 'ฟรี 14 วัน - ใช้เลย',
  },
} as const;