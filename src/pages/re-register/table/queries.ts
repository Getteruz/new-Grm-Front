
import { useInfiniteQuery, DefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";
import { TData, TQuery } from "../type";

interface ITransfers {
  options?: DefinedInitialDataInfiniteOptions<TResponse<TData>>;
  queries?: TQuery;
}

const useDataFetch = ({ options, queries }: ITransfers) =>
  useInfiniteQuery({
    ...options,
    queryKey: [apiRoutes.productReport, queries],
    queryFn: ({ pageParam = 10}) =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.productReport,
         { ...queries, page: pageParam as number, limit: 10 }
        ),
    getNextPageParam: (lastPage) => {
      if(lastPage.meta.page <=  (Math.ceil(lastPage?.meta?.total / lastPage?.meta.limit) )){
          return lastPage?.meta?.page + 1 
      }else{
        return null
      }
    },
    initialPageParam: 1 
  });

export default useDataFetch;
