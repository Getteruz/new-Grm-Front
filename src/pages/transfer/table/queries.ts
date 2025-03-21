import { useInfiniteQuery, DefinedInitialDataInfiniteOptions } from "@tanstack/react-query";
import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";
import { TransferData, TransferQuery } from "../type";

interface ITransfers {
  options?: DefinedInitialDataInfiniteOptions<TResponse<TransferData>>;
  queries?: TransferQuery;
}

const useTransfers = ({ options, queries }: ITransfers) =>
  useInfiniteQuery({
    ...options,
    queryKey: [apiRoutes.products, queries],
    queryFn: ({ pageParam = 1 }) =>
      getAllData<TResponse<TransferData>, TransferQuery>(apiRoutes.products,
         { ...queries, page: pageParam as number, limit: 10 }
        ),
    getNextPageParam: (lastPage) => lastPage?.meta?.currentPage + 1 || null,
    initialPageParam: 1 
  });

export default useTransfers;
