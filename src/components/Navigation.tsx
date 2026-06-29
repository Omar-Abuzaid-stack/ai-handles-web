import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTranslation } from '@/i18n/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';

const routeLinks = [
  { key: 'services', to: '/services' },
  { key: 'aiWorkforce', to: '/ai-workforce' },
  { key: 'integrations', to: '/integrations' },
  { key: 'work', to: '/work' },
  { key: 'team', to: '/team' },
  { key: 'contact', to: '/contact' },
];

function localizePath(path: string, lang: string): string {
  if (lang === 'ar') return `/ar${path}`;
  return path;
}

export default function Navigation() {
  const { t, lang, setLang } = useTranslation();
  const { setTheme, isDark } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
          {/* Desktop */}
          <div className="hidden md:flex liquid-glass rounded-full px-6 py-3 items-center justify-between">
            <Link to={localizePath('/', lang)} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
              </div>
              <span className="font-body font-semibold text-xs tracking-[0.12em] text-white">AI HANDLE</span>
            </Link>

            <div className="flex items-center gap-7">
              {routeLinks.map((link) => (
                <Link
                  key={link.key}
                  to={localizePath(link.to, lang)}
                  className={`font-body text-[13px] transition-colors duration-300 ${
                    location.pathname === localizePath(link.to, lang)
                      ? 'text-white font-medium'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="font-body text-[12px] tracking-wide text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white/70 transition-colors duration-300 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
                aria-label={t('nav.language')}
              >
                {lang === 'en' ? 'EN' : 'العربية'}
                <span className="mx-1 text-black/20 dark:text-white/20">|</span>
                {lang === 'en' ? 'العربية' : 'EN'}
              </button>

              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white/70 transition-colors duration-300 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link to={localizePath('/contact', lang)} className="btn-primary text-[13px] py-2 px-5">
                {t('nav.speakWithUs')}
              </Link>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
            <Link to={localizePath('/', lang)} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10">
                <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
              </div>
              <span className="font-body font-semibold text-xs tracking-wider text-white">AI HANDLE</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white/80 transition-colors p-1"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="font-body text-[11px] text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white/80 transition-colors px-2 py-1"
                aria-label={t('nav.language')}
              >
                {lang === 'en' ? 'EN' : 'العربية'}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-black dark:text-white p-1" aria-label={mobileOpen ? t('nav.close') : t('nav.menu')}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {routeLinks.map((link) => (
            <Link
              key={link.key}
              to={localizePath(link.to, lang)}
              onClick={() => setMobileOpen(false)}
              className={`font-body text-2xl transition-colors ${
                location.pathname === localizePath(link.to, lang) ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}

          <Link to={localizePath('/contact', lang)} onClick={() => setMobileOpen(false)} className="btn-primary mt-4">
            {t('nav.speakWithUs')}
          </Link>
        </div>
      )}
    </>
  );
}
