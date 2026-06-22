import { useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useCmsData } from '@/hooks/useCmsData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import ScrollToTop from '@/components/ScrollToTop';
import PrivacyBanner from '@/components/PrivacyBanner';
import Hero from '@/sections/Hero';
import ChatBot from '@/components/ChatBot';
import { brand } from '@/data';

// Lazy-load below-the-fold sections for code splitting
const DemoVideo = lazy(() => import('@/sections/DemoVideo'));
const AIWorkforce = lazy(() => import('@/sections/AIWorkforce'));
const Integrations = lazy(() => import('@/sections/Integrations'));
const WorkShowcase = lazy(() => import('@/sections/WorkShowcase'));
const SafetyCentre = lazy(() => import('@/sections/SafetyCentre'));
const TeamPreview = lazy(() => import('@/sections/TeamPreview'));
const PlansCTA = lazy(() => import('@/sections/ContactCTA'));
const Footer = lazy(() => import('@/sections/Footer'));

function SectionDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />;
}

function AppContent() {
  const { robots, loading } = useCmsData();

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
        <p className="font-body text-xs tracking-[0.2em] text-white/30 uppercase">Loading</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* 1. Hero */}
      <Hero />

      <SectionDivider />

      {/* 2. What AI Handle deploys — concise summary */}
      <WhatWeDeploy />

      <Suspense fallback={null}>
      <SectionDivider />

      {/* 3. Short AI-workforce preview */}
      <AIWorkforce robots={robots} />

      <SectionDivider />

      {/* 4. System demo video */}
      <DemoVideo
        videoUrl={brand.video.src}
        posterImage="/brand/video-thumbnail.jpg"
        title={brand.video.title}
        description={brand.video.description}
      />

      <SectionDivider />

      {/* 5. Supported integrations */}
      <Integrations />

      <SectionDivider />

      {/* 6. Selected work */}
      <WorkShowcase />

      <SectionDivider />

      {/* 7. Human control */}
      <SafetyCentre />

      <SectionDivider />

      {/* 8. Team preview */}
      <TeamPreview />

      <SectionDivider />

      {/* 9. Final contact CTA */}
      <PlansCTA />

      {/* Footer */}
      <Footer />
      </Suspense>

      <ChatBot />
      <ScrollToTop />
      <PrivacyBanner />
    </div>
  );
}

/** Concise "What AI Handle Deploys" section with Explore links */
function WhatWeDeploy() {
  const items = [
    { title: 'AI Agents', desc: 'Specialised digital workers handling enquiries, sales, CRM, research, content, operations, and reporting.', to: '/ai-workforce' },
    { title: 'Automations', desc: 'Structured workflows that move information, trigger actions, and reduce repetitive work.', to: '/services' },
    { title: 'Websites', desc: 'Premium websites that explain, capture, showcase, and support your business.', to: '/services' },
    { title: 'Integrations', desc: 'Connected to Gmail, WhatsApp, Telegram, CRM, LinkedIn, and the tools you already use.', to: '/integrations' },
    { title: 'Voice AI', desc: 'Professional AI reception handling calls, FAQs, appointments, and human transfer.', to: '/services' },
    { title: 'Growth Systems', desc: 'Paid advertising, lead qualification, and campaign infrastructure.', to: '/services' },
  ];

  return (
    <section className="section-padding bg-[#070707]">
      <div className="content-max">
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4">What AI Handle Deploys</p>
          <h2 className="heading-section mb-4">AI Agents, Automations, and Growth Infrastructure</h2>
          <p className="body-text max-w-xl mx-auto">
            AI Handle deploys specialised AI agents into your business. Each agent owns a defined responsibility, while an AI Orchestrator coordinates the complete system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {items.map((item) => (
            <div key={item.title} className="card-surface p-6">
              <h3 className="font-body font-semibold text-white mb-2">{item.title}</h3>
              <p className="body-text text-sm mb-4">{item.desc}</p>
              <Link to={item.to} className="inline-flex items-center gap-1.5 text-xs font-medium text-purple hover:text-purple/80 transition-colors">
                Explore <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>

        {/* Agent roles summary */}
        <div className="text-center">
          <p className="text-xs text-white/20 max-w-lg mx-auto">
            One agent researches. One handles sales and follow-up. One manages content. One monitors operations. One prepares reports. You control them through approved dashboards and communication platforms.
          </p>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
