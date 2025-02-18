import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { CountContext } from '../App';

const Counter: React.FC = () => {
  const { count, setCount } = useContext(CountContext);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
        <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 2 
      }}
    >
      <Typography variant="h4">
        {count}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleIncrement}
          sx={{
            bgcolor: ' #95E1D3 ',
            '&:hover': {
              bgcolor: '#7DCDC0' 
            }
          }}
        >
          +
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleReset}
          sx={{
            color: 'white', 
            borderColor: 'white',
            '&:hover': {
              borderColor: '#45B7AF',
              bgcolor: 'rgba(197, 211, 48, 0.04)' 
            }
          }}
        >
          Reset
        </Button>
        <Button 
          variant="contained" 
          onClick={handleDecrement}
          sx={{
            bgcolor: '#FF6B6B', 
            '&:hover': {
              bgcolor: '#FF5252' 
            }
          }}
        >
          -
        </Button>
      </Box>
    </Box>
  );
};

export default Counter;