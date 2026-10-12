'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';

export const MobileConversionBar: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 840,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border)',
        boxShadow: '0 -4px 15px rgba(0,0,0,0.08)',
        padding: '0.625rem 1rem',
        display: 'flex',
        gap: '0.75rem',
      }}
      className="mobile-conversion-bar"
    >
      <a
        href="tel:+919876543210"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.375rem',
          backgroundColor: 'var(--color-primary-navy)',
          color: '#FFFFFF',
          padding: '0.625rem 0.5rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontWeight: 700,
        }}
      >
        <Phone size={16} />
        <span>Call Now</span>
      </a>
      <a
        href="/contact"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.375rem',
          background: 'var(--gradient-accent)',
          color: '#FFFFFF',
          padding: '0.625rem 0.5rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontWeight: 700,
        }}
      >
        <Calendar size={16} />
        <span>Enquire Now</span>
      </a>

      <style jsx>{`
        .mobile-conversion-bar { display: flex; }
        @media (min-width: 768px) {
          .mobile-conversion-bar { display: none !important; }
        }
      `}</style>
    </div>
  );
};
