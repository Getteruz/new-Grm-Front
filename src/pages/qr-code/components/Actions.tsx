import React from 'react';
import { Trash2, X, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionsProps {
  onClear: () => void;
  onCancel: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

const Actions: React.FC<ActionsProps> = ({ 
  onClear, 
  onCancel, 
  onDownload, 
  onPrint 
}) => {
  return (
    <div className="flex ml-auto">
      <Button 
        onClick={onClear}
        className="flex w-[180px] items-center justify-center gap-2 text-[#5D5D53] bg-[#E6E6D9] px-6 py-8 border-l border-border hover:text-white"
      >
        <Trash2 size={18} />
        <span>Очистить</span>
      </Button>
      <Button 
        onClick={onCancel}
        className="flex items-center w-[180px] justify-center gap-2 text-[#5D5D53] bg-[#E6E6D9] px-6 py-8 border-l border-border hover:text-white"
      >
        <X size={18} />
        <span>Отменить</span>
      </Button>
      <Button 
        onClick={onDownload}
        className="flex items-center w-[180px] justify-center gap-2 text-[#5D5D53] bg-[#E6E6D9] px-6 py-8 border-l border-border hover:text-white"
      >
        <Download size={18} />
        <span>Скачать как pdf</span>
      </Button>
      <Button 
        onClick={onPrint}
        className="flex items-center w-[180px] justify-center gap-2 px-6 py-8 border-l border-border text-white"
      >
        <Printer size={18} />
        <span>Распечатать</span>
      </Button>
    </div>
  );
};

export default Actions;