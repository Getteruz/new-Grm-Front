import {
  DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { ProductsData, ProductsQuery } from "../type";

interface ITransfers {
  options?: DefinedInitialDataInfiniteOptions<TResponse<ProductsData>>;
  queries?: ProductsQuery;
}

const useDataFetch = ({ options, queries }: ITransfers) =>
  useInfiniteQuery({
    ...options,
    queryKey: [apiRoutes.collection, queries],
    queryFn: ({ pageParam = 10 }) =>
      getAllData<TResponse<ProductsData>, ProductsQuery>(apiRoutes.collection, {
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
    initialPageParam: 1,
  });

export default useDataFetch;
