import { Navigate } from 'react-router-dom';

import AuthContainer from 'modules/Auth';
import Dashboard from 'modules/dashboard';
import PrivateRoute from 'modules/Shared/HOC/privateRoute';

import ROUTE from './constants';
import Sidebar from 'modules/Shared/Sidebar';

const routeConfig = [
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
    path: ROUTE.SIDEBAR,
    element: <PrivateRoute Component={<Sidebar />} />,
  },
];

export default routeConfig;
