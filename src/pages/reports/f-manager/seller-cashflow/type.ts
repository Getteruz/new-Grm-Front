export interface TData {
  id: string;
  year: number;
  month: number;
  totalSellCount: number;
  totalSellKv: number;
  totalSellPrice: number;
  additionalProfitTotalSum: number;
  totalPlasticSum: number;
  totalDiscount: number;
  totalSaleReturnCount: number;
  totalSaleReturnPrice: number;
  totalSaleReturnKv: number;
  user: User;
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
