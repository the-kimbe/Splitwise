import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in when app starts
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.log('Error loading user:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      // 1. Kunin muna ang existing list ng users
      const existingUsers = await AsyncStorage.getItem('allUsers');
      let usersArray = existingUsers ? JSON.parse(existingUsers) : [];

      // 2. I-check kung registered na ang email
      if (usersArray.find((u) => u.email === email)) {
        Alert.alert('Error', 'Email already registered!');
        return false;
      }

      // 3. Idagdag ang bagong user sa array
      const newUser = { name, email, password };
      usersArray.push(newUser);

      // 4. I-save ang updated array AT ang current session
      await AsyncStorage.setItem('allUsers', JSON.stringify(usersArray));
      await AsyncStorage.setItem('userData', JSON.stringify(newUser));

      setUser(newUser);
      return true;
    } catch (e) {
      console.log('Registration Error:', e);
      return false;
    }
  };
  
  const login = async (email, password) => {
    try {
      // 1. Kunin ang listahan ng lahat ng users
      const storedUsers = await AsyncStorage.getItem('allUsers');

      if (storedUsers) {
        const usersArray = JSON.parse(storedUsers);

        // 2. Hanapin ang user na tumutugma ang email at password
        const foundUser = usersArray.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          // 3. I-save ang current session para pag-restart ng app, logged in pa rin
          await AsyncStorage.setItem('userData', JSON.stringify(foundUser));
          setUser(foundUser);
          return { success: true };
        } else {
          return { success: false, message: 'Invalid email or password' };
        }
      } else {
        return {
          success: false,
          message: 'No users found. Please register first.',
        };
      }
    } catch (e) {
      return { success: false, message: 'Login error occurred' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
