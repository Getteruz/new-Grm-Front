export type QRCode = {
    id: string;
    value: string;
    sequence:number;
    code: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type TabType = 'barcode' | 'qr' | string;
  
  export type QRGeneratorQuery = {
    limit?: number;
    page?: number;
    count?: number;
    prefix?: string;
    type?: TabType;
  };