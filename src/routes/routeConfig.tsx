import { Navigate } from "react-router-dom";

import AuthContainer from "modules/Auth";
import Dashboard from "modules/dashboard";
import PrivateRoute from "modules/shared/HOC/privateRoute";
import Details from "modules/details";

import ROUTE from "./constants";

export const routeConfig = [
  {
    path: ROUTE.ROOT,
    element: <Navigate to='/login' replace={true} />,
  },
  {
    path: ROUTE.LOGIN,
    element: <AuthContainer />,
  },
  {
    path: ROUTE.DASHBOARD,
    element: <PrivateRoute Component={<Dashboard />} />,
  },
  {
    path: ROUTE.DETAILS,
    element: <Details />,
  },
];
