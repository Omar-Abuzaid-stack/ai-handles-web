import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Fluid simulation parameters
    const scale = prefersReducedMotion ? 0.5 : 1;
    const gridSize = Math.floor(128 * scale);
    const _cellW = width / gridSize;
    const _cellH = height / gridSize;
    void _cellW; void _cellH;

    // Velocity and density fields
    const vx = new Float32Array(gridSize * gridSize);
    const vy = new Float32Array(gridSize * gridSize);
    const density = new Float32Array(gridSize * gridSize);
    const prevVx = new Float32Array(gridSize * gridSize);
    const prevVy = new Float32Array(gridSize * gridSize);
    const prevDensity = new Float32Array(gridSize * gridSize);

    let mouseX = width * 0.5;
    let mouseY = height * 0.5;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      mouseActive = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    function idx(x: number, y: number) {
      const ix = Math.max(0, Math.min(gridSize - 1, x));
      const iy = Math.max(0, Math.min(gridSize - 1, y));
      return iy * gridSize + ix;
    }

    function addForce(cx: number, cy: number, fx: number, fy: number, strength: number) {
      const r = 4;
      for (let y = cy - r; y <= cy + r; y++) {
        for (let x = cx - r; x <= cx + r; x++) {
          if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
            const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
            const falloff = Math.exp(-d * d / (r * r * 0.5));
            const i = idx(x, y);
            vx[i] += fx * falloff * strength;
            vy[i] += fy * falloff * strength;
            density[i] += falloff * strength * 0.3;
          }
        }
      }
    }

    function diffuse(src: Float32Array, dst: Float32Array, rate: number) {
      for (let y = 1; y < gridSize - 1; y++) {
        for (let x = 1; x < gridSize - 1; x++) {
          const i = idx(x, y);
          dst[i] = src[i] + rate * (
            src[idx(x - 1, y)] + src[idx(x + 1, y)] +
            src[idx(x, y - 1)] + src[idx(x, y + 1)] - 4 * src[i]
          );
        }
      }
    }

    function advect(src: Float32Array, dst: Float32Array, vxField: Float32Array, vyField: Float32Array) {
      for (let y = 1; y < gridSize - 1; y++) {
        for (let x = 1; x < gridSize - 1; x++) {
          const i = idx(x, y);
          let px = x - vxField[i] * 0.5;
          let py = y - vyField[i] * 0.5;
          px = Math.max(0.5, Math.min(gridSize - 1.5, px));
          py = Math.max(0.5, Math.min(gridSize - 1.5, py));
          const x0 = Math.floor(px);
          const y0 = Math.floor(py);
          const x1 = x0 + 1;
          const y1 = y0 + 1;
          const sx = px - x0;
          const sy = py - y0;
          dst[i] =
            (1 - sx) * (1 - sy) * src[idx(x0, y0)] +
            sx * (1 - sy) * src[idx(x1, y0)] +
            (1 - sx) * sy * src[idx(x0, y1)] +
            sx * sy * src[idx(x1, y1)];
        }
      }
    }

    function project() {
      const div = new Float32Array(gridSize * gridSize);
      const p = new Float32Array(gridSize * gridSize);

      for (let y = 1; y < gridSize - 1; y++) {
        for (let x = 1; x < gridSize - 1; x++) {
          const i = idx(x, y);
          div[i] = -0.5 * (
            vx[idx(x + 1, y)] - vx[idx(x - 1, y)] +
            vy[idx(x, y + 1)] - vy[idx(x, y - 1)]
          ) / gridSize;
        }
      }

      for (let iter = 0; iter < 20; iter++) {
        for (let y = 1; y < gridSize - 1; y++) {
          for (let x = 1; x < gridSize - 1; x++) {
            const i = idx(x, y);
            p[i] = (div[i] + p[idx(x - 1, y)] + p[idx(x + 1, y)] + p[idx(x, y - 1)] + p[idx(x, y + 1)]) * 0.25;
          }
        }
      }

      for (let y = 1; y < gridSize - 1; y++) {
        for (let x = 1; x < gridSize - 1; x++) {
          const i = idx(x, y);
          vx[i] -= 0.5 * (p[idx(x + 1, y)] - p[idx(x - 1, y)]);
          vy[i] -= 0.5 * (p[idx(x, y + 1)] - p[idx(x, y - 1)]);
        }
      }
    }

    const timeOffset = Math.random() * 1000;
    let frameCount = 0;

    function animate() {
      if (!ctx) return;
      frameCount++;
      const t = (Date.now() / 1000) + timeOffset;

      // Mouse force
      if (mouseActive) {
        const mdx = mouseX - prevMouseX;
        const mdy = mouseY - prevMouseY;
        const mcx = Math.floor((mouseX / width) * gridSize);
        const mcy = Math.floor((mouseY / height) * gridSize);
        addForce(mcx, mcy, mdx * 0.5, mdy * 0.5, 1.0);
      }

      // Ambient forces - gentle swirling
      const cx = Math.floor(gridSize * 0.5);
      const cy = Math.floor(gridSize * 0.5);
      for (let i = 0; i < 3; i++) {
        const angle = t * 0.3 + i * Math.PI * 2 / 3;
        const fx = Math.cos(angle) * 0.02;
        const fy = Math.sin(angle) * 0.02;
        const rx = cx + Math.floor(Math.cos(angle * 0.7) * gridSize * 0.2);
        const ry = cy + Math.floor(Math.sin(angle * 0.7) * gridSize * 0.2);
        addForce(rx, ry, fx, fy, 0.3);
      }

      // Diffuse and advect
      prevVx.set(vx);
      prevVy.set(vy);
      prevDensity.set(density);

      diffuse(prevVx, vx, 0.0001);
      diffuse(prevVy, vy, 0.0001);
      diffuse(prevDensity, density, 0.0001);

      project();

      prevVx.set(vx);
      prevVy.set(vy);
      advect(vx, prevVx, vx, vy);
      advect(vy, prevVy, vx, vy);
      vx.set(prevVx);
      vy.set(prevVy);

      prevDensity.set(density);
      advect(density, prevDensity, vx, vy);
      density.set(prevDensity);

      // Damping
      for (let i = 0; i < gridSize * gridSize; i++) {
        vx[i] *= 0.995;
        vy[i] *= 0.995;
        density[i] *= 0.998;
      }

      project();

      // Render
      if (frameCount % 2 === 0 || prefersReducedMotion) {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y += 2) {
          for (let x = 0; x < width; x += 2) {
            const gx = Math.floor((x / width) * gridSize);
            const gy = Math.floor((y / height) * gridSize);
            const gi = idx(gx, gy);

            const vel = Math.sqrt(vx[gi] ** 2 + vy[gi] ** 2);
            const d = density[gi];

            // Metallic champagne-gold coloring
            const nx = x / width;
            const ny = y / height;

            // Base dark obsidian with subtle variation
            let r = 10 + Math.sin(nx * 3 + t * 0.1) * 3 + Math.cos(ny * 2) * 2;
            let g = 10 + Math.cos(nx * 2 + t * 0.15) * 2;
            let b = 10 + Math.sin(ny * 3) * 2;

            // Champagne gold highlights from fluid motion
            const goldIntensity = Math.min(1, (vel * 0.5 + d * 0.3));
            const iridescence = Math.sin(vel * 2 + t * 0.5) * 0.5 + 0.5;

            r += goldIntensity * (201 + iridescence * 30);
            g += goldIntensity * (169 + iridescence * 20);
            b += goldIntensity * (110 + iridescence * 40);

            // Amber warm tones
            const amberBoost = Math.sin(nx * 5 + ny * 3 + t * 0.2) * 0.1;
            r += amberBoost * 50;
            g += amberBoost * 30;

            // Specular-like highlights
            const specular = Math.pow(Math.max(0, Math.sin(vel * 3)), 4) * 80;
            r += specular;
            g += specular * 0.85;
            b += specular * 0.5;

            const px = Math.floor(Math.min(255, Math.max(0, r)));
            const py = Math.floor(Math.min(255, Math.max(0, g)));
            const pz = Math.floor(Math.min(255, Math.max(0, b)));

            // Fill 2x2 block
            for (let dy = 0; dy < 2 && y + dy < height; dy++) {
              for (let dx = 0; dx < 2 && x + dx < width; dx++) {
                const pi = ((y + dy) * width + (x + dx)) * 4;
                data[pi] = px;
                data[pi + 1] = py;
                data[pi + 2] = pz;
                data[pi + 3] = 255;
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      mouseActive = false;
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToEntrance = () => {
    const el = document.getElementById('entrance');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fluid Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Building Image Overlay */}
      <div className="absolute inset-0 z-[2] opacity-30 mix-blend-overlay">
        <img
          src="/images/building/exterior.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 content-max w-full px-6 lg:px-10 py-32">
        <div className="max-w-3xl">
          {/* Label */}
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-6 animate-item uppercase">
            AI Handle — AI Agents, Automations and Growth Systems
          </p>

          {/* Headline */}
          <h1 className="hero-display text-[#F5F0EB] mb-4 animate-item">
            Your Business,
            <br />
            <span className="text-[#C9A96E]">Operated by Intelligence.</span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg text-[#8A8478] max-w-[540px] mb-8 animate-item" style={{ animationDelay: '0.2s' }}>
            AI Handle deploys AI agents, automations, websites, communication systems, and growth infrastructure directly into businesses.
          </p>

          {/* Signals */}
          <div className="flex flex-wrap gap-2 mb-10 animate-item" style={{ animationDelay: '0.3s' }}>
            {['AI Agents', 'Automations', 'Websites', 'CRM', 'Communication', 'Growth'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#141414] border border-[#2A2A2A] rounded-full text-xs font-mono text-[#8A8478]">{tag}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 animate-item" style={{ animationDelay: '0.4s' }}>
            <button onClick={scrollToEntrance} className="btn-primary">
              Explore AI Handle
            </button>
            <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
              View Selected Work
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-body text-[13px] text-[#C9A96E] hover:text-[#F5F0EB] transition-colors ml-2 border-b border-[#C9A96E]/30 hover:border-[#F5F0EB]">
              Speak With Omar
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce-subtle">
        <span className="font-body text-xs text-[#5A5550]">Scroll to enter</span>
        <ChevronDown size={20} className="text-[#5A5550]" />
      </div>
    </section>
  );
}
