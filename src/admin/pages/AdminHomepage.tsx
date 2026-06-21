import React, { useEffect, useState } from 'react';
import { CmsStore } from '../../lib/store';
import type { HomepageContent } from '../../lib/types';
import { Save, RotateCcw } from 'lucide-react';

const AdminHomepage: React.FC = () => {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { CmsStore.getHomepage().then(setContent); }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    await CmsStore.saveHomepage(content);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!content) return <div className="text-white/50">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Homepage Editor</h1>
          <p className="text-white/50 text-sm mt-1">Edit all public homepage content</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => CmsStore.getHomepage().then(setContent)} className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/5 rounded-md text-sm flex items-center gap-2"><RotateCcw size={16} /> Reset</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#C9A96E] text-black hover:bg-[#D4B881] rounded-md text-sm font-medium flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}</button>
        </div>
      </div>

      <div className="space-y-8">
        <Section title="Hero Section">
          <Field label="Eyebrow" value={content.hero.eyebrow} onChange={v => setContent({ ...content, hero: { ...content.hero, eyebrow: v } })} />
          <Field label="Headline" value={content.hero.headline} onChange={v => setContent({ ...content, hero: { ...content.hero, headline: v } })} />
          <TextArea label="Supporting Text" value={content.hero.supportingText} onChange={v => setContent({ ...content, hero: { ...content.hero, supportingText: v } })} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary CTA" value={content.hero.primaryCta} onChange={v => setContent({ ...content, hero: { ...content.hero, primaryCta: v } })} />
            <Field label="Secondary CTA" value={content.hero.secondaryCta} onChange={v => setContent({ ...content, hero: { ...content.hero, secondaryCta: v } })} />
          </div>
        </Section>

        <Section title="AI Workforce Introduction">
          <Field label="Headline" value={content.workforceIntro.headline} onChange={v => setContent({ ...content, workforceIntro: { ...content.workforceIntro, headline: v } })} />
          <TextArea label="Supporting Text" value={content.workforceIntro.supportingText} onChange={v => setContent({ ...content, workforceIntro: { ...content.workforceIntro, supportingText: v } })} rows={4} />
        </Section>

        <Section title="Platform Control">
          <Field label="Headline" value={content.platformControl.headline} onChange={v => setContent({ ...content, platformControl: { ...content.platformControl, headline: v } })} />
          <TextArea label="Supporting Text" value={content.platformControl.supportingText} onChange={v => setContent({ ...content, platformControl: { ...content.platformControl, supportingText: v } })} rows={2} />
        </Section>

        <Section title="Safety & Human Control">
          <Field label="Headline" value={content.safety.headline} onChange={v => setContent({ ...content, safety: { ...content.safety, headline: v } })} />
          <TextArea label="Supporting Text" value={content.safety.supportingText} onChange={v => setContent({ ...content, safety: { ...content.safety, supportingText: v } })} rows={2} />
        </Section>

        <Section title="Gulf & Global Positioning">
          <Field label="Headline" value={content.gulfPositioning.headline} onChange={v => setContent({ ...content, gulfPositioning: { ...content.gulfPositioning, headline: v } })} />
          <TextArea label="Supporting Text" value={content.gulfPositioning.supportingText} onChange={v => setContent({ ...content, gulfPositioning: { ...content.gulfPositioning, supportingText: v } })} rows={2} />
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">Countries (one per line)</label>
            <textarea rows={6} value={content.gulfPositioning.countries.join('\n')} onChange={e => setContent({ ...content, gulfPositioning: { ...content.gulfPositioning, countries: e.target.value.split('\n').filter(Boolean) } })} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
          </div>
        </Section>

        <Section title="Final CTA">
          <Field label="Headline" value={content.finalCta.headline} onChange={v => setContent({ ...content, finalCta: { ...content.finalCta, headline: v } })} />
          <TextArea label="Supporting Text" value={content.finalCta.supportingText} onChange={v => setContent({ ...content, finalCta: { ...content.finalCta, supportingText: v } })} rows={2} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary CTA" value={content.finalCta.primaryCta} onChange={v => setContent({ ...content, finalCta: { ...content.finalCta, primaryCta: v } })} />
            <Field label="Secondary CTA" value={content.finalCta.secondaryCta} onChange={v => setContent({ ...content, finalCta: { ...content.finalCta, secondaryCta: v } })} />
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
    <h2 className="text-lg font-medium text-[#C9A96E] mb-4 pb-3 border-b border-white/10">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">{label}</label>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
  </div>
);

const TextArea: React.FC<{ label: string; value: string; onChange: (v: string) => void; rows?: number }> = ({ label, value, onChange, rows = 3 }) => (
  <div>
    <label className="block text-xs text-white/50 uppercase tracking-wider mb-1">{label}</label>
    <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-white focus:border-[#C9A96E] focus:outline-none text-sm" />
  </div>
);

export default AdminHomepage;
