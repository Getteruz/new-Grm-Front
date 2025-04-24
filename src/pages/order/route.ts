import Items from "./items";


const Route = [
  {
    url: "/orders",
    Element: Items,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },

];

export default Route;
