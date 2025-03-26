export type TResponse<T> = {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

export type IUserData = {
  id: string;
  isActive: boolean;
  avatar: string | null;
  firstName: string;
  lastName: string;
  fatherName: string;
  login: string;
  hired: string;
  from: string;
  to: string;
  username: string | null;
  salary: number | null;
  email: string | null;
  phone: string;
  password: string;
  isUpdated: boolean;
  createdAt: string;
  position: {
    id: string;
    title: string;
    is_active: boolean;
    role: number;
  };
  filial: {
    need_get_report:boolean
  };
}

export type TSelectOption = {
  value: string;
  label: string;
};
