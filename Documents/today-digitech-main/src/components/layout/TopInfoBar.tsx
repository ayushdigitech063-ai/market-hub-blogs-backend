'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { WebsiteSettingsDTO } from '@today-digitech/shared';
import { defaultSettings, fetchPublicSettings } from '../../lib/api';

export interface TopInfoBarProps {
  settings?: WebsiteSettingsDTO;
}

export const TopInfoBar: React.FC<TopInfoBarProps> = ({ settings: initialSettings }) => {
  const [settings, setSettings] = useState<WebsiteSettingsDTO>(initialSettings || defaultSettings);

  useEffect(() => {
    fetchPublicSettings().then((s) => {
      if (s) setSettings(s);
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--color-dark-navy)',
        color: '#94A3B8',
        fontSize: '0.8125rem',
        padding: '0.5rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {/* Left Side Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href={`tel:${(settings.phone || '').replace(/\s+/g, '')}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#E2E8F0' }}
          >
            <Phone size={14} style={{ color: 'var(--color-orange)' }} />
            <span>{settings.phone}</span>
          </a>
          <a
            href={`mailto:${settings.email}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#E2E8F0' }}
          >
            <Mail size={14} style={{ color: 'var(--color-orange)' }} />
            <span>{settings.email}</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#94A3B8' }}>
            <MapPin size={14} style={{ color: 'var(--color-orange)' }} />
            <span>{settings.address}</span>
          </div>
        </div>

        {/* Right Side Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#94A3B8' }}>
            <Clock size={14} style={{ color: 'var(--color-orange)' }} />
            <span>{settings.businessHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
