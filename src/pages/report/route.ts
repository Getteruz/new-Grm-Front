import PageFinance from "./finance";
import Page from "./table";
import CashPage from './cashier/report/page/index'
const Route = [
  {
    url: "/report",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  
  {
    url: "/report-finance",
    Element: PageFinance,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/report-monthly",
    Element: PageFinance,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/report/:id/info",
    Element: CashPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];


// const Route = [
//   {
//     url: "/report",
//     Element: Page,
//     meta: { isAuth: true, role: new Set(["admin"]) },
//   },
//   {
//     url: "/report-finance",
//     Element: PageFinance,
//     meta: { isAuth: true, role: new Set(["admin"]) },
//   },
//   {
//     url: "/report-monthly",
//     Element: PageFinance,
//     meta: { isAuth: true, role: new Set(["admin"]) },
//   },
//   {
//     url: "/report/:id",
//     Element: Page,
//     meta: { isAuth: true, role: new Set(["admin"]) },
//   },
// ];

export default Route;
