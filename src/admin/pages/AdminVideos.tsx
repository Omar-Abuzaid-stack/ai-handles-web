import React, { useEffect, useState } from 'react';
import { CmsStore } from '../../lib/store';
import type { Video } from '../../lib/types';
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, X, Video as VideoIcon, ExternalLink } from 'lucide-react';

const emptyVideo: Video = {
  id: '',
  title: '',
  description: '',
  videoUrl: '',
  posterImage: '',
  type: 'mp4',
  placement: ['homepage'],
  autoplay: false,
  loop: false,
  controls: true,
  muted: true,
  published: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const AdminVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editing, setEditing] = useState<Video | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => CmsStore.getVideos().then(setVideos);
  useEffect(() => { load(); }, []);

  const handleCreate = () => { setEditing({ ...emptyVideo, id: `video-${Date.now()}` }); setIsCreating(true); };
  const handleEdit = (v: Video) => { setEditing({ ...v }); setIsCreating(false); };
  const handleCancel = () => { setEditing(null); setIsCreating(false); };

  const handleSave = async () => {
    if (!editing || !editing.title) return;
    setSaving(true);
    const updatedEditing = { ...editing, updatedAt: new Date().toISOString() };
    if (isCreating) updatedEditing.createdAt = new Date().toISOString();
    await CmsStore.saveVideo(updatedEditing);
    handleCancel();
    load();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await CmsStore.deleteVideo(id);
    setConfirmDelete(null);
    load();
  };

  const togglePublished = async (v: Video) => {
    await CmsStore.saveVideo({ ...v, published: !v.published, updatedAt: new Date().toISOString() });
    load();
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Video Management</h1>
          <p className="text-white/50 text-sm mt-1">{videos.length} videos · Manage demo and promotional videos</p>
        </div>
        <button onClick={handleCreate} className="bg-[#C9A96E] hover:bg-[#D4B881] text-black px-4 py-2 rounded-md font-medium transition-colors text-sm flex items-center gap-2"><Plus size={16} /> Add Video</button>
      </div>

      {editing && (
        <div className="bg-[#111111] border border-[#C9A96E]/30 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xl font-medium text-[#C9A96E]">{isCreating ? 'New Video' : `Editing: ${editing.title}`}</h2>
            <div className="flex gap-2">
              <button onClick={handleCancel} className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/5 rounded-md text-sm flex items-center gap-2"><X size={16} /> Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#C9A96E] text-black hover:bg-[#D4B881] rounded-md text-sm font-medium flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Video Title</label>
              <input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Description</label>
              <textarea rows={2} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Video URL</label>
              <input type="text" value={editing.videoUrl} onChange={e => setEditing({ ...editing, videoUrl: e.target.value })} placeholder="/videos/file.mp4 or YouTube URL" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Video Type</label>
              <select value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value as Video['type'] })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none">
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="external">External URL</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Poster Image URL</label>
              <input type="text" value={editing.posterImage} onChange={e => setEditing({ ...editing, posterImage: e.target.value })} placeholder="/brand/poster.jpg" className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
            </div>
            <div className="md:col-span-2 flex gap-6 flex-wrap">
              {(
                [
                  { key: 'autoplay' as const, label: 'Autoplay (muted)' },
                  { key: 'loop' as const, label: 'Loop' },
                  { key: 'controls' as const, label: 'Show Controls' },
                  { key: 'muted' as const, label: 'Muted by Default' },
                  { key: 'published' as const, label: 'Published' },
                ] as const
              ).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-sm text-white/70">
                  <input type="checkbox" checked={editing[key]} onChange={e => setEditing({ ...editing, [key]: e.target.checked })} className="accent-[#C9A96E]" /> {label}
                </label>
              ))}
            </div>
          </div>

          {editing.videoUrl && (
            <div className="mt-4 p-4 bg-black/50 rounded-lg border border-white/5">
              <p className="text-xs text-white/40 mb-2">Preview:</p>
              {editing.type === 'mp4' || editing.type === 'webm' ? (
                <video src={editing.videoUrl} poster={editing.posterImage} controls={false} className="w-full max-h-64 object-cover rounded" />
              ) : (
                <div className="flex items-center gap-2 text-white/50 text-sm"><ExternalLink size={16} /> External video: {editing.videoUrl}</div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {videos.map(v => (
          <div key={v.id} className="bg-[#111111] border border-white/5 rounded-lg p-4 flex items-center gap-4">
            <div className="w-20 h-12 bg-black border border-white/10 rounded overflow-hidden shrink-0 flex items-center justify-center">
              {v.posterImage ? <img src={v.posterImage} alt="" className="w-full h-full object-cover" /> : <VideoIcon size={18} className="text-white/20" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-[#F5F0EB] truncate">{v.title}</h3>
                <span className="text-xs px-1.5 py-0.5 border border-white/10 rounded text-white/40 uppercase">{v.type}</span>
                {v.published ? <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded">Live</span> : <span className="text-xs px-1.5 py-0.5 bg-white/5 text-white/40 border border-white/10 rounded">Draft</span>}
              </div>
              <p className="text-sm text-white/50 truncate">{v.videoUrl}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => togglePublished(v)} className="p-2 text-white/30 hover:text-white/60 hover:bg-white/5 rounded-md transition-colors" title={v.published ? 'Unpublish' : 'Publish'}>{v.published ? <Eye size={16} /> : <EyeOff size={16} />}</button>
              <button onClick={() => handleEdit(v)} className="p-2 text-white/30 hover:text-[#C9A96E] hover:bg-white/5 rounded-md transition-colors" title="Edit"><Pencil size={16} /></button>
              {confirmDelete === v.id ? (
                <div className="flex gap-1">
                  <button onClick={() => handleDelete(v.id)} className="px-2 py-1 bg-red-600 text-white text-xs rounded">Yes</button>
                  <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 bg-white/10 text-white text-xs rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(v.id)} className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors" title="Delete"><Trash2 size={16} /></button>
              )}
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <div className="bg-[#111111] border border-white/5 rounded-lg p-12 text-center">
            <VideoIcon size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50">No videos yet. Add your first demo video.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;
