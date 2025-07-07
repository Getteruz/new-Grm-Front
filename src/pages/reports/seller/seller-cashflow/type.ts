export interface TData {
  id: string;
  status: string;
  comment: null;
  price: number;
  x: number;
  kv: number;
  date:string;
  additionalProfitSum: number;
  netProfitSum:number;
  discountSum: number;
  discountPercentage: string;
  tip: string;
  plasticSum: number;
  seller: {
    id: string
    isActive: true;
    firstName: string;
    lastName: string;
    fatherName: string;
    login:string;
    hired:string;
    from: string;
    to: string;
    username: string;
    salary: number;
    email: string;
    phone: string;
    isUpdated: true;
  };
  product: {
    isInternetShop: false;
    id: string;
    code: string;
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
    x: number;
    y: number;
    totalSize: number;
    check_count: number;
    is_deleted: false;
    partiya_title: string;
    book_count: number;
    bar_code: {
      shape: {
        title: string;
      };
      isMetric:boolean;
      imgUrl: {
        path: string;
      };
      model: {
        title: string;
      };
      collection: {
        title: string;
        priceMeter:string;
      };
      color: {
        title: string;
      };
      size: {
        x: number;
        y: number;
        title:string;
      };
    };
  };
}

export interface TQuery {
  search?: string | undefined;
  reportId?: string;
  limit?: number;
  page?: number;
}

export interface User {
  id: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  fatherName: string;
  login: string;
  hired: string;
  from: string;
  to: string;
  username: string | null;
  salary: number;
  email: string | null;
  phone: string;
  password: string;
  isUpdated: boolean;
  createdAt: string;
}

export interface TTopData {
  startDate: string;
  endDate: string;
  totalWorkTime: number;
  totalCount: number;
  totalKv: number;
  totalPrice: number;
  totalDiscountSum: number;
  additionalProfitTotalSum: number;
}
