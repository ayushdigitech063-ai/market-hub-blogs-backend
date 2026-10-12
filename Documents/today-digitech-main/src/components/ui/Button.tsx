import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  isFullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  icon,
  isFullWidth = false,
  disabled,
  className = '',
  style,
  ...props
}) => {
  const finalRightIcon = rightIcon || icon;

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'accent':
        return {
          background: 'var(--gradient-accent)',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-accent)',
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-royal-blue)',
          color: '#FFFFFF',
          border: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-primary-navy)',
          border: '1.5px solid var(--color-primary-navy)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-heading)',
          border: 'none',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-red-orange)',
          color: '#FFFFFF',
          border: 'none',
        };
      case 'primary':
      default:
        return {
          background: 'var(--gradient-brand)',
          color: '#FFFFFF',
          boxShadow: 'var(--shadow-md)',
          border: 'none',
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '0.375rem 0.875rem', fontSize: '0.875rem', borderRadius: 'var(--radius-sm)' };
      case 'lg':
        return { padding: '0.875rem 2rem', fontSize: '1.0625rem', borderRadius: 'var(--radius-md)' };
      case 'md':
      default:
        return { padding: '0.625rem 1.375rem', fontSize: '0.9375rem', borderRadius: 'var(--radius-md)' };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: 600,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.65 : 1,
        transition: 'all var(--transition-normal)',
        width: isFullWidth ? '100%' : 'auto',
        outline: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && finalRightIcon}
    </button>
  );
};
