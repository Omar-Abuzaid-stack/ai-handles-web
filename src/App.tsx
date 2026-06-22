import { useEffect, lazy, Suspense } from 'react';
import { useCmsData } from '@/hooks/useCmsData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import ScrollToTop from '@/components/ScrollToTop';
import PrivacyBanner from '@/components/PrivacyBanner';
import Hero from '@/sections/Hero';
import AgencyIntro from '@/sections/AgencyIntro';
import ChatBot from '@/components/ChatBot';
import { brand } from '@/data';

// Lazy-load below-the-fold sections for code splitting
const DemoVideo = lazy(() => import('@/sections/DemoVideo'));
const Capabilities = lazy(() => import('@/sections/Capabilities'));
const AIWorkforce = lazy(() => import('@/sections/AIWorkforce'));
const AgentCollaboration = lazy(() => import('@/sections/AgentCollaboration'));
const Philosophy = lazy(() => import('@/sections/Philosophy'));
const Integrations = lazy(() => import('@/sections/Integrations'));
const WhoWeWorkWith = lazy(() => import('@/sections/WhoWeWorkWith'));
const WorkShowcase = lazy(() => import('@/sections/WorkShowcase'));
const SafetyCentre = lazy(() => import('@/sections/SafetyCentre'));
const Founder = lazy(() => import('@/sections/Founder'));
const About = lazy(() => import('@/sections/About'));
const RooftopCTA = lazy(() => import('@/sections/RooftopCTA'));
const Footer = lazy(() => import('@/sections/Footer'));

/** Subtle gradient divider between sections */
function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
  );
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

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

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

      {/* 2. About AI Handle */}
      <AgencyIntro />

      <Suspense fallback={null}>
      <SectionDivider />

      {/* 3. System demonstration video */}
      <DemoVideo
        videoUrl={brand.video.src}
        posterImage="/brand/ai-handle-logo.png"
        title={brand.video.title}
        description={brand.video.description}
      />

      <SectionDivider />

      {/* 4. What AI Handle builds */}
      <Capabilities />

      <SectionDivider />

      {/* 5. AI Workforce */}
      <AIWorkforce robots={robots} />

      <SectionDivider />

      {/* 6. How agents collaborate */}
      <AgentCollaboration />

      <SectionDivider />

      {/* 7. AI agent versus automation */}
      <Philosophy />

      <SectionDivider />

      {/* 8. Connected platforms */}
      <Integrations />

      <SectionDivider />

      {/* 9. Industries */}
      <WhoWeWorkWith />

      <SectionDivider />

      {/* 10. Selected client work */}
      <WorkShowcase />

      <SectionDivider />

      {/* 11. Human control and security + 12. AI Handle Aegis */}
      <SafetyCentre />

      <SectionDivider />

      {/* 13. Team */}
      <Founder />

      <SectionDivider />

      {/* 14. UAE, Gulf, and global coverage */}
      <About />

      <SectionDivider />

      {/* 15. Contact and QR codes */}
      <RooftopCTA />

      {/* 16. Footer */}
      <Footer />
      </Suspense>

      <ChatBot />
      </ErrorBoundary>
      <ScrollToTop />
      <PrivacyBanner />
    </div>
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
