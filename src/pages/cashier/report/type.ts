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
};

export type ProductsQuery = {
  search: string | undefined;
  limit: number;
  page: number;
};

export type KassaReportData = {
  items: [];
  id: string;
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
  status: "open" | "closed";
  orders: any[];
  cashflow: any[];
  filial: {
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
    need_get_report: boolean;
    type: "filial";
  };
  cashflowAndOrders: any[];
  income: number;
  expense: number;
};
