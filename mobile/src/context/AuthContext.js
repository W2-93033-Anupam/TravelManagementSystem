import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        apiService.setAuthToken(storedToken);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success) {
        const { token: authToken, customer } = response.data;
        
        if (authToken && customer) {
          await AsyncStorage.setItem('token', authToken);
          await AsyncStorage.setItem('user', JSON.stringify(customer));
          
          setToken(authToken);
          setUser(customer);
          apiService.setAuthToken(authToken);
          
          return { success: true };
        } else {
          return { success: false, message: 'Invalid response data' };
        }
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      return response;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await apiService.adminLogin(email, password);
      
      if (response.success) {
        const { token: authToken, admin } = response.data;
        
        if (authToken && admin) {
          await AsyncStorage.setItem('token', authToken);
          await AsyncStorage.setItem('user', JSON.stringify({...admin, role: 'admin'}));
          
          setToken(authToken);
          setUser({...admin, role: 'admin'});
          apiService.setAuthToken(authToken);
          
          return { success: true };
        } else {
          return { success: false, message: 'Invalid response data' };
        }
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser(null);
      apiService.setAuthToken(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUser = (updatedUser) => {
    if (updatedUser) {
      setUser(updatedUser);
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    adminLogin,
    register,
    logout,
    updateUser,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};