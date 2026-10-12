'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ShieldCheck, Eye } from 'lucide-react';
import { AuditAction } from '@today-digitech/shared';

interface AuditItem {
  id: string;
  action: AuditAction;
  resource: string;
  adminEmail: string;
  ipAddress: string;
  createdAt: string;
  details: Record<string, unknown>;
}

export default function AuditLogsPage() {
  const [logs] = useState<AuditItem[]>([
    { id: 'log-108', action: 'ROLLBACK', resource: 'blog-posts', adminEmail: 'admin@todaydigitech.com', ipAddress: '103.21.124.5', createdAt: '2026-08-06 10:15', details: { restoredVersion: 2, newVersion: 4 } },
    { id: 'log-107', action: 'PUBLISH', resource: 'services', adminEmail: 'rohan@todaydigitech.com', ipAddress: '182.72.190.10', createdAt: '2026-08-06 09:30', details: { serviceSlug: 'seo-optimization', status: 'Published' } },
    { id: 'log-106', action: 'LOGIN', resource: 'auth', adminEmail: 'admin@todaydigitech.com', ipAddress: '103.21.124.5', createdAt: '2026-08-06 09:00', details: { method: 'Password + Session JWT' } },
    { id: 'log-105', action: 'SCHEDULE', resource: 'blog-posts', adminEmail: 'priya@todaydigitech.com', ipAddress: '106.208.54.2', createdAt: '2026-08-05 16:45', details: { scheduledFor: '2026-08-10 09:00' } },
    { id: 'log-104', action: 'ARCHIVE', resource: 'locations', adminEmail: 'vikram@todaydigitech.com', ipAddress: '182.72.190.10', createdAt: '2026-08-05 14:20', details: { locationSlug: 'old-noida-branch', status: 'Archived' } },
    { id: 'log-103', action: 'RESTORE', resource: 'testimonials', adminEmail: 'admin@todaydigitech.com', ipAddress: '103.21.124.5', createdAt: '2026-08-05 11:10', details: { testimonialId: 't-12', status: 'Published' } },
    { id: 'log-102', action: 'UPDATE', resource: 'seo-meta', adminEmail: 'rohan@todaydigitech.com', ipAddress: '182.72.190.10', createdAt: '2026-08-04 18:00', details: { pagePath: '/locations/seo-company-delhi' } },
    { id: 'log-101', action: 'LOGOUT', resource: 'auth', adminEmail: 'priya@todaydigitech.com', ipAddress: '106.208.54.2', createdAt: '2026-08-04 17:30', details: { sessionDuration: '8h 15m' } },
  ]);

  const [activeActionFilter, setActiveActionFilter] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState<AuditItem | null>(null);

  const actionFilters = ['ALL', 'CREATE', 'UPDATE', 'PUBLISH', 'UNPUBLISH', 'SCHEDULE', 'ARCHIVE', 'RESTORE', 'DELETE', 'ROLLBACK', 'LOGIN', 'LOGOUT'];

  const filteredLogs = activeActionFilter === 'ALL' ? logs : logs.filter((l) => l.action === activeActionFilter);

  const getBadgeStyle = (action: AuditAction) => {
    switch (action) {
      case 'CREATE': return { bg: 'rgba(59,130,246,0.12)', color: 'var(--color-info)' };
      case 'UPDATE': return { bg: 'rgba(245,158,11,0.12)', color: 'var(--color-warning)' };
      case 'PUBLISH': return { bg: 'rgba(16,185,129,0.12)', color: 'var(--color-success)' };
      case 'UNPUBLISH': return { bg: 'rgba(100,116,139,0.12)', color: '#64748B' };
      case 'SCHEDULE': return { bg: 'rgba(139,92,246,0.12)', color: '#8B5CF6' };
      case 'ARCHIVE': return { bg: 'rgba(239,68,68,0.12)', color: 'var(--color-danger)' };
      case 'RESTORE': return { bg: 'rgba(6,182,212,0.12)', color: '#06B6D4' };
      case 'DELETE': return { bg: 'rgba(239,68,68,0.2)', color: '#B91C1C' };
      case 'ROLLBACK': return { bg: 'rgba(255,106,0,0.12)', color: 'var(--color-orange)' };
      case 'LOGIN': return { bg: 'rgba(16,185,129,0.12)', color: 'var(--color-success)' };
      case 'LOGOUT': return { bg: '#F1F5F9', color: '#64748B' };
      default: return { bg: '#F1F5F9', color: '#64748B' };
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/audit-logs" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Record-Level Audit Trail" />

        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--color-success)' }} />
                  Security & Activity Audit Log
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Immutable audit trail tracking all 11 governance actions.</p>
              </div>
            </div>

            {/* Action Filter Pills */}
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {actionFilters.map((act) => (
                <button
                  key={act}
                  onClick={() => setActiveActionFilter(act)}
                  style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: '9999px', border: activeActionFilter === act ? 'none' : '1px solid var(--color-border)', backgroundColor: activeActionFilter === act ? 'var(--color-primary-navy)' : '#F8FAFC', color: activeActionFilter === act ? '#FFFFFF' : 'var(--color-heading)', cursor: 'pointer' }}
                >
                  {act}
                </button>
              ))}
            </div>

            {/* Details Modal Drawer */}
            {selectedLog && (
              <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', borderBottom: '2px solid var(--color-royal-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-heading)' }}>Audit Details: Event #{selectedLog.id}</h4>
                  <button onClick={() => setSelectedLog(null)} style={{ padding: '0.25rem 0.75rem', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem' }}>Close Details</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Action & Resource:</span>
                    <div style={{ fontWeight: 800, color: 'var(--color-heading)' }}>{selectedLog.action} on {selectedLog.resource}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Admin & IP:</span>
                    <div style={{ fontWeight: 800, color: 'var(--color-heading)' }}>{selectedLog.adminEmail} ({selectedLog.ipAddress})</div>
                  </div>
                </div>
                <pre style={{ marginTop: '1rem', fontSize: '0.75rem', backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', overflowX: 'auto' }}>
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Timestamp</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Action</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Resource</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Admin Account</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>IP Address</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((item) => {
                  const bs = getBadgeStyle(item.action);
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontSize: '0.8125rem' }}>{item.createdAt}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: bs.bg, color: bs.color, fontSize: '0.75rem', fontWeight: 800 }}>
                          {item.action}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)', fontFamily: 'monospace' }}>{item.resource}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--color-heading)', fontWeight: 600 }}>{item.adminEmail}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontFamily: 'monospace', fontSize: '0.8125rem' }}>{item.ipAddress}</td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button onClick={() => setSelectedLog(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-royal-blue)' }}>
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AdminContentContainer>
      </div>
    </div>
  );
}
