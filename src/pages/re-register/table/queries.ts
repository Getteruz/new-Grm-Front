import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { TData, TQuery } from "../type";

interface IData {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: TQuery;
}
const useDataFetch = ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.parties, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.parties, queries),
  });

export default useDataFetch;
