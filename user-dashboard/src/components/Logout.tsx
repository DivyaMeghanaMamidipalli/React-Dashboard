import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login');
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography>Signing out...</Typography>
    </Box>
  );
};

export default Logout;