import SinglePage from "./single";
import Page from "./table";

const Route = [
  {
    url: "/filial",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/filial/:id",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/filial/:id/info",
    Element: SinglePage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;
