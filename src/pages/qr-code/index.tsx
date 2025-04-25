import React, { useState } from 'react';
import { useQueryState, parseAsInteger } from 'nuqs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Components imports
import QRCodeGrid from './components/QRCodeGrid';
import QRCodePreview from './components/QRCodePreview';
import Filters from './components/Filters';

// Utilities and types
import { TabType } from './type';
import { generatePDF, printQRCodes } from './utils';
import { useQRCodesFetch, useGenerateQRCodes } from './queries';

const QRCodeGenerator: React.FC = () => {
  const navigate = useNavigate();
  
  // Query state
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit] = useQueryState('limit', parseAsInteger.withDefault(18));
  const [prefix, setPrefix] = useQueryState('prefix', { defaultValue: '' });
  const [type, setType] = useQueryState('type', { defaultValue: 'qr' as TabType });
  
  // Local state
  const [inputCount, setInputCount] = useState<number | string>(100);
  
  // Fetch QR codes
  const { data, isLoading } = useQRCodesFetch({
    limit,
    page,
    prefix,
    type
  });
  
  // Extract data from API response
  const qrCodes = data?.items || [];
  const totalPages = data?.meta?.totalPages || 1;
  const totalItems = data?.meta?.totalItems || 0;
  
  // Generate QR codes mutation
  const { mutate: generateQRCodes, isPending: isGenerating } = useGenerateQRCodes();
  
  // Preview QR code (first one in the list or a placeholder)
  const previewCode = qrCodes.length > 0 
    ? (qrCodes[0].code || `https://example.com/${qrCodes[0].value}`)
    : 'https://example.com/placeholder';
  
  // Handlers
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputCount(value === '' ? '' : parseInt(value, 10));
  };
  
  const handleGenerate = () => {
    const count = typeof inputCount === 'number' ? inputCount : 100;
    
    if (count <= 0) {
      toast.error("Количество QR-кодов должно быть больше 0");
      return;
    }
    
    if (count > 1000) {
      toast.error("Нельзя сгенерировать больше 1000 QR-кодов за раз");
      return;
    }
    
    generateQRCodes(count);
  };
  
  const handleClear = () => {
    // Reset form, but don't delete QR codes from server
    setInputCount(100);
    setPage(1);
    setPrefix('');
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  const handleDownload = () => {
    if (qrCodes.length === 0) {
      toast.error("Нет QR-кодов для скачивания");
      return;
    }
    
    generatePDF(qrCodes);
  };
  
  const handlePrint = () => {
    if (qrCodes.length === 0) {
      toast.error("Нет QR-кодов для печати");
      return;
    }
    
    printQRCodes(qrCodes);
  };
  
  // Action handlers for Filters component
  const actions = {
    handleClear,
    handleCancel,
    handleDownload,
    handlePrint
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Filters */}
      <Filters
        activeTab={type}
        prefix={prefix}
        onPrefixChange={setPrefix}
        onTabChange={setType}
        actions={actions}
      />
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Navigation Header */}
        <div className="flex flex-col w-full">
          <div className="flex">
            <QRCodePreview 
              inputCount={inputCount} 
              handleCountChange={handleCountChange} 
              handleGenerate={handleGenerate} 
              value={previewCode}
              isGenerating={isGenerating}
            />
            <QRCodeGrid 
              codes={qrCodes} 
              isLoading={isLoading}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;