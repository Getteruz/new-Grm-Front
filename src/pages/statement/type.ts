// Statement types
export type Statement = {
  bonus: number;
  createdAt: string;
  id: number;
  in_hand: number;
  number_payroll: number;
  plastic: number;
  premium: number;
  status: string;
  title: string;
  to_date: string;
  total: number;
};

// Employee in statement
export type StatementEmployee = {
  id: string;
  name: string;
  avatar?: string | null;
  filial: string;
  salary: number;
  bonus: number;
  premium: number;
  advance: number;
  total: number;
  plastic: number;
  cash: number;
};

// Query parameters for statements list
export type StatementQuery = {
  startDate?: string;
  endDate?: string;
  status?: string;
  search?: string;
  limit: number;
  page: number;
};
