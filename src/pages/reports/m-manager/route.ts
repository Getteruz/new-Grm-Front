import PageFinanceFilial from "./filial-report-finance";
import ReportPage from "./report";
import PageFinance from "./report-finance";
import PageFinanceSingle from "./report-finance-single";

const Route = [
  {
    url: "/m-manager",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/reports",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-finance",
    Element: PageFinance,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-finance/:id/info",
    Element: PageFinanceSingle,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-finance/:reportId/info/:id/info",
    Element: PageFinanceFilial,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-finance/:reportId/info/:kassaReportId/info/:id/info",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];


export default Route;
