'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';
import { RotateCcw, Eye, Loader2 } from 'lucide-react';

interface RevisionItem {
  _id?: string;
  id?: string;
  entityType: string;
  entityId?: string;
  entityTitle?: string;
  versionNumber?: number;
  createdBy?: string;
  createdAt: string;
  actionType: string;
  changeSummary?: string;
  snapshot?: Record<string, unknown>;
}

const getRevisionTitle = (item: RevisionItem): string => {
  const snapshot = item.snapshot;
  if (snapshot) {
    const title = snapshot.title || snapshot.name || snapshot.question;
    if (typeof title === 'string' && title.trim()) return title;
  }
  return item.changeSummary || item.entityType;
};

export default function ContentRevisionsPage() {
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRevision, setSelectedRevision] = useState<RevisionItem | null>(null);

  const fetchRevisions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient<RevisionItem[]>('/governance/revisions?limit=50');
      if (res.success && Array.isArray(res.data)) {
        setRevisions(res.data);
      } else {
        setRevisions([]);
      }
    } catch {
      setRevisions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevisions();
  }, [fetchRevisions]);

  const handleRollback = async (revId: string) => {
    if (!confirm('Are you sure you want to rollback to this entity version?')) return;
    try {
      const res = await apiClient(`/governance/revisions/${revId}/rollback`, { method: 'POST' });
      if (res.success) {
        alert('Successfully rolled back entity version');
        await fetchRevisions();
      } else {
        alert(res.message || 'Rollback failed');
      }
    } catch (err: any) {
      alert(err.message || 'Rollback error');
    }
  };

  const getItemId = (item: RevisionItem) => item._id || item.id || '';

  return (
    <ProtectedRoute requiredPermission="VIEW_AUDIT_LOGS">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <AdminSidebar currentPath="/dashboard/revisions" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Content Versioning & Revisions Governance" />

          <AdminContentContainer>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Audit & Revision History</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Track automated snapshots, compare differences, and execute instant rollbacks.</p>
              </div>

              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading content audit history...</p>
                </div>
              ) : revisions.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No content revision logs recorded yet.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Entity Title</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Module</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Action</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Timestamp</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revisions.map((item) => {
                      const id = getItemId(item);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                            {getRevisionTitle(item)}
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.75rem', fontWeight: 700 }}>
                              {item.entityType}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>{item.actionType}</td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{new Date(item.createdAt).toLocaleString()}</td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button onClick={() => setSelectedRevision(item)} title="Inspect Snapshot" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Eye size={16} /></button>
                              <button onClick={() => handleRollback(id)} title="Rollback Version" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-orange)' }}><RotateCcw size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Snapshot Modal */}
            {selectedRevision && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(4,31,73,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '640px', maxHeight: '80vh', overflowY: 'auto', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Revision Snapshot Inspector</h3>
                    <button onClick={() => setSelectedRevision(null)} style={{ background: 'none', border: 'none', fontWeight: 800, cursor: 'pointer' }}>✕</button>
                  </div>
                  <pre style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', overflowX: 'auto' }}>
                    {JSON.stringify(selectedRevision, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
