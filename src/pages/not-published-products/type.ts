export type ProductsData = {
    id: string;
    code: string;
    model: {
      id: string;
      title: string;
      collection: {
        id: string;
        title: string;
      };
    };
    bar_code: { size: { x: number } };
    y: number;
    priceMeter: number;
    size: string;
    count: string;
    shape: string;
    style: string;
    color: {
      id: string;
      title: string;
      code: string;
    };
    price: string;
    isPublished?: boolean; // Added isPublished property
  };
  
  export type ProductsQuery = {
    search?: string | undefined;
    filialId?: string | undefined;
    limit: number;
    page: number;
    isPublished?: boolean; // Added isPublished property to query
  };