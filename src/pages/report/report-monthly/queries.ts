// table/queries.ts
import {
  DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";
import { Statement, StatementQuery } from "@/pages/statement/type";


interface IStatementQuery {
  options?: DefinedInitialDataInfiniteOptions<TResponse<Statement>>;
  queries?: StatementQuery;
}

const useStatementsData = ({ options, queries }: IStatementQuery) =>
  useInfiniteQuery({
    ...options,
    queryKey: [apiRoutes.payrollItems, queries],
    queryFn: ({ pageParam = 10 }) =>
      getAllData<TResponse<Statement>, StatementQuery>(`${apiRoutes.payrolls}`, {
        ...queries,
        page: pageParam as number,
        limit: 50,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.currentPage <= lastPage?.meta?.totalPages) {
        return lastPage?.meta?.currentPage + 1;
      } else {
        return null;
      }
    },
    initialPageParam: 1,
  });

export const useStatementsDataDetail = ({
  queries,
}: IStatementQuery) =>
  useQuery({
    queryKey: [apiRoutes.payrollItems, queries?.payrollId],
    queryFn: () =>
      getAllData<TResponse<Statement>, StatementQuery>(`${apiRoutes.payrollItems}`, {
        payrollId: queries?.payrollId,
      }),
    enabled: !!queries?.payrollId,
  });

export default useStatementsData;
