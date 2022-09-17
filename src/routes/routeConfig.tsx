import AuthContainer from 'modules/Auth';
import PrivateRoute from 'modules/Shared/HOC/privateRoute';
import { Navigate } from 'react-router-dom';
import ROUTE from './constants';

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
    element: <PrivateRoute Component={<h1>Logged in successfully!</h1>} />,
  },
];

export default routeConfig;
