export type Client = {
  id: string;
  name: string;
  secondName: string;
  comment: string;
  filial: string;
  phone: string;
  // Additional fields for display - these might come from API or be calculated
  fullName?: string; // Computed from name + secondName
  status?: string;
  registrationDate?: string;
  lastActivity?: string;
  ordersCount?: number;
};

export type ClientsQuery = {
  search?: string | undefined;
  status?: string | undefined;
  filial?: string | undefined;
  sortBy?: string | undefined;
  limit: number;
  page: number;
};
export interface ProductCharacteristic {
  id: string; // yoki number
  collection: string;
  characteristics1: string;
  characteristics2: string;
  // boshqa maydonlar bo'lishi mumkin
}
