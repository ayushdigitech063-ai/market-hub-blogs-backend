'use client';

import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '1.5rem',
        zIndex: 850,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
      className="floating-actions"
    >
      {/* Direct Call Floating Action */}
      <a
        href="tel:+919876543210"
        aria-label="Call Today Digitech"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-navy)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          transition: 'transform var(--transition-fast)',
        }}
      >
        <Phone size={22} />
      </a>

      {/* WhatsApp Quick Chat Action */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Today%20Digitech%2C%20I%20would%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(37, 211, 102, 0.4)',
          transition: 'transform var(--transition-fast)',
        }}
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
};
