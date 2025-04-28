// route.ts
import Page from "./table";

const Route = [
  {
    url: "/awards",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;