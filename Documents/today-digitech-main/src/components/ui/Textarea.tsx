import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', style, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
        {label && (
          <label htmlFor={inputId} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          style={{
            width: '100%',
            minHeight: '110px',
            padding: '0.75rem 0.875rem',
            fontSize: '0.9375rem',
            color: 'var(--color-heading)',
            backgroundColor: '#FFFFFF',
            border: `1.5px solid ${error ? 'var(--color-red-orange)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color var(--transition-fast)',
            ...style,
          }}
          className={`textarea-field ${className}`}
          {...props}
        />
        {error && <span style={{ fontSize: '0.75rem', color: 'var(--color-red-orange)', fontWeight: 500 }}>{error}</span>}
        {helperText && !error && <span style={{ fontSize: '0.75rem', color: 'var(--color-body)' }}>{helperText}</span>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
