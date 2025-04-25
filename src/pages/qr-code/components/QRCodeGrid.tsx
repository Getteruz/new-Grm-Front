import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRCode } from '../type';

interface QRCodeGridProps {
  codes: QRCode[];
}

const QRCodeGrid: React.FC<QRCodeGridProps> = ({ codes }) => {
  return (
    <div className="w-full flex items-center gap-4 flex-wrap px-8 py-8">
      {codes.map((qr) => (
        <div key={qr.id} className="bg-white w-[126px] h-[180px] p-4 flex flex-col items-center">
          <QRCodeSVG 
            value={`https://example.com/${qr.value}`} 
            size={84}
            level="H"
          />
          <div className="mt-2 text-center text-sm">{qr.id}</div>
        </div>
      ))}
    </div>
  );
};

export default QRCodeGrid;