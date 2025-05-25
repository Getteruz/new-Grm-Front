import { DefinedInitialDataOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { ProductsChecksQuery } from "@/pages/products-check/type";
import { getAllData, getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { TData, TKassareportData, TQuery } from "../type";

interface IData {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: TQuery;
}

interface IKassaReportData {
  options?: DefinedInitialDataOptions<TResponse<TKassareportData>>;
  queries?: TQuery;
  enabled?: boolean
}
interface IProductsChecks {
  options?: DefinedInitialDataOptions<TData>;
  id: string | undefined;
  queries?: ProductsChecksQuery;
}

export const useKassaReports = ({ queries ,enabled}: IKassaReportData) =>
  useInfiniteQuery({
    queryKey: [apiRoutes.kassaReports, queries],
    queryFn: ({ pageParam = 10 }) =>
      getAllData<TResponse<TKassareportData>, TQuery>(apiRoutes.kassaReports, {
        ...queries,
        page: pageParam as number,
        limit: 10,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage <= lastPage.meta.totalPages) {
        return lastPage?.meta?.currentPage + 1;
      } else {
        return null;
      }
    },
    enabled: enabled,
    initialPageParam: 1,
  });

const useDataLibrary = ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.cashflow, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.cashflow, queries),
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

export default useDataLibrary;
