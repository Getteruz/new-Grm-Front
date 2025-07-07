import { DefinedInitialDataOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import {  TData, TQuery, TTopData } from "./type";

interface ISellerCashflowData {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: TQuery;
  enabled?: boolean
}

interface IsellerReportsMothly {
  options?: DefinedInitialDataOptions<TTopData>;
  queries?: TQuery;
  id?:string
  enabled?: boolean;
}


export const useDataSellerCashflow = ({ queries ,enabled}: ISellerCashflowData) =>
  useInfiniteQuery({
    queryKey: [apiRoutes.sellerReportsItem, queries],
    queryFn: ({ pageParam = 10 }) =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.sellerReportsItem, {
        ...queries,
        page: pageParam as number,
        limit: 10,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.currentPage <= lastPage.meta?.totalPages) {
        return lastPage?.meta?.currentPage + 1;
      } else {
        return null;
      }
    },
    enabled: enabled,
    initialPageParam: 1,
  });


  export const useSellerReportsMothly= ({ options,id, queries }: IsellerReportsMothly) =>
    useQuery({
      ...options,
      queryKey: [apiRoutes.sellerReportsMothly,id ,queries],
      queryFn: () =>
        getAllData<TTopData, TQuery>(
          apiRoutes.sellerReportsMothly +"/" + id + "/items",
          queries
        ),
    });
