import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Play, ExternalLink } from 'lucide-react';

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
  description = 'Watch how our AI agents, automations, communication tools, and reporting systems work together inside a business.',
}: DemoVideoProps) {
  const ref = useScrollAnimation();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demo" className="bg-[#0A0A0A] section-padding">
      <div ref={ref} className="content-max">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item uppercase">
            System Demonstration
          </p>
          <h2 className="section-title text-[#F5F0EB] mb-4 animate-item">
            {title}
          </h2>
          <p className="font-body text-base text-[#8A8478] max-w-[600px] mx-auto animate-item leading-relaxed">
            {description}
          </p>
        </div>

        {/* Video Player */}
        <div className="relative max-w-4xl mx-auto animate-item">
          {videoUrl ? (
            /* Video embed using react-player for YouTube/Vimeo/MP4/WebM support */
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2A2A2A] bg-[#141414]">
              {isPlaying ? (
                /* Detect URL type and render accordingly */
                videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoUrl.includes('youtu.be') ? videoUrl.split('/').pop()?.split('?')[0] : new URL(videoUrl).searchParams.get('v') || ''}?autoplay=1&rel=0&modestbranding=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="AI Handle System Demo"
                  />
                ) : videoUrl.includes('vimeo.com') ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${videoUrl.split('/').pop()?.split('?')[0]}?autoplay=1&title=0&byline=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="AI Handle System Demo"
                  />
                ) : (
                  <video
                    src={videoUrl}
                    poster={posterImage}
                    controls
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )
              ) : (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-full h-full relative group cursor-pointer"
                >
                  {posterImage && (
                    <img
                      src={posterImage}
                      alt="AI Handle System Demo"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-[#0A0A0A]/60 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#C9A96E] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(201,169,110,0.3)]">
                      <Play size={32} className="text-[#0A0A0A] ml-1" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          ) : (
            /* Placeholder */
            <div className="aspect-video rounded-2xl overflow-hidden border border-[#2A2A2A] bg-[#141414] flex items-center justify-center">
              <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center mx-auto">
                  <Play size={32} className="text-[#5A5550] ml-1" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-lg text-[#F5F0EB] mb-2">
                    AI Handle System Demonstration
                  </h3>
                  <p className="font-body text-sm text-[#8A8478]">
                    Video coming soon
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-full text-xs font-mono text-[#5A5550]">
                    MP4
                  </span>
                  <span className="px-3 py-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-full text-xs font-mono text-[#5A5550]">
                    YouTube
                  </span>
                  <span className="px-3 py-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-full text-xs font-mono text-[#5A5550]">
                    Vimeo
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Content Guide */}
        <div className="mt-12 max-w-3xl mx-auto animate-item">
          <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4 text-center uppercase tracking-wider">
            What the demonstration covers
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Customer submits an enquiry',
              'AI Reception Agent responds',
              'Sales Agent qualifies the lead',
              'CRM Agent organises the information',
              'Automation schedules the follow-up',
              'Content Agent supports marketing',
              'Reporting Agent prepares summary',
              'Humans review important actions',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#2A2A2A] rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-[10px] text-[#C9A96E]">{i + 1}</span>
                </span>
                <span className="font-body text-sm text-[#8A8478]">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* External Link */}
        {videoUrl && (
          <div className="mt-8 text-center animate-item">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-[#C9A96E] hover:text-[#F5F0EB] transition-colors"
            >
              <ExternalLink size={14} />
              Watch on external platform
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
