export type ReportsHomePageCurrentMonthData = {
  totals: {
    total_sum: number;
    total_profit_sum: number;
    total_kv: number;
    total_count: number;
  };
  manager: {
    income: number;
    expense: number;
  };
  accountant: {
    income: number;
    expense: number;
  };
  order: {
    total_sum: number;
    total_profit_sum: number;
    total_kv: number;
    total_count: number;
  };
  debt_order: {
    total_kv: number;
    total_sum: number;
    total_count: number;
    total_profit_sum: number;
  };
};

export type ReportsHomePageCurrentMonthQuery = {
  filial_id?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};
