import React, { useEffect, useState } from 'react';
import { CmsStore } from '../../lib/store';
import type { TeamMember } from '../../lib/types';
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, Save, X, QrCode, Star, User } from 'lucide-react';

const emptyMember: TeamMember = {
  id: '',
  name: '',
  title: '',
  department: '',
  shortBio: '',
  fullBio: '',
  image: '',
  imageAlt: '',
  phone: '',
  email: '',
  whatsappUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  country: 'UAE',
  languages: ['English'],
  responsibilities: [],
  displayOrder: 0,
  featured: false,
  visible: true,
  contactButtons: { phone: true, whatsapp: true, email: true, linkedin: true },
  qrDestination: '',
  qrTitle: '',
  qrSupporting: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const AdminTeam: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<TeamMember>(emptyMember);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => CmsStore.getTeamMembers().then(setMembers);
  useEffect(() => { load(); }, []);

  const handleEdit = (m: TeamMember) => { setEditingId(m.id); setForm({ ...m }); setIsCreating(false); };
  const handleCreate = () => { setEditingId(null); setForm({ ...emptyMember, id: `team-${Date.now()}` }); setIsCreating(true); };
  const handleCancel = () => { setEditingId(null); setIsCreating(false); setForm(emptyMember); };

  const handleSave = async () => {
    if (!form.name || !form.title) return;
    setSaving(true);
    form.updatedAt = new Date().toISOString();
    if (isCreating) form.createdAt = new Date().toISOString();
    const ok = await CmsStore.saveTeamMember(form);
    if (ok) { handleCancel(); load(); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await CmsStore.deleteTeamMember(id);
    setConfirmDelete(null);
    load();
  };

  const toggleVisible = async (m: TeamMember) => {
    await CmsStore.saveTeamMember({ ...m, visible: !m.visible, updatedAt: new Date().toISOString() });
    load();
  };

  const toggleFeatured = async (m: TeamMember) => {
    await CmsStore.saveTeamMember({ ...m, featured: !m.featured, updatedAt: new Date().toISOString() });
    load();
  };

  const isEditing = editingId !== null || isCreating;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Team Members</h1>
          <p className="text-white/50 text-sm mt-1">{members.length} members · Drag to reorder</p>
        </div>
        <button onClick={handleCreate} className="bg-[#C9A96E] hover:bg-[#D4B881] text-black px-4 py-2 rounded-md font-medium transition-colors text-sm flex items-center gap-2">
          <Plus size={16} /> Add Team Member
        </button>
      </div>

      {isEditing && (
        <div className="bg-[#111111] border border-[#C9A96E]/30 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xl font-medium text-[#C9A96E]">{isCreating ? 'New Team Member' : `Editing: ${form.name}`}</h2>
            <div className="flex gap-2">
              <button onClick={handleCancel} className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/5 rounded-md text-sm flex items-center gap-2"><X size={16} /> Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#C9A96E] text-black hover:bg-[#D4B881] rounded-md text-sm font-medium flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Full Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
            <Field label="Job Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
            <Field label="Department" value={form.department} onChange={v => setForm({ ...form, department: v })} />
            <Field label="Country" value={form.country} onChange={v => setForm({ ...form, country: v })} />
            <Field label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
            <Field label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
            <Field label="WhatsApp URL" value={form.whatsappUrl} onChange={v => setForm({ ...form, whatsappUrl: v })} placeholder="https://wa.me/971501234567" />
            <Field label="LinkedIn URL" value={form.linkedinUrl} onChange={v => setForm({ ...form, linkedinUrl: v })} />
            <Field label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="/brand/photo.jpg" />
            <Field label="Image Alt Text" value={form.imageAlt} onChange={v => setForm({ ...form, imageAlt: v })} />
            <Field label="QR Destination URL" value={form.qrDestination} onChange={v => setForm({ ...form, qrDestination: v })} />
            <Field label="QR Code Title" value={form.qrTitle} onChange={v => setForm({ ...form, qrTitle: v })} />
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Short Bio</label>
              <textarea rows={2} value={form.shortBio} onChange={e => setForm({ ...form, shortBio: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Full Biography</label>
              <textarea rows={4} value={form.fullBio} onChange={e => setForm({ ...form, fullBio: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Languages (comma-separated)</label>
              <input type="text" value={form.languages.join(', ')} onChange={e => setForm({ ...form, languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Responsibilities (one per line)</label>
              <textarea rows={4} value={form.responsibilities.join('\n')} onChange={e => setForm({ ...form, responsibilities: e.target.value.split('\n').filter(Boolean) })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">QR Supporting Text</label>
              <input type="text" value={form.qrSupporting} onChange={e => setForm({ ...form, qrSupporting: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div className="md:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={form.visible} onChange={e => setForm({ ...form, visible: e.target.checked })} className="accent-[#C9A96E]" /> Visible on website
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-[#C9A96E]" /> Featured
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Contact Buttons</label>
              <div className="flex gap-4">
                {(['phone', 'whatsapp', 'email', 'linkedin'] as const).map(key => (
                  <label key={key} className="flex items-center gap-2 text-sm text-white/70">
                    <input type="checkbox" checked={form.contactButtons[key]} onChange={e => setForm({ ...form, contactButtons: { ...form.contactButtons, [key]: e.target.checked } })} className="accent-[#C9A96E]" /> {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {members.sort((a, b) => a.displayOrder - b.displayOrder).map(m => (
          <div key={m.id} className={`bg-[#111111] border rounded-lg p-4 flex items-center gap-4 transition-colors ${m.visible ? 'border-white/5' : 'border-white/5 opacity-50'}`}>
            <GripVertical size={18} className="text-white/20 cursor-grab shrink-0" />
            <div className="w-12 h-12 bg-black border border-white/10 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
              {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : <User size={20} className="text-white/30" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-[#F5F0EB] truncate">{m.name}</h3>
                {m.featured && <Star size={14} className="text-[#C9A96E] shrink-0" />}
                {!m.visible && <span className="text-xs px-1.5 py-0.5 bg-white/10 rounded text-white/40">Hidden</span>}
              </div>
              <p className="text-sm text-white/50 truncate">{m.title} · {m.department}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleFeatured(m)} className={`p-2 rounded-md transition-colors ${m.featured ? 'text-[#C9A96E] bg-[#C9A96E]/10' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`} title="Featured"><Star size={16} /></button>
              <button onClick={() => toggleVisible(m)} className="p-2 text-white/30 hover:text-white/60 hover:bg-white/5 rounded-md transition-colors" title={m.visible ? 'Hide' : 'Show'}>{m.visible ? <Eye size={16} /> : <EyeOff size={16} />}</button>
              <button onClick={() => handleEdit(m)} className="p-2 text-white/30 hover:text-[#C9A96E] hover:bg-white/5 rounded-md transition-colors" title="Edit"><Pencil size={16} /></button>
              {m.qrDestination && <button className="p-2 text-white/30 hover:text-white/60 hover:bg-white/5 rounded-md transition-colors" title="QR Code"><QrCode size={16} /></button>}
              {confirmDelete === m.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleDelete(m.id)} className="px-2 py-1 bg-red-600 text-white text-xs rounded">Delete</button>
                  <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 bg-white/10 text-white text-xs rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(m.id)} className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors" title="Delete"><Trash2 size={16} /></button>
              )}
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="bg-[#111111] border border-white/5 rounded-lg p-12 text-center">
            <User size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50">No team members yet. Click "Add Team Member" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">{label}</label>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
  </div>
);

export default AdminTeam;
