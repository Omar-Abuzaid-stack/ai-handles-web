import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { safetyControls } from '@/data';
import {
  FileEdit, ShieldCheck, Zap, Octagon, UserX,
  BookOpen, UserCheck, ClipboardList, Lock,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileEdit: <FileEdit size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Zap: <Zap size={20} />,
  Octagon: <Octagon size={20} />,
  UserX: <UserX size={20} />,
  BookOpen: <BookOpen size={20} />,
  UserCheck: <UserCheck size={20} />,
  ClipboardList: <ClipboardList size={20} />,
  Lock: <Lock size={20} />,
};

const statusColor = {
  Active: '#4ADE80',
  Standby: '#F59E0B',
  Ready: '#5A5550',
};

export default function SafetyCentre() {
  const gridRef = useStaggerAnimation('.control-card');

  return (
    <section id="safety" className="bg-[#0A0A0A] section-padding">
      <div className="content-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Info */}
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.15em] text-[#F59E0B] mb-4">
                FLOOR 7 — SAFETY & CONTROL
              </p>
              <h2 className="section-title text-[#F5F0EB] mb-6">
                Automation Should Increase Control, Not Remove It
              </h2>
              <p className="font-body text-base text-[#8A8478] leading-relaxed">
                Every action is logged, every sensitive decision is escalated, and every agent operates within clearly defined boundaries.
              </p>
            </div>

            {/* Safety Robot Image */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] max-h-[400px]">
              <img
                src="/images/robots/flux.jpg"
                alt="Safety Control Centre"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-[10px] text-[#F59E0B]">
                  SAFETY & CONTROL CENTRE
                </p>
                <p className="font-body text-xs text-[#8A8478]">
                  Human oversight on every critical decision
                </p>
              </div>
            </div>
          </div>

          {/* Right - Controls Grid */}
          <div>
            <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-6">
              Safety Controls
            </h3>
            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {safetyControls.map((control, i) => (
                <div
                  key={i}
                  className="control-card bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-4 text-center hover:border-[#F59E0B] hover:-translate-y-0.5 transition-all cursor-default"
                >
                  <div className="text-[#C9A96E] mb-2 flex justify-center">
                    {iconMap[control.icon]}
                  </div>
                  <p className="font-body font-medium text-[13px] text-[#F5F0EB] mb-2">
                    {control.name}
                  </p>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full inline-block"
                    style={{
                      color: statusColor[control.status],
                      backgroundColor: `${statusColor[control.status]}15`,
                    }}
                  >
                    {control.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Key principle */}
            <div className="mt-8 bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
              <p className="font-display text-lg text-[#F5F0EB] italic mb-2">
                "Automation should increase control, not remove it."
              </p>
              <p className="font-body text-sm text-[#8A8478]">
                Every AI agent operates within approved boundaries. Sensitive actions require human approval. Complete activity logs are maintained.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
