'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Check } from 'lucide-react';

export default function RoleManagementPage() {
  const roles = [
    { name: 'Super Admin', desc: 'Full System Control & Authority', system: true },
    { name: 'Admin', desc: 'System Administrator without deletion rights', system: true },
    { name: 'Content Manager', desc: 'Manage Services, Portfolios, Blogs', system: false },
    { name: 'SEO Manager', desc: 'Manage Meta tags, SEO & Analytics', system: false },
    { name: 'Sales Manager', desc: 'Manage Inquiries, Leads & Assignments', system: false },
    { name: 'Sales Executive', desc: 'View and update assigned leads', system: false },
    { name: 'Viewer', desc: 'Read-only access to dashboard stats', system: true },
  ];

  const permissionsList = [
    { key: 'MANAGE_USERS', name: 'User Management' },
    { key: 'MANAGE_ROLES', name: 'Role & Permission Assignment' },
    { key: 'MANAGE_CONTENT', name: 'Content, Blogs & Services' },
    { key: 'MANAGE_SEO', name: 'SEO & Meta Metadata' },
    { key: 'MANAGE_INQUIRIES', name: 'Client Inquiries & Leads' },
    { key: 'MANAGE_SETTINGS', name: 'Global System Settings' },
    { key: 'VIEW_AUDIT_LOGS', name: 'Audit Logs & Activity Records' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/users" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="RBAC Roles & Permission Assignment Matrix" />

        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                Role Permissions Matrix
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', marginTop: '0.25rem' }}>
                Granular permission assignments across defined system roles.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '1rem 1.5rem', minWidth: '220px' }}>Permission Category</th>
                    {roles.map((r, idx) => (
                      <th key={idx} style={{ padding: '1rem 1rem', textAlign: 'center', minWidth: '130px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{r.name}</span>
                          <span style={{ fontSize: '0.7125rem', color: '#94A3B8', fontWeight: 500 }}>
                            {r.system ? 'System Role' : 'Custom Role'}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissionsList.map((perm) => (
                    <tr key={perm.key} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                        {perm.name}
                      </td>
                      {roles.map((role, idx) => {
                        const isSuper = role.name === 'Super Admin';
                        const isGranted =
                          isSuper ||
                          (role.name === 'Admin' && perm.key !== 'MANAGE_ROLES') ||
                          (role.name === 'Content Manager' && (perm.key === 'MANAGE_CONTENT' || perm.key === 'MANAGE_SEO')) ||
                          (role.name === 'Sales Manager' && (perm.key === 'MANAGE_INQUIRIES' || perm.key === 'VIEW_AUDIT_LOGS')) ||
                          (role.name === 'SEO Manager' && perm.key === 'MANAGE_SEO');

                        return (
                          <td key={idx} style={{ padding: '1rem', textAlign: 'center' }}>
                            {isGranted ? (
                              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--color-success)' }}>
                                <Check size={16} />
                              </div>
                            ) : (
                              <span style={{ color: '#CBD5E1' }}>—</span>
                            )}
                          </td>
                        );
                      })}
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
