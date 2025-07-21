import {
  DefinedInitialDataInfiniteOptions,
  DefinedInitialDataOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import {
  IFactoryReportData,
  RemainingProductColactionData,
  RemainingProductData,
  TQuery,
} from "./type";
import { TResponse } from "@/types";
import { TData } from "@/pages/filial/type";

interface IproductRemaining {
  options?: DefinedInitialDataOptions<RemainingProductData>;
  queries?: TQuery;
}
interface IproductRemainingCollection {
  options?: DefinedInitialDataOptions<RemainingProductColactionData>;
  queries?: TQuery;
}
interface ITransfers {
  options?: DefinedInitialDataInfiniteOptions<TResponse<TData>>;
  queries?: TQuery;
}

interface IFactoryReport {
  options?: DefinedInitialDataInfiniteOptions<IFactoryReportData>;
  queries?: TQuery;
  enabled:boolean;
}

const useProductRemainingProducts = ({ options, queries }: IproductRemaining) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.productRemaining, queries],
    queryFn: () =>
      getAllData<RemainingProductData, TQuery>(
        apiRoutes.productRemaining,
        queries
      ),
  });

export const useProductRemainingColaction = ({
  options,
  queries,
}: IproductRemainingCollection) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.countryReport, queries],
    queryFn: () =>
      getAllData<RemainingProductColactionData, TQuery>(
        apiRoutes.countryReport,
        queries
      ),
  });

export const usefilialWarehouseFetch = ({ options, queries }: ITransfers) =>
  useInfiniteQuery({
    ...options,
    queryKey: [apiRoutes.filialWarehouse, queries],
    queryFn: ({ pageParam = 1 }) =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.filialWarehouse, {
        ...queries,
        page: pageParam as number,
        limit: queries?.limit || 10,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage <= lastPage.meta.totalPages) {
        return lastPage?.meta?.currentPage + 1;
      } else {
        return null;
      }
    },
    initialPageParam: 1,
  });

  export const useFactoryReport = ({ options,enabled, queries }: IFactoryReport) =>
    useInfiniteQuery({
      ...options,
      queryKey: [apiRoutes.factoryReport, queries],
      queryFn: ({ pageParam = 1 }) =>
        getAllData<IFactoryReportData, TQuery>(apiRoutes.factoryReport, {
          ...queries,
          page: pageParam as number,
          limit: queries?.limit || 10,
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page <= (lastPage.totalPages || 2) ) {
          return lastPage.page + 1;
        } else {
          return null;
        }
      },
      enabled,
      initialPageParam: 1,
    });
    export const useCollectionReport = ({ options,enabled, queries }: IFactoryReport) =>
      useInfiniteQuery({
        ...options,
        queryKey: [apiRoutes.collectionReport, queries],
        queryFn: ({ pageParam = 1 }) =>
          getAllData<IFactoryReportData, TQuery>(apiRoutes.collectionReport, {
            ...queries,
            page: pageParam as number,
            limit: queries?.limit || 10,
          }),
        getNextPageParam: (lastPage) => {
          if (lastPage.page <= (lastPage.totalPages || 2) ) {
            return lastPage.page + 1;
          } else {
            return null;
          }
        },
        enabled,
        initialPageParam: 1,
      });
    

export default useProductRemainingProducts;
