import { useEffect } from 'react';
import { useCmsData } from '@/hooks/useCmsData';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import AgencyIntro from '@/sections/AgencyIntro';
import DemoVideo from '@/sections/DemoVideo';
import Capabilities from '@/sections/Capabilities';
import Integrations from '@/sections/Integrations';
import WhoWeWorkWith from '@/sections/WhoWeWorkWith';
import WorkShowcase from '@/sections/WorkShowcase';
import SafetyCentre from '@/sections/SafetyCentre';
import Founder from '@/sections/Founder';
import About from '@/sections/About';
import RooftopCTA from '@/sections/RooftopCTA';
import Footer from '@/sections/Footer';
import ChatBot from '@/components/ChatBot';
import { brand } from '@/data';

function App() {
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

  const standardRobots = robots.filter(
    (r) => !['lumen', 'pulse', 'flux'].includes(r.id)
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Agency Introduction */}
      <AgencyIntro />

      {/* 3. Featured Demo Video */}
      <DemoVideo
        videoUrl={brand.video.src}
        posterImage="/brand/ai-handle-logo.png"
        title={brand.video.title}
        description={brand.video.description}
      />

      {/* 4. Main AI Philosophy */}
      <section className="section-padding bg-[#070707]">
        <div className="content-max">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-section mb-8">
                Intelligence <span className="serif-italic text-white/40">x</span> Execution
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="heading-sub mb-2">Specialised Roles</h3>
                  <p className="body-text">Every AI agent has one clear responsibility, approved tools, limits, and escalation rules.</p>
                </div>
                <div>
                  <h3 className="heading-sub mb-2">Coordinated Work</h3>
                  <p className="body-text">Agents pass verified tasks and structured information to one another, creating a controlled digital workforce rather than isolated tools.</p>
                </div>
              </div>
            </div>
            <div className="card-surface p-8">
              <p className="label-text mb-6">Agent Workflow</p>
              <div className="space-y-3">
                {['Research Agent', 'Sales Agent', 'Reply Agent', 'CRM Agent', 'Reporting Agent'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-purple">{i + 1}</span>
                    </span>
                    <span className="font-body text-sm text-white/70">{step}</span>
                    {i < 4 && <span className="text-white/20 ml-auto">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services */}
      <Capabilities />

      {/* 6. AI Workforce */}
      <section id="agents" className="section-padding">
        <div className="content-max">
          <div className="text-center mb-16">
            <p className="label-text mb-4 text-purple">Digital Workforce</p>
            <h2 className="heading-section mb-4">Meet the Team Behind Your Business</h2>
            <p className="body-text max-w-[600px] mx-auto">Every agent is assigned to a specific role, operating your business around the clock.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardRobots.slice(0, 9).map((robot) => (
              <div key={robot.id} className="card-surface p-6 group hover:border-purple/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple">{robot.acronym.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-sm text-white">{robot.name}</h3>
                    <p className="text-xs text-white/40">{robot.department}</p>
                  </div>
                </div>
                <p className="body-text text-sm mb-4">{robot.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {robot.responsibilities.slice(0, 3).map((r, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Agent Collaboration */}
      <section className="section-padding bg-[#070707]">
        <div className="content-max">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">A Team That Works Together</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-2 max-w-4xl mx-auto">
            {['Enquiry', 'Reception', 'Sales', 'CRM', 'Automation', 'Reporting', 'Management'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="card-surface px-5 py-3 text-center">
                  <p className="text-sm font-medium text-white">{step}</p>
                </div>
                {i < 6 && <span className="text-purple text-lg">→</span>}
              </div>
            ))}
          </div>
          <p className="body-text text-center mt-12 max-w-[700px] mx-auto italic">
            "Automation is the workflow. The AI agent is the digital worker operating inside or around that workflow."
          </p>
        </div>
      </section>

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
      <ChatBot />
    </div>
  );
}

export default App;
