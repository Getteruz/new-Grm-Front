import Page from "./table";

const Route = [
  {
    url: "/filial",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  
];

export default Route;
