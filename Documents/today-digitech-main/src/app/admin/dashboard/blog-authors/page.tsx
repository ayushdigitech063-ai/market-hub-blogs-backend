'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function BlogAuthorsCmsPage() {
  const [authors, setAuthors] = useState([
    { id: 'ba-1', name: 'Vikram Singh', slug: 'vikram-singh', role: 'Lead Full-Stack Engineer', postCount: 1, status: 'Published' },
    { id: 'ba-2', name: 'Priya Sharma', slug: 'priya-sharma', role: 'Senior Backend Engineer', postCount: 1, status: 'Published' },
    { id: 'ba-3', name: 'Rohan Gupta', slug: 'rohan-gupta', role: 'SEO & Growth Engineer', postCount: 1, status: 'Published' },
    { id: 'ba-4', name: 'Amit Patel', slug: 'amit-patel', role: 'DevOps Architect', postCount: 1, status: 'Published' },
  ]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/blog-authors" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Blog Author Management" />
        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Blog Authors</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage author profiles, bios, and social links.</p>
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                <Plus size={18} /> Add Author
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Author Name</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Role</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Published Posts</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.875rem', flexShrink: 0 }}>
                          {author.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{author.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{author.role}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>{author.postCount}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(16,185,129,0.12)', color: 'var(--color-success)', fontSize: '0.75rem', fontWeight: 700 }}>{author.status}</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                        <button onClick={() => setAuthors(authors.filter((a) => a.id !== author.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
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
