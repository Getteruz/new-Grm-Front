import { DefinedInitialDataOptions, useInfiniteQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import {  TData, TQuery } from "./type";

interface ISellerReportsData {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: TQuery;
  enabled?: boolean
}



export const useDataSellerReports = ({ queries ,enabled}: ISellerReportsData) =>
  useInfiniteQuery({
    queryKey: [apiRoutes.sellerReports, queries],
    queryFn: ({ pageParam = 10 }) =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.sellerReports, {
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

