'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2, ArrowRight } from 'lucide-react';

interface RedirectItem {
  id: string;
  sourcePath: string;
  destinationPath: string;
  redirectType: 301 | 302;
  hitCount: number;
  isActive: boolean;
}

export default function RedirectsManagementPage() {
  const [redirects, setRedirects] = useState<RedirectItem[]>([
    { id: 'r-1', sourcePath: '/old-services', destinationPath: '/services', redirectType: 301, hitCount: 142, isActive: true },
    { id: 'r-2', sourcePath: '/delhi-seo-agency', destinationPath: '/locations/seo-company-delhi', redirectType: 301, hitCount: 89, isActive: true },
    { id: 'r-3', sourcePath: '/careers-2025', destinationPath: '/careers', redirectType: 302, hitCount: 24, isActive: true },
    { id: 'r-4', sourcePath: '/contact-us', destinationPath: '/contact', redirectType: 301, hitCount: 310, isActive: true },
  ]);

  const [newSource, setNewSource] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [newType, setNewType] = useState<301 | 302>(301);

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSource || !newDestination) return;

    setRedirects([
      ...redirects,
      {
        id: `r-${Date.now()}`,
        sourcePath: newSource.startsWith('/') ? newSource : `/${newSource}`,
        destinationPath: newDestination.startsWith('/') ? newDestination : `/${newDestination}`,
        redirectType: newType,
        hitCount: 0,
        isActive: true,
      },
    ]);

    setNewSource('');
    setNewDestination('');
  };

  const handleToggleActive = (id: string) => {
    setRedirects(redirects.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/redirects" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="301 / 302 URL Redirect Management" />

        <AdminContentContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Quick Add Form */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1rem' }}>Create URL Redirect Rule</h3>
              <form onSubmit={handleAddRedirect} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Source Path (Old URL)</label>
                  <input
                    type="text"
                    placeholder="/old-page-slug"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Destination Path (New URL)</label>
                  <input
                    type="text"
                    placeholder="/new-page-slug"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>

                <div style={{ width: '120px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(Number(e.target.value) as 301 | 302)}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none', backgroundColor: '#FFFFFF', fontWeight: 700 }}
                  >
                    <option value={301}>301 Permanent</option>
                    <option value={302}>302 Temporary</option>
                  </select>
                </div>

                <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', height: '40px' }}>
                  <Plus size={18} /> Add Redirect Rule
                </button>
              </form>
            </div>

            {/* Redirects Table */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Active Redirect Rules</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Track legacy URL traffic mapping and redirect hit counters.</p>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Source Path</th>
                    <th style={{ padding: '0.875rem 1.5rem' }}></th>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Destination Path</th>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Redirect Code</th>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Total Hits</th>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {redirects.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)', fontFamily: 'monospace' }}>{item.sourcePath}</td>
                      <td style={{ padding: '1rem 0.5rem', color: '#94A3B8' }}><ArrowRight size={16} /></td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)', fontFamily: 'monospace' }}>{item.destinationPath}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: item.redirectType === 301 ? 'rgba(7,68,141,0.08)' : 'rgba(255,106,0,0.08)', color: item.redirectType === 301 ? 'var(--color-royal-blue)' : 'var(--color-orange)', fontSize: '0.75rem', fontWeight: 800 }}>
                          {item.redirectType}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#475569' }}>{item.hitCount} hits</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <button
                          onClick={() => handleToggleActive(item.id)}
                          style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', backgroundColor: item.isActive ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.12)', color: item.isActive ? 'var(--color-success)' : '#64748B', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                          {item.isActive ? 'ACTIVE' : 'DISABLED'}
                        </button>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                          <button onClick={() => setRedirects(redirects.filter((r) => r.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AdminContentContainer>
      </div>
    </div>
  );
}
