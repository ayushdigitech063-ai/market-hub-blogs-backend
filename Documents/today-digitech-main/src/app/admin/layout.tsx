import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Today Digitech Admin Control Center',
  description: 'Management & Control Panel for Today Digitech Platform',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="admin-root" style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </AuthProvider>
  );
}
