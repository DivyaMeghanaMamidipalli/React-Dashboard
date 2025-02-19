import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
      marginBottom: 0  // Removed margin
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
            <Link to="/profile-dashboard" style={{ color: 'white', textDecoration: 'none' }}>
              Analytics
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;