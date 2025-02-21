import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useEffect, useState } from 'react';

const Header = () => {
  const [hasUsers, setHasUsers] = useState(false);

  useEffect(() => {
    const checkUsers = () => {
      const userData = JSON.parse(localStorage.getItem('userData') || '[]');
      setHasUsers(userData.length > 0);
    };

    // Check initially
    checkUsers();

    // Listen for storage changes
    window.addEventListener('storage', checkUsers);

    // Check periodically for updates
    const interval = setInterval(checkUsers, 1000);

    return () => {
      window.removeEventListener('storage', checkUsers);
      clearInterval(interval);
    };
  }, []);

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

            {hasUsers && (
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
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;