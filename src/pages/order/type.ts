import { ReactNode } from "react";

export interface IOrderTable {
  title: string;
  Colms?: string[];
  children: ReactNode;
  className?: string;
}
