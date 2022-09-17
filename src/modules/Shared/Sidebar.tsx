import * as React from 'react';
import { Link } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DomainIcon from '@mui/icons-material/Domain';
import GroupIcon from '@mui/icons-material/Group';
import ROUTE from 'routes/constants';

const drawerWidth = 180;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sidebarConfig = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon fontSize='large' />,
      path: ROUTE.DASHBOARD,
    },
    {
      label: 'Users',
      icon: <GroupIcon fontSize='large' />,
      path: '/users',
    },
    {
      label: 'Organization',
      icon: <DomainIcon fontSize='large' />,
      path: '/organization',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            PROVIDESK
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <Typography variant='h5' sx={{ width: '100%', textAlign: 'center' }}>
            Help Desk{' '}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarConfig.map((ele) => (
            <Link
              to={'/' + ele.path}
              style={{ textDecoration: 'none', color: 'gray' }}
            >
              <ListItem className='my-4' key={ele.label} disablePadding>
                <ListItemButton className='d-flex flex-column justify-content-center align-items-center'>
                  <ListItemIcon style={{ minWidth: 0 }}>
                    {ele.icon}
                  </ListItemIcon>
                  <ListItemText primary={ele.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          {/* route and title pair array to render sidebar tabs*/}
          {/* {[
            ['dashboard', 'Dashboard'],
            ['departments', 'Departments'],
            ['users', 'Users'],
          ].map((navItem) => (
            <Link
              to={'/' + navItem[0]}
              style={{ textDecoration: 'none', color: 'gray' }}
            >
              <ListItem className='my-4' key={navItem[1]} disablePadding>
                <ListItemButton className='d-flex flex-column justify-content-center align-items-center'>
                  <ListItemIcon style={{ minWidth: 0 }}>
                    {navItem[0] === 'dashboard' ? <DashboardIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={navItem[1]} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))} */}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
