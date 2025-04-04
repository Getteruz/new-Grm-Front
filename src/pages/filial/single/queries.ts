import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { ProductData, ProductQuery } from "../type";

interface IData {
  options?: DefinedInitialDataOptions<TResponse<ProductData>>;
  queries?: ProductQuery;
}
const useDataFetch = ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.products, queries],
    queryFn: () =>
      getAllData<TResponse<ProductData>, ProductQuery>(apiRoutes.products, queries),
  });

export default useDataFetch;
