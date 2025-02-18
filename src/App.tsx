import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import ProfileTrendsDashboard from './components/ProfileTrendsDashboard';

export const CountContext = createContext<{
  count: number;
  setCount: (count: number) => void;
}>({ count: 0, setCount: () => {} });

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const springs = useSpring({
    from: { 
      background: 'linear-gradient(135deg, #E3F2FD 0%, #E8EAF6 100%)'
    },
    to: {
      background: `linear-gradient(135deg, 
        ${count > 25 ? '#3F51B5' : `hsl(${230 + (count * 2)}, ${60 + count}%, ${80 - count}%)`} 0%, 
        ${count > 25 ? '#1A237E' : `hsl(${240 + (count * 2)}, ${65 + count}%, ${75 - count}%)`} 100%)`
    },
    config: {
      tension: 120,
      friction: 14,
      duration: 500,
    }
  });

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Router>
        <CssBaseline />
        <animated.div style={{
          ...springs,
          minHeight: '100vh',
          transition: 'background 0.5s ease'
        }}>
          <Container maxWidth="lg">
            <Box sx={{ pt: 4, pb: 4 }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  mb: 4, 
                  textAlign: 'center',
                  color: '#000000',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                User Dashboard
              </Typography>
              <Routes>
                <Route path="/" element={
                  <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                    <Box gridColumn="1 / -1" sx={{ mt: 2, mb: 4 }}>
                      <Counter />
                    </Box>
                    <Box sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      p: 3, 
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <UserForm />
                    </Box>
                    <Box sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      p: 3, 
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <RichTextEditor />
                    </Box>
                  </Box>
                } />
                <Route path="/profile-dashboard" element={<ProfileTrendsDashboard />} />
              </Routes>
            </Box>
          </Container>
        </animated.div>
      </Router>
    </CountContext.Provider>
  );
};

export default App;