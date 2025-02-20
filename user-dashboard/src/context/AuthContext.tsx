import React, { createContext, useState, useEffect, useContext } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface User {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setError(null);
      const response = await fetch(`${BACKEND_URL}/auth/user`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const logout = async () => {
    try {
      setError(null);
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      
      setUser(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
