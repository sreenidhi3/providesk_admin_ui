import React from 'react';
import { Box } from '@mui/material';

import Sidebar from './sidebar';

const withLayout = (component: React.ReactElement) => {
  return (
    <>
      <Sidebar />
      <Box sx={{p: '1.5rem'}} className='flex-1 scroll-auto'>{component}</Box>
    </>
  );
};

export default withLayout;
