'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Permission } from '@today-digitech/shared';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermission }) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/admin/login');
      } else if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push('/admin/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, requiredPermission, hasPermission, router]);

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#041F49',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          fontWeight: 600,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              margin: '0 auto 1rem',
              border: '3px solid rgba(255, 106, 0, 0.3)',
              borderTopColor: '#FF6A00',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span>Authenticating Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
};
