import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener('canplay', handleCanPlay);

    let raf: number;
    const checkLoop = () => {
      if (video && video.duration && video.currentTime > video.duration - 0.6) {
        video.style.opacity = '0';
      }
      if (video && video.currentTime < 0.3) {
        video.style.opacity = videoLoaded ? '1' : '0';
      }
      raf = requestAnimationFrame(checkLoop);
    };
    raf = requestAnimationFrame(checkLoop);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      cancelAnimationFrame(raf);
    };
  }, [videoLoaded]);

  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
        poster="/brand/ai-handle-logo.png"
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
        style={{ opacity: videoLoaded ? 1 : 0 }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
        {/* Eyebrow */}
        <p className="label-text text-purple mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          UAE-Based AI Agency
        </p>

        {/* Headline */}
        <h1 className="heading-display max-w-4xl mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          Imagine a Team That{' '}
          <span className="serif-italic text-white/50">Never Sleeps</span>.
        </h1>

        {/* Primary supporting text */}
        <p className="body-text max-w-2xl mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          AI Handle deploys specialised AI agents into your business. Each agent owns a defined responsibility, while an AI Orchestrator coordinates the complete system.
        </p>

        {/* Agent roles description */}
        <p className="body-text max-w-xl mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          One agent researches. One handles sales and follow-up. One manages content. One monitors operations. One prepares reports. You control them through approved dashboards and communication platforms.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <Link to="/contact" className="btn-primary">
            Build My AI Team <ArrowRight size={16} />
          </Link>
          <Link to="/ai-workforce" className="btn-secondary">
            <Play size={14} /> Explore the AI Team
          </Link>
          <Link to="/services" className="btn-secondary">
            Our Services
          </Link>
        </div>

        {/* Gulf Coverage */}
        <p className="text-xs text-white/20 tracking-wider opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
          Based in the UAE · Serving the Gulf and Global Markets
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex flex-col items-center gap-2 animate-bounce-subtle opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <ChevronDown size={18} className="text-white/20" />
      </div>
    </section>
  );
}
