type TranslationKeys = {
  [key: string]: string;
};

export type UILanguages = {
  en: TranslationKeys;
  th: TranslationKeys;
};

export const languages = {
  en: "English",
  th: "ไทย",
};

export const showDefaultLang = false;

export const defaultLang = "en";

export const ui: UILanguages = {
  en: {
    "general.start_trial": "Start 14-day trial",
    "general.home": "Home",
    "general.features": "Features",
    "general.terms": "Term and Condition",
    "general.privacy": "Privacy Policy",
    "general.blog": "Blog",
    "general.document": "Document",
    "general.contact": "Contact",
  },
  th: {
    "general.start_trial": "ฟรี 14 วัน - ใช้เลย",
    "general.home": "หน้าหลัก",
    "general.features": "คุณสมบัติ",
    "general.terms": "ข้อตกลงและข้อตกลง",
    "general.privacy": "นโยบายความเป็นส่วนตัว",
    "general.blog": "บล็อก",
    "general.document": "คู่มือ",
    "general.contact": "ติดต่อเรา",
  },
} as const;
