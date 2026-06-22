import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AgencyIntro() {
  const ref = useScrollAnimation();

  return (
    <section className="section-padding bg-black">
      <div ref={ref} className="content-max">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text text-purple mb-6 animate-item">About AI Handle</p>
          <h2 className="heading-section mb-8 animate-item">
            Building <span className="serif-italic text-white/50">digital teams</span> for businesses that want to move faster.
          </h2>
          <p className="body-text mb-6 animate-item">
            AI Handle is a UAE-based agency that designs, builds, and deploys specialised AI agents, automations, websites, communication systems, and growth infrastructure into real businesses.
          </p>
          <p className="body-text mb-6 animate-item">
            Every system is designed from scratch for one business. No shared platforms. No generic templates. No compromises.
          </p>
          <p className="body-text animate-item">
            Each AI agent receives a clear role, approved tools, strict permissions, operational limits, task queues, contextual memory, and a complete activity history.
          </p>
        </div>
      </div>
    </section>
  );
}
