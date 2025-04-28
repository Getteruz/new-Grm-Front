// detail/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMockStatementWithEmployees, mockEmployeesList, mockFilials } from "../mock-data";
import { Statement, StatementEmployee } from "../type";

// Hook for fetching a specific statement with details
export const useDetailedStatement = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ["statement", id],
    queryFn: () => {
      // Simulate API delay
      return new Promise<Statement | undefined>((resolve) => {
        setTimeout(() => {
          resolve(getMockStatementWithEmployees(id || ""));
        }, 500);
      });
    },
    enabled: !!id,
  });
};

// Hook for adding an employee to a statement
export const useAddEmployeeToStatement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
    //   statementId, 
      employeeData 
    }: { 
      statementId: string, 
      employeeData: Omit<StatementEmployee, "id"> 
    }) => {
      // Mock adding an employee to a statement
      const newEmployee: StatementEmployee = {
        ...employeeData,
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      };
      
    //   console.log(`Added employee to statement ${statementId}:`, newEmployee);
      
      // Return the new employee to simulate API response
      return Promise.resolve(newEmployee);
    },
    onSuccess: (_, { statementId }) => {
      queryClient.invalidateQueries({ queryKey: ["statement", statementId] });
    },
  });
};

// Hook for updating an employee in a statement
export const useUpdateEmployeeInStatement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      statementId, 
      employeeId, 
      data 
    }: { 
      statementId: string, 
      employeeId: string, 
      data: Partial<StatementEmployee> 
    }) => {
      // Mock updating an employee in a statement
      console.log(`Updated employee ${employeeId} in statement ${statementId}:`, data);
      
      // Return success to simulate API response
      return Promise.resolve({ success: true });
    },
    onSuccess: (_, { statementId }) => {
      queryClient.invalidateQueries({ queryKey: ["statement", statementId] });
    },
  });
};

// Hook for fetching employees (for dropdown selection)
export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      // Return mock employees list
      return Promise.resolve(mockEmployeesList);
    },
  });
};

// Hook for fetching filials (for dropdown selection)
export const useFilials = () => {
  return useQuery({
    queryKey: ["filials"],
    queryFn: () => {
      // Return mock filials list
      return Promise.resolve(mockFilials);
    },
  });
};