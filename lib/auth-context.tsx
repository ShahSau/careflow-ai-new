'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isFirstLogin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = [
  {
    id: '1',
    email: 'patient@hospital.com',
    password: 'patient123',
    name: 'John Doe',
    role: 'patient' as UserRole
  },
  {
    id: '2',
    email: 'doctor@hospital.com',
    password: 'doctor123',
    name: 'Dr. Sarah Johnson',
    role: 'doctor' as UserRole,
    isFirstLogin: true
  },
  {
    id: '3',
    email: 'admin@hospital.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      isFirstLogin: foundUser.isFirstLogin,
    };

    setUser(userData);
    localStorage.setItem('hospital_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: 'patient',
    };

    setUser(newUser);
    localStorage.setItem('hospital_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const resetPassword = async (newPassword: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (user) {
      const updatedUser = { ...user, isFirstLogin: false };
      setUser(updatedUser);
      localStorage.setItem('hospital_user', JSON.stringify(updatedUser));
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, resetPassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
