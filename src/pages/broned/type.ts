export type BronedData = {
  id: string;
  x: number;
  date: string;
  is_transfer: boolean;
  isMetric: boolean;
  product: {
    isInternetShop: boolean;
    id: string;
    code: string | null;
    count: number;
    booking_count: number;
    date: string;
    updated_at: string;
    price: number;
    secondPrice: number;
    priceMeter: number;
    comingPrice: number;
    draft_priceMeter: number;
    draft_comingPrice: number;
    x: number | null;
    y: number;
    totalSize: number | null;
    check_count: number;
    is_deleted: boolean;
    partiya_title: string;
    book_count: number;
    bar_code: {
      isMetric: boolean;
      id: string;
      code: string;
      otherImgs: unknown | null;
      internetInfo: unknown | null;
      is_active: boolean;
      is_accepted: boolean;
      date: string;
      model: {
        id: string;
        title: string;
      };
      collection: {
        id: string;
        title: string;
        secondPrice: number;
        priceMeter: number;
        comingPrice: number;
        collection_prices: {
          id: string;
          secondPrice: number;
          priceMeter: number;
          comingPrice: number;
          type: string;
          date: string;
        }[];
      };
      color: {
        id: string;
        title: string;
      };
      size: {
        id: string;
        title: string;
        x: number;
        y: number;
        kv: number;
      };
      shape: {
        id: string;
        title: string;
        meter: string;
      };
      style: {
        id: string;
        title: string;
      };
    };
  };
};


export type BronedQuery = {
  search?: string | undefined;
  limit?: number;
  page?: number;
  filial?: string;
};
