import ReportPage from "./report";

const Route = [
  {
    url: "/d-manager/report",
    Element: ReportPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
