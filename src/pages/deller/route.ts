import Page from "./table";

const Route = [
  {
    url: "/deller",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
  {
    url: "/deller/:id",
    Element: Page,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
 
];

export default Route;
