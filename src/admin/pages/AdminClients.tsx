import React, { useEffect, useState } from 'react';
import { CmsStore } from '../../lib/store';
import type { Client, Project } from '../../lib/types';
import { Plus, Pencil, Trash2, Save, X, Building2, FolderOpen } from 'lucide-react';

const emptyClient: Client = {
  id: '', name: '', industry: '', market: 'UAE', country: 'UAE',
  logo: '', website: '', description: '', permissionToDisplay: true,
  publicStatus: 'anonymous', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
};

const emptyProject: Project = {
  id: '', title: '', clientId: '', challenge: '', solution: '',
  agentsInvolved: [], automationsInvolved: [], images: [], video: '',
  market: 'UAE', type: 'Demonstration', status: 'draft', published: false,
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
};

const AdminClients: React.FC = () => {
  const [tab, setTab] = useState<'clients' | 'projects'>('clients');
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => { CmsStore.getClients().then(setClients); CmsStore.getProjects().then(setProjects); };
  useEffect(() => { load(); }, []);

  const handleSaveClient = async () => {
    if (!editingClient || !editingClient.name) return;
    setSaving(true);
    const updatedClient = {
      ...editingClient,
      updatedAt: new Date().toISOString(),
      ...(isCreating && { createdAt: new Date().toISOString() })
    };
    await CmsStore.saveClient(updatedClient);
    setEditingClient(null); setIsCreating(false); load(); setSaving(false);
  };

  const handleSaveProject = async () => {
    if (!editingProject || !editingProject.title) return;
    setSaving(true);
    const updatedProject = {
      ...editingProject,
      updatedAt: new Date().toISOString(),
      ...(isCreating && { createdAt: new Date().toISOString() })
    };
    await CmsStore.saveProject(updatedProject);
    setEditingProject(null); setIsCreating(false); load(); setSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Clients & Projects</h1>
          <p className="text-white/50 text-sm mt-1">Manage client relationships and case studies</p>
        </div>
        <button onClick={() => {
          if (tab === 'clients') { setEditingClient({ ...emptyClient, id: `client-${Date.now()}` }); setIsCreating(true); }
          else { setEditingProject({ ...emptyProject, id: `project-${Date.now()}` }); setIsCreating(true); }
        }} className="bg-[#C9A96E] hover:bg-[#D4B881] text-black px-4 py-2 rounded-md font-medium transition-colors text-sm flex items-center gap-2"><Plus size={16} /> Add {tab === 'clients' ? 'Client' : 'Project'}</button>
      </div>

      <div className="flex gap-1 mb-6 bg-[#111111] border border-white/5 rounded-lg p-1 w-fit">
        <button onClick={() => setTab('clients')} className={`px-4 py-2 rounded-md text-sm transition-colors ${tab === 'clients' ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'text-white/50 hover:text-white/70'}`}><Building2 size={16} className="inline mr-2" />Clients ({clients.length})</button>
        <button onClick={() => setTab('projects')} className={`px-4 py-2 rounded-md text-sm transition-colors ${tab === 'projects' ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'text-white/50 hover:text-white/70'}`}><FolderOpen size={16} className="inline mr-2" />Projects ({projects.length})</button>
      </div>

      {/* Client Edit Form */}
      {editingClient && tab === 'clients' && (
        <ClientForm client={editingClient} onChange={setEditingClient} onSave={handleSaveClient} onCancel={() => { setEditingClient(null); setIsCreating(false); }} saving={saving} isCreating={isCreating} />
      )}

      {/* Project Edit Form */}
      {editingProject && tab === 'projects' && (
        <ProjectForm project={editingProject} onChange={setEditingProject} onSave={handleSaveProject} onCancel={() => { setEditingProject(null); setIsCreating(false); }} saving={saving} isCreating={isCreating} clients={clients} />
      )}

      {/* Client List */}
      {tab === 'clients' && !editingClient && (
        <div className="space-y-3">
          {clients.map(c => (
            <div key={c.id} className="bg-[#111111] border border-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-black border border-white/10 rounded overflow-hidden shrink-0 flex items-center justify-center">
                {c.logo ? <img src={c.logo} alt={c.name} className="w-full h-full object-contain" /> : <Building2 size={18} className="text-white/20" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#F5F0EB] truncate">{c.name}</h3>
                <p className="text-sm text-white/50">{c.industry} · {c.market} · {c.publicStatus}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => { setEditingClient({ ...c }); setIsCreating(false); }} className="p-2 text-white/30 hover:text-[#C9A96E] hover:bg-white/5 rounded-md"><Pencil size={16} /></button>
                {confirmDelete === c.id ? (
                  <div className="flex gap-1"><button onClick={async () => { await CmsStore.deleteClient(c.id); setConfirmDelete(null); load(); }} className="px-2 py-1 bg-red-600 text-white text-xs rounded">Yes</button><button onClick={() => setConfirmDelete(null)} className="px-2 py-1 bg-white/10 text-white text-xs rounded">No</button></div>
                ) : <button onClick={() => setConfirmDelete(c.id)} className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-md"><Trash2 size={16} /></button>}
              </div>
            </div>
          ))}
          {clients.length === 0 && <EmptyState icon={<Building2 size={40} />} text="No clients yet. Add your first client." />}
        </div>
      )}

      {/* Project List */}
      {tab === 'projects' && !editingProject && (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="bg-[#111111] border border-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-[#F5F0EB] truncate">{p.title}</h3>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${p.published ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>{p.status}</span>
                </div>
                <p className="text-sm text-white/50">{p.type} · {p.market} · Agents: {p.agentsInvolved.join(', ') || 'None'}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => { setEditingProject({ ...p }); setIsCreating(false); }} className="p-2 text-white/30 hover:text-[#C9A96E] hover:bg-white/5 rounded-md"><Pencil size={16} /></button>
                {confirmDelete === p.id ? (
                  <div className="flex gap-1"><button onClick={async () => { await CmsStore.deleteProject(p.id); setConfirmDelete(null); load(); }} className="px-2 py-1 bg-red-600 text-white text-xs rounded">Yes</button><button onClick={() => setConfirmDelete(null)} className="px-2 py-1 bg-white/10 text-white text-xs rounded">No</button></div>
                ) : <button onClick={() => setConfirmDelete(p.id)} className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-md"><Trash2 size={16} /></button>}
              </div>
            </div>
          ))}
          {projects.length === 0 && <EmptyState icon={<FolderOpen size={40} />} text="No projects yet. Add your first project." />}
        </div>
      )}
    </div>
  );
};

const ClientForm: React.FC<{ client: Client; onChange: (c: Client) => void; onSave: () => void; onCancel: () => void; saving: boolean; isCreating: boolean }> = ({ client, onChange, onSave, onCancel, saving, isCreating }) => (
  <div className="bg-[#111111] border border-[#C9A96E]/30 rounded-lg p-6 mb-8">
    <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
      <h2 className="text-xl font-medium text-[#C9A96E]">{isCreating ? 'New Client' : `Editing: ${client.name}`}</h2>
      <div className="flex gap-2">
        <button onClick={onCancel} className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/5 rounded-md text-sm flex items-center gap-2"><X size={16} /> Cancel</button>
        <button onClick={onSave} disabled={saving} className="px-4 py-2 bg-[#C9A96E] text-black hover:bg-[#D4B881] rounded-md text-sm font-medium flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Client Name" value={client.name} onChange={v => onChange({ ...client, name: v })} />
      <Field label="Industry" value={client.industry} onChange={v => onChange({ ...client, industry: v })} />
      <Field label="Market" value={client.market} onChange={v => onChange({ ...client, market: v })} />
      <Field label="Country" value={client.country} onChange={v => onChange({ ...client, country: v })} />
      <Field label="Logo URL" value={client.logo} onChange={v => onChange({ ...client, logo: v })} />
      <Field label="Website" value={client.website} onChange={v => onChange({ ...client, website: v })} />
      <div className="md:col-span-2"><label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Description</label><textarea rows={2} value={client.description} onChange={e => onChange({ ...client, description: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" /></div>
      <div className="md:col-span-2 flex gap-6">
        <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={client.permissionToDisplay} onChange={e => onChange({ ...client, permissionToDisplay: e.target.checked })} className="accent-[#C9A96E]" /> Permission to display</label>
        <select value={client.publicStatus} onChange={e => onChange({ ...client, publicStatus: e.target.value as Client['publicStatus'] })} className="bg-black border border-white/10 rounded px-3 py-1 text-white text-sm focus:border-[#C9A96E] focus:outline-none"><option value="public">Public</option><option value="private">Private Client</option><option value="anonymous">Anonymous</option></select>
      </div>
    </div>
  </div>
);

const ProjectForm: React.FC<{ project: Project; onChange: (p: Project) => void; onSave: () => void; onCancel: () => void; saving: boolean; isCreating: boolean; clients: Client[] }> = ({ project, onChange, onSave, onCancel, saving, isCreating, clients }) => (
  <div className="bg-[#111111] border border-[#C9A96E]/30 rounded-lg p-6 mb-8">
    <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
      <h2 className="text-xl font-medium text-[#C9A96E]">{isCreating ? 'New Project' : `Editing: ${project.title}`}</h2>
      <div className="flex gap-2">
        <button onClick={onCancel} className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/5 rounded-md text-sm flex items-center gap-2"><X size={16} /> Cancel</button>
        <button onClick={onSave} disabled={saving} className="px-4 py-2 bg-[#C9A96E] text-black hover:bg-[#D4B881] rounded-md text-sm font-medium flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2"><Field label="Project Title" value={project.title} onChange={v => onChange({ ...project, title: v })} /></div>
      <div>
        <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Client</label>
        <select value={project.clientId} onChange={e => onChange({ ...project, clientId: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none">
          <option value="">Select client...</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <Field label="Project Type" value={project.type} onChange={v => onChange({ ...project, type: v })} />
      <Field label="Market" value={project.market} onChange={v => onChange({ ...project, market: v })} />
      <div>
        <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Status</label>
        <select value={project.status} onChange={e => onChange({ ...project, status: e.target.value as Project['status'] })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none">
          <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
        </select>
      </div>
      <div className="md:col-span-2"><label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Challenge</label><textarea rows={2} value={project.challenge} onChange={e => onChange({ ...project, challenge: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" /></div>
      <div className="md:col-span-2"><label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Solution</label><textarea rows={2} value={project.solution} onChange={e => onChange({ ...project, solution: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" /></div>
      <div className="md:col-span-2"><Field label="Agents Involved (comma-separated)" value={project.agentsInvolved.join(', ')} onChange={v => onChange({ ...project, agentsInvolved: v.split(',').map(s => s.trim()).filter(Boolean) })} /></div>
      <div className="md:col-span-2"><Field label="Video URL" value={project.video} onChange={v => onChange({ ...project, video: v })} /></div>
      <div className="md:col-span-2 flex gap-6">
        <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={project.published} onChange={e => onChange({ ...project, published: e.target.checked })} className="accent-[#C9A96E]" /> Published</label>
      </div>
    </div>
  </div>
);

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div><label className="block text-xs text-white/50 uppercase tracking-wider mb-1">{label}</label><input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" /></div>
);

const EmptyState: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="bg-[#111111] border border-white/5 rounded-lg p-12 text-center"><div className="text-white/20 mx-auto mb-4">{icon}</div><p className="text-white/50">{text}</p></div>
);

export default AdminClients;
