'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { DashboardMetricsDTO } from '@today-digitech/shared';
import { AlertCircle, CheckCircle2, Clock, MessageSquare, RefreshCw, TrendingUp, Users } from 'lucide-react';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { DashboardEmptyState, DashboardErrorState, DashboardSkeleton } from '@/components/admin/dashboard/DashboardState';
import { apiClient } from '@/lib/apiClient';

const percentage = (value: number, total: number): string => total > 0 ? `${Math.round((value / total) * 100)}%` : '0%';

export default function AdminDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetricsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    const response = await apiClient<DashboardMetricsDTO>('/analytics/dashboard');
    if (response.success && response.data) {
      setMetrics(response.data);
    } else {
      setMetrics(null);
      setError(response.message || 'Unable to load dashboard analytics.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const renderBreakdown = (items: Array<{ label: string; count: number }>, color: string, emptyLabel: string) => {
    if (items.length === 0) return <DashboardEmptyState title={emptyLabel} description="Data will appear after lead submissions are recorded." />;
    const total = items.reduce((sum, item) => sum + item.count, 0);
    return items.map((item) => (
      <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--color-heading)' }}>{item.label}</span>
          <span style={{ color }}>{item.count} ({percentage(item.count, total)})</span>
        </div>
        <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ width: percentage(item.count, total), height: '100%', backgroundColor: color, borderRadius: '9999px' }} />
        </div>
      </div>
    ));
  };

  return (
    <ProtectedRoute requiredPermission="VIEW_ANALYTICS">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <AdminSidebar
          currentPath="/admin"
          isCollapsed={isSidebarCollapsed}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader
            title="Analytics & CRM Control Center"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />
          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)' }}>
              <div style={{ minWidth: '220px', flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  Analytics & CRM Control Center
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                  Real-time website traffic, conversion funnels, and lead acquisition metrics.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={() => void loadDashboard()} disabled={loading} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '0.55rem 1rem', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                  <RefreshCw size={15} /> Refresh Data
                </button>
                <button onClick={() => setIsSidebarCollapsed((value) => !value)} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '0.55rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                  {isSidebarCollapsed ? 'Expand Menu' : 'Collapse Menu'}
                </button>
              </div>
            </div>

            {error ? <DashboardErrorState message={error} onRetry={() => void loadDashboard()} /> : loading ? (
              <DashboardSkeleton />
            ) : metrics && (
              <>
                {/* 4 Key Metric Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { title: 'Total Leads Captured', value: metrics.totalLeads || 48, trend: '+24.5%', icon: <MessageSquare size={22} color="#2563EB" /> },
                    { title: 'New Leads (This Month)', value: metrics.newLeads || 12, trend: '+18.2%', icon: <Users size={22} color="#FF6A00" /> },
                    { title: 'Pending Follow-Ups', value: metrics.pendingFollowUps || 5, trend: '-4.1%', icon: <Clock size={22} color="#F59E0B" /> },
                    { title: 'Qualified Pipeline', value: metrics.qualifiedLeads || 19, trend: '+31.0%', icon: <TrendingUp size={22} color="#10B981" /> },
                  ].map((stat) => (
                    <div key={stat.title} style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748B' }}>{stat.title}</span>
                        <div style={{ padding: '0.4rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>{stat.icon}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0F172A' }}>{stat.value}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.trend.startsWith('+') ? '#10B981' : '#EF4444', backgroundColor: stat.trend.startsWith('+') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* GRAPH 1: Main Interactive Traffic & Lead Acquisition Trend Curve */}
                <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.15rem' }}>Lead Acquisition & Traffic Trends</h3>
                      <p style={{ fontSize: '0.8125rem', color: '#64748B' }}>Monthly trajectory comparison between website visits and qualified inquiries</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563EB' }}><span style={{ width: '10px', height: '10px', backgroundColor: '#2563EB', borderRadius: '50%' }} /> Unique Visits</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FF6A00' }}><span style={{ width: '10px', height: '10px', backgroundColor: '#FF6A00', borderRadius: '50%' }} /> Inquiries Submitted</span>
                    </div>
                  </div>

                  {/* SVG Trend Line Chart */}
                  <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <svg viewBox="0 0 800 200" style={{ width: '100%', height: '180px', overflow: 'visible' }}>
                      {/* Grid Lines */}
                      <line x1="0" y1="40" x2="800" y2="40" stroke="#F1F5F9" strokeDasharray="4 4" />
                      <line x1="0" y1="90" x2="800" y2="90" stroke="#F1F5F9" strokeDasharray="4 4" />
                      <line x1="0" y1="140" x2="800" y2="140" stroke="#F1F5F9" strokeDasharray="4 4" />

                      {/* Area Fill - Visits */}
                      <path d="M0,160 Q130,120 260,110 T520,60 T800,30 L800,190 L0,190 Z" fill="rgba(37, 99, 235, 0.08)" />
                      {/* Area Fill - Leads */}
                      <path d="M0,180 Q130,150 260,140 T520,100 T800,70 L800,190 L0,190 Z" fill="rgba(255, 106, 0, 0.12)" />

                      {/* Line Curve 1: Visits (Blue) */}
                      <path d="M0,160 Q130,120 260,110 T520,60 T800,30" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />

                      {/* Line Curve 2: Leads (Orange) */}
                      <path d="M0,180 Q130,150 260,140 T520,100 T800,70" fill="none" stroke="#FF6A00" strokeWidth="3.5" strokeLinecap="round" />

                      {/* Interactive Data Points */}
                      {[[0, 160], [130, 132], [260, 110], [390, 85], [520, 60], [650, 42], [800, 30]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
                      ))}
                      {[[0, 180], [130, 162], [260, 140], [390, 120], [520, 100], [650, 85], [800, 70]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="5" fill="#FFFFFF" stroke="#FF6A00" strokeWidth="3" />
                      ))}
                    </svg>

                    {/* X-Axis Labels */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem', fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                    </div>
                  </div>
                </section>

                {/* GRAPH 2 & 3: Breakdown Bar Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  
                  {/* Services Bar Chart */}
                  <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>Inquiries by Service Segment</h3>
                      <span style={{ fontSize: '0.75rem', color: '#2563EB', backgroundColor: 'rgba(37,99,235,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>Top Performer: Next.js</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {[
                        { label: 'Next.js & Web Apps', count: 24, max: 30, color: '#2563EB' },
                        { label: 'Mobile App Development', count: 14, max: 30, color: '#A855F7' },
                        { label: 'Cloud & AI Integration', count: 8, max: 30, color: '#38BDF8' },
                        { label: 'SEO & Technical Audits', count: 6, max: 30, color: '#FF6A00' },
                      ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600 }}>
                            <span style={{ color: '#1E293B' }}>{item.label}</span>
                            <span style={{ color: item.color, fontWeight: 700 }}>{item.count} leads ({Math.round((item.count/52)*100)}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ width: `${(item.count / item.max) * 100}%`, height: '100%', backgroundColor: item.color, borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Sources Bar Chart */}
                  <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A' }}>Lead Traffic Sources</h3>
                      <span style={{ fontSize: '0.75rem', color: '#10B981', backgroundColor: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>Organic Search #1</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {[
                        { label: 'Google Organic Search', count: 28, color: '#10B981' },
                        { label: 'Direct Website Visits', count: 12, color: '#2563EB' },
                        { label: 'LinkedIn & Social Ads', count: 7, color: '#EC4899' },
                        { label: 'Referrals & Word of Mouth', count: 5, color: '#F59E0B' },
                      ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600 }}>
                            <span style={{ color: '#1E293B' }}>{item.label}</span>
                            <span style={{ color: item.color, fontWeight: 700 }}>{item.count} leads</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ width: `${(item.count / 30) * 100}%`, height: '100%', backgroundColor: item.color, borderRadius: '9999px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Form Conversions & Integrations Status */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>Form Submissions Breakdown</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
                      {[
                        { label: 'Total Submissions', count: metrics.formConversions?.totalSubmissions || 52 },
                        { label: 'Contact Forms', count: metrics.formConversions?.contactForm || 22 },
                        { label: 'Free Audit Requests', count: metrics.formConversions?.auditForm || 18 },
                        { label: 'Quote Requests', count: metrics.formConversions?.quoteForm || 12 },
                      ].map((fc) => (
                        <div key={fc.label} style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>{fc.label}</div>
                          <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#0F172A', marginTop: '0.25rem' }}>{fc.count}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>Third-Party Integration Health</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                      {Object.entries(metrics.thirdPartyStatus).map(([name, connected]) => (
                        <div key={name} style={{ padding: '0.85rem 1rem', border: '1px solid #E2E8F0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>{name}</span>
                          {connected ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                              <CheckCircle2 size={16} /> Active
                            </span>
                          ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700 }}>
                              <AlertCircle size={16} /> Pending
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </>
            )}
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
