import React, { useContext } from 'react';

import { UserContext } from 'App';

import ROUTE from 'routes/constants';

interface IProps {
  Component: JSX.Element;
}

const PrivateRoute: React.FC<IProps> = ({ Component }) => {
  const userContext = useContext(UserContext);
  const auth = userContext.userAuth;

  // redirect user to login page if token not present
  if (!auth?.auth_token) {
    window.location.href = ROUTE.LOGIN;
    return null;
  }

  return Component;
};

export default PrivateRoute;
