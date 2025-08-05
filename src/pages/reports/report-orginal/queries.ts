import {
  DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { TData, TQuery } from "./type";

interface ITransfers {
  // options?: DefinedInitialDataInfiniteOptions<TResponse<TData>>;
  options?: DefinedInitialDataInfiniteOptions<TData[]>;
  queries?: TQuery;
  enabled?: boolean;
}

const useDataFetch = ({ options, queries,enabled=true }: ITransfers) =>
  useInfiniteQuery({
    ...options,
    enabled: enabled,
    queryKey: [apiRoutes.paperReport, queries],
    queryFn: () =>
      // getAllData<TResponse<TData>, TQuery>(apiRoutes.paperReport, {
      getAllData<TData[], TQuery>(apiRoutes.paperReport, {
        ...queries,
        // page: pageParam as number,
        // limit: 10,
      }),
      
    getNextPageParam: (lastPage) => {
      return lastPage
      // if (lastPage?.meta?.currentPage <= lastPage?.meta?.totalPages) {
      //   return lastPage?.meta?.currentPage + 1;
      // } else {
      //   return null;
      // }
    },
    initialPageParam: 1,
  });

export default useDataFetch;
