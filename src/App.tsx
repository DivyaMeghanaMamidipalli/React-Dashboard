import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
                <Box gridColumn="1 / -1">
                  <Counter />
                </Box>
                <UserForm />
                <RichTextEditor />
              </Box>
            } />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;