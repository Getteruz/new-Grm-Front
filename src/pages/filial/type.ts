export type TData = {
  id: string;
  title: string;
  name: string;
  telegram: string;
  address: string;
  startWorkTime: string;
  endWorkTime: string;
  addressLink: string;
  landmark: string;
  phone1: string;
  phone2: string;
  isActive: boolean;
  hickCompleted: boolean;
  type: 'filial';
  need_get_report:boolean
}

export type FilialsQuery = {
  title?: string;
  limit: number;
  page: number;
};


export interface ProductData {
  isMetric: boolean;
  id: string;
  code: string;
  imgUrl: string | null;
  otherImgs: string[] | null;
  internetInfo: string | null;
  is_active: boolean;
  date: string;
  count: number;
  model: {
      id: string;
      title: string;
  };
  color: {
      id: string;
      title: string;
      code: string;
  };
  collection: {
      id: string;
      title: string;
  };
  size: {
      id: string;
      title: string;
      x: number | null;
      y: number | null;
      kv: number | null;
  };
  shape: {
      id: string;
      title: string;
      meter: boolean;
  };
  style: {
      id: string;
      title: string;
  };
  country: {
      id: string;
      title: string;
  };
}
  export type ProductQuery = {
    search: string | undefined;
    limit: number;
    page: number;
    type:string;
    filialId?:string
  };
  