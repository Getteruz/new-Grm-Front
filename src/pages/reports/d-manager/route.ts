// import ReportPage from "./report";
import ReportPage from "./report";
import ReportMonthlyPage from "./report-monthly";

const Route = [
  {
    url: "/d-manager/reports",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/d-manager/report-monthly",
    Element: ReportMonthlyPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
