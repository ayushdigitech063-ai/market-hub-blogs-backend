'use client';

import React, { useState, useEffect } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Keep preloader for at least 1.2 seconds for visual delight
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms fade out duration
      return () => clearTimeout(removeTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#031735',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 106, 0, 0.25) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Animated Pulsing Logo Symbol */}
        <div style={{ position: 'relative', width: '70px', height: '70px' }}>
          <svg
            width="70"
            height="70"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: 'pulseGlow 2s ease-in-out infinite alternate',
              filter: 'drop-shadow(0 0 20px rgba(255, 106, 0, 0.5))',
            }}
          >
            <rect width="40" height="40" rx="10" fill="url(#preloader_logo_grad)" />
            <path d="M12 14L20 9L28 14V26L20 31L12 26V14Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="20" cy="20" r="4" fill="#FF6A00" />
            <defs>
              <linearGradient id="preloader_logo_grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#062B63" />
                <stop offset="1" stopColor="#07448D" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Name */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Today<span style={{ color: '#FF6A00' }}>Digitech</span>
          </h2>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#94A3B8',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '0.4rem',
            }}
          >
            ENTERPRISE DIGITAL SOLUTIONS
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div
          style={{
            width: '180px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative',
            marginTop: '0.5rem',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, #FF6A00 0%, #3B82F6 100%)',
              borderRadius: '9999px',
              animation: 'preloaderProgress 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards',
              boxShadow: '0 0 10px rgba(255, 106, 0, 0.8)',
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes preloaderProgress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes pulseGlow {
          0% {
            transform: scale(0.96);
          }
          100% {
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}
