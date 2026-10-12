import React from 'react';

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  description,
  align,
  alignment = 'center',
  className = '',
}) => {
  const finalAlign = align || alignment;
  const finalSubtitle = subtitle || description;

  const alignmentStyle: React.CSSProperties = {
    textAlign: finalAlign,
    alignItems: finalAlign === 'center' ? 'center' : finalAlign === 'right' ? 'flex-end' : 'flex-start',
  };

  return (
    <div
      className={`section-heading ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '3rem',
        ...alignmentStyle,
      }}
    >
      {badge && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.875rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(6, 43, 99, 0.08)',
            color: 'var(--color-primary-navy)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
            border: '1px solid rgba(6, 43, 99, 0.15)',
          }}
        >
          {badge}
        </span>
      )}
      <h2
        style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          color: 'var(--color-heading)',
          letterSpacing: '-0.02em',
          marginBottom: finalSubtitle ? '0.875rem' : '0',
          position: 'relative',
        }}
      >
        {title}
      </h2>
      {finalSubtitle && (
        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--color-body)',
            maxWidth: '680px',
            lineHeight: 1.6,
          }}
        >
          {finalSubtitle}
        </p>
      )}
    </div>
  );
};
