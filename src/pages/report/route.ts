import PageFinance from "./finance";
import MonthReportPage from "./report-monthly";
import Page from "./table";
import PageRemaider from "./remaider";

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
    url: "/report/:id",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
