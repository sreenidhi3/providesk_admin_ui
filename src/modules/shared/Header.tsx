import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6' noWrap component='div'>
            PROVIDESK
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 'inherit',
          }}
        ></div>
      </Toolbar>
    </AppBar>
  );
};
