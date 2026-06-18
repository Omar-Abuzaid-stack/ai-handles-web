import React, { useEffect, useState } from 'react';
import { CmsStore } from '../../lib/store';
import type { Robot } from '../../data';
import { Pencil, Eye, Save, X } from 'lucide-react';

const AdminAgents: React.FC = () => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Robot>>({});
  const [saving, setSaving] = useState(false);

  const loadRobots = () => {
    CmsStore.getRobots().then(setRobots);
  };

  useEffect(() => {
    loadRobots();
  }, []);

  const handleEdit = (robot: Robot) => {
    setEditingId(robot.id);
    setEditForm(robot);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editingId || !editForm.id) return;
    setSaving(true);
    const success = await CmsStore.saveRobot(editForm as Robot);
    if (success) {
      setEditingId(null);
      loadRobots();
    } else {
      alert("Failed to save changes");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-mono text-[#F5F0EB]">AI Agents Manager</h1>
        <button className="bg-[#C9A96E] hover:bg-[#D4B881] text-black px-4 py-2 rounded-md font-medium transition-colors text-sm">
          Add New Agent
        </button>
      </div>

      <div className="space-y-6">
        {robots.map(robot => (
          <div key={robot.id} className="bg-[#111111] border border-white/5 rounded-lg overflow-hidden">
            {editingId === robot.id ? (
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                  <h3 className="text-lg font-medium text-[#C9A96E]">Editing: {robot.name}</h3>
                  <div className="flex gap-2">
                    <button onClick={handleCancel} disabled={saving} className="px-3 py-1.5 border border-white/20 text-white/70 hover:bg-white/5 rounded-md text-sm transition-colors flex items-center gap-2">
                      <X size={16} /> Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving} className="px-3 py-1.5 bg-[#C9A96E] text-black hover:bg-[#D4B881] rounded-md text-sm transition-colors flex items-center gap-2">
                      <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Name</label>
                    <input 
                      type="text" 
                      value={editForm.name || ''} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editForm.title || ''} 
                      onChange={e => setEditForm({...editForm, title: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Department</label>
                    <input 
                      type="text" 
                      value={editForm.department || ''} 
                      onChange={e => setEditForm({...editForm, department: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Floor</label>
                    <input 
                      type="text" 
                      value={editForm.floor || ''} 
                      onChange={e => setEditForm({...editForm, floor: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Tagline</label>
                    <input 
                      type="text" 
                      value={editForm.tagline || ''} 
                      onChange={e => setEditForm({...editForm, tagline: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Description</label>
                    <textarea 
                      rows={4}
                      value={editForm.description || ''} 
                      onChange={e => setEditForm({...editForm, description: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-32 h-32 bg-black border border-white/10 rounded-md overflow-hidden shrink-0 relative">
                  <img src={robot.image} alt={robot.name} className="w-full h-full object-cover opacity-80" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-medium text-[#F5F0EB]">{robot.name}</h3>
                        <span className="text-xs font-mono px-2 py-0.5 border border-white/20 rounded text-[#C9A96E] bg-[#C9A96E]/10">
                          {robot.acronym}
                        </span>
                      </div>
                      <p className="text-[#C9A96E] text-sm mb-2">{robot.title} &bull; {robot.department}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors" title="Toggle Visibility">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEdit(robot)} className="p-2 text-white/50 hover:text-[#C9A96E] hover:bg-white/10 rounded-md transition-colors" title="Edit Agent">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-white/70 mb-4 line-clamp-2">{robot.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-white/60">
                      {robot.responsibilities.length} Responsibilities
                    </span>
                    <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-white/60">
                      Floor: {robot.floor}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAgents;
