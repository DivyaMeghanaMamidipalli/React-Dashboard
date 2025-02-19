import { AppBar, Toolbar, Typography, Box,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, login, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
      marginBottom: 0 
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            User Management Dashboard
          </Typography>
          <Box>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
              Home
            </Link>
            <Link to="/profile-dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
              Analytics
            </Link>
            {user ? (
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {user.email}
                </Typography>
                <Button 
                  onClick={logout}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button 
                onClick={login}
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
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