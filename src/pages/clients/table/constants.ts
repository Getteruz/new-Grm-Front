/**
 * Constants used throughout the clients module
 */

// Sort options
export const SORT_OPTIONS = [
    { value: "lastActivity", label: "Последняя активность" },
    { value: "registrationDate", label: "Дата регистрации" },
    { value: "ordersCount", label: "Количество заказов" }
  ];
  
  // Status options
  export const STATUS_OPTIONS = [
    { value: "all", label: "Все" },
    { value: "Активный", label: "Активные" },
    { value: "Новый", label: "Новые" },
    { value: "Неактивный", label: "Неактивные" }
  ];
  
  // Default form values for client forms
  export const DEFAULT_CLIENT_VALUES = {
    fullName: "",
    phone: "",
    email: "",
    status: "Новый",
    address: "",
    notes: ""
  };