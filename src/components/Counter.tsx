import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';

interface CounterProps {
  initialCount?: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  
  const [springs, api] = useSpring(() => ({
    from: { backgroundColor: 'rgb(255, 255, 255)' },
  }));

  useEffect(() => {
    // Calculate color intensity based on count
    const intensity = Math.min(255, Math.max(0, count * 10));
    api.start({
      backgroundColor: `rgb(${255 - intensity}, ${255 - intensity}, 255)`,
      config: {
        tension: 280,
        friction: 60,
      },
    });
  }, [count, api]);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  const handleReset = () => setCount(0);

  return (
    <animated.div style={{ ...springs, padding: '20px', borderRadius: '8px' }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h4">{count}</Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={handleIncrement}>+</Button>
          <Button variant="outlined" onClick={handleReset}>Reset</Button>
          <Button variant="contained" onClick={handleDecrement}>-</Button>
        </Box>
      </Box>
    </animated.div>
  );
};

export default Counter;