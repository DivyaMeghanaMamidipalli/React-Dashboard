import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
}

interface DeletedUserData {
  userId: string;
  deletedAt: string;
}

const UserDataDisplay: React.FC = () => {
  const [savedUserData, setSavedUserData] = useState<UserData[]>([]);

  const loadUserData = () => {
    const data = JSON.parse(localStorage.getItem('userData') || '[]');
    setSavedUserData(data);
  };

  const handleDelete = (userId: string) => {
    // Track deletion in deletedUsers
    const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers') || '[]');
    deletedUsers.push({
      userId,
      deletedAt: new Date().toISOString()
    });
    localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));

    // Remove user from userData
    const updatedData = savedUserData.filter(user => user.id !== userId);
    localStorage.setItem('userData', JSON.stringify(updatedData));
    setSavedUserData(updatedData);
  };

  useEffect(() => {
    loadUserData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userData') {
        loadUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const intervalId = setInterval(() => {
      const currentData = localStorage.getItem('userData');
      if (currentData && JSON.stringify(savedUserData) !== currentData) {
        loadUserData();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>User Registration Data</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '600px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedUserData.map((user, index) => (
              <TableRow 
                key={user.id}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'white'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserDataDisplay;