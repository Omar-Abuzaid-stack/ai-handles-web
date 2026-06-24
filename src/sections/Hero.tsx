import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Play, ChevronDown, Search, MessageSquare, PenTool, Settings, BarChart3, Cpu } from 'lucide-react';

// Professional agent mini-cards for the hero — using Lucide icons for consistency
const agentHighlights = [
  { name: 'Research Agent', icon: Search, color: 'from-blue-500/20 to-blue-600/10' },
  { name: 'Sales Agent', icon: MessageSquare, color: 'from-green-500/20 to-green-600/10' },
  { name: 'Content Agent', icon: PenTool, color: 'from-pink-500/20 to-pink-600/10' },
  { name: 'Operations', icon: Settings, color: 'from-amber-500/20 to-amber-600/10' },
  { name: 'Reporting', icon: BarChart3, color: 'from-cyan-500/20 to-cyan-600/10' },
  { name: 'Orchestrator', icon: Cpu, color: 'from-purple-500/20 to-purple-600/10' },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastMouseX = useRef(0.5);

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

  // Desktop: scrub video position based on mouse X — uses refs to avoid re-renders
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (Math.abs(x - lastMouseX.current) < 0.01) return;
    lastMouseX.current = x;
    if (videoRef.current) {
      videoRef.current.style.objectPosition = `${x * 100}% 50%`;
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
        poster="/media/system-demo-thumbnail.png"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{
          opacity: videoLoaded ? 1 : 0,
          filter: 'brightness(1.2) contrast(1.05) saturate(1.1)',
        }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
      />

      {/* Light overlay — image stays visible */}
      <div className="absolute inset-0 z-[1] dark:bg-transparent bg-white/60" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.55) 100%)'
      }} />

      {/* Targeted gradient behind text only */}
      <div className="absolute inset-0 z-[2] dark:bg-transparent bg-white/40" style={{
        background: 'radial-gradient(ellipse 80% 45% at 50% 45%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)'
      }} />

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
        <p className="body-text max-w-2xl mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          AI Handle deploys specialised AI agents into your business. Each agent owns a defined responsibility, while an AI Orchestrator coordinates the complete workforce.
        </p>

        {/* Agent mini-cards — desktop only */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.75s' }}>
          {agentHighlights.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${a.color} border border-white/5 backdrop-blur-sm`}>
                <Icon size={13} className="text-white/50" />
                <span className="text-[11px] text-white/60 font-body font-medium">{a.name}</span>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <Link to="/contact" className="btn-primary">
            Build My AI Team <ArrowRight size={16} />
          </Link>
          <Link to="/ai-workforce" className="btn-secondary">
            <Play size={14} /> Explore the AI Workforce
          </Link>
          <Link to="#demo" className="btn-secondary">
            See How the System Works
          </Link>
          <a href="https://wa.me/971508033084" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Speak With Omar
          </a>
        </div>

        {/* Gulf Coverage */}
        <p className="text-xs text-white/30 tracking-wider opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
          Based in the UAE · Serving the Gulf and Global Markets
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex flex-col items-center gap-2 animate-bounce-subtle opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <ChevronDown size={18} className="text-white/30" />
      </div>
    </section>
  );
}
