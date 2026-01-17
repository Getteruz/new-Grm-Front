import { ReactNode } from "react";

export interface IOrderTable {
  title: string;
  Colms?: string[];
  children: ReactNode;
  className?: string;
}
export interface User {
  dateOne: string;
  dateTwo: string;
  deletedDate: string | null;
  id: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  fatherName: string | null;
  login: string;
  hired: string | null;
  from: string | null;
  to: string | null;
  username: string | null;
  salary: string | null;
  email: string | null;
  phone: string;
  password?: string;
  isUpdated: boolean;
  createdAt: string;
}

export interface TData {
  dateOne: string;
  dateTwo: string;
  deletedDate: null | string;
  id: string;
  sequence: number;
  totalPrice: number;
  payment_type: string;
  pre_payment: string;
  payment_status: string;
  order_status: string;
  delivery: boolean;
  deliverySum: number;
  delivery_comment: string;
  city: string;
  district: string;
  full_address: string;
  location_link: string;
  date: string;
  startDate: string;
  user: User;
}

export interface TQuery {
  limit?: number;
  page?: number;
  type?: string;
}
