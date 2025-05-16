export interface ProductsData {
  id: number;
  count: number;
  price: number;
  bar_code?: {
    code: string;
    imgUrl: string;
    collection: {
      title: string;
    };
    model: {
      title: string;
    };
    size: {
      x: number;
      y: number;
    };
    shape: {
      title: string;
    };
    style: {
      title: string;
    };
    color: {
      title: string;
    };
    country: {
      title: string;
    };
    factory: {
      title: string;
    };
    partiya_no: {
      title: string;
    };
  };
  // Collection fields
  title?: string;
  imgUrl?: string;
  model?: {
    title: string;
  };
  size?: {
    x: number;
    y: number;
  };
  shape?: {
    title: string;
  };
  color?: {
    title: string;
  };
}

export type ProductsQuery = {
  search?: string | undefined;
  filialId?: string | undefined;
  limit: number;
  page: number;
};
