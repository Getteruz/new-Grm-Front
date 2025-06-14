import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { RemainingProductColactionData, RemainingProductData, TQuery } from "./type";

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

export default useProductRemainingProducts;
