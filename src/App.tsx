import { useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router';
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
import { tracker } from '@/lib/tracking';

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
  const location = useLocation();

  // Track page views
  useEffect(() => {
    tracker.pageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

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

      {/* 2. What AI Handle deploys */}
      <WhatWeDeploy />

      <Suspense fallback={null}>
      <SectionDivider />

      {/* 3. AI Workforce preview */}
      <AIWorkforce robots={robots} />

      <SectionDivider />

      {/* 4. System demo video */}
      <DemoVideo
        videoUrl={brand.video.src}
        posterImage="/media/system-demo-thumbnail.png"
        title={brand.video.title}
        description={brand.video.description}
      />

      <SectionDivider />

      {/* 5. Integrations */}
      <Integrations />

      <SectionDivider />

      {/* 6. Selected work */}
      <WorkShowcase />

      <SectionDivider />

      {/* 7. Who we work with */}
      <WhoWeWorkWith />

      <SectionDivider />

      {/* 8. Human control */}
      <SafetyCentre />

      <SectionDivider />

      {/* 9. Team preview */}
      <TeamPreview />

      <SectionDivider />

      {/* 10. Final CTA */}
      <FinalCTA />

      <SectionDivider />

      {/* 11. Plans */}
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
            Specialised AI agents, structured automations, premium websites, connected integrations, and growth systems — all coordinated by a central AI Orchestrator.
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

        <div className="text-center">
          <p className="text-xs text-white/20 max-w-lg mx-auto">
            One agent researches. One handles sales and follow-up. One manages content. One monitors operations. One prepares reports. You control them through approved dashboards and communication platforms.
          </p>
        </div>
      </div>
    </section>
  );
}

/** "Who We Work With" section — industries and business types */
function WhoWeWorkWith() {
  const categories = [
    'Real estate developers',
    'Real estate agencies',
    'Individual property agents',
    'Clinics',
    'B2B companies',
    'Marketing agencies',
    'Technology partners',
    'Hospitality businesses',
    'E-commerce companies',
    'Professional service businesses',
  ];

  return (
    <section className="section-padding">
      <div className="content-max">
        <div className="text-center mb-12">
          <p className="label-text text-purple mb-4">Industries</p>
          <h2 className="heading-section mb-4">Businesses and Teams We Support</h2>
          <p className="body-text max-w-xl mx-auto">
            We work with responsible businesses where AI can improve communication, operations, customer experience, or growth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {categories.map((cat) => (
            <div key={cat} className="card-surface px-4 py-3 text-center">
              <span className="text-sm text-white/60">{cat}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-white/20 max-w-lg mx-auto">
            Client logos and names are shown only with explicit permission. Where permission is unavailable, we display: Private Client, Confidential Engagement, or Demonstration Project.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Final focused CTA */
function FinalCTA() {
  return (
    <section className="section-padding">
      <div className="content-max text-center">
        <h2 className="heading-section mb-4">Build the AI Team Behind Your Business.</h2>
        <p className="body-text mb-8 max-w-xl mx-auto">
          Start with one agent, automate one important workflow, or design a coordinated digital workforce around your operation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={brand.founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Speak With Omar <ArrowRight size={14} />
          </a>
          <Link to="/contact" className="btn-primary" style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.3)' }}>
            Build My AI Team
          </Link>
          <Link to="/work" className="btn-secondary">
            View Selected Work
          </Link>
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
