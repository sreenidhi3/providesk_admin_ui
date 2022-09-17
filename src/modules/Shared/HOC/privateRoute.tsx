import React from 'react';
import ROUTE from 'routes/constants';
import { LOCAL_STORAGE_KEYS } from 'shared/appConstants';
import { loadLocalStorage } from 'shared/localStorageHelpers';

interface IProps {
  Component: any;
}

const PrivateRoute: React.FC<IProps> = ({ Component }) => {
  const auth = loadLocalStorage(LOCAL_STORAGE_KEYS.USER_AUTH);

  if (!auth?.auth_token) {
    window.location.href = ROUTE.LOGIN;
    return null;
  }

  return Component;
};

export default PrivateRoute;
