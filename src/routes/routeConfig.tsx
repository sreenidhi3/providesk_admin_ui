import Details from "modules/details";
import App from "../App";
import ROUTE from "./constants";

export const routeConfig = [
  {
    path: ROUTE.HOME,
    element: <App />,
  },
  {
    path: ROUTE.DETAILS,
    element: <Details />,
  },
];
