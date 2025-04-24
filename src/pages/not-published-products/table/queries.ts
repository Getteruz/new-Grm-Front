import {
    DefinedInitialDataInfiniteOptions,
    useInfiniteQuery,
  } from "@tanstack/react-query";

  import { getAllData } from "@/service/apiHelpers";
  import { apiRoutes } from "@/service/apiRoutes";
  import { TResponse } from "@/types";

  import { ProductsData, ProductsQuery } from "../type";
  
  interface INotPublishedTransfers {
    options?: DefinedInitialDataInfiniteOptions<TResponse<ProductsData>>;
    queries?: ProductsQuery & { isInternetShop?: boolean };
  }
  
  const useNotPublishedDataFetch = ({ options, queries }: INotPublishedTransfers) =>
    useInfiniteQuery({
      ...options,
      queryKey: [apiRoutes.productsIManager, { ...queries, isInternetShop: false }],
      queryFn: ({ pageParam = 10 }) =>
        getAllData<TResponse<ProductsData>, ProductsQuery & { isInternetShop?: boolean }>(
          apiRoutes.productsIManager, 
          {
            ...queries,
            page: pageParam as number,
            limit: 10,
            isInternetShop: false,
          }
        ),
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.currentPage <= lastPage.meta.totalPages) {
          return lastPage?.meta?.currentPage + 1;
        } else {
          return null;
        }
      },
      initialPageParam: 1,
    });
  
  export default useNotPublishedDataFetch;