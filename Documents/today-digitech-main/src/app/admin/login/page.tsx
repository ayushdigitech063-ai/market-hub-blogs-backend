'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      router.push('/admin');
    } else {
      setErrorMessage(res.message || 'Invalid credentials or account locked.');
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
        position: 'relative',
      }}
    >
      {/* Top Left Back to Website Button */}
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '1.75rem',
          left: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          padding: '0.625rem 1.25rem',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.875rem',
          textDecoration: 'none',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.2s ease',
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Website</span>
      </Link>
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
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-orange)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-accent)',
            }}
          >
            <ShieldCheck size={30} />
          </div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--color-heading)' }}>
            Admin Control Center
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>
            Enter your credentials to access Today Digitech platform administration.
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FEF2F2',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--color-danger)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Quick Auto-fill for Testing */}
        <div
          style={{
            padding: '0.85rem',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--color-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
              ⚡ Testing Auto-Fill
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-body)' }}>
              admin@todaydigitech.com
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@todaydigitech.com');
              setPassword('Admin@123456789');
            }}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: 'rgba(255, 106, 0, 0.1)',
              color: 'var(--color-orange)',
              border: '1px solid rgba(255, 106, 0, 0.3)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
            }}
          >
            Auto-Fill
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
              Work Email
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                Password
              </label>
              <a href="/admin/forgot-password" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-royal-blue)' }}>
                Forgot Password?
              </a>
            </div>
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

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '0.5rem',
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
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
