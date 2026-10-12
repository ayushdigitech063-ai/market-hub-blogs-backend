import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.875rem',
        color: 'var(--color-body)',
        margin: '1rem 0',
      }}
    >
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'var(--color-body)',
          transition: 'color var(--transition-fast)',
        }}
      >
        <Home size={15} />
        <span>Home</span>
      </a>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={14} style={{ color: '#94A3B8' }} />
            {isLast || !item.href ? (
              <span style={{ fontWeight: 600, color: 'var(--color-primary-navy)' }}>{item.label}</span>
            ) : (
              <a
                href={item.href}
                style={{
                  color: 'var(--color-body)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
