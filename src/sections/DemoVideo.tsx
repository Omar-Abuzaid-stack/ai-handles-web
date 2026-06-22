import { useScrollAnimation } from '@/hooks/useScrollAnimation';


interface DemoVideoProps {
  videoUrl?: string;
  posterImage?: string;
  title?: string;
  description?: string;
}

const DEMO_VIDEO_DEFAULT = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4';

export default function DemoVideo({
  videoUrl,
  posterImage,
  title = 'See the AI Handle System in Action',
}: DemoVideoProps) {
  const ref = useScrollAnimation();

  const src = videoUrl || DEMO_VIDEO_DEFAULT;

  return (
    <section id="demo" className="section-padding bg-black">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12 animate-item">
          <p className="label-text text-purple mb-4">System Demonstration</p>
          <h2 className="heading-section">{title}</h2>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#070707] border border-white/5 animate-item">
          <video
            src={src}
            poster={posterImage}
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          />

          {/* Overlay Card */}
          <div className="absolute bottom-6 left-6 right-6 md:left-6 md:right-auto md:max-w-md">
            <div className="liquid-glass rounded-2xl p-6">
              <p className="label-text text-purple mb-3">How the system works</p>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                An enquiry enters the system. The Reception Agent responds. The Sales Agent qualifies the lead. The CRM Agent updates the record. Automation schedules the next task. The Reporting Agent informs management.
              </p>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-xs py-2 px-4"
              >
                View the Full System
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
