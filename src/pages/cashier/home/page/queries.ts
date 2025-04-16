import { useInfiniteQuery, DefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";
import { IData, IQuery } from "../type";

interface ICrops {
  options?: DefinedInitialDataInfiniteOptions<TResponse<IData>>;
  queries?: IQuery;
  id?:string | undefined;
}

const useOrder= ({ options, queries,id}: ICrops) =>
  useInfiniteQuery({
    ...options,
    queryKey: [apiRoutes.orderByKassa, queries,id],
    queryFn: ({ pageParam = 1 }) =>
      getAllData<TResponse<IData>, IQuery>(apiRoutes.orderByKassa+'/'+ id,
         { page: pageParam as number, limit: 10}
        ),
        enabled: Boolean(id),
    getNextPageParam: (lastPage) => lastPage?.meta?.currentPage + 1 || null,
    initialPageParam: 1 
  });

export default useOrder;
