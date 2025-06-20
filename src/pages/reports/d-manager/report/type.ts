export interface TData {
    return_sale: number;
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
    icon: {
      id: string;
      path: string;
      model: string;
      mimetype: string;
      size: number;
      name: string;
      created_at: string;
  }
    type: string;
    startDate: string;
    endDate: string | null;
    isActive: boolean;
    totalSum: number;
    additionalProfitTotalSum: number;
    netProfitTotalSum: number;
    totalSize: number;
    discount: string;
    sale:number;
    cash_collection:number;
    plasticSum: number;
    income: number;
    cashFlowSumBoss: number;
    expense: number;
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
  export interface TQuery {
    search?: string | undefined;
    filialId?: string;
    kassaId?: string;
    limit?: number;
    page?: number;
    id?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    type?:string;
  }
  