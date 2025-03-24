import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";
import { TData, FilialsQuery } from "../type";

interface IFilial {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: FilialsQuery;
}
const useFilial = ({ options, queries }: IFilial) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.filial, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, FilialsQuery>(
        apiRoutes.filial,
        queries
      ),
  });

export default useFilial;
