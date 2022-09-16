import AuthContainer from 'modules/Auth';
import { Navigate } from 'react-router-dom';
import App from '../App';
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
    element: <App />,
  },
];

export default routeConfig;
