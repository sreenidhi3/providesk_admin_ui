import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ROUTE from 'routes/constants';
import { UserContext } from 'App';
import { LOCAL_STORAGE_KEYS } from 'shared/appConstants';
import { removeLocalStorageState } from 'shared/localStorageHelpers';
import { getSidebarConfig } from './sidebarConfig';

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

import { DropMenu } from './DropDown';

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

export default function Sidebar() {
  const theme = useTheme();
  const userContext = useContext(UserContext);
  const role = userContext?.userAuth?.role;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(window.location.pathname);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    removeLocalStorageState(LOCAL_STORAGE_KEYS.USER_AUTH);
    window.location.href = ROUTE.LOGIN;
  };

  const sidebarConfig = getSidebarConfig(role);
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div' onClick={()=>navigate(ROUTE.HOME)} sx={{cursor:"pointer"}}>
              ProviDesk
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: 'inherit',
            }}
          >
            
            <DropMenu logout={onLogout}/>
          </div>
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
            ProviDesk{' '}
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
              to={ele?.path}
              style={{ textDecoration: 'none', color: 'gray' }}
              key={ele?.label}
              onClick={() => {
                setActive(ele?.path);
                handleDrawerClose();
              }}
            >
              <ListItem
                className='my-4'
                style={{
                  borderRight:
                    active === ele.path ? '4px solid #4006D4' : '#ffffff',
                  backgroundColor:
                    active === ele.path ? '#75757515' : '#ffffff',
                }}
                disablePadding
              >
                <ListItemButton className='d-flex flex-column justify-content-center align-items-center'>
                  <ListItemIcon style={{ minWidth: 0 }}>
                    {ele?.icon}
                  </ListItemIcon>
                  <ListItemText primary={ele?.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}

