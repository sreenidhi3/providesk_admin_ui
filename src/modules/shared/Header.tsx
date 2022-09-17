import React from 'react';
import Card from '@mui/material/Card';

const Header = () => {
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
      <h3>Help Desk</h3>
      <Card
        sx={{
          border: 2,
          padding: 1,
          borderRadius: 5,
          backgroundColor: '#5c95b5',
          color: '#1f2224',
        }}
      >
        JS
      </Card>
    </Card>
  );
};

export default Header;
