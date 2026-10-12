'use client';

import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top, #07448D 0%, #041F49 100%)',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-royal-blue)' }}>
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </a>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)', marginTop: '0.5rem' }}>
            Forgot Password
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>
            Enter your admin email address to receive password reset instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: '#F0FDF4', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--color-success)', fontSize: '0.9375rem' }}>
            If an admin account exists for <strong>{email}</strong>, a password reset link has been dispatched.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                Registered Work Email
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} style={{ position: 'absolute', left: '0.875rem', color: '#94A3B8' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@todaydigitech.com"
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem 0.625rem 2.5rem',
                    fontSize: '0.9375rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--gradient-brand)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <Send size={18} />
              <span>Send Reset Instructions</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
