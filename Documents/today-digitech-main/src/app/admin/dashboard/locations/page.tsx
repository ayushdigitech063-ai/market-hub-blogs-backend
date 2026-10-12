'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function LocationsCmsPage() {
  const [locations, setLocations] = useState([
    { id: 'loc-1', name: 'New Delhi & NCR Headquarters', slug: 'delhi-ncr', region: 'North India', status: 'Published' },
    { id: 'loc-2', name: 'Mumbai Financial Center', slug: 'mumbai', region: 'West India', status: 'Published' },
    { id: 'loc-3', name: 'Bengaluru Tech Innovation Hub', slug: 'bengaluru', region: 'South India', status: 'Published' },
  ]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/locations" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Target Locations & Regional Hubs CMS Manager" />

        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Regional Service Locations</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage location-based SEO landing pages and regional office hubs.</p>
              </div>

              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                <Plus size={18} />
                <span>Add Target Location</span>
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Location Name</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Region</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Slug</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>{item.name}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.75rem', fontWeight: 700 }}>
                        {item.region}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>/{item.slug}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(16,185,129,0.12)', color: 'var(--color-success)', fontSize: '0.75rem', fontWeight: 700 }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                        <button onClick={() => setLocations(locations.filter((l) => l.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminContentContainer>
      </div>
    </div>
  );
}
