import { QRCodeSVG } from 'qrcode.react';
import { brand } from '@/data';

interface QRCodeProps {
  size?: number;
  showLabel?: boolean;
  showSupporting?: boolean;
  className?: string;
  variant?: 'founder' | 'sales' | 'both';
}

function SingleQR({ value, size, label, supportingText }: { value: string; size: number; label: string; supportingText: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-3 rounded-2xl shadow-lg border border-[#2A2A2A]/20">
        <QRCodeSVG
          value={value}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#0A0A0A"
          level="M"
          includeMargin={false}
        />
      </div>
      <p className="font-body font-semibold text-sm text-[#F5F0EB] text-center">
        {label}
      </p>
      {supportingText && (
        <p className="font-body text-xs text-[#8A8478] text-center max-w-[280px] leading-relaxed">
          {supportingText}
        </p>
      )}
    </div>
  );
}

export default function QRCodeDisplay({ size = 160, showLabel = true, showSupporting = false, className = '', variant = 'founder' }: QRCodeProps) {
  if (variant === 'both') {
    return (
      <div className={`flex flex-col md:flex-row items-center justify-center gap-8 ${className}`}>
        <SingleQR
          value={brand.qr.founderDestination}
          size={size}
          label={showLabel ? brand.qr.founderTitle : ''}
          supportingText={showSupporting ? brand.qr.founderSupporting : ''}
        />
        <div className="hidden md:block w-px h-24 bg-[#2A2A2A]" />
        <SingleQR
          value={brand.qr.salesDestination}
          size={size}
          label={showLabel ? brand.qr.salesTitle : ''}
          supportingText={showSupporting ? brand.qr.salesSupporting : ''}
        />
      </div>
    );
  }

  const qrData = variant === 'sales'
    ? { value: brand.qr.salesDestination, label: brand.qr.salesTitle, supportingText: brand.qr.salesSupporting }
    : { value: brand.qr.founderDestination, label: brand.qr.founderTitle, supportingText: brand.qr.founderSupporting };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="bg-white p-4 rounded-2xl shadow-lg border border-[#2A2A2A]/20">
        <QRCodeSVG
          value={qrData.value}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#0A0A0A"
          level="M"
          includeMargin={false}
        />
      </div>
      {showLabel && (
        <p className="font-body font-semibold text-sm text-[#F5F0EB] text-center">
          {qrData.label}
        </p>
      )}
      {showSupporting && (
        <p className="font-body text-xs text-[#8A8478] text-center max-w-[280px] leading-relaxed">
          {qrData.supportingText}
        </p>
      )}
    </div>
  );
}
