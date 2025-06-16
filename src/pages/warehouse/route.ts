import SinglePage from "../filial/single";
import PageRemaider from "./remaider";
import Page from "./table";

const Route = [
  {
    url: "/warehouse",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/warehouse-report",
    Element: PageRemaider,
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
