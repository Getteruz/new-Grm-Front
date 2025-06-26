import { DefinedInitialDataInfiniteOptions, DefinedInitialDataOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { RemainingProductColactionData, RemainingProductData, TQuery } from "./type";
import { TResponse } from "@/types";
import { TData } from "@/pages/filial/type";

interface IproductRemaining{
  options?: DefinedInitialDataOptions<RemainingProductData>;
  queries?: TQuery;
}
interface IproductRemainingCollection {
  options?: DefinedInitialDataOptions<RemainingProductColactionData[]>;
  queries?: TQuery;
}

const useProductRemainingProducts = ({ options, queries }: IproductRemaining) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.productRemaining, queries],
    queryFn: () =>
      getAllData<RemainingProductData, TQuery>(apiRoutes.productRemaining, queries),
  });

export  const useProductRemainingColaction = ({ options, queries }: IproductRemainingCollection) =>
    useQuery({
      ...options,
      queryKey: [apiRoutes.productRemainingCollection, queries],
      queryFn: () =>
        getAllData<RemainingProductColactionData[], TQuery>(apiRoutes.productRemainingCollection, queries),
    });



    
    interface ITransfers {
      options?: DefinedInitialDataInfiniteOptions<TResponse<TData>>;
      queries?: TQuery;
    }
    
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
    
export default useProductRemainingProducts;
