import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  countryCode: string;
  phone: string;
}

interface Country {
  name: string;
  code: string;
}

const UserForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: uuidv4(),
    name: '',
    address: '',
    email: '',
    countryCode: '+1', // Default country code
    phone: ''
  });
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        
        const countryList = data.map((country: any) => ({
          name: country.name.common,
          code: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : '')
        })).filter((c: Country) => c.code); // Filter out countries without calling codes

        setCountries(countryList);
      } catch (error) {
        console.error('Error fetching country codes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone' && !/^\d*$/.test(value)) {
      return;
    }

    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsDirty(true);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      phone: ''
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email && !emailRegex.test(userData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (userData.phone && userData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const combinedPhone = `${userData.countryCode}${userData.phone}`;

    const existingData = localStorage.getItem('userData');
    let allUserData = [];

    if (existingData) {
      allUserData = JSON.parse(existingData);
    }

    allUserData.push({ ...userData, phone: combinedPhone });

    localStorage.setItem('userData', JSON.stringify(allUserData));

    setIsDirty(false);

    setUserData({
      id: uuidv4(),
      name: '',
      address: '',
      email: '',
      countryCode: '+1',
      phone: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField
      disabled
      label="User ID"
      value={userData.id}
    />
    <TextField
        name="name"
        label="Name"
        value={userData.name}
        onChange={handleChange}
      />
      <TextField
        name="address"
        label="Address"
        value={userData.address}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        value={userData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <Box display="flex" gap={2}>
        <TextField
          select
          name="countryCode"
          label="Country Code"
          value={userData.countryCode}
          onChange={handleChange}
          sx={{ width: '30%' }}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {country.name} ({country.code})
            </MenuItem>
          ))}
        </TextField>

      <TextField
        name="phone"
        label="Phone"
        value={userData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        sx={{ width: '70%' }}
      />
      </Box>

      <Button type="submit" variant="contained">Save</Button>
    </Box>
  );
};

export default UserForm;
