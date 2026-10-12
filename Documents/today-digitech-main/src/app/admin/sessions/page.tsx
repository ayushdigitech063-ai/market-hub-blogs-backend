'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Monitor, Smartphone, Trash2 } from 'lucide-react';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';

interface SessionItem {
  sessionId: string;
  userAgent?: string;
  ipAddress?: string;
  lastActiveAt?: string;
  isCurrent?: boolean;
}

export default function ActiveSessionsPage() {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = async () => {
    setIsLoading(true);
    const res = await apiClient<SessionItem[]>('/auth/sessions');
    setIsLoading(false);
    if (res.success && Array.isArray(res.data)) {
      setSessions(res.data);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevoke = async (id: string) => {
    const res = await apiClient(`/auth/sessions/${id}`, { method: 'DELETE' });
    if (res.success) {
      setSessions(sessions.filter((s) => s.sessionId !== id));
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <AdminSidebar currentPath="/sessions" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Active Sessions & Device Security" />

          <AdminContentContainer>
            <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                    Active Devices & Login Sessions
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', marginTop: '0.25rem' }}>
                    Manage authorized browser sessions logged into your administrator account.
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>Loading active sessions...</div>
              ) : sessions.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>No active sessions recorded.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sessions.map((sess) => (
                    <div
                      key={sess.sessionId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: sess.isCurrent ? 'rgba(6,43,99,0.02)' : '#FFFFFF',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)' }}>
                          {sess.userAgent?.toLowerCase().includes('mobile') ? (
                            <Smartphone size={20} color="var(--color-orange)" />
                          ) : (
                            <Monitor size={20} color="var(--color-royal-blue)" />
                          )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-heading)', fontSize: '0.9375rem' }}>
                              {sess.userAgent || 'Unknown Device'}
                            </span>
                            {sess.isCurrent && (
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-success)', border: '1px solid rgba(16,185,129,0.2)' }}>
                                Current Session
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
                            IP: {sess.ipAddress || '127.0.0.1'} • Session ID: {sess.sessionId}
                          </span>
                        </div>
                      </div>

                      {!sess.isCurrent && (
                        <button
                          onClick={() => handleRevoke(sess.sessionId)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', backgroundColor: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-danger)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600 }}
                        >
                          <Trash2 size={14} />
                          <span>Revoke</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
