import { AppBar, Toolbar, Typography } from '@mui/material';
import { palette } from 'theme';

export const Header = () => {
  return (
    <AppBar elevation={6} color='primary'>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          PROVIDESK
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
