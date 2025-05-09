export interface TData {
  isMetric?: boolean;
  id: string;
  is_visible: boolean;
  cashflow_type: { title: string };
  code: string;
  comment: string;
  imgUrl: string | null;
  otherImgs: string[] | null;
  internetInfo: string | null;
  is_active: boolean;
  date: string;
  is_online: boolean;
  price: number;
  tip: string;
  title: string;
  icon: string;
  type: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  totalSum: number;
  additionalProfitTotalSum: number;
  netProfitTotalSum: number;
  totalSize: number;
  plasticSum: number;
  cashFlowSumBoss: number;
  cashFlowSumShop: number;
  expenditureBoss: number;
  expenditureShop: number;
  internetShopSum: number;
  status: string;
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

export interface TActionData {
  title: string;
  id: string;
  collection: {
    id: string;
    title: string;
  };
  code: string;
}

export interface TQuery {
  search?: string | undefined;
  filialId?: string;
  kassaId?: string;
  limit: number;
  page: number;
  id?: string;
}
