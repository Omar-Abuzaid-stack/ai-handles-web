import React, { useEffect, useState, useRef } from 'react';
import { CmsStore } from '../../lib/store';
import type { MediaFile } from '../../lib/types';
import { Upload, Trash2, Search, Image as ImageIcon, Video, FileText } from 'lucide-react';

const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => CmsStore.getMedia().then(setMedia);
  useEffect(() => { load(); }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = async () => {
        const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document';
        const mediaFile: MediaFile = {
          id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          url: reader.result as string,
          type: type as MediaFile['type'],
          size: file.size,
          alt: '',
          usage: [],
          uploadedAt: new Date().toISOString(),
        };
        await CmsStore.saveMedia(mediaFile);
        load();
      };
      reader.readAsDataURL(file);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id: string) => {
    await CmsStore.deleteMedia(id);
    setConfirmDelete(null);
    load();
  };

  const filtered = media.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || m.type === filterType;
    return matchSearch && matchType;
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon size={20} />;
      case 'video': return <Video size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Media Library</h1>
          <p className="text-white/50 text-sm mt-1">{media.length} files · Manage all media assets</p>
        </div>
        <div className="flex gap-2">
          <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="bg-[#C9A96E] hover:bg-[#D4B881] text-black px-4 py-2 rounded-md font-medium transition-colors text-sm flex items-center gap-2">
            <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="w-full bg-[#111111] border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-[#C9A96E] focus:outline-none" />
        </div>
        <div className="flex gap-1 bg-[#111111] border border-white/5 rounded-lg p-1">
          {['all', 'image', 'video', 'document'].map(t => (
            <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filterType === t ? 'bg-[#C9A96E]/10 text-[#C9A96E]' : 'text-white/50 hover:text-white/70'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}s
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map(m => (
          <div key={m.id} className="bg-[#111111] border border-white/5 rounded-lg overflow-hidden group hover:border-white/10 transition-colors">
            <div className="aspect-square bg-black flex items-center justify-center overflow-hidden">
              {m.type === 'image' && m.url.startsWith('data:') ? (
                <img src={m.url} alt={m.alt || m.name} className="w-full h-full object-cover" />
              ) : m.type === 'image' ? (
                <img src={m.url} alt={m.alt || m.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-white/20">{getTypeIcon(m.type)}</div>
              )}
            </div>
            <div className="p-2">
              <p className="text-xs text-white/70 truncate" title={m.name}>{m.name}</p>
              <p className="text-xs text-white/30">{formatSize(m.size)}</p>
            </div>
            <div className="px-2 pb-2 flex justify-end">
              {confirmDelete === m.id ? (
                <div className="flex gap-1"><button onClick={() => handleDelete(m.id)} className="px-2 py-0.5 bg-red-600 text-white text-xs rounded">Delete</button><button onClick={() => setConfirmDelete(null)} className="px-2 py-0.5 bg-white/10 text-white text-xs rounded">Cancel</button></div>
              ) : (
                <button onClick={() => setConfirmDelete(m.id)} className="p-1 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-[#111111] border border-white/5 rounded-lg p-12 text-center">
          <Upload size={40} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/50">{media.length === 0 ? 'No media files yet. Upload your first file.' : 'No files match your search.'}</p>
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
