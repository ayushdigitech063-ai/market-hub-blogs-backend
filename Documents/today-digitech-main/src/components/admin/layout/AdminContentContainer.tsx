import React from 'react';

export interface AdminContentContainerProps {
  children: React.ReactNode;
}

export const AdminContentContainer: React.FC<AdminContentContainerProps> = ({ children }) => {
  return (
    <main
      style={{
        flex: 1,
        padding: '1.75rem 2rem',
        backgroundColor: '#F8FAFC',
        minHeight: 'calc(100vh - 70px)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        {children}
      </div>
    </main>
  );
};
