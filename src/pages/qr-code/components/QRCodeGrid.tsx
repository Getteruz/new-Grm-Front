import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRCode } from '../type';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRCodeGridProps {
  codes: QRCode[] | [];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const QRCodeGrid: React.FC<QRCodeGridProps> = ({ 
  codes, 
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  // If paging is enabled
  const hasPagination = !!onPageChange;

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Загрузка QR-кодов...</span>
      </div>
    );
  }

  if (codes.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center h-[400px] text-center">
        <p className="text-lg mb-2">Нет доступных QR-кодов</p>
        <p className="text-sm text-muted-foreground">
          Используйте форму слева, чтобы сгенерировать новые QR-коды
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-start gap-4 flex-wrap px-8 py-8">
        {codes.map((qr) => (
          <div key={qr.id} className="bg-white w-[126px] h-[180px] p-4 flex flex-col items-center">
            <QRCodeSVG 
              value={qr.code || `https://example.com/${qr.value}`} 
              size={84}
              level="H"
            />
            <div className="mt-2 text-center text-sm">{qr.sequence}</div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {hasPagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="mx-2">
            Страница {currentPage} из {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGrid;