import { languages, defaultLang } from 'i18n/ui';

export function onRequest({ request, redirect }) {
  const url = new URL(request.url);
  const [, lang] = url.pathname.split('/');

  if (!lang) {
    // Redirect to default language if no language specified
    return redirect(`/${defaultLang}${url.pathname}`);
  }

  // If invalid language specified, redirect to default language
  if (lang && !Object.keys(languages).includes(lang)) {
    const path = url.pathname.replace(`/${lang}`, '') || '/';
    return redirect(`/${defaultLang}${path}`);
  }
}

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({ params: { lang } }));
}