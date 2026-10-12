import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', style, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={inputId}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: 'var(--color-heading)',
          userSelect: 'none',
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          style={{
            accentColor: 'var(--color-primary-navy)',
            width: '18px',
            height: '18px',
            cursor: 'pointer',
            ...style,
          }}
          className={`checkbox-control ${className}`}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', style, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={inputId}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: 'var(--color-heading)',
          userSelect: 'none',
        }}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          style={{
            accentColor: 'var(--color-primary-navy)',
            width: '18px',
            height: '18px',
            cursor: 'pointer',
            ...style,
          }}
          className={`radio-control ${className}`}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
