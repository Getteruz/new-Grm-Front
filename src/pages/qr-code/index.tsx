import React, { useState } from 'react';
import { useQueryState, parseAsInteger } from 'nuqs';
import { toast } from 'sonner';

// Components imports
import QRCodeGrid from './components/QRCodeGrid';
import QRCodePreview from './components/QRCodePreview';
import Filters from './components/Filters';

// Utilities and types
import { TabType } from './type';
import { generatePDF, printQRCodes } from './utils';
import { useQRCodesFetch, useGenerateQRCodes, useClearQRCodes } from './queries';

const QRCodeGenerator: React.FC = () => {
  // Query state
  const [limit] = useQueryState('limit', parseAsInteger.withDefault(10)); // Match API default
  const [prefix, setPrefix] = useQueryState('prefix', { defaultValue: '' });
  const [type, setType] = useQueryState('type', { defaultValue: 'qr' as TabType });
  
  // Local state
  const [inputCount, setInputCount] = useState<number | string>(100);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Fetch QR codes with infinite scrolling
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useQRCodesFetch({
    limit,
    prefix,
    type
  });
  
  // Extract data from API response and flatten pages
  const qrCodes = data?.pages?.flatMap(page => page.items) || [];
  
  // Get the first QR code for preview
  const previewCode = qrCodes.length > 0 ? qrCodes[0] : null;
  const totalItems = data?.pages[0].meta.totalItems || 0;
  console.log('hdjdsn,', data?.pages[0])
  console.log(totalItems)
  // Generate QR codes mutation
  const { mutate: generateQRCodes, isPending: isGenerating } = useGenerateQRCodes();
  
  // Clear QR codes mutation
  const { mutate: clearQRCodes, isPending: isClearing } = useClearQRCodes();
  
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
    // Check if there are QR codes to clear
    if (qrCodes.length === 0) {
      toast.info("Нет QR-кодов для очистки");
      return;
    }
    
    // Ask for confirmation before clearing
    if (window.confirm("Вы уверены, что хотите очистить все QR-коды?")) {
      // Call the clear API
      clearQRCodes();
      // Reset form state
      setInputCount(100);
      setPrefix('');
    }
  };
  
  const handleDownload = async () => {
    if (qrCodes.length === 0) {
      toast.error("Нет QR-кодов для скачивания");
      return;
    }
    
    try {
      setIsDownloading(true);
      await generatePDF(qrCodes);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Ошибка при скачивании PDF');
    } finally {
      setIsDownloading(false);
    }
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
    handleDownload,
    handlePrint,
    isClearing,
    isDownloading
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
        {/* QR Code Preview & Controls */}
        <QRCodePreview 
          previewCode={previewCode}
          inputCount={inputCount} 
          handleCountChange={handleCountChange} 
          handleGenerate={handleGenerate} 
          isGenerating={isGenerating}
          totalItems={totalItems}
        />
        
        {/* QR Code Grid with Infinite Scrolling */}
        <QRCodeGrid 
          codes={qrCodes} 
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
};

export default QRCodeGenerator;