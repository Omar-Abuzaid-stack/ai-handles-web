import { useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useCmsData } from '@/hooks/useCmsData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider, useTranslation } from '@/i18n/I18nContext';
import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import ScrollToTop from '@/components/ScrollToTop';
import PrivacyBanner from '@/components/PrivacyBanner';
import Hero from '@/sections/Hero';
import ChatBot from '@/components/ChatBot';
import { brand } from '@/data';

const DemoVideo = lazy(() => import('@/sections/DemoVideo'));
const AIWorkforce = lazy(() => import('@/sections/AIWorkforce'));
const TeamPreview = lazy(() => import('@/sections/TeamPreview'));
const Footer = lazy(() => import('@/sections/Footer'));

function SectionDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />;
}

function localizePath(path: string, lang: string): string {
  if (lang === 'ar') return `/ar${path}`;
  return path;
}

function AppContent() {
  const { robots, loading } = useCmsData();
  const { t } = useTranslation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 animate-pulse">
          <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
        </div>
        <p className="font-body text-xs tracking-[0.2em] text-white/30 uppercase">{t('error.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <Hero />

      <SectionDivider />

      <WhatWeDeploy />

      <Suspense fallback={null}>
      <SectionDivider />

      <AIWorkforce robots={robots} />

      <SectionDivider />

      <DemoVideo
        videoUrl={brand.video.src}
        posterImage="/media/system-demo-thumbnail.png"
        title={t('demo.title')}
        description={t('demo.desc')}
      />

      <SectionDivider />

      <TeamPreview />

      <SectionDivider />

      <FinalCTA />

      <Footer />
      </Suspense>

      <ChatBot />
      <ScrollToTop />
      <PrivacyBanner />
    </div>
  );
}

function WhatWeDeploy() {
  const { t, lang } = useTranslation();
  const items = [
    { titleKey: 'aiAgents', to: '/services/ai-agents' },
    { titleKey: 'automations', to: '/services/automations' },
    { titleKey: 'deployment', to: '/services/ai-deployment' },
    { titleKey: 'websites', to: '/services/websites' },
    { titleKey: 'growth', to: '/services/growth' },
    { titleKey: 'voice', to: '/services/voice-ai' },
  ];

  return (
    <section className="section-padding bg-[#050505] relative overflow-hidden" id="what-we-deploy">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7E22CE]/10 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="content-max relative z-10">
        <div className="text-center mb-16">
          <p className="label-text text-[#7E22CE] mb-4">{t('deploy.label')}</p>
          <h2 className="heading-section mb-4">{t('deploy.title')}</h2>
          <p className="body-text max-w-xl mx-auto text-white/60">
            {t('deploy.desc')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {items.map((item, index) => (
            <Link 
              key={item.titleKey} 
              to={localizePath(item.to, lang)} 
              className="group relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7E22CE]/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.03] group-hover:border-[#7E22CE]/30 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7E22CE]/5 rounded-full blur-3xl group-hover:bg-[#7E22CE]/15 transition-colors duration-500"></div>
                <div>
                  <h3 className="font-body text-xl font-medium text-white mb-3 group-hover:text-[#7E22CE] transition-colors">{t(`deploy.items.${item.titleKey}.title`)}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">{t(`deploy.items.${item.titleKey}.desc`)}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7E22CE] tracking-wider uppercase">
                  <span>{t('deploy.explore')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { t, lang } = useTranslation();
  return (
    <section className="section-padding">
      <div className="content-max text-center">
        <h2 className="heading-section mb-4">{t('finalCta.title')}</h2>
        <p className="body-text mb-8 max-w-xl mx-auto">
          {t('finalCta.desc')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={brand.founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {t('finalCta.cta')} <ArrowRight size={14} />
          </a>
          <Link to={localizePath('/contact', lang)} className="btn-primary" style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.3)' }}>
            {t('finalCta.ctaSub')}
          </Link>
          <Link to={localizePath('/work', lang)} className="btn-secondary">
            {t('finalCta.ctaWork')}
          </Link>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
