import DealerReportPage from "./dealer-report";
import PageDealerKassaReport from "./dealer-kassa-report";
import PageFinanceFilial from "./filial-report-finance";
import PageRemaider from "./remaider";
import ReportPage from "./report";
import PageFinance from "./report-finance";
import PageFinanceSingle from "./report-finance-single";
import PageSellerReport from "../seller/seller-report";
import PageSellerCashFlow from "../seller/seller-cashflow";
import PageOrginal from "../report-orginal";

const Route = [
  {
    url: "/m-manager/report",
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
    url: "/m-manager/report-remaider",
    Element: PageRemaider,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/d-manager/report-monthly/:id/info",
    Element: PageDealerKassaReport,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  
  {
    url: "/m-manager/d-manager/report-monthly/:id/info",
    Element: PageDealerKassaReport,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/d-manager/report-monthly/:reportId/info/:id/info",
    Element: DealerReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },

  {
    url: "/m-manager/report-finance/:id/info",
    Element: PageFinanceSingle,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-finance/:id/info/my",
    Element: ReportPage,
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
  {
    url: "/m-manager/report-finance/:reportId/info/:kassaReportId/info/f-managers",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-seller",
    Element: PageSellerReport,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-seller/:id/info",
    Element: PageSellerCashFlow,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/m-manager/report-orginal",
    Element: PageOrginal,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];


export default Route;
