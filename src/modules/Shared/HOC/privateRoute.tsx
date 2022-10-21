import React, { useContext } from 'react';

import { UserContext } from 'App';

import ROUTE from 'routes/constants';
import { ROLES } from 'routes/roleConstants';

interface IProps {
  Component: JSX.Element;
  Role: string[];
}

const PrivateRoute: React.FC<IProps> = ({ Component, Role }) => {
  const userContext = useContext(UserContext);
  const auth = userContext.userAuth;

  // redirect user to login page if token not present
  if (!auth?.auth_token) {
    window.location.href = ROUTE.LOGIN;
    return null;
  }

  //check if user has valid role to access the component
  if (!Role.includes(auth.role)) {
    if (auth.role === ROLES.EMPLOYEE) {
      window.location.href = ROUTE.TICKET;
    } else {
      window.location.href = ROUTE.UNAUTHORIZED;
    }
    return null;
  }

  return Component;
};

export default PrivateRoute;
