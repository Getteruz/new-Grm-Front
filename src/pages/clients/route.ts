import ClientsPage from "./table";

const Route = [
  {
    url: "/clients",
    Element: ClientsPage,
    meta: { isAuth: true, role: new Set(["admin"]) },
  },
];

export default Route;