import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useRef, useState } from 'react';

const beforeOps = [
  'Leads spread across WhatsApp, forms, email, spreadsheets',
  'Staff copying information manually',
  'Missed reminders and forgotten follow-ups',
  'Incomplete CRM records',
  'Salespeople switching between many platforms',
];

const afterOps = [
  'Information flows through controlled processes',
  'Lead records prepared automatically',
  'Follow-ups scheduled without relying on memory',
  'Reports update in real-time',
  'Staff receive clear alerts and priorities',
];

const beforeIntel = [
  'Employees answering the same questions repeatedly',
  'Slow lead qualification process',
  'Manual research for every prospect',
  'Inconsistent content creation',
  'Managers constantly requesting status updates',
];

const afterIntel = [
  'Robots handle repetitive intelligence tasks',
  'Instant lead qualification and routing',
  'Automated research and prospect lists',
  'Consistent, scheduled content output',
  'Automatic reports delivered to management',
];

function TransformationPanel({
  label,
  labelColor,
  borderColor,
  items,
}: {
  label: string;
  labelColor: string;
  borderColor: string;
  items: string[];
}) {
  return (
    <div
      className="rounded-xl p-6 lg:p-8"
      style={{
        backgroundColor: '#0A0A0A',
        border: `1px solid ${borderColor}`,
      }}
    >
      <span
        className="font-mono text-xs tracking-[0.15em] mb-6 block"
        style={{ color: labelColor }}
      >
        {label}
      </span>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: labelColor }}
            />
            <span className="font-body text-sm text-[#8A8478] leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BeforeAfter() {
  const ref = useScrollAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const beforeOpacity = Math.max(0, 1 - scrollProgress * 2);
  const afterOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.3) * 2));

  return (
    <section id="transformation" className="bg-[#141414] section-padding" ref={sectionRef}>
      <div ref={ref} className="content-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4 animate-item">
            THE TRANSFORMATION
          </p>
          <h2 className="section-title text-[#F5F0EB] animate-item">
            From Chaos to Coordination
          </h2>
        </div>

        {/* Transformation 1: Operations */}
        <div className="relative mb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div
              className="transition-opacity duration-700"
              style={{ opacity: Math.max(0.2, beforeOpacity) }}
            >
              <TransformationPanel
                label="BEFORE"
                labelColor="#E88A8A"
                borderColor="#3A2525"
                items={beforeOps}
              />
            </div>

            {/* After */}
            <div
              className="transition-opacity duration-700"
              style={{ opacity: afterOpacity }}
            >
              <TransformationPanel
                label="AFTER"
                labelColor="#4ADE80"
                borderColor="#1A3A2A"
                items={afterOps}
              />
            </div>
          </div>

          {/* Crossfade indicator */}
          <div className="flex justify-center mt-6 gap-2">
            <div
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: beforeOpacity > 0.5 ? 32 : 16,
                backgroundColor: beforeOpacity > 0.5 ? '#E88A8A' : '#2A2A2A',
              }}
            />
            <div
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: afterOpacity > 0.5 ? 32 : 16,
                backgroundColor: afterOpacity > 0.5 ? '#4ADE80' : '#2A2A2A',
              }}
            />
          </div>
        </div>

        {/* Transformation 2: Intelligence */}
        <div>
          <h3 className="subsection-title text-[#F5F0EB] mb-8 text-center animate-item">
            AI Handles Repetitive Intelligence. Humans Handle Trust
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <TransformationPanel
              label="BEFORE AI AGENTS"
              labelColor="#E88A8A"
              borderColor="#3A2525"
              items={beforeIntel}
            />
            <TransformationPanel
              label="AFTER AI AGENTS"
              labelColor="#4ADE80"
              borderColor="#1A3A2A"
              items={afterIntel}
            />
          </div>

          {/* Key message */}
          <div className="mt-12 text-center">
            <p className="font-display text-xl md:text-2xl text-[#C9A96E] italic animate-item">
              "AI handles repetitive intelligence. Humans handle trust, judgement, relationships, and closing."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
