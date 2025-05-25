import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { ProductsChecksQuery } from "@/pages/products-check/type";
import { getAllData, getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { TData, TKassareportData, TQuery } from "../type";

interface IData {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: TQuery;
}
interface IData1 {
  options?: DefinedInitialDataOptions<TData[]>;
  queries?: TQuery;
}
interface IProductsChecks {
  options?: DefinedInitialDataOptions<TData>;
  id: string | undefined;
  queries?: ProductsChecksQuery;
}
interface IKassareport {
  options?: DefinedInitialDataOptions<TKassareportData>;
  queries?: TQuery;
  enabled?: boolean;
}
export const useKassa= ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.kassa, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.kassa, queries),
  });

export const useDataCashflowTypes = ({ options, queries }: IData1) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.cashflowTypes, queries],
    queryFn: () =>
      getAllData<TData[], TQuery>(apiRoutes.cashflowTypes, queries),
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

    export const useKassaReportTotal= ({ options, queries,enabled }: IKassareport) =>
      useQuery({
        ...options,
        queryKey: [apiRoutes.kassaReportTotal],
        enabled,
        queryFn: () =>
          getAllData<TKassareportData, TQuery>(
            apiRoutes.kassaReportTotal,
            queries
          ),
      });
  
