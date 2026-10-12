import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'bordered' | 'glass';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'flat':
        return {
          backgroundColor: '#FFFFFF',
          border: 'none',
          boxShadow: 'none',
        };
      case 'bordered':
        return {
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          boxShadow: 'none',
        };
      case 'glass':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(227, 233, 242, 0.6)',
          boxShadow: 'var(--shadow-md)',
        };
      case 'default':
      default:
        return {
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
        };
    }
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        transition: 'all var(--transition-normal)',
        transform: hoverable ? 'translateY(0)' : undefined,
        cursor: hoverable ? 'pointer' : undefined,
        ...getVariantStyles(),
        ...style,
      }}
      className={`card ${hoverable ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
