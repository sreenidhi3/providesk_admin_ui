import { Navigate } from 'react-router-dom';

import { DepartMent } from 'modules/Department';
import { Category } from 'modules/Category';
import AuthContainer from 'modules/Auth';
import Dashboard from 'modules/dashboard';
import PrivateRoute from 'modules/shared/HOC/privateRoute';
import Details from 'modules/details';
import withLayout from 'layouts';
import ROUTE from './constants';

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
    element: <PrivateRoute Component={withLayout(<Dashboard />)} />,
  },
  {
    path: ROUTE.DETAILS,
    element: <PrivateRoute Component={withLayout(<Details />)} />,
  },
  {
    path: ROUTE.DEPARTMENT,
    element: <PrivateRoute Component={withLayout(<DepartMent />)} />,
  },
  {
    path: ROUTE.CATEGORY,
    element: <PrivateRoute Component={withLayout(<Category />)} />,
  },
];
