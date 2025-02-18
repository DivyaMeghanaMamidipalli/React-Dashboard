import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const UserForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: uuidv4(),
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // Handle browser close/refresh with unsaved changes
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    localStorage.setItem('users', JSON.stringify([...existingUsers, userData]));
    setIsDirty(false);
    // Reset form with new ID
    setUserData({
      id: uuidv4(),
      name: '',
      address: '',
      email: '',
      phone: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isDirty && (
        <Alert severity="warning">
          You have unsaved changes
        </Alert>
      )}
      <TextField
        name="name"
        label="Name"
        value={userData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="address"
        label="Address"
        value={userData.address}
        onChange={handleChange}
        required
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <TextField
        name="phone"
        label="Phone"
        value={userData.phone}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">Save</Button>
    </Box>
  );
};

export default UserForm;