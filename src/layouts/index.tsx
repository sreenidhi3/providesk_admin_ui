import React from 'react';
import Sidebar from './sidebar';

const withLayout = (component: React.ReactElement) => {
  return (
    <>
      <Sidebar />
      {component}
    </>
  );
};

export default withLayout;
