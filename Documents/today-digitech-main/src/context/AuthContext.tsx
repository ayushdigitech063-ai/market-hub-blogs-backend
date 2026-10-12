'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AdminUserDTO, Permission } from '@today-digitech/shared';
import { apiClient, refreshTokenRequest } from '@/lib/apiClient';
import { setAccessToken } from '@/lib/tokenStore';

interface AuthContextType {
  user: AdminUserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  hasPermission: (requiredPermission?: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await refreshTokenRequest();
      if (res && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    } catch {
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiClient<{ accessToken: string; user: AdminUserDTO }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.data) {
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, message: res.message || 'Invalid email or password' };
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network failure on logout
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const hasPermission = (requiredPermission?: Permission): boolean => {
    if (!user) return false;
    if (user.role === 'Super Admin') return true;
    if (!requiredPermission) return true;
    const userPerms = user.permissions || [];
    return userPerms.includes(requiredPermission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshSession,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
