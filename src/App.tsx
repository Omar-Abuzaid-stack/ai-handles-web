import { useEffect, lazy, Suspense } from 'react';
import { useCmsData } from '@/hooks/useCmsData';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import AgencyIntro from '@/sections/AgencyIntro';
import ChatBot from '@/components/ChatBot';
import { brand } from '@/data';

// Lazy-load below-the-fold sections for code splitting
const DemoVideo = lazy(() => import('@/sections/DemoVideo'));
const Philosophy = lazy(() => import('@/sections/Philosophy'));
const Capabilities = lazy(() => import('@/sections/Capabilities'));
const AIWorkforce = lazy(() => import('@/sections/AIWorkforce'));
const AgentCollaboration = lazy(() => import('@/sections/AgentCollaboration'));
const Integrations = lazy(() => import('@/sections/Integrations'));
const WhoWeWorkWith = lazy(() => import('@/sections/WhoWeWorkWith'));
const WorkShowcase = lazy(() => import('@/sections/WorkShowcase'));
const SafetyCentre = lazy(() => import('@/sections/SafetyCentre'));
const Founder = lazy(() => import('@/sections/Founder'));
const About = lazy(() => import('@/sections/About'));
const RooftopCTA = lazy(() => import('@/sections/RooftopCTA'));
const Footer = lazy(() => import('@/sections/Footer'));

function AppContent() {
  const { robots, loading } = useCmsData();

  useEffect(() => {
    // Reveal animations on scroll
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

      {/* 2. Agency Introduction */}
      <AgencyIntro />

      <Suspense fallback={null}>
      {/* 3. Featured Demo Video */}
      <DemoVideo
        videoUrl={brand.video.src}
        posterImage="/brand/ai-handle-logo.png"
        title={brand.video.title}
        description={brand.video.description}
      />

      {/* 4. Main AI Philosophy */}
      <Philosophy />

      {/* 5. Services */}
      <Capabilities />

      {/* 6. AI Workforce */}
      <AIWorkforce robots={robots} />

      {/* 7. Agent Collaboration */}
      <AgentCollaboration />

      {/* 8. Connected Platforms */}
      <Integrations />

      {/* 9. Industries */}
      <WhoWeWorkWith />

      {/* 10. Client Showcase */}
      <WorkShowcase />

      {/* 11. Human Control and Security */}
      <SafetyCentre />

      {/* 12. Team */}
      <Founder />

      {/* 13. Gulf Coverage */}
      <About />

      {/* 14. Final CTA */}
      <RooftopCTA />

      {/* Footer */}
      <Footer />
      </Suspense>
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
