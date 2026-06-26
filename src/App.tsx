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
const WorkShowcase = lazy(() => import('@/sections/WorkShowcase'));
const TeamPreview = lazy(() => import('@/sections/TeamPreview'));
const Footer = lazy(() => import('@/sections/Footer'));

function SectionDivider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />;
}

function AppContent() {
  const { robots, loading } = useCmsData();
  const location = useLocation();

  // Track page views and reset scroll
  useEffect(() => {
    window.scrollTo(0, 0);
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

      {/* 2. What AI Handle deploys (Clouds) */}
      <WhatWeDeploy />

      <Suspense fallback={null}>
      <SectionDivider />

      {/* 3. AI Workforce preview (Robot Carousel) */}
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

      {/* 5. Selected work */}
      <WorkShowcase />

      <SectionDivider />

      {/* 6. Team preview (Redesigned) */}
      <TeamPreview />

      <SectionDivider />

      {/* 7. Final CTA */}
      <FinalCTA />

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
    { title: 'AI Agents', desc: 'Specialised digital workers handling enquiries, sales, and operations.', to: '/services/ai-agents' },
    { title: 'Business Automations', desc: 'Structured workflows that move data and reduce repetitive work.', to: '/services/automations' },
    { title: 'AI Deployment', desc: 'Seamlessly integrating AI into your existing company infrastructure.', to: '/services/ai-deployment' },
    { title: 'Premium Websites', desc: 'High-end platforms that explain, capture, and convert visitors.', to: '/services/websites' },
    { title: 'Paid Advertising & Growth', desc: 'Targeted campaigns to accelerate customer acquisition.', to: '/services/growth' },
    { title: 'AI Voice Reception', desc: 'Professional AI reception handling inbound and outbound calls.', to: '/services/voice-ai' },
  ];

  return (
    <section className="section-padding bg-[#050505] relative overflow-hidden" id="what-we-deploy">
      {/* Background glow for the cloud effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7E22CE]/10 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="content-max relative z-10">
        <div className="text-center mb-16">
          <p className="label-text text-[#7E22CE] mb-4">Core Capabilities</p>
          <h2 className="heading-section mb-4">What We Deploy</h2>
          <p className="body-text max-w-xl mx-auto text-white/60">
            A comprehensive suite of digital infrastructure designed to scale your business.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {items.map((item, index) => (
            <Link 
              key={item.title} 
              to={item.to} 
              onClick={() => window.scrollTo(0, 0)}
              className="group relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7E22CE]/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.03] group-hover:border-[#7E22CE]/30 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7E22CE]/5 rounded-full blur-3xl group-hover:bg-[#7E22CE]/15 transition-colors duration-500"></div>
                <div>
                  <h3 className="font-body text-xl font-medium text-white mb-3 group-hover:text-[#7E22CE] transition-colors">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7E22CE] tracking-wider uppercase">
                  <span>Explore</span>
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
