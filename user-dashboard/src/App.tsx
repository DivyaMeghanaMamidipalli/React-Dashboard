import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import ProfileTrendsDashboard from './components/ProfileTrendsDashboard';
import Header from './components/Header';
import Footer from './components/Footer';

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
        ${count > 25 ? '#4A90E2' : `hsl(${210 + (count * 2)}, ${70 + count}%, ${85 - count}%)`} 0%, 
        ${count > 25 ? '#357ABD' : `hsl(${220 + (count * 2)}, ${75 + count}%, ${80 - count}%)`} 100%)`
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
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <CssBaseline />
          <Header />
          <animated.div style={{
            ...springs,
            flex: 1,
            transition: 'background 0.5s ease'
          }}>
            <Container maxWidth="lg">
              <Box sx={{ py: 3 }}>  
                <Routes>
                  <Route path="/" element={
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                      <Box gridColumn="1 / -1">
                        <Counter />
                      </Box>
                      <Box sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                        p: 3, 
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                        height: 'fit-content'  
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
          <Footer />
        </Box>
      </Router>
    </CountContext.Provider>
  );
};

export default App;

