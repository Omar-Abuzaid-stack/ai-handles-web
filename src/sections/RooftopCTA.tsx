import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function RooftopCTA() {
  const ref = useScrollAnimation();

  return (
    <section
      id="rooftop"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Content */}
      <div ref={ref} className="relative z-10 content-max text-center px-6 py-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-full mb-8 animate-item">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
          <span className="font-mono text-[10px] text-[#C9A96E] tracking-widest uppercase">Executive Command Room</span>
        </div>

        <h2 className="hero-display text-[#F5F0EB] mb-8 animate-item">
          Your Real Estate Business,<br />
          <span className="text-[#C9A96E]">Operated by Intelligence.</span>
        </h2>

        <p className="font-body text-lg text-[#8A8478] max-w-[620px] mx-auto mb-12 animate-item">
          The Orchestrator coordinates the digital workforce. Humans define the objectives, permissions, and final authority.
        </p>

        <div className="flex flex-wrap justify-center gap-6 animate-item">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-base px-12 py-5 shadow-[0_0_40px_rgba(201,169,110,0.2)]"
          >
            Design Your AI Workforce
          </a>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-secondary text-base px-12 py-5"
          >
            Return to Entrance
          </button>
        </div>
      </div>
    </section>
  );
}
