import React from 'react';
import Card from '@mui/material/Card';
import ROUTE from 'routes/constants';
import { LOCAL_STORAGE_KEYS } from 'shared/appConstants';
import { removeLocalStorageState } from 'shared/localStorageHelpers';

const Header = () => {
  const navigateToHomePage = () => {
    window.location.href = ROUTE.DASHBOARD;
  };

  const onLogout = () => {
    removeLocalStorageState(LOCAL_STORAGE_KEYS.USER_AUTH);
    window.location.href = ROUTE.LOGIN;
  };

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: '#5c95b5',
      }}
    >
      <h3 onClick={navigateToHomePage} style={{ cursor: 'pointer' }}>
        ProviDesk
      </h3>
      <Card
        sx={{
          border: 2,
          padding: 1,
          borderRadius: 5,
          backgroundColor: '#5c95b5',
          color: '#1f2224',
          cursor: 'pointer',
        }}
        onClick={onLogout}
      >
        Logout
      </Card>
    </Card>
  );
};

export default Header;
