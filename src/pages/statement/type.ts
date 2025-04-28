// Statement types
export type Statement = {
    id: string;
    number: string;
    name: string;
    createdAt: string;
    premiumsTotal: number;
    bonusesTotal: number;
    salaryTotal: number;
    totalSum: number;
    status: 'В процессе' | 'Отправить' | 'Отказана' | 'Принято';
    employees?: StatementEmployee[];
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
    fromDate?: string;
    toDate?: string;
    status?: string;
    search?: string;
    limit: number;
    page: number;
  };