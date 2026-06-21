import { QRCodeSVG } from 'qrcode.react';
import { brand } from '@/data';

interface QRCodeProps {
  size?: number;
  showLabel?: boolean;
  showSupporting?: boolean;
  className?: string;
}

export default function QRCodeDisplay({ size = 160, showLabel = true, showSupporting = false, className = '' }: QRCodeProps) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <QRCodeSVG
          value={brand.qr.destination}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#0A0A0A"
          level="M"
          includeMargin={false}
        />
      </div>
      {showLabel && (
        <p className="font-body font-semibold text-sm text-[#F5F0EB] text-center">
          {brand.qr.title}
        </p>
      )}
      {showSupporting && (
        <p className="font-body text-xs text-[#8A8478] text-center max-w-[280px] leading-relaxed">
          {brand.qr.supportingText}
        </p>
      )}
    </div>
  );
}
