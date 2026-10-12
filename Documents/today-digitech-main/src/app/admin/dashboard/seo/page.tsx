'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { CmsItemModal, FieldConfig } from '@/components/admin/cms/CmsItemModal';
import { Plus, Search, Trash2, Edit2, Copy, Loader2, Globe } from 'lucide-react';

interface SeoItem {
  _id?: string;
  id?: string;
  routePath: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const seoFields: FieldConfig[] = [
  { name: 'routePath', label: 'Route Path', type: 'text', required: true, placeholder: '/services/web-development' },
  { name: 'metaTitle', label: 'Meta Title', type: 'text', required: true, placeholder: 'Top Web Development Services | Today Digitech' },
  { name: 'metaDescription', label: 'Meta Description', type: 'textarea', required: true, placeholder: 'Enterprise web app engineering...' },
  { name: 'canonicalUrl', label: 'Canonical URL', type: 'text', placeholder: 'https://todaydigitech.com/services/web-development' },
  { name: 'ogImage', label: 'OpenGraph Image URL', type: 'text', placeholder: 'https://todaydigitech.com/og-image.jpg' },
  { name: 'noIndex', label: 'Block Search Engines (noindex)', type: 'switch' },
];

export default function SeoCmsPage() {
  const {
    items: seoRecords,
    loading,
    search,
    setSearch,
    isModalOpen,
    editingItem,
    submitting,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDuplicate,
  } = useCmsManager<SeoItem>('seo-meta');

  const getItemId = (item: SeoItem) => item._id || item.id || '';

  return (
    <ProtectedRoute requiredPermission="MANAGE_SEO">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <AdminSidebar currentPath="/dashboard/seo" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Search Engine Optimization (SEO) Governance" />

          <AdminContentContainer>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Page Route SEO Metadata</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage title tags, meta descriptions, OpenGraph social preview images, and canonical URL directives.</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative', width: '220px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      placeholder="Search routes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ width: '100%', padding: '0.375rem 0.75rem 0.375rem 2.25rem', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <button
                    onClick={openCreateModal}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}
                  >
                    <Plus size={18} />
                    <span>Add Route SEO</span>
                  </button>
                </div>
              </div>

              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading SEO metadata...</p>
                </div>
              ) : seoRecords.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No SEO metadata records configured.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Route Path</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Meta Title</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Directives</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoRecords.map((item) => {
                      const id = getItemId(item);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                              <Globe size={14} />
                              <span>{item.routePath}</span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.metaTitle}</td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: item.noIndex ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)', color: item.noIndex ? 'var(--color-danger)' : 'var(--color-success)', fontSize: '0.75rem', fontWeight: 700 }}>
                              {item.noIndex ? 'NOINDEX' : 'INDEXABLE'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Entry" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => openEditModal(item)} title="Edit Meta" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Record" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <CmsItemModal
              isOpen={isModalOpen}
              onClose={closeModal}
              title={editingItem ? 'Edit SEO Metadata' : 'Add Route SEO'}
              fields={seoFields}
              initialValues={editingItem}
              isSubmitting={submitting}
              onSubmit={(formData) => {
                if (editingItem) {
                  return handleUpdate(getItemId(editingItem), formData);
                } else {
                  return handleCreate(formData);
                }
              }}
            />
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
