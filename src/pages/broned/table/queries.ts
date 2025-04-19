import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";
import { BronedData, BronedQuery } from "../type";

interface IBroned {
  options?: DefinedInitialDataOptions<TResponse<BronedData>>;
  queries?: BronedQuery;
}
const useBroned = ({ options, queries }: IBroned) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.broned, queries],
    queryFn: () =>
      getAllData<TResponse<BronedData>, BronedQuery>(apiRoutes.broned, queries),
  });

export default useBroned;
