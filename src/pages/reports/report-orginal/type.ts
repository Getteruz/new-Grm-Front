export type TData = {
  dateOne: Date;
  dateTwo: Date;
  deletedDate: null;
  id: string;
  title: string;
  price: number;
  date: Date;
};

export type TQuery = {
  year?: number;
  month?: number;
  filialId?: string;
  page?: number;
  limit?: number;
};
