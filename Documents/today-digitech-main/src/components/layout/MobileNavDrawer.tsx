'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { servicesData } from './ServicesMegaMenu';
import { ChevronDown, Phone, Mail, Sparkles, Lock } from 'lucide-react';

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Today Digitech Menu" position="right">
      <nav role="navigation" aria-label="Mobile Navigation" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Link
          href="/"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}
        >
          Home
        </Link>

        {/* Services Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div
            onClick={() => toggleCategory('services')}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <span>Services</span>
            <ChevronDown
              size={18}
              style={{
                color: '#FF6A00',
                transform: expandedCategory === 'services' ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms',
              }}
            />
          </div>

          {expandedCategory === 'services' && (
            <div style={{ paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem', borderLeft: '2px solid rgba(255,106,0,0.4)' }}>
              {servicesData.map((cat, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {cat.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.4rem', paddingLeft: '0.5rem' }}>
                    {cat.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        onClick={onClose}
                        style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none' }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/solutions"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}
        >
          Solutions
        </Link>

        <Link
          href="/industries"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}
        >
          Industries
        </Link>

        <Link
          href="/about"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}
        >
          About Us
        </Link>
        <Link
          href="/portfolio"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}
        >
          Portfolio
        </Link>
        <Link
          href="/blog"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}
        >
          Insights & Blog
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}
        >
          Contact Us
        </Link>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/contact" onClick={onClose} style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', backgroundColor: '#FF6A00', color: '#FFFFFF', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,106,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} /> Get Free Consultation
            </button>
          </Link>

          <Link href="/admin/login" onClick={onClose} style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <Lock size={16} color="#FF6A00" /> Admin Portal Login
            </button>
          </Link>

          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a href="tel:+917678444607" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none' }}>
              <Phone size={16} color="#FF6A00" />
              <span>+91 7678444607</span>
            </a>
            <a href="mailto:info@todaydigitech.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none' }}>
              <Mail size={16} color="#FF6A00" />
              <span>info@todaydigitech.com</span>
            </a>
          </div>
        </div>
      </nav>
    </Drawer>
  );
};
