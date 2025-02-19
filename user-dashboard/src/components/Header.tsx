import { AppBar, Toolbar, Typography, Box, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const Header = () => {
  const { user, login, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
      marginBottom: 0 
    }}>
      <Toolbar>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%'
        }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            User Management Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link 
              to="/" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <HomeIcon />
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                Home
              </Typography>
            </Link>

            <Link 
              to="/profile-dashboard" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <AnalyticsIcon />
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                Analytics
              </Typography>
            </Link>

            {user ? (
              <>
                <Avatar 
                  onClick={handleMenuOpen}
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: '#4A90E2',
                    '&:hover': { bgcolor: '#357ABD' }
                  }}
                >
                  {user.name?.charAt(0) || user.email?.charAt(0)}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {user.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    logout();
                  }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                onClick={login}
                variant="outlined"
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Login with Google
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;