import Page from "./page";
// import TransactionDetail from "./single/transaction-detail";

const Route = [
  {
    url: "/cashier/report",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin", "3"]) },
  },
  // {
  //   url: "/cashier/report/:id/info",
  //   Element: Page,
  //   meta: { isAuth: true, role: new Set(["admin", "3"]) },
  // },
];

export default Route;
