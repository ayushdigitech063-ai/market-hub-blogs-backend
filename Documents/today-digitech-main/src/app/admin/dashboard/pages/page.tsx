'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function PagesCmsPage() {
  const [pages, setPages] = useState([
    { id: 'pg-1', title: 'Home Page', slug: 'home', sectionsCount: 6, status: 'Published', isFeatured: true },
    { id: 'pg-2', title: 'About Us & Leadership', slug: 'about-us', sectionsCount: 4, status: 'Published', isFeatured: false },
    { id: 'pg-3', title: 'Contact & Inquiry Hub', slug: 'contact', sectionsCount: 3, status: 'Published', isFeatured: false },
    { id: 'pg-4', title: 'Enterprise Case Studies Overview', slug: 'case-studies', sectionsCount: 5, status: 'Draft', isFeatured: false },
  ]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/pages" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Pages & Page Sections CMS Manager" />

        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Website Pages & Section Blocks</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage modular page layouts, hero banners, section blocks, and custom SEO metadata.</p>
              </div>

              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                <Plus size={18} />
                <span>Create Custom Page</span>
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Page Title</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Slug</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Sections</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>{item.title}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>/{item.slug}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.75rem', fontWeight: 700 }}>
                        {item.sectionsCount} Blocks
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: item.status === 'Published' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: item.status === 'Published' ? 'var(--color-success)' : '#D97706', fontSize: '0.75rem', fontWeight: 700 }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                        <button onClick={() => setPages(pages.filter((p) => p.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
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
