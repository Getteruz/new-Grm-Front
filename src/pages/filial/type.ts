export type TData = {
  id: string;
  title: string;
  name: string;
  telegram: string;
  address: string;
  startWorkTime: string;
  endWorkTime: string;
  addressLink: string;
  landmark: string;
  phone1: string;
  phone2: string;
  isActive: boolean;
  hickCompleted: boolean;
  type: 'filial';
  need_get_report:boolean
}

export type FilialsQuery = {
  title?: string;
  limit: number;
  page: number;
};
