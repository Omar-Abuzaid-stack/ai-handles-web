import React, { useEffect, useState } from 'react';
import { CmsStore } from '../../lib/store';
import type { Robot } from '../../data';

const AdminDashboard: React.FC = () => {
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    CmsStore.getRobots().then(setRobots);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-mono text-[#F5F0EB] mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
          <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">Active AI Agents</h3>
          <p className="text-4xl font-light text-[#C9A96E]">{robots.length}</p>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
          <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">Published Projects</h3>
          <p className="text-4xl font-light text-[#C9A96E]">0</p>
          <p className="text-xs text-white/30 mt-2">Seed data required</p>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
          <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">System Status</h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="text-lg text-white/80">Online & Secure</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-mono text-[#F5F0EB] mb-6 border-b border-white/10 pb-2">Recent AI Agents</h2>
      <div className="bg-[#111111] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 border-b border-white/5">
            <tr>
              <th className="p-4 text-xs font-medium text-white/50 uppercase tracking-wider">Agent Name</th>
              <th className="p-4 text-xs font-medium text-white/50 uppercase tracking-wider">Department</th>
              <th className="p-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {robots.slice(0, 5).map(robot => (
              <tr key={robot.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-xs text-[#C9A96E]">
                      {robot.acronym.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-[#F5F0EB]">{robot.name}</p>
                      <p className="text-xs text-white/50">{robot.title}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-white/70">{robot.department}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
