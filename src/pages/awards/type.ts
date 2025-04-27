// type.ts
export type Award = {
    id: string;
    number: number;
    name: string;
    createdAt: string;
    amount: number;
  };
  
  export type AwardQuery = {
    search?: string;
    limit: number;
    page: number;
  };