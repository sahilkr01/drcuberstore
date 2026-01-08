'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'drcuber@2026'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState(DEFAULT_ADMIN.password);

  // Load admin session on mount
  useEffect(() => {
    // Load admin password
    const savedAdminPassword = localStorage.getItem('drcuber-admin-password');
    if (savedAdminPassword) {
      setAdminPassword(savedAdminPassword);
    }

    // Check for existing admin session
    const savedAdminSession = localStorage.getItem('drcuber-admin-session');
    if (savedAdminSession) {
      try {
        const session = JSON.parse(savedAdminSession);
        if (session.expiry > Date.now()) {
          setUser(session.user);
          setIsLoading(false);
          return;
        } else {
          localStorage.removeItem('drcuber-admin-session');
        }
      } catch {
        localStorage.removeItem('drcuber-admin-session');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check admin login
    if (password === adminPassword) {
      const adminUser: AuthUser = {
        id: 'admin',
        email: 'admin@drcuber.com',
        name: 'Admin',
        role: 'admin'
      };
      const session = {
        user: adminUser,
        expiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      };
      localStorage.setItem('drcuber-admin-session', JSON.stringify(session));
      setUser(adminUser);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid password' };
  };

  const logout = () => {
    localStorage.removeItem('drcuber-admin-session');
    setUser(null);
  };

  const changeAdminPassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (currentPassword !== adminPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }
    if (newPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }
    setAdminPassword(newPassword);
    localStorage.setItem('drcuber-admin-password', newPassword);
    return { success: true, message: 'Password changed successfully' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        changeAdminPassword
      }}
    >
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
