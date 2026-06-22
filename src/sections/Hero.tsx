import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener('canplay', handleCanPlay);

    // Smooth loop: fade to black near end, then restart
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

        {/* Supporting text */}
        <p className="body-text max-w-2xl mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          AI Handle deploys a coordinated digital workforce into your business. Each AI agent handles a specific responsibility across enquiries, sales, CRM, research, content, operations, and reporting.
        </p>

        <p className="body-text max-w-xl mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          You do not receive one chatbot. You receive a team of specialised AI agents working across the platforms your business already uses.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
            Build My AI Team <ArrowRight size={16} />
          </a>
          <a href="#demo" onClick={(e) => { e.preventDefault(); document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
            <Play size={14} /> Watch the Demo
          </a>
          <a href="#agents" onClick={(e) => { e.preventDefault(); document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
            Explore the Agents
          </a>
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
