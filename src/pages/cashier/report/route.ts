import Page from "./page";

const Route = [
  {
    url: "/cashier/report",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },

];

export default Route;
