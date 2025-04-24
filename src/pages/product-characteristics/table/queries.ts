import {
    DefinedInitialDataInfiniteOptions,
    useInfiniteQuery,
    useMutation,
    useQueryClient
  } from "@tanstack/react-query";

  import { getAllData, UpdateData } from "@/service/apiHelpers";
  import { apiRoutes } from "@/service/apiRoutes";
  import { TResponse } from "@/types";

  import { CharacteristicsQuery,ProductCharacteristic } from "../type";
  
  interface ICharacteristicsQuery {
    options?: DefinedInitialDataInfiniteOptions<TResponse<ProductCharacteristic>>;
    queries?: CharacteristicsQuery;
  }
  
  const useCharacteristicsFetch = ({ options, queries }: ICharacteristicsQuery) =>
    useInfiniteQuery({
      ...options,
      queryKey: ["productCharacteristics", queries],
      queryFn: ({ pageParam = 1}) => {
        return getAllData<TResponse<ProductCharacteristic>, CharacteristicsQuery>(
          apiRoutes.productCharacteristics, 
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
  
  // Hook for updating a characteristic - mocked for now
  export const useUpdateCharacteristic = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({ id, data }: { id: string, data: Partial<ProductCharacteristic> }) => {
        // Mock update logic
        // return Promise.resolve({ success: true });
        
        // Switch to this implementation when backend is ready:
        return UpdateData(apiRoutes.productCharacteristics, id, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productCharacteristics"] });
      },
    });
  };
  
  // Hook for bulk updating characteristics - mocked for now
  export const useBulkUpdateCharacteristics = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (data: { ids: string[], updates: Partial<ProductCharacteristic> }) => {
        // Mock bulk update logic
        // console.log(`Mocked bulk update for characteristics:`, data);
        // return Promise.resolve({ success: true });
        
        // Switch to this implementation when backend is ready:
        return fetch(apiRoutes.productCharacteristics + '/bulk-update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(res => res.json());
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productCharacteristics"] });
      },
    });
  };
  
  export default useCharacteristicsFetch;