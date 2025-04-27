// table/queries.ts
import { DefinedInitialDataInfiniteOptions, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { TResponse } from "@/types";

import { mockBonuses } from "../mock-data";
import { Bonus, BonusQuery } from "../type";

interface IBonusQuery {
  options?: DefinedInitialDataInfiniteOptions<TResponse<Bonus>>;
  queries?: BonusQuery;
}

// Mock API call for fetching bonuses with pagination and filtering
const fetchBonuses = (
  page: number, 
  limit: number, 
  search?: string
): TResponse<Bonus> => {
  // Filter bonuses based on search term if provided
  let filteredBonuses = [...mockBonuses];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredBonuses = filteredBonuses.filter(
      bonus => bonus.name.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBonuses = filteredBonuses.slice(startIndex, endIndex);
  
  return {
    items: paginatedBonuses,
    meta: {
      page,
      totalItems: filteredBonuses.length,
      itemCount: paginatedBonuses.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(filteredBonuses.length / limit),
      currentPage: page,
      limit,
      total: filteredBonuses.length
    }
  };
};

// Hook for fetching bonuses list
const useBonusesData = ({ queries }: IBonusQuery) => {
  return useInfiniteQuery({
    queryKey: ["bonuses", queries],
    queryFn: ({ pageParam = 1 }) => {
      return fetchBonuses(
        pageParam as number, 
        queries?.limit || 10, 
        queries?.search
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
};

// Hook for creating a new bonus
export const useCreateBonus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Bonus, 'id' | 'number'>) => {
      // Mock creating a new bonus
      const newBonus: Bonus = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        number: mockBonuses.length + 1,
        ...data
      };
      
      // In a real app, you'd send this to the API
      console.log("Created new bonus:", newBonus);
      
      // Return the new bonus to simulate API response
      return Promise.resolve(newBonus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonuses"] });
    },
  });
};

// Hook for updating a bonus
export const useUpdateBonus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Bonus> }) => {
      // Mock updating a bonus
      console.log(`Updated bonus ${id}:`, data);
      
      // Return success to simulate API response
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonuses"] });
    },
  });
};

// Hook for deleting a bonus
export const useDeleteBonus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      // Mock deleting a bonus
      console.log(`Deleted bonus ${id}`);
      
      // Return success to simulate API response
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonuses"] });
    },
  });
};

export default useBonusesData;