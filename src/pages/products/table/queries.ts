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
  role?:number;
}
const useDataFetch = ({ options, queries, role }: ITransfers) =>
  useInfiniteQuery({
    ...options,
    queryKey: [role == 8 ? apiRoutes.productsIManager:apiRoutes.products, queries],
    queryFn: ({ pageParam = 10 }) =>
      getAllData<TResponse<ProductsData>, ProductsQuery>(role == 8 ? apiRoutes.productsIManager : apiRoutes.products, {
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
