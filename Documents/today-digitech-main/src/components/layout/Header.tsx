'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import { ServicesMegaMenu } from './ServicesMegaMenu';
import { MobileNavDrawer } from './MobileNavDrawer';
import { ChevronDown, Menu, Lock, ArrowRight } from 'lucide-react';
import { WebsiteSettingsDTO } from '@today-digitech/shared';
import { defaultSettings, fetchPublicSettings } from '../../lib/api';
import { getMediaUrl } from '../../lib/publicApi';

export interface HeaderProps {
  settings?: WebsiteSettingsDTO;
}

export const Header: React.FC<HeaderProps> = ({ settings: initialSettings }) => {
  const pathname = usePathname();
  const [settings, setSettings] = useState<WebsiteSettingsDTO>(initialSettings || defaultSettings);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    fetchPublicSettings().then((s) => {
      if (s) {
        setSettings(s);
        setLogoError(false);
      }
    });

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Industries', href: '/industries' },
    { name: 'Work', href: '/portfolio' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const navTextColor = isScrolled ? 'var(--color-heading)' : '#FFFFFF';
  const logoTextColor = isScrolled ? 'var(--color-heading)' : '#FFFFFF';

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 800,
          width: '100%',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#031735',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(6, 43, 99, 0.1)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '70px' : '76px',
            transition: 'height 0.3s ease',
          }}
        >
          {/* Brand Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            {!logoError && settings.headerLogoUrl ? (
              <img
                src={getMediaUrl(settings.headerLogoUrl)}
                alt={settings.businessName || 'Today Digitech Logo'}
                style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain' }}
                onError={() => setLogoError(true)}
              />
            ) : (
              <>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="10" fill="url(#header_logo_grad)" />
                    <path d="M12 14L20 9L28 14V26L20 31L12 26V14Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
                    <circle cx="20" cy="20" r="4" fill="#FF6A00" />
                    <defs>
                      <linearGradient id="header_logo_grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#062B63" />
                        <stop offset="1" stopColor="#07448D" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: logoTextColor, letterSpacing: '-0.02em', lineHeight: 1.1, transition: 'color 0.3s ease' }}>
                    {(settings.businessName || 'Today Digitech').split(' ')[0]}<span style={{ color: 'var(--color-orange)' }}>{(settings.businessName || 'Today Digitech').split(' ')[1] || 'DIGITECH'}</span>
                  </span>
                  <span style={{ fontSize: '0.625rem', fontWeight: 700, color: isScrolled ? '#64748B' : '#94A3B8', letterSpacing: '0.12em', transition: 'color 0.3s ease' }}>
                    DIGITAL SOLUTIONS
                  </span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            <Link
              href="/"
              style={{
                fontSize: '0.9375rem',
                fontWeight: isActive('/') ? 700 : 500,
                color: isActive('/') ? 'var(--color-orange)' : navTextColor,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
            >
              Home
            </Link>

            {/* Services with Mega Menu Trigger */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.9375rem',
                  fontWeight: pathname?.startsWith('/services') ? 700 : 500,
                  color: pathname?.startsWith('/services') ? 'var(--color-orange)' : navTextColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '1rem 0',
                  transition: 'color 0.3s ease',
                }}
              >
                <span>Services</span>
                <ChevronDown size={15} style={{ color: 'var(--color-orange)' }} />
              </button>
              {isMegaMenuOpen && <ServicesMegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
            </div>

            {navLinks.slice(2).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'var(--color-orange)' : navTextColor,
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="desktop-cta" style={{ display: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link href="/admin/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Lock size={14} color="var(--color-orange)" />}
                    style={{
                      borderColor: isScrolled ? 'var(--color-border)' : 'rgba(255, 255, 255, 0.25)',
                      color: isScrolled ? 'var(--color-heading)' : '#FFFFFF',
                      fontWeight: 600,
                    }}
                  >
                    Admin Login
                  </Button>
                </Link>
                <Link href="/contact" style={{ textDecoration: 'none' }}>
                  <Button variant="accent" size="md" icon={<ArrowRight size={16} />}>
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <button
              className="mobile-hamburger"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileNavOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: isScrolled ? '1px solid var(--color-border)' : '1px solid rgba(255,255,255,0.2)',
                backgroundColor: isScrolled ? '#FFFFFF' : 'rgba(255,255,255,0.08)',
                color: isScrolled ? 'var(--color-heading)' : '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <MobileNavDrawer isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

        <style jsx>{`
          @media (min-width: 1024px) {
            .desktop-nav { display: flex !important; }
            .desktop-cta { display: block !important; }
            .mobile-hamburger { display: none !important; }
          }
        `}</style>
      </header>
    </>
  );
};


