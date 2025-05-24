import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { ProductsChecksQuery } from "@/pages/products-check/type";
import { getAllData, getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { TData, TQuery } from "../type";

export interface TReportTotalData {
  totalIncome: number;
  totalSale: number;
  totalPlasticSum: number;
  additionalProfitTotalSum: number;
  totalExpense: number;
  totalSaleReturn: number;
  totalCashCollection: number;
  totalDiscount: number;
  totalSellCount: number;
  totalSum: number;
  // kerak bo‘lsa boshqa maydonlarni ham qo‘shing
}

interface IData {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: TQuery;
}
interface IProductsChecks {
  options?: DefinedInitialDataOptions<TData>;
  id: string | undefined;
  queries?: ProductsChecksQuery;
}
const useDataLibrary = ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.kassaClose, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.kassa, queries),
  });

export const useKassaReportTotal = ({
  queries,
}: {
  queries: {
    filialId: string | undefined;
  };
}) =>
  useQuery<TReportTotalData>({
    queryKey: [apiRoutes.kassaReportsTotal, queries],
    queryFn: () =>
      getAllData<TReportTotalData, TQuery>(
        apiRoutes.kassaReportsTotal,
        queries
      ),
  });

export const useDataCashflowTypes = ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.cashflowTypes, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.cashflowTypes, queries),
  });
export const useOpenKassa = ({ options, id, queries }: IProductsChecks) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.openKassa, id],
    enabled: Boolean(id),
    queryFn: () =>
      getByIdData<TData, ProductsChecksQuery>(
        apiRoutes.openKassa,
        id || "",
        queries
      ),
  });

export const useKassaById = ({ options, id, queries }: IProductsChecks) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.kassa, id],
    enabled: Boolean(id),
    queryFn: () =>
      getByIdData<TData, ProductsChecksQuery>(
        apiRoutes.kassa,
        id || "",
        queries
      ),
  });

export default useDataLibrary;
