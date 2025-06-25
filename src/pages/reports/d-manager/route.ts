// import ReportPage from "./report";

import PageFinance from "./report-finance";


const Route = [
  {
    url: "/d-manager/report-monthly",
    Element: PageFinance,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
