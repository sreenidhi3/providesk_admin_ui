import Dashboard from "modules/dashboard";
import App from "../App";
import ROUTE from "./constants";

const routeConfig = [
  {
    path: ROUTE.HOME,
    element: <App />,
  },
  {
    path: ROUTE.DASHBOARD,
    element: <Dashboard />,
  },
];

export default routeConfig;
