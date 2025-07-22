export interface RemainingProductData {
  remainingSize: number;
  remainingSum: number;
  count: number;
}
export interface RemainingProductColactionData {
  data: {
    dateOne: string;
    dateTwo: string;
    deletedDate: null;
    id: string;
    year: number;
    month: number;
    day: number;
    date: null;
    totalSellCount: number;
    totalSellKv: number;
    totalSellPrice: number;
    totalCount: number;
    totalKv: number;
    totalPrice: number;
    totalSaleReturnPrice: number;
    totalSaleReturnCount: number;
    totalSaleReturnKv: number;
    filial: {
      dateOne: string;
      dateTwo: string;
      deletedDate: null;
      id: string;
      title: string;
      given: number;
      owed: number;
      name: string;
      telegram: string;
      address: string;
      startWorkTime: string;
      endWorkTime: string;
      test: boolean;
      isDeleted: boolean;
      addressLink: string;
      landmark: string;
      phone1: string;
      phone2: null;
      isActive: boolean;
      hickCompleted: boolean;
      need_get_report: boolean;
      type: string;
    };
    country: {
      dateOne: "2025-07-18T15:45:56.324Z";
      dateTwo: "2025-07-18T15:45:56.324Z";
      deletedDate: null;
      id: "b27741bf-ea0f-4ce5-94fe-49de5771a0ad";
      title: "Kazakhstan";
    };
  }[];
  meta:Meta
}

type Meta = {
  pagination:{
    hasNext:boolean
    hasPrev:boolean
    limit:number
    page:number
    total:number
    totalPages:number
  },
  totals:{
    totalCount: number;
    totalKv: number;
    totalPrice: number;
    totalSellCount: number;
    totalSellKv: number;
    totalSellPrice: number;
  }
}
export interface IFactoryReportData {
  data: SalesData[];
  meta: Meta
}
type Filial = {
  dateOne: string;
  dateTwo: string;
  deletedDate: string | null;
  id: string;
  title: string;
  given: number;
  owed: number;
  name: string;
  telegram: string;
  address: string;
  startWorkTime: string;
  endWorkTime: string;
  test: boolean;
  isDeleted: boolean;
  addressLink: string;
  landmark: string;
  phone1: string;
  phone2: string | null;
  isActive: boolean;
  hickCompleted: boolean;
  need_get_report: boolean;
  type: string;
};

type Factory = {
  dateOne: string;
  dateTwo: string;
  deletedDate: string | null;
  id: string;
  title: string;
};
type Collection = {
  dateOne: string;
  dateTwo: string;
  deletedDate: number;
  id: string;
  title: string;
  secondPrice: number;
  priceMeter: number;
  comingPrice: number;
};

export type SalesData = {
  dateOne: string;
  dateTwo: string;
  deletedDate: string | null;
  id: string;
  year: number;
  month: number;
  day: number;
  date: string;
  totalSellCount: number;
  totalSellKv: number;
  totalSellPrice: number;
  totalCount: number;
  totalKv: number;
  totalPrice: number;
  totalSaleReturnPrice: number;
  totalSaleReturnCount: number;
  totalSaleReturnKv: number;
  filial: Filial;
  factory: Factory;
  collection: Collection;
};

export interface TQuery {
  search?: string | undefined;
  filialId?: string;
  kassaId?: string;
  limit?: number;
  page?: number;
  id?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  to?: Date | null;
  from?: Date | null;
  type?: string;
}
