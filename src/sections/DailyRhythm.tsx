import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { dailyRhythm } from '@/data';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sunrise: <Sunrise size={32} />,
  Sun: <Sun size={32} />,
  Sunset: <Sunset size={32} />,
  Moon: <Moon size={32} />,
};

const colorMap: Record<string, string> = {
  Sunrise: '#C9A96E',
  Sun: '#C9A96E',
  Sunset: '#E8D5A3',
  Moon: '#5A5550',
};

export default function DailyRhythm() {
  const ref = useStaggerAnimation('.rhythm-card');

  return (
    <section id="rhythm" className="bg-[#141414] section-padding">
      <div className="content-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4">
            AROUND THE CLOCK
          </p>
          <h2 className="section-title text-[#F5F0EB]">
            The Building Never Sleeps
          </h2>
        </div>

        {/* Time Phase Cards */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyRhythm.map((phase, i) => (
            <div
              key={i}
              className="rhythm-card bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-7 hover:border-[#C9A96E]/30 transition-all"
            >
              <div
                className="mb-5"
                style={{ color: colorMap[phase.icon] }}
              >
                {iconMap[phase.icon]}
              </div>
              <p className="font-mono text-sm text-[#F5F0EB] mb-1">
                {phase.time}
              </p>
              <p
                className="font-body font-semibold text-base mb-4"
                style={{ color: colorMap[phase.icon] }}
              >
                {phase.label}
              </p>
              <ul className="space-y-2">
                {phase.tasks.map((task, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#2A2A2A] mt-2 flex-shrink-0" />
                    <span className="font-body text-[13px] text-[#8A8478]">
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
