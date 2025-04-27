// table/queries.ts
import { DefinedInitialDataInfiniteOptions, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { TResponse } from "@/types";

import { mockAwards } from "../mock-data";
import { Award, AwardQuery } from "../type";

interface IAwardQuery {
  options?: DefinedInitialDataInfiniteOptions<TResponse<Award>>;
  queries?: AwardQuery;
}

// Mock API call for fetching awards with pagination and filtering
const fetchAwards = (
  page: number, 
  limit: number, 
  search?: string
): TResponse<Award> => {
  // Filter awards based on search term if provided
  let filteredAwards = [...mockAwards];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredAwards = filteredAwards.filter(
      award => award.name.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAwards = filteredAwards.slice(startIndex, endIndex);
  
  return {
    items: paginatedAwards,
    meta: {
      page,
      totalItems: filteredAwards.length,
      itemCount: paginatedAwards.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(filteredAwards.length / limit),
      currentPage: page,
      limit,
      total: filteredAwards.length
    }
  };
};

// Hook for fetching awards list
const useAwardsData = ({ queries }: IAwardQuery) => {
  return useInfiniteQuery({
    queryKey: ["awards", queries],
    queryFn: ({ pageParam = 1 }) => {
      return fetchAwards(
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

// Hook for creating a new award
export const useCreateAward = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { name: string; amount: number }) => {
      // Mock creating a new award
      const newAward: Award = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        number: mockAwards.length + 1,
        name: data.name,
        createdAt: new Date().toISOString(),
        amount: data.amount
      };
      
      // In a real app, you'd send this to the API
      console.log("Created new award:", newAward);
      
      // Return the new award to simulate API response
      return Promise.resolve(newAward);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
    },
  });
};

// Hook for updating an award
export const useUpdateAward = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Award> }) => {
      // Mock updating an award
      console.log(`Updated award ${id}:`, data);
      
      // Return success to simulate API response
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
    },
  });
};

// Hook for deleting an award
export const useDeleteAward = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      // Mock deleting an award
      console.log(`Deleted award ${id}`);
      
      // Return success to simulate API response
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
    },
  });
};

export default useAwardsData;