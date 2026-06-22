import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CmsStore } from '../../lib/store';
import type { TeamMember } from '../../lib/types';
import { Download, Printer, Copy } from 'lucide-react';

export default function AdminBusinessCards() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [cardUrl, setCardUrl] = useState('');

  useEffect(() => {
    CmsStore.getTeamMembers().then((m) => {
      setMembers(m.filter((t) => t.visible));
      if (m.length > 0) {
        setSelected(m.find((t) => t.visible) || m[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (selected) {
      setCardUrl(`${window.location.origin}/card/${selected.id}`);
    }
  }, [selected]);

  const downloadPNG = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${selected?.id || 'business-card'}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadSVG = () => {
    const svg = document.querySelector('#qr-svg svg') as SVGElement;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `${selected?.id || 'business-card'}-qr.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const printCard = () => {
    window.print();
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(cardUrl);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Business Cards</h1>
          <p className="text-sm text-white/50 mt-1">Private team QR codes — not visible on public pages</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Member Selector */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Team Members</h2>
          <div className="space-y-2">
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelected(member)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  selected?.id === member.id
                    ? 'bg-purple/10 border-purple/30 text-white'
                    : 'bg-[#111111] border-white/5 text-white/70 hover:bg-white/5'
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs opacity-60">{member.title}</p>
                </div>
              </button>
            ))}
          </div>

          {members.length === 0 && (
            <div className="bg-[#111111] border border-white/5 rounded-lg p-8 text-center">
              <p className="text-sm text-white/40">Add team members in the Team section first.</p>
            </div>
          )}
        </div>

        {/* QR Code Preview */}
        {selected && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Business Card Preview</h2>

            {/* Card Preview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm mx-auto">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-200 mx-auto mb-4">
                  <img
                    src={selected.image}
                    alt={selected.imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/brand/ai-handle-logo.png'; }}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
                <p className="text-sm text-purple-600">{selected.title}</p>
                <p className="text-xs text-gray-400 mt-1">AI Handle · aihandle.cloud</p>
              </div>

              <div id="qr-svg" className="flex justify-center mb-6">
                <div className="bg-white p-3 rounded-xl border border-gray-100">
                  <QRCodeSVG
                    value={cardUrl}
                    size={160}
                    level="M"
                    includeMargin
                  />
                </div>
              </div>

              {/* Hidden canvas for PNG download */}
              <div className="hidden">
                <QRCodeSVG
                  id="qr-canvas"
                  value={cardUrl}
                  size={160}
                  level="M"
                  includeMargin
                />
              </div>

              {selected.phone && (
                <p className="text-xs text-gray-500 text-center">{selected.phone}</p>
              )}
              {selected.email && (
                <p className="text-xs text-gray-500 text-center">{selected.email}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={downloadPNG} className="btn-primary text-xs py-2 px-4">
                <Download size={14} /> PNG
              </button>
              <button onClick={downloadSVG} className="btn-secondary text-xs py-2 px-4">
                <Download size={14} /> SVG
              </button>
              <button onClick={printCard} className="btn-secondary text-xs py-2 px-4">
                <Printer size={14} /> Print
              </button>
              <button onClick={copyUrl} className="btn-secondary text-xs py-2 px-4">
                <Copy size={14} /> Copy URL
              </button>
            </div>

            {/* Card URL */}
            <div className="bg-[#111111] border border-white/5 rounded-lg p-4">
              <label className="text-xs text-white/40 block mb-2">Card URL (unlisted)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={cardUrl}
                  readOnly
                  className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 font-mono"
                />
                <button onClick={copyUrl} className="text-purple hover:text-purple/80 text-xs">
                  Copy
                </button>
              </div>
              <p className="text-[10px] text-white/30 mt-2">
                This URL is not indexed by search engines and not shown in public navigation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
