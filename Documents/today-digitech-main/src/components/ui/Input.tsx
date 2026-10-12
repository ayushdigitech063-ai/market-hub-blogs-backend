import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', style, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-heading)',
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          {leftIcon && (
            <span
              style={{
                position: 'absolute',
                left: '0.875rem',
                color: 'var(--color-body)',
                pointerEvents: 'none',
                display: 'flex',
              }}
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            style={{
              width: '100%',
              padding: `0.625rem ${rightIcon ? '2.5rem' : '0.875rem'} 0.625rem ${leftIcon ? '2.5rem' : '0.875rem'}`,
              fontSize: '0.9375rem',
              color: 'var(--color-heading)',
              backgroundColor: '#FFFFFF',
              border: `1.5px solid ${error ? 'var(--color-red-orange)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
              ...style,
            }}
            className={`input-field ${className}`}
            {...props}
          />
          {rightIcon && (
            <span
              style={{
                position: 'absolute',
                right: '0.875rem',
                color: 'var(--color-body)',
                display: 'flex',
              }}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span style={{ fontSize: '0.75rem', color: 'var(--color-red-orange)', fontWeight: 500 }}>{error}</span>}
        {helperText && !error && <span style={{ fontSize: '0.75rem', color: 'var(--color-body)' }}>{helperText}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
