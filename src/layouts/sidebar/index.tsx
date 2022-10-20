import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import ROUTE from 'routes/constants';
import { UserContext } from 'App';
import { LOCAL_STORAGE_KEYS } from 'shared/appConstants';
import { removeLocalStorageState } from 'shared/localStorageHelpers';
import { ROLES } from 'routes/roleConstansts';

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
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

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

  const employeeAccessSidebar = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon fontSize='large' />,
      path: ROUTE.DASHBOARD,
    },
    {
      label: 'Ticket',
      icon: <ConfirmationNumberIcon fontSize='large' />,
      path: ROUTE.TICKET,
    },
  ];

  const adminAccessSidebar = [
    ...employeeAccessSidebar,
    {
      label: 'Department',
      icon: <DomainIcon fontSize='large' />,
      path: ROUTE.DEPARTMENT,
    },
    {
      label: 'Categories',
      icon: <CategoryIcon fontSize='large' />,
      path: ROUTE.CATEGORY,
    },
  ];

  const superAdminAccessSidebar = [
    ...adminAccessSidebar,
    {
      label: 'Organization',
      icon: <ApartmentIcon fontSize='large' />,
      path: ROUTE.ORGANIZATION,
    },
  ];

  const departmentHeadAccessSidebar = [
    ...employeeAccessSidebar,
    {
      label: 'Department',
      icon: <DomainIcon fontSize='large' />,
      path: ROUTE.DEPARTMENT,
    },
  ];

  let sidebarConfig;
  switch (role) {
    case ROLES.SUPER_ADMIN:
      sidebarConfig = superAdminAccessSidebar;
      break;
    case ROLES.ADMIN:
      sidebarConfig = adminAccessSidebar;
      break;
    case ROLES.DEPARTMENT_HEAD:
      sidebarConfig = departmentHeadAccessSidebar;
      break;
    case ROLES.EMPLOYEE:
      sidebarConfig = employeeAccessSidebar;
      break;
    default:
      sidebarConfig = [];
      break;
  }

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
          >
            {window.location.pathname === ROUTE.LOGIN ? (
              <p></p>
            ) : (
              <Button
                variant='outlined'
                sx={{ color: '#ffffff' }}
                endIcon={<LogoutIcon />}
                onClick={onLogout}
              >
                Logout
              </Button>
            )}
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
                  // borderLeft:
                  //   active === ele.path ? '4px solid #4006D4' : '#ffffff',
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
