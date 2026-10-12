'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          padding: '2.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FEF2F2',
            color: 'var(--color-danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShieldAlert size={36} />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-heading)' }}>
          403 — Access Forbidden
        </h1>

        <p style={{ fontSize: '0.9375rem', color: 'var(--color-body)', lineHeight: 1.6 }}>
          You do not possess the required RBAC permissions to access this administrative resource. Please contact your Super Admin if you believe this is an error.
        </p>

        <a
          href="/page"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--color-primary-navy)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            marginTop: '0.5rem',
          }}
        >
          <ArrowLeft size={18} />
          <span>Return to Dashboard</span>
        </a>
      </div>
    </div>
  );
}
