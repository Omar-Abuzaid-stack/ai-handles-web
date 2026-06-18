import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { reportMetrics } from '@/data';
import type { Robot } from '@/data';
import RobotSection from './RobotSection';

export default function LumenSection({ robot }: { robot: Robot }) {
  const dashRef = useScrollAnimation();

  if (!robot) return null;

  return (
    <RobotSection robot={robot}>
      {/* Mock Dashboard */}
      <div ref={dashRef}>
        <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4 animate-item">
          Live Dashboard Preview
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {reportMetrics.map((metric, i) => (
            <div
              key={i}
              className="animate-item bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 text-center hover:border-[#C9A96E]/30 transition-colors"
            >
              <p className="font-display text-2xl lg:text-3xl text-[#C9A96E] mb-1">
                {metric.value}
              </p>
              <p className="font-mono text-[10px] text-[#8A8478] uppercase tracking-wider">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] text-[#5A5550] mt-3 animate-item">
          * Frontend demonstration with sample data
        </p>
      </div>
    </RobotSection>
  );
}
