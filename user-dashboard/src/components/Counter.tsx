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
            bgcolor: 'rgb(30, 177, 22) ',
            '&:hover': {
              bgcolor: 'rgb(30, 177, 22)' 
            }
          }}
        >
          +
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleReset}
          sx={{
            color: 'black', 
            bgcolor:'rgba(233, 234, 222, 0.7)',
            borderColor: 'black',
            
            '&:hover': {
              borderColor: '#black',
              bgcolor: 'rgba(233, 234, 222, 0.7)' 
            }
          }}
        >
          Reset
        </Button>
        <Button 
          variant="contained" 
          onClick={handleDecrement}
          sx={{
            bgcolor: 'red', 
            '&:hover': {
              bgcolor: 'red' 
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