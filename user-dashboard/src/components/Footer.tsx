import React from 'react';
import {  Typography, Box } from '@mui/material';

const Footer = () => {
    return (
      <Box 
        component="footer" 
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          background: 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} User Management System. All rights reserved.
        </Typography>
      </Box>
    );
  };
  
  export default Footer;