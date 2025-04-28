// table/queries.ts
import { DefinedInitialDataInfiniteOptions, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { useState } from "react";
import { TResponse } from "@/types";

import { mockStatements } from "../mock-data";
import { Statement, StatementQuery } from "../type";

interface IStatementQuery {
  options?: DefinedInitialDataInfiniteOptions<TResponse<Statement>>;
  queries?: StatementQuery;
}

// Mock API call for fetching statements with pagination and filtering
const fetchStatements = (
  page: number, 
  limit: number, 
  filters?: Omit<StatementQuery, "page" | "limit">
): TResponse<Statement> => {
  // Filter statements based on query params
  let filteredStatements = [...mockStatements];
  
  if (filters?.status) {
    filteredStatements = filteredStatements.filter(s => s.status === filters.status);
  }
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredStatements = filteredStatements.filter(
      s => s.name.toLowerCase().includes(searchLower) || 
           s.number.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters?.fromDate) {
    const fromDate = new Date(filters.fromDate);
    filteredStatements = filteredStatements.filter(
      s => new Date(s.createdAt) >= fromDate
    );
  }
  
  if (filters?.toDate) {
    const toDate = new Date(filters.toDate);
    filteredStatements = filteredStatements.filter(
      s => new Date(s.createdAt) <= toDate
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedStatements = filteredStatements.slice(startIndex, endIndex);
  
  return {
    items: paginatedStatements,
    meta: {
      page,
      totalItems: filteredStatements.length,
      itemCount: paginatedStatements.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(filteredStatements.length / limit),
      currentPage: page,
      limit,
      total: filteredStatements.length
    }
  };
};

// Hook for fetching statements list
const useStatementsData = ({ queries }: IStatementQuery) => {
  return useInfiniteQuery({
    queryKey: ["statements", queries],
    queryFn: ({ pageParam = 1 }) => {
      return fetchStatements(
        pageParam as number, 
        queries?.limit || 10, 
        {
          status: queries?.status,
          search: queries?.search,
          fromDate: queries?.fromDate,
          toDate: queries?.toDate
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
};

// Hook for creating a new statement
export const useCreateStatement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Statement, 'id'>) => {
      // Mock creating a new statement
      const newStatement: Statement = {
        ...data,
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      };
      
      // In a real app, you'd send this to the API
      console.log("Created new statement:", newStatement);
      
      // Return the new statement to simulate API response
      return Promise.resolve(newStatement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statements"] });
    },
  });
};

// Hook for updating a statement
export const useUpdateStatement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Statement> }) => {
      // Mock updating a statement
      console.log(`Updated statement ${id}:`, data);
      
      // Return success to simulate API response
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statements"] });
    },
  });
};

// Hook for deleting a statement
export const useDeleteStatement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      // Mock deleting a statement
      console.log(`Deleted statement ${id}`);
      
      // Return success to simulate API response
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statements"] });
    },
  });
};

export default useStatementsData;