'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function BlogCategoriesCmsPage() {
  const [categories, setCategories] = useState([
    { id: 'bc-1', name: 'Engineering', slug: 'engineering', postCount: 2, status: 'Published' },
    { id: 'bc-2', name: 'Cloud & DevOps', slug: 'cloud-devops', postCount: 1, status: 'Published' },
    { id: 'bc-3', name: 'SEO & Marketing', slug: 'seo-marketing', postCount: 1, status: 'Published' },
    { id: 'bc-4', name: 'Case Studies', slug: 'case-studies', postCount: 0, status: 'Published' },
    { id: 'bc-5', name: 'Company News', slug: 'company-news', postCount: 0, status: 'Draft' },
  ]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/blog-categories" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Blog Category Management" />
        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Blog Categories</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Organize blog posts by topic category.</p>
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                <Plus size={18} /> Add Category
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Category Name</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Slug</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Posts</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>{cat.name}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontFamily: 'monospace', fontSize: '0.8125rem' }}>{cat.slug}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>{cat.postCount}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: cat.status === 'Published' ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.12)', color: cat.status === 'Published' ? 'var(--color-success)' : '#64748B', fontSize: '0.75rem', fontWeight: 700 }}>{cat.status}</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                        <button onClick={() => setCategories(categories.filter((c) => c.id !== cat.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
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
