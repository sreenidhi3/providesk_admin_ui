import { Navigate } from 'react-router-dom';

import { DepartMent } from 'modules/Department';
import { Category } from 'modules/Category';
import { Ticket } from 'modules/Ticket';
import AuthContainer from 'modules/Auth';
import Dashboard from 'modules/dashboard';
import PrivateRoute from 'modules/shared/HOC/privateRoute';
import Details from 'modules/details';
import UnauthorizedAccess from 'modules/Auth/components/UnauthorizedAccess';
import withLayout from 'layouts';

import ROUTE from './constants';
import { ROLES } from './roleConstansts';

export const routeConfig = [
  {
    path: ROUTE.ROOT,
    element: <Navigate to='/login' replace={true} />,
  },
  {
    path: ROUTE.LOGIN,
    element: withLayout(<AuthContainer />),
  },
  {
    path: ROUTE.UNAUTHORIZED,
    element: withLayout(<UnauthorizedAccess />),
  },
  {
    path: ROUTE.DASHBOARD,
    element: (
      <PrivateRoute
        Component={withLayout(<Dashboard />)}
        Role={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEPARTMENT_HEAD]}
      />
    ),
  },
  {
    path: ROUTE.DETAILS,
    element: (
      <PrivateRoute
        Component={withLayout(<Details />)}
        Role={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEPARTMENT_HEAD]}
      />
    ),
  },
  {
    path: ROUTE.DEPARTMENT,
    element: (
      <PrivateRoute
        Component={withLayout(<DepartMent />)}
        Role={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEPARTMENT_HEAD]}
      />
    ),
  },
  {
    path: ROUTE.CATEGORY,
    element: (
      <PrivateRoute
        Component={withLayout(<Category />)}
        Role={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DEPARTMENT_HEAD]}
      />
    ),
  },
  {
    path: ROUTE.TICKET,
    element: (
      <PrivateRoute
        Component={withLayout(<Ticket />)}
        Role={[
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.DEPARTMENT_HEAD,
          ROLES.EMPLOYEE,
        ]}
      />
    ),
  },
];
