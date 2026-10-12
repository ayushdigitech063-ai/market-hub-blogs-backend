'use client';

import React from 'react';
import Link from 'next/link';

interface TrustedPartnersSectionProps {
  topCaption?: string;
  headlineText?: string;
  clientLogos?: Array<{ name: string; logoUrl?: string }>;
}

export function TrustedPartnersSection({ topCaption, headlineText, clientLogos }: TrustedPartnersSectionProps) {
  const defaultBrands = [
    {
      id: 'mercedes',
      name: 'Mercedes-Benz',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1E293B', fontWeight: 600, fontFamily: 'serif' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v10M12 12l7.5 5M12 12l-7.5 5" />
          </svg>
          <span style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>Mercedes-Benz</span>
        </div>
      ),
    },
    {
      id: 'salesforce',
      name: 'salesforce',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00A1E0', fontWeight: 800 }}>
          <svg width="26" height="20" viewBox="0 0 24 16" fill="#00A1E0">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.72 0-6.86 2.76-7.46 6.38C1.97 10.74 0 12.89 0 15.5 0 18.54 2.46 21 5.5 21h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'sans-serif' }}>salesforce</span>
        </div>
      ),
    },
    {
      id: 'gett',
      name: 'Gett',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#000000', fontWeight: 900 }}>
          <span style={{ fontSize: '1.35rem', letterSpacing: '-0.03em' }}>Gett</span>
          <span style={{ fontSize: '1rem', color: '#FFB800' }}>🏃</span>
        </div>
      ),
    },
    {
      id: 'ogilvy',
      name: 'Ogilvy',
      render: () => (
        <div style={{ color: '#D9232D', fontWeight: 800, fontFamily: 'serif', fontSize: '1.4rem', fontStyle: 'italic' }}>
          Ogilvy
        </div>
      ),
    },
    {
      id: 'amadeus',
      name: 'aMADeUS',
      render: () => (
        <div style={{ color: '#0055A5', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          aMADeUS
        </div>
      ),
    },
    {
      id: 'pwc',
      name: 'pwc',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 6px)', gap: '2px' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#E0301E' }} />
            <div style={{ width: '6px', height: '6px', backgroundColor: '#D04A02' }} />
            <div style={{ width: '6px', height: '6px', backgroundColor: '#EB8C00' }} />
            <div style={{ width: '6px', height: '6px', backgroundColor: '#E0301E' }} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2D2D2D', fontFamily: 'serif' }}>pwc</span>
        </div>
      ),
    },
    {
      id: 'newsweek',
      name: 'Newsweek',
      render: () => (
        <div style={{ color: '#E51B24', fontWeight: 900, fontFamily: 'serif', fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
          Newsweek
        </div>
      ),
    },
    {
      id: 'startup-bootcamp',
      name: 'startup bootcamp',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00B092', fontWeight: 800 }}>
          <span style={{ fontSize: '1rem', lineHeight: 1.1 }}>startup<br />bootcamp</span>
          <span style={{ fontSize: '1.2rem' }}>⚙️</span>
        </div>
      ),
    },
    {
      id: 'apple',
      name: 'Apple',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569' }}>
          <svg width="22" height="24" viewBox="0 0 170 170" fill="currentColor">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.8.13-9.67-1.92-14.62-6.14-3.48-2.92-7.42-7.64-11.83-14.17-7.85-11.58-13.62-24.36-17.3-38.35-3.69-13.99-5.53-27.24-5.53-39.75 0-14.93 3.65-27.17 10.95-36.71 7.3-9.54 16.53-14.42 27.69-14.63 4.91 0 10.23 1.25 15.96 3.75 5.73 2.5 9.77 3.75 12.13 3.75 2.12 0 6.29-1.28 12.51-3.84 6.23-2.56 11.45-3.75 15.66-3.56 12.43.53 22.38 4.79 29.84 12.78-10.91 6.58-16.27 15.75-16.08 27.52.2 9.4 3.78 17.26 10.74 23.57 6.96 6.31 15.26 9.87 24.9 10.68-2.58 7.55-5.9 15.42-9.96 23.6zM119.22 31.84c0-7.3 2.66-14.28 7.98-20.93 5.32-6.65 11.96-10.42 19.92-11.31.6 8.35-2.02 15.79-7.86 22.32-5.84 6.53-12.71 10.2-20.61 11.01-.13-.37-.23-1.07-.31-2.09z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'meta',
      name: 'Meta',
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0081FB', fontWeight: 800 }}>
          <svg width="26" height="20" viewBox="0 0 24 16" fill="currentColor">
            <path d="M16.74 1.75c-1.8 0-3.32.74-4.74 2.21C10.58 2.49 9.06 1.75 7.26 1.75 3.25 1.75 0 5 0 9s3.25 7.25 7.26 7.25c1.8 0 3.32-.74 4.74-2.21 1.42 1.47 2.94 2.21 4.74 2.21C20.75 16.25 24 13 24 9s-3.25-7.25-7.26-7.25zm-9.48 12c-2.62 0-4.76-2.14-4.76-4.75S4.64 4.25 7.26 4.25c1.55 0 2.87.75 3.93 2.11C10.02 7.74 9.07 9 7.26 13.75zm9.48 0c-1.81-4.75-2.76-6.01-3.93-7.39 1.06-1.36 2.38-2.11 3.93-2.11 2.62 0 4.76 2.14 4.76 4.75s-2.14 4.75-4.76 4.75z" />
          </svg>
          <span style={{ fontSize: '1.2rem', fontFamily: 'sans-serif' }}>Meta</span>
        </div>
      ),
    },
  ];

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '5rem 0 5.5rem',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="reveal-top" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.03em',
              margin: '0 0 0.75rem 0',
              lineHeight: 1.15,
            }}
          >
            {headlineText || 'Trusted by 50+ Ambitious Brands Worldwide'}
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#64748B',
              margin: 0,
              maxWidth: '680px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            {topCaption || 'Empowering enterprise leaders and fast-growing companies with next-gen digital solutions.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '1.5rem',
            justifyContent: 'center',
            marginBottom: '3.5rem',
          }}
        >
          {defaultBrands.map((brand, idx) => {
            const isLeft = idx % 2 === 0;
            const slideClass = isLeft ? 'brand-slide-left' : 'brand-slide-right';
            const delayMs = (idx % 5) * 100 + 100;

            return (
              <div
                key={brand.id}
                className={`${slideClass} logo-card`}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  height: '84px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  animationDelay: `${delayMs}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0, 0, 0, 0.14), 0 8px 20px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 106, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.9)';
                }}
              >
                {brand.render()}
              </div>
            );
          })}
        </div>

        <div className="reveal-bottom delay-300" style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <button
              className="lets-start-btn"
              style={{
                padding: '0.95rem 3.5rem',
                fontSize: '1.05rem',
                fontWeight: 800,
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #FF4500 0%, #FF8C00 100%)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(255, 69, 0, 0.4)',
                letterSpacing: '0.02em',
                transition: 'all 0.25s ease-in-out',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
             e.currentTarget.style.background =
  'linear-gradient(90deg, #123d87 0%, #0b2e62 100%)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(17, 64, 160, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(90deg, #FF4500 0%, #FF8C00 100%)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 69, 0, 0.4)';
              }}
            >
              Let's Start
            </button>
          </Link>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .logo-card {
              opacity: 0;
              animation-duration: 0.7s;
              animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
              animation-fill-mode: forwards;
            }

            .brand-slide-left {
              animation-name: slideInFromLeft;
            }

            .brand-slide-right {
              animation-name: slideInFromRight;
            }

            @keyframes slideInFromLeft {
              from { opacity: 0; transform: translateX(-60px); }
              to { opacity: 1; transform: translateX(0); }
            }

            @keyframes slideInFromRight {
              from { opacity: 0; transform: translateX(60px); }
              to { opacity: 1; transform: translateX(0); }
            }

            .lets-start-btn:active {
              transform: scale(0.97) !important;
            }
          `,
        }}
      />
    </section>
  );
}