import React, { useEffect, useState } from 'react';
import { CmsStore } from '../../lib/store';
import type { ThemeSettings } from '../../lib/types';
import { Save, RotateCcw, Palette } from 'lucide-react';

const defaultTheme: ThemeSettings = {
  mode: 'dark',
  colors: {
    background: '#0A0A0A',
    surface: '#111111',
    surfaceHover: '#1A1A1A',
    primary: '#C9A96E',
    primaryHover: '#D4B881',
    accent: '#8B7355',
    text: '#F5F0EB',
    textSecondary: '#8A8478',
    border: 'rgba(255,255,255,0.08)',
    cardBg: '#111111',
  },
  fonts: { heading: 'Manrope', body: 'Inter' },
  borderRadius: '0.75rem',
  logo: '/brand/ai-handle-logo.png',
  favicon: '/brand/favicon.ico',
};

const AdminTheme: React.FC = () => {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { CmsStore.getTheme().then(setTheme); }, []);

  const handleSave = async () => {
    if (!theme) return;
    setSaving(true);
    await CmsStore.saveTheme(theme);
    localStorage.setItem('aihandle_theme_mode', theme.mode);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
    setTheme(defaultTheme);
    await CmsStore.saveTheme(defaultTheme);
  };

  if (!theme) return <div className="text-white/50">Loading...</div>;

  const updateColor = (key: keyof typeof theme.colors, value: string) => {
    setTheme({ ...theme, colors: { ...theme.colors, [key]: value } });
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Theme Manager</h1>
          <p className="text-white/50 text-sm mt-1">Customize colors, fonts, and appearance</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/5 rounded-md text-sm flex items-center gap-2"><RotateCcw size={16} /> Reset to Default</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#C9A96E] text-black hover:bg-[#D4B881] rounded-md text-sm font-medium flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Theme'}</button>
        </div>
      </div>

      {/* Theme Mode */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-[#C9A96E] mb-4 pb-3 border-b border-white/10">Theme Mode</h2>
        <div className="flex gap-3">
          {(['dark', 'light', 'system'] as const).map(mode => (
            <button key={mode} onClick={() => setTheme({ ...theme, mode })} className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${theme.mode === mode ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-white/10 text-white/50 hover:bg-white/5'}`}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-[#C9A96E] mb-4 pb-3 border-b border-white/10 flex items-center gap-2"><Palette size={18} /> Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
              <div className="flex gap-2">
                <input type="color" value={value.startsWith('#') ? value : '#000000'} onChange={e => updateColor(key as keyof typeof theme.colors, e.target.value)} className="w-10 h-10 rounded border border-white/10 cursor-pointer bg-transparent" />
                <input type="text" value={value} onChange={e => updateColor(key as keyof typeof theme.colors, e.target.value)} className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none font-mono" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-[#C9A96E] mb-4 pb-3 border-b border-white/10">Typography</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Heading Font</label>
            <select value={theme.fonts.heading} onChange={e => setTheme({ ...theme, fonts: { ...theme.fonts, heading: e.target.value } })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none">
              {['Manrope', 'Inter', 'Plus Jakarta Sans', 'Geist', 'Sora'].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Body Font</label>
            <select value={theme.fonts.body} onChange={e => setTheme({ ...theme, fonts: { ...theme.fonts, body: e.target.value } })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#C9A96E] focus:outline-none">
              {['Inter', 'Manrope', 'Plus Jakarta Sans', 'Geist', 'Sora'].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-[#C9A96E] mb-4 pb-3 border-b border-white/10">Border Radius</h2>
        <div className="flex gap-3">
          {['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem'].map(r => (
            <button key={r} onClick={() => setTheme({ ...theme, borderRadius: r })} className={`w-16 h-16 border-2 transition-all flex items-center justify-center text-xs ${theme.borderRadius === r ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-white/10 text-white/40 hover:bg-white/5'}`} style={{ borderRadius: r }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#C9A96E] mb-4 pb-3 border-b border-white/10">Live Preview</h2>
        <div className="rounded-lg p-6 border" style={{ background: theme.colors.background, borderColor: theme.colors.border, borderRadius: theme.borderRadius }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>Preview Heading</h3>
          <p className="text-sm mb-4" style={{ color: theme.colors.textSecondary, fontFamily: theme.fonts.body }}>This is how your body text will appear across the site.</p>
          <button className="px-4 py-2 text-sm font-medium rounded-md" style={{ background: theme.colors.primary, color: '#000', borderRadius: theme.borderRadius }}>Primary Button</button>
        </div>
      </div>
    </div>
  );
};

export default AdminTheme;
