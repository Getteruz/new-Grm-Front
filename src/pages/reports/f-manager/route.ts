import PageFinance from "./finance";
import PageRemaider from "./remaider";
import ReportPage from "./report";
import SinglePage from "./report-single";
import PageSellerCashFlow from "../seller/seller-cashflow";
import PageSellerReport from "../seller/seller-report";
import PageCleintDebt from "./client-debt";
import PageOrginal from "../report-orginal";
const Route = [
  {
    url: "/f-manager/report/:id/info",
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
  {
    url: "/f-manager/report-seller",
    Element: PageSellerReport,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report-seller/:id/info",
    Element: PageSellerCashFlow,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report-finance/client-debt",
    Element: PageCleintDebt,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/f-manager/report-finance/client-debt",
    Element: PageCleintDebt,
    meta: { isAuth: true, role: new Set(["admin"])},
  },
  {
    url: "/f-manager/report-orginal",
    Element: PageOrginal,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
