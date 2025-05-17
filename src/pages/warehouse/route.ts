import SinglePage from "../filial/single";
import PageReport from "./report";
import Page from "./table";

const Route = [
  {
    url: "/warehouse",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/warehouse-report",
    Element: PageReport,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/warehouse/:id/info",
    Element: SinglePage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/warehouse/:id",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
