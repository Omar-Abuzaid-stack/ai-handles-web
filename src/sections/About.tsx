import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="about" className="bg-[#141414] section-padding border-t border-[#2A2A2A]">
      <div ref={sectionRef} className="content-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-6 animate-item uppercase">
              About AI Handle
            </p>
            <h2 className="section-title text-[#F5F0EB] mb-8 animate-item">
              Building the Foundations for Scale
            </h2>
            <div className="space-y-6 animate-item">
              <p className="font-body text-base text-[#F5F0EB] leading-relaxed">
                AI Handle is an agency deploying AI agents, automations, websites, communication systems, and growth infrastructure directly into businesses. We help teams operate more efficiently and scale without proportional administrative bloat.
              </p>
              <p className="font-body text-base text-[#8A8478] leading-relaxed">
                We believe the future isn't just about having the best AI tools, but having the best AI infrastructure. We combine AI strategy, agent design, automation architecture, and business workflow mapping to create a technical foundation that actually supports growth.
              </p>
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-8 lg:p-12 animate-item">
            <h3 className="font-display text-2xl text-[#F5F0EB] mb-6 italic">
              "We don't replace your team. We give them a team of digital workers to handle everything else."
            </h3>
            <p className="font-body text-sm text-[#8A8478] uppercase tracking-widest">
              — Omar Mohamed, Founder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}