export type ProductCharacteristic = {
    id: string;
    collection: string;
    characteristics1: string;
    characteristics2: string;
    installmentParams: string;
  };
  
  export type CharacteristicsQuery = {
    search?: string | undefined;
    sortBy?: string | undefined;
    limit: number;
    page: number;
  };