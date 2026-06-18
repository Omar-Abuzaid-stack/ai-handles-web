import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { workflows } from '@/data';
import type { Robot } from '@/data';
import { ArrowRight } from 'lucide-react';
import RobotSection from './RobotSection';

function WorkflowDiagram({ workflow, index }: { workflow: typeof workflows[0]; index: number }) {
  return (
    <div className="animate-item">
      <h4 className="font-body font-semibold text-sm text-[#F5F0EB] mb-4">
        {workflow.name}
      </h4>
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 min-w-max">
          {workflow.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Node */}
              <div
                className="relative"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div
                  className="px-3 py-2 rounded-lg border text-center min-w-[80px]"
                  style={{
                    backgroundColor: i === 0 ? '#C9A96E15' : i === workflow.steps.length - 1 ? '#4ADE8015' : '#1E1E1E',
                    borderColor: i === 0 ? '#C9A96E' : i === workflow.steps.length - 1 ? '#4ADE80' : '#2A2A2A',
                  }}
                >
                  <span
                    className="font-mono text-[10px]"
                    style={{
                      color: i === 0 ? '#C9A96E' : i === workflow.steps.length - 1 ? '#4ADE80' : '#8A8478',
                    }}
                  >
                    {step}
                  </span>
                </div>
                {/* Pulse animation on active nodes */}
                <div
                  className="absolute inset-0 rounded-lg animate-pulse-glow pointer-events-none"
                  style={{ animationDelay: `${i * 0.5 + index * 0.3}s` }}
                />
              </div>

              {/* Arrow */}
              {i < workflow.steps.length - 1 && (
                <ArrowRight size={14} className="text-[#2A2A2A] flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FluxSection({ robot }: { robot: Robot }) {
  const workflowsRef = useScrollAnimation();

  if (!robot) return null;

  return (
    <RobotSection robot={robot}>
      {/* Workflow Diagrams */}
      <div ref={workflowsRef} className="space-y-8">
        <h3 className="font-body font-semibold text-sm text-[#F5F0EB] mb-6 animate-item">
          Workflow Examples
        </h3>
        {workflows.map((workflow, i) => (
          <WorkflowDiagram key={i} workflow={workflow} index={i} />
        ))}
        <p className="font-mono text-[10px] text-[#5A5550] animate-item">
          * Frontend demonstration of workflow visualization
        </p>
      </div>
    </RobotSection>
  );
}
