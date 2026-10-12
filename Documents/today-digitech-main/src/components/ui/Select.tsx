import React from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', style, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
        {label && (
          <label htmlFor={inputId} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            fontSize: '0.9375rem',
            color: 'var(--color-heading)',
            backgroundColor: '#FFFFFF',
            border: `1.5px solid ${error ? 'var(--color-red-orange)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            cursor: 'pointer',
            ...style,
          }}
          className={`select-field ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span style={{ fontSize: '0.75rem', color: 'var(--color-red-orange)', fontWeight: 500 }}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
