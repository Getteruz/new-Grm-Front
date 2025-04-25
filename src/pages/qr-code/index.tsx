import React, { useState } from 'react';
import { useQueryState, parseAsInteger } from 'nuqs';
import { useNavigate } from 'react-router-dom';

// Components imports
import QRCodeGrid from './components/QRCodeGrid';
import QRCodePreview from './components/QRCodePreview';
import Filters from './components/Filters';

// Utilities and types
import { TabType } from './type';
import { generateQRCodes, generatePDF, printQRCodes } from './utils';
import { useQRCodesFetch } from './queries';

const QRCodeGenerator: React.FC = () => {
  const navigate = useNavigate();
  
  // Query state
  const [count, setCount] = useQueryState('count', parseAsInteger.withDefault(120));
  const [prefix, setPrefix] = useQueryState('prefix', { defaultValue: '' });
  const [type, setType] = useQueryState('type', { defaultValue: 'qr' as TabType });
  
  // Local state
  const [inputCount, setInputCount] = useState<number | string>(500);
  
  // Fetch QR codes
  const { data: qrCodes = [] } = useQRCodesFetch({
    count: 18, // Show 18 in the grid, but generate 'count' for download/print
    prefix,
    type
  });
  
  // Preview QR code (first one in the list or a placeholder)
  const previewCode = qrCodes.length > 0 
    ? `https://example.com/${qrCodes[0].value}` 
    : 'https://example.com/placeholder';
  
  // Handlers
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputCount(value === '' ? '' : parseInt(value, 10));
  };
  
  const handleGenerate = () => {
    const newCount = typeof inputCount === 'number' ? inputCount : 120;
    setCount(newCount);
  };
  
  const handleClear = () => {
    setCount(0);
    setInputCount(0);
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  const handleDownload = () => {
    const allCodes = generateQRCodes(count);
    generatePDF(allCodes);
  };
  
  const handlePrint = () => {
    const allCodes = generateQRCodes(count);
    printQRCodes(allCodes);
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Filters */}
      <Filters
        activeTab={"qr"}
        prefix={prefix}
        onPrefixChange={setPrefix}
        onTabChange={setType}
        actions={{handleClear,handlePrint, handleDownload, handleCancel}}
      />
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Navigation Header */}
        <div className="flex flex-col w-full">
          {/* Tabs and Actions */}
          
          
          {/* QR Code Display Area */}
          <div className="flex">
            <QRCodePreview inputCount={inputCount} handleCountChange={handleCountChange} handleGenerate={handleGenerate} value={previewCode} />
            <QRCodeGrid codes={qrCodes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;