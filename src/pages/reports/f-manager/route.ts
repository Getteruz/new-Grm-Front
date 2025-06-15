import PageFinance from "./finance";
import PageRemaider from "./remaider";
import ReportPage from "./report";
import SinglePage from "./report-single";
const Route = [
  {
    url: "/f-manager/report",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report/:id/info",
    Element: SinglePage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/reports",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/reports/:id/info",
    Element: SinglePage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report-finance",
    Element: PageFinance,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report-finance/:id/info",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report-finance/:report/info/:id/info",
    Element: SinglePage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report-remaider",
    Element: PageRemaider,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
 
];

export default Route;
