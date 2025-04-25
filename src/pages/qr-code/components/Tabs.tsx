import React from 'react';
import { Barcode } from 'lucide-react';
import { TabType } from '../type';

interface TabsProps {
  activeTab: TabType;
  qrCount: number;
  onTabChange: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, qrCount, onTabChange }) => {
  return (
    <div className="flex">
      <button 
        className={`flex items-center justify-center gap-2 px-6 py-4 border-r border-border ${activeTab === 'barcode' ? 'bg-sidebar' : 'bg-gray-600 text-white'}`}
        onClick={() => onTabChange('barcode')}
      >
        <Barcode size={20} />
        <span>Баркод</span>
      </button>
      <button 
        className={`flex items-center justify-center gap-2 px-6 py-4 border-r border-border ${activeTab === 'qr' ? 'bg-gray-600 text-white' : 'bg-sidebar'}`}
        onClick={() => onTabChange('qr')}
      >
        <span className="font-bold text-xl">QR</span>
        <span>код</span>
      </button>
      <div className="flex items-center px-6 py-4 border-r border-border">
        <span>{qrCount} QR-кодов</span>
      </div>
    </div>
  );
};

export default Tabs;