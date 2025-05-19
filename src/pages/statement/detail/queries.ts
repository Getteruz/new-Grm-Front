// detail/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockEmployeesList, mockFilials } from "../mock-data";
import { StatementEmployee } from "../type";

// Helper function to get userId from localStorage
const getUserIdFromLocalStorage = (): string | null => {
  try {
    const userMeStorage = localStorage.getItem("userMe-storage");
    return userMeStorage ? JSON.parse(userMeStorage)?.state?.meUser?.id ?? null : null;
  } catch (error) {
    console.error("Failed to parse user ID from localStorage:", error);
    return null;
  }
};

// ✅ Hook for fetching employees in a statement using API
export const useStatementsDataDetail = ({ payrollId }: { payrollId?: string }) => {
  const userId = getUserIdFromLocalStorage();

  return useQuery({
    queryKey: ["statement-employees", payrollId, userId],
    queryFn: async () => {
      const url = new URL("https://api.gilam-market.uz/payroll-items");
      if (payrollId) url.searchParams.append("payrollId", payrollId);
      if (userId) url.searchParams.append("userId", userId);

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("Failed to fetch payroll items");
      return await response.json();
    },
    enabled: !!payrollId && !!userId,
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