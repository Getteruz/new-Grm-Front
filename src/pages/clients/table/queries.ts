import {
  DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import { getAllData, UpdateData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { TResponse } from "@/types";

import { Client, ClientsQuery } from "../type";

interface IClientsQuery {
  options?: DefinedInitialDataInfiniteOptions<TResponse<Client>>;
  queries?: ClientsQuery;
}

const useClientsFetch = ({ options, queries }: IClientsQuery) =>
  useInfiniteQuery({
    ...options,
    queryKey: ["clients", queries],
    queryFn: ({ pageParam = 1 }) => {
      return getAllData<TResponse<Client>, ClientsQuery>(
        apiRoutes.clients, 
        {
          ...queries,
          page: pageParam as number,
          limit: 10,
        }
      );
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage < lastPage.meta.totalPages) {
        return lastPage.meta.currentPage + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

// Hook for updating a client - mocked for now
export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Client> }) => {
      return UpdateData(apiRoutes.clients, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

// Hook for creating a client - mocked for now
export const useCreateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Client, 'id'>) => {
      return fetch(apiRoutes.clients, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export default useClientsFetch;