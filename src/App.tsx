import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import CinematicJourney from '@/components/CinematicJourney';
import Hero from '@/sections/Hero';
import Entrance from '@/sections/Entrance';
import Lobby from '@/sections/Lobby';
import AgencyIntro from '@/sections/AgencyIntro';
import AIBasics from '@/sections/AIBasics';
import BeforeAfter from '@/sections/BeforeAfter';
import Capabilities from '@/sections/Capabilities';
import SystemBuilder from '@/sections/SystemBuilder';
import RobotSection from '@/sections/RobotSection';
import LumenSection from '@/sections/LumenDashboard';
import PulseSection from '@/sections/PulseTelegram';
import FluxSection from '@/sections/FluxWorkflows';
import WhoWeWorkWith from '@/sections/WhoWeWorkWith';
import WorkShowcase from '@/sections/WorkShowcase';
import Clients from '@/sections/Clients';
import Partnerships from '@/sections/Partnerships';
import ClientStandards from '@/sections/Feedback';
import Founder from '@/sections/Founder';
import ImplementationTimeline from '@/sections/Timeline';
import SafetyCentre from '@/sections/SafetyCentre';
import Integrations from '@/sections/Integrations';
import About from '@/sections/About';
import RooftopCTA from '@/sections/RooftopCTA';
import DiscoveryForm from '@/sections/DiscoveryForm';
import Footer from '@/sections/Footer';
import DemoVideo from '@/sections/DemoVideo';
import { useCmsData } from '@/hooks/useCmsData';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { robots, loading } = useCmsData();

  useEffect(() => {
    if (loading) return; // Wait for data to load
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    ScrollTrigger.defaults({ toggleActions: 'play none none none' });
    ScrollTrigger.refresh();

    return () => { ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border border-[#2A2A2A] shadow-[0_0_40px_rgba(201,169,110,0.15)] animate-pulse">
          <img src="/brand/ai-handle-logo.png" alt="AI Handle" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="font-mono text-xs tracking-[0.2em] text-[#C9A96E] uppercase">Initializing AI Handle</p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
        </div>
      </div>
    );
  }

  const standardRobots = robots.filter(
    (r) => !['lumen', 'pulse', 'flux'].includes(r.id)
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      <CinematicJourney>
        {/* 1. Outside the tower */}
        <div className="hero-content pointer-events-auto h-screen flex items-center">
          <Hero />
        </div>

        {/* 2 & 3. Approaching and Entrance */}
        <div className="entrance-content pointer-events-auto h-screen flex items-center opacity-0">
          <Entrance />
        </div>

        {/* 4. Entering the lobby */}
        <div className="lobby-content pointer-events-auto h-screen flex items-center opacity-0">
          <Lobby />
        </div>

        {/* 5. Moving through interior (Agents & Operations) */}
        <div className="agents-content pointer-events-auto opacity-0 w-full pt-[20vh] pb-[50vh]">
          <div className="space-y-[40vh] mb-[40vh]">
             <AgencyIntro />
             <DemoVideo />
             <AIBasics />
             <BeforeAfter />
             <Capabilities />
             <SystemBuilder />
          </div>
          
          <div id="agents" className="space-y-[30vh] mb-[40vh]">
            <div className="section-padding pb-0">
              <div className="content-max text-center">
                <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 uppercase">
                  Digital Workforce
                </p>
                <h2 className="section-title text-[#F5F0EB] mb-4">
                  Observing the Workforce in Action
                </h2>
                <p className="font-body text-base text-[#8A8478] max-w-[600px] mx-auto">
                  Every agent is assigned to a specific department workstation, operating your business around the clock.
                </p>
              </div>
            </div>
            {standardRobots.map((robot) => (
              <RobotSection key={robot.id} robot={robot} bgClass="bg-transparent" />
            ))}
            <FluxSection robot={robots.find(r => r.id === 'flux')!} />
            <LumenSection robot={robots.find(r => r.id === 'lumen')!} />
            <PulseSection robot={robots.find(r => r.id === 'pulse')!} />
          </div>

          <div className="space-y-[40vh]">
             <WhoWeWorkWith />
             <WorkShowcase />
             <Clients />
             <Partnerships />
             <ClientStandards />
             <Founder />
             <ImplementationTimeline />
             <SafetyCentre />
             <Integrations />
             <About />
          </div>
        </div>

        {/* 6. Executive Command Room / Final CTA */}
        <div className="rooftop-content pointer-events-auto h-screen flex items-center opacity-0">
          <div className="w-full">
            <RooftopCTA />
            <DiscoveryForm />
          </div>
        </div>
      </CinematicJourney>

      <Footer />
    </div>
  );
}

export default App;
