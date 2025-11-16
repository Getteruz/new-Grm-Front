export type ReportsHomePageCurrentMonthData = {
  totals: {
    total_sum: number;
    total_profit_sum: number;
    total_kv: number;
    total_count: number;
  };
  manager: {
    income: number;
    id:string;
    expense: number;
  };
  accountant: {
    income: number;
    id:string;
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

  boss: {
    total_expense: number;
    boss_expense: number;
  };
};

export type ReportsHomePageCurrentLeftData = {
  totals: {
    total_sum:number;
    total_profit_sum: number;
    total_kv:number;
    total_count: number;
  };
  dealer: {
    total_give: number;
    total_owed: number;
  };
  product: {
    total_kv: number;
    total_sum: number;
    total_profit_sum: number;
    total_count: number;
  };
  kents: {
    income: number;
    expense: number;
    debt_balance: number;
  };
};

export type ReportsHomePageCurrentMonthQuery = {
  filial_id?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  month?: string | undefined;
  year?: number | undefined;
};
