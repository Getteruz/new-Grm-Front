import { ReactNode } from "react";

export interface IOrderTable {
  title: string;
  Colms?: string[];
  children: ReactNode;
  className?: string;
}
export interface TData {
  title: string;
  id: string;
}

