import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { TData, TQuery } from "../type";

interface IData {
  options?: DefinedInitialDataOptions<TResponse<TData>>;
  queries?: TQuery;
}
const useDataLibrary = ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.cashflow, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.cashflow, queries),
  });

export const useDataCashflowTypes = ({ options, queries }: IData) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.cashflowTypes, queries],
    queryFn: () =>
      getAllData<TResponse<TData>, TQuery>(apiRoutes.cashflowTypes, queries),
  });

export default useDataLibrary;
