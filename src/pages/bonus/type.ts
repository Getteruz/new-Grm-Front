// type.ts
export type Bonus = {
    id: string;
    number: number;
    name: string;
    condition: number;
    measurementUnit: string;
    operator: string;
    bonusValue: number;
    bonusUnit: string;
    period: string;
    endDate?: string;
  };
  
  export type BonusQuery = {
    search?: string;
    limit: number;
    page: number;
  };