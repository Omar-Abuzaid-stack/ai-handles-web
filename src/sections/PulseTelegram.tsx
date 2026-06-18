import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { telegramCommands } from '@/data';
import type { Robot } from '@/data';
import { Bot, User } from 'lucide-react';
import RobotSection from './RobotSection';

export default function PulseSection({ robot }: { robot: Robot }) {
  const [activeCommand, setActiveCommand] = useState(0);
  const demoRef = useScrollAnimation();

  if (!robot) return null;

  return (
    <RobotSection robot={robot}>
      {/* Telegram Command Demo */}
      <div ref={demoRef} className="animate-item">
        <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4">
          Telegram Command Interface
        </h3>

        {/* Phone Mockup */}
        <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0">
          {/* Header */}
          <div className="bg-[#1E1E1E] px-4 py-3 flex items-center gap-3 border-b border-[#2A2A2A]">
            <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
              <Bot size={16} className="text-[#C9A96E]" />
            </div>
            <div>
              <p className="font-body font-semibold text-xs text-[#F5F0EB]">Vantility AI</p>
              <p className="font-mono text-[9px] text-[#4ADE80]">Online</p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="p-4 h-48 overflow-y-auto space-y-3">
            {/* User message */}
            <div className="flex items-start gap-2 justify-end">
              <div className="bg-[#C9A96E] text-[#0A0A0A] rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                <p className="font-body text-xs">{telegramCommands[activeCommand].command}</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                <User size={12} className="text-[#8A8478]" />
              </div>
            </div>

            {/* Bot response */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
                <Bot size={12} className="text-[#C9A96E]" />
              </div>
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                <p className="font-body text-xs text-[#8A8478]">
                  {telegramCommands[activeCommand].result}
                </p>
                <p className="font-mono text-[9px] text-[#5A5550] mt-1">
                  Delivered by {robot.name}
                </p>
              </div>
            </div>
          </div>

          {/* Command Selector */}
          <div className="border-t border-[#2A2A2A] p-3">
            <div className="flex flex-wrap gap-2">
              {telegramCommands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCommand(i)}
                  className={`font-body text-[10px] px-2.5 py-1.5 rounded-full border transition-all ${
                    activeCommand === i
                      ? 'bg-[#C9A96E] text-[#0A0A0A] border-[#C9A96E]'
                      : 'bg-transparent text-[#8A8478] border-[#2A2A2A] hover:border-[#C9A96E]'
                  }`}
                >
                  {cmd.command.length > 25 ? cmd.command.slice(0, 25) + '...' : cmd.command}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="font-mono text-[10px] text-[#F59E0B] mt-3">
          * This is a frontend demonstration. Actual Telegram integration requires backend connection.
        </p>
      </div>
    </RobotSection>
  );
}
