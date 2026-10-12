'use client';

import React, { useState } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setIsDone(true);
    }
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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)' }}>
          Reset Admin Password
        </h1>

        {isDone ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
            <CheckCircle2 size={48} color="var(--color-success)" />
            <p style={{ fontSize: '1rem', color: 'var(--color-heading)', fontWeight: 600 }}>
              Password updated successfully!
            </p>
            <a
              href="/login"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'var(--color-royal-blue)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Proceed to Sign In
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                New Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} style={{ position: 'absolute', left: '0.875rem', color: '#94A3B8' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                Confirm New Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} style={{ position: 'absolute', left: '0.875rem', color: '#94A3B8' }} />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
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
              }}
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
