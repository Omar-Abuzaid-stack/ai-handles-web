import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { en } from './en';
import { ar } from './ar';

export type Language = 'en' | 'ar';
type TranslationDict = typeof en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => string;
  dir: 'ltr' | 'rtl';
}

function resolveNested(obj: Record<string, unknown>, path: string): string {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

const dictionaries: Record<Language, TranslationDict> = { en, ar };

function getInitialLang(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('aihandle-lang') as Language | null;
    if (stored === 'en' || stored === 'ar') return stored;
    if (window.location.pathname.startsWith('/ar')) return 'ar';
  }
  return 'en';
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (path: string) => path,
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem('aihandle-lang', newLang); } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  const t = useCallback((path: string): string => {
    const dict = dictionaries[lang];
    const result = resolveNested(dict as unknown as Record<string, unknown>, path);
    if (result === path && lang === 'ar') {
      const fallback = resolveNested(en as unknown as Record<string, unknown>, path);
      return typeof fallback === 'string' ? fallback : path;
    }
    return result;
  }, [lang]);

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
