import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'secondary':
      case 'neutral':
        return { backgroundColor: '#E2E8F0', color: '#334155' };
      case 'accent':
        return { backgroundColor: 'rgba(255, 106, 0, 0.1)', color: 'var(--color-orange)', border: '1px solid rgba(255, 106, 0, 0.2)' };
      case 'success':
        return { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', border: '1px solid rgba(16, 185, 129, 0.2)' };
      case 'warning':
        return { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', border: '1px solid rgba(245, 158, 11, 0.2)' };
      case 'danger':
        return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(239, 68, 68, 0.2)' };
      case 'info':
        return { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-info)', border: '1px solid rgba(59, 130, 246, 0.2)' };
      case 'primary':
      default:
        return { backgroundColor: 'rgba(6, 43, 99, 0.08)', color: 'var(--color-primary-navy)', border: '1px solid rgba(6, 43, 99, 0.15)' };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    return size === 'sm'
      ? { padding: '0.15rem 0.5rem', fontSize: '0.75rem' }
      : { padding: '0.25rem 0.75rem', fontSize: '0.8125rem' };
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        lineHeight: 1.2,
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      className={`badge badge-${variant} ${className}`}
    >
      {children}
    </span>
  );
};
