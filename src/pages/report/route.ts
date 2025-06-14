import PageFinance from "./finance";
import MonthReportPage from "./report-monthly";
import Page from "./table";
import PageRemaider from "./remaider";
import PageMFinance from "./M-Finance";
import PageMFinanceSingle from "./M-Finance-single";

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
    Element: MonthReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/report-remaider",
    Element: PageRemaider,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/report-finance-m",
    Element: PageMFinance,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/report-finance-m/:id/info",
    Element: PageMFinanceSingle,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/report/:id",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
