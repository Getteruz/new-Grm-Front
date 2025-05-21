// Statement types
export type Statement = {
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
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
    salary: number;
    filial: string;
  };
  payroll: {
    bonus: number;
    award: number;
    total: number;
    plastic: number;
    prepayment: number;
    in_hand: number;
  };
  filial: string;
};

export type Statement1 = {
  id: string;
  number: string;
  name: string;
  createdAt: string;
  premiumsTotal: number;
  bonusesTotal: number;
  salaryTotal: number;
  totalSum: number;
  status: string;
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
  payrollId?: string;
  endDate?: string;
  status?: string;
  search?: string;
  userId?: string;
  page?: number;
  limit?: number;
};
