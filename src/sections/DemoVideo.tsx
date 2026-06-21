import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Play } from 'lucide-react';

interface DemoVideoProps {
  videoUrl?: string;
  posterImage?: string;
  title?: string;
  description?: string;
}

export default function DemoVideo({
  videoUrl,
  posterImage,
  title = 'See How the AI Handle System Works',
}: DemoVideoProps) {
  const ref = useScrollAnimation();

  return (
    <section id="demo" className="section-padding bg-black">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12 animate-item">
          <p className="label-text text-purple mb-4">System Demonstration</p>
          <h2 className="heading-section">{title}</h2>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#070707] border border-white/5 animate-item">
          {videoUrl ? (
            <video
              src={videoUrl}
              poster={posterImage}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                  <Play size={24} className="text-white/30 ml-1" />
                </div>
                <p className="text-sm text-white/30">Video coming soon</p>
              </div>
            </div>
          )}

          {/* Overlay Card */}
          <div className="absolute bottom-6 left-6 right-6 md:left-6 md:right-auto md:max-w-md">
            <div className="liquid-glass rounded-2xl p-6">
              <p className="label-text text-purple mb-3">How the system works</p>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                An enquiry enters the system. The Reception Agent responds. The Sales Agent qualifies the lead. The CRM Agent updates the record. Automation schedules the next task. The Reporting Agent informs management.
              </p>
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary text-xs py-2 px-4">
                View the Full System
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
