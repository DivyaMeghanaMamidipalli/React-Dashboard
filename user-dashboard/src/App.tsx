import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  const [latestUser, setLatestUser] = useState<UserData | null>(null);
  const [count, setCount] = useState(0);

  const handleUserSaved = (userData: UserData) => {
    setLatestUser(userData);
  };

  const springs = useSpring({
    from: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)'
    },
    to: {
      background: `linear-gradient(135deg, 
        ${
          count > 25 ? '#1E3A8A' : 
          count > 23 ? '#1E44B9' : 
          count > 21 ? '#2563EB' : 
          count > 19 ? '#3B82F6' : 
          count > 17 ? '#4B91F7' : 
          count > 15 ? '#60A5FA' : 
          count > 13 ? '#7AB8FB' : 
          count > 11 ? '#93C5FD' : 
          count > 9 ? '#ACDAFE' : 
          count > 7 ? '#BAE2FF' : 
          count > 5 ? '#DBEAFE' : 
          count > 3 ? '#EBF4FF' : 
          '#FFFFFF'
        } 0%, 
        ${
          count > 25 ? '#1E40AF' : 
          count > 23 ? '#1E4BD1' : 
          count > 21 ? '#2570EE' : 
          count > 19 ? '#3B8AF8' : 
          count > 17 ? '#4B9AF9' : 
          count > 15 ? '#60AEFC' : 
          count > 13 ? '#7DC3FD' : 
          count > 11 ? '#93CFFE' : 
          count > 9 ? '#ACE1FF' : 
          count > 7 ? '#BAE8FF' : 
          count > 5 ? '#DBF0FF' : 
          count > 3 ? '#EBF8FF' : 
          '#FFFFFF'
        } 100%)`
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
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        p: 4, 
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        height: 'fit-content'
                      }}>
                        <UserForm onUserSaved={handleUserSaved} />
                      </Box>
                      <Box sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        p: 4, 
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        height: 'fit-content'
                      }}>
                        <RichTextEditor 
                          title="Editor with Latest User Details"
                          initialValue={latestUser ? `
                            <div style="font-family: Arial, sans-serif;">
                              <h3 style="color: #2196F3; margin-bottom: 16px;">User Details</h3>
                              <p><strong>ID:</strong> ${latestUser.id || 'N/A'}</p>
                              <p><strong>Name:</strong> ${latestUser.name || 'N/A'}</p>
                              <p><strong>Email:</strong> ${latestUser.email || 'N/A'}</p>
                              <p><strong>Address:</strong> ${latestUser.address || 'N/A'}</p>
                              <p><strong>Phone:</strong> ${latestUser.phone || 'N/A'}</p>
                              <p><strong>Added:</strong> ${new Date().toLocaleString()}</p>
                            </div>
                          ` : '<p>No user data yet</p>'}
                        />
                      </Box>
                    </Box>
                  } />
                  <Route path="/profile-dashboard" element={<ProfileTrendsDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
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