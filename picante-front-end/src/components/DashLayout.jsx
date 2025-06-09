import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/DashLayout.css';

const DRAWER_WIDTH = 200;
const COLLAPSED_WIDTH = 60;

const DashLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
      if (location.state?.firstName) {
        setUsername(location.state.firstName);
        setUserRole(location.state.type);
        localStorage.setItem('firstName', location.state.firstName);
        localStorage.setItem('type', location.state.type);
      } else {
        setUsername(localStorage.getItem('firstName') || '');
        setUserRole(localStorage.getItem('type') || '');
      }
    }, [location.state]);

    useEffect(() => {
      const firstName = localStorage.getItem('firstName');
      if (!firstName) {
        navigate('/login');
      }
    }, [location.pathname]);

      const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
      };

      const navItems = [
        { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        { text: 'Reports', path: '/dashboard/reports', icon: <AssessmentIcon /> },
        ...(userRole !== 'editor' ? [{ text: 'Users', path: '/dashboard/users', icon: <GroupIcon /> }] : []),
        { text: 'Articles', path: '/dashboard/articles', icon: <ArticleIcon /> },
      ];

      const drawerWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            width: drawerWidth,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: 2,
              }}
            >
              <Tooltip title={collapsed ? item.text : ''} placement="right">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 1 }}>
                  {item.icon}
                  {!collapsed && <ListItemText primary={item.text} />}
                </Box>
              </Tooltip>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s',
          ml: `${drawerWidth}px`,
        }}
      >

       <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: 'width 0.3s, margin 0.3s',
            backgroundColor: '#6d4c41', 
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setCollapsed(!collapsed)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Welcome, {username || 'User'}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" mr={2}>
                <SearchIcon sx={{ ml: 1, mr: 1 }} />
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ color: 'inherit' }}
                />
              </Box>

              <Button
                variant="outlined"
                sx={{
                  color: '#6d4c41',             
                  borderColor: '#6d4c41',      
                  backgroundColor: 'white',     
                  '&:hover': {
                    backgroundColor: '#f1e6e1', 
                    borderColor: '#5d3e33',
                  },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Toolbar />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;
