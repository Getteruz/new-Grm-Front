import { useInfiniteQuery, DefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";
import { IData, IQuery } from "../type";

interface ICrops {
  options?: DefinedInitialDataInfiniteOptions<TResponse<IData>>;
  queries?: IQuery;
}

const useOrder= ({ options, queries }: ICrops) =>
  useInfiniteQuery({
    ...options,
    queryKey: [apiRoutes.productReport, queries],
    queryFn: ({ pageParam = 1 }) =>
      getAllData<TResponse<IData>, IQuery>(apiRoutes.order,
         { page: pageParam as number, limit: 10}
        ),
    getNextPageParam: (lastPage) => lastPage?.meta?.currentPage + 1 || null,
    initialPageParam: 1 
  });

export default useOrder;
