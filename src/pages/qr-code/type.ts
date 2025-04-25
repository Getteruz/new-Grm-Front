export type QRCode = {
    id: number;
    value: string;
  };
  
  export type TabType = 'barcode' | 'qr' | string;
  
  export type QRGeneratorQuery = {
    count?: number;
    prefix?: string;
    type?: TabType;
  };