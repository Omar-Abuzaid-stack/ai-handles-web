import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { benefits } from '@/data';
import {
  Zap, Bell, Database, Users, Repeat, PenTool,
  Eye, BarChart3, Link, MessageSquare, Clock, Heart,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={24} />,
  Bell: <Bell size={24} />,
  Database: <Database size={24} />,
  Users: <Users size={24} />,
  Repeat: <Repeat size={24} />,
  PenTool: <PenTool size={24} />,
  Eye: <Eye size={24} />,
  BarChart3: <BarChart3 size={24} />,
  Link: <Link size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Clock: <Clock size={24} />,
  Heart: <Heart size={24} />,
};

export default function Benefits() {
  const ref = useStaggerAnimation('.benefit-card');

  return (
    <section id="benefits" className="bg-[#0A0A0A] section-padding">
      <div className="content-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#C9A96E] mb-4">
            WHY AI WORKFORCE
          </p>
          <h2 className="section-title text-[#F5F0EB]">
            Real Benefits. No Fake Statistics
          </h2>
        </div>

        {/* Benefits Grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-card card-base group"
            >
              <div className="text-[#C9A96E] mb-4 group-hover:scale-110 transition-transform">
                {iconMap[benefit.icon]}
              </div>
              <h3 className="font-body font-semibold text-[15px] text-[#F5F0EB] mb-2">
                {benefit.title}
              </h3>
              <p className="font-body text-[13px] text-[#8A8478] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
