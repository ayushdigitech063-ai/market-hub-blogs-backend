'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Eye, Download, MessageSquare } from 'lucide-react';

type AppStatus = 'NEW' | 'REVIEWING' | 'SHORTLISTED' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';

export default function ApplicationsCmsPage() {
  const [applications, setApplications] = useState([
    { id: 'app-1', name: 'Arjun Mehta', email: 'arjun@example.com', phone: '+91-9876543210', job: 'Senior Full-Stack Engineer', status: 'NEW' as AppStatus, appliedDate: '2026-08-04', hasResume: true },
    { id: 'app-2', name: 'Sneha Kapoor', email: 'sneha@example.com', phone: '+91-9123456780', job: 'Senior Full-Stack Engineer', status: 'REVIEWING' as AppStatus, appliedDate: '2026-08-03', hasResume: true },
    { id: 'app-3', name: 'Raj Patel', email: 'raj@example.com', phone: '+91-9988776655', job: 'React Native Developer', status: 'SHORTLISTED' as AppStatus, appliedDate: '2026-08-02', hasResume: true },
    { id: 'app-4', name: 'Priya Iyer', email: 'priya@example.com', phone: '+91-9876501234', job: 'SEO & Content Specialist', status: 'INTERVIEW' as AppStatus, appliedDate: '2026-07-30', hasResume: true },
    { id: 'app-5', name: 'Karan Shah', email: 'karan@example.com', phone: '+91-9812345678', job: 'DevOps Engineer', status: 'SELECTED' as AppStatus, appliedDate: '2026-07-28', hasResume: true },
  ]);

  const [activeFilter, setActiveFilter] = useState('ALL');
  const statusFilters = ['ALL', 'NEW', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED'];
  const filteredApps = activeFilter === 'ALL' ? applications : applications.filter((a) => a.status === activeFilter);

  const getStatusColor = (status: AppStatus) => {
    const map: Record<AppStatus, { bg: string; color: string }> = {
      NEW: { bg: 'rgba(59,130,246,0.12)', color: 'var(--color-info)' },
      REVIEWING: { bg: 'rgba(245,158,11,0.12)', color: 'var(--color-warning)' },
      SHORTLISTED: { bg: 'rgba(139,92,246,0.12)', color: '#8B5CF6' },
      INTERVIEW: { bg: 'rgba(6,182,212,0.12)', color: '#06B6D4' },
      SELECTED: { bg: 'rgba(16,185,129,0.12)', color: 'var(--color-success)' },
      REJECTED: { bg: 'rgba(239,68,68,0.12)', color: 'var(--color-danger)' },
    };
    return map[status];
  };

  const handleStatusChange = (id: string, newStatus: AppStatus) => {
    setApplications(applications.map((a) => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/applications" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Job Applications Management" />
        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Applications</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Review applications, download resumes, update status, and add notes.</p>
            </div>

            {/* Status Filter Bar */}
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {statusFilters.map((sf) => (
                <button key={sf} onClick={() => setActiveFilter(sf)} style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, borderRadius: '9999px', border: activeFilter === sf ? 'none' : '1px solid var(--color-border)', backgroundColor: activeFilter === sf ? 'var(--color-primary-navy)' : '#F8FAFC', color: activeFilter === sf ? '#FFFFFF' : 'var(--color-heading)', cursor: 'pointer' }}>
                  {sf}
                </button>
              ))}
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Applicant</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Position Applied</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Applied Date</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => {
                  const sc = getStatusColor(app.status);
                  return (
                    <tr key={app.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.875rem', flexShrink: 0 }}>
                            {app.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{app.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{app.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#64748B' }}>{app.job}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontSize: '0.8125rem' }}>{app.appliedDate}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as AppStatus)}
                          style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: sc.bg, color: sc.color, cursor: 'pointer', outline: 'none' }}
                        >
                          {statusFilters.filter((s) => s !== 'ALL').map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button title="View Application" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-royal-blue)' }}><Eye size={16} /></button>
                          {app.hasResume && (
                            <button title="Download Resume (Signed URL)" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-success)' }}><Download size={16} /></button>
                          )}
                          <button title="Add Note" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><MessageSquare size={16} /></button>
                        </div>
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
