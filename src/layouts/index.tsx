import React from 'react';
import Sidebar from './sidebar';

const withLayout = (component: React.ReactElement) => {
  return (
    <>
      <Sidebar />
      <div style={{ marginTop: '5rem' }}>{component}</div>
    </>
  );
};

export default withLayout;
