import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicJourneyProps {
  children: React.ReactNode;
}

export default function CinematicJourney({ children }: CinematicJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // We will create a master timeline that pins the container
      // and animates its children based on scroll position.
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=15000', // Long scroll distance
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // 1. Zoom into Exterior
      tl.to('.scene-exterior', { scale: 3, opacity: 0, duration: 2, ease: 'power1.inOut' }, 0)
        .to('.hero-content', { opacity: 0, y: -50, duration: 1 }, 0)
        
      // 2. Approach Entrance
        .fromTo('.scene-entrance', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power1.inOut' }, 1)
        .to('.scene-entrance', { scale: 3, opacity: 0, duration: 2, ease: 'power1.inOut' }, 3)
        .fromTo('.entrance-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 2)
        .to('.entrance-content', { opacity: 0, y: -50, duration: 1 }, 3.5)

      // 3. Enter Lobby
        .fromTo('.scene-lobby', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power1.inOut' }, 4)
        .to('.scene-lobby', { scale: 2, opacity: 0, duration: 2, ease: 'power1.inOut' }, 6)
        .fromTo('.lobby-content', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, 4.5)
        .to('.lobby-content', { opacity: 0, y: -50, duration: 1 }, 6)

      // 4. Moving through interior (Agents)
        .fromTo('.scene-office', { opacity: 0 }, { opacity: 1, duration: 1 }, 6.5)
        
        .fromTo('.agents-content', { opacity: 0, y: '100vh' }, { opacity: 1, y: 0, duration: 2 }, 7)
        .to('.agents-content', { y: '-100%', duration: 10, ease: 'none' }, 9) // Long, steady scroll through agents
        
        .to('.scene-office', { opacity: 0, duration: 1 }, 19)
        
      // 5. Executive Command Room
        .fromTo('.scene-rooftop', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power1.out' }, 19.5)
        .fromTo('.rooftop-content', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 20);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0A0A0A]">
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Background Scenes */}
        <div className="absolute inset-0 z-0">
          <div className="scene-exterior absolute inset-0 w-full h-full bg-[url('/images/building/exterior.jpg')] bg-cover bg-center origin-center transition-transform" />
          <div className="scene-entrance absolute inset-0 w-full h-full bg-[url('/images/building/entrance.jpg')] bg-cover bg-center origin-center opacity-0 transition-transform" />
          <div className="scene-lobby absolute inset-0 w-full h-full bg-[url('/images/building/lobby.jpg')] bg-cover bg-center origin-center opacity-0 transition-transform" />
          <div className="scene-office absolute inset-0 w-full h-full bg-[#0A0A0A] opacity-0 transition-opacity">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C9A96E]/20 to-transparent" />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>
          <div className="scene-rooftop absolute inset-0 w-full h-full bg-[url('/images/building/rooftop.jpg')] bg-cover bg-center origin-center opacity-0 transition-transform" />
          
          <div className="absolute inset-0 bg-[#0A0A0A]/60 pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="absolute inset-0 z-10 overflow-y-visible pointer-events-none h-full">
           <div className="relative w-full h-full">
              {children}
           </div>
        </div>

      </div>
    </div>
  );
}
