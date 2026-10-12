'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function BlogTagsCmsPage() {
  const [tags, setTags] = useState([
    { id: 'bt-1', name: 'Next.js', slug: 'next.js', postCount: 2 },
    { id: 'bt-2', name: 'Performance', slug: 'performance', postCount: 1 },
    { id: 'bt-3', name: 'React Server Components', slug: 'react-server-components', postCount: 1 },
    { id: 'bt-4', name: 'Edge Computing', slug: 'edge-computing', postCount: 1 },
    { id: 'bt-5', name: 'MongoDB', slug: 'mongodb', postCount: 1 },
    { id: 'bt-6', name: 'Kubernetes', slug: 'kubernetes', postCount: 1 },
  ]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/blog-tags" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Blog Tag Management" />
        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Blog Tags</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage topic tags for blog post classification.</p>
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                <Plus size={18} /> Add Tag
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Tag Name</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Slug</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Posts Using Tag</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>#{tag.name}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontFamily: 'monospace', fontSize: '0.8125rem' }}>{tag.slug}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>{tag.postCount}</td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                        <button onClick={() => setTags(tags.filter((t) => t.id !== tag.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
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
