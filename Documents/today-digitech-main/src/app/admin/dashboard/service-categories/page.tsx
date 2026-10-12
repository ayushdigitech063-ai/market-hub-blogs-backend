'use client';

import React from 'react';
import { Plus, Search, Trash2, Edit2, Copy, Loader2, RefreshCw } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { CmsItemModal, FieldConfig } from '@/components/admin/cms/CmsItemModal';
import { useCmsManager } from '@/hooks/useCmsManager';

type CategoryStatus = 'Draft' | 'Published' | 'Scheduled' | 'Archived';

interface ServiceCategory {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  status: CategoryStatus;
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

const categoryFields: FieldConfig[] = [
  { name: 'name', label: 'Category Name', type: 'text', required: true, placeholder: 'e.g. Web Development' },
  { name: 'slug', label: 'URL Slug', type: 'slug', required: true, slugFrom: 'name', placeholder: 'web-development' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe this service category...' },
  { name: 'icon', label: 'Icon', type: 'text', placeholder: 'Icon identifier or URL' },
  { name: 'order', label: 'Display Order', type: 'number' },
  {
    name: 'status',
    label: 'Publish Status',
    type: 'select',
    options: [
      { label: 'Draft', value: 'Draft' },
      { label: 'Published', value: 'Published' },
      { label: 'Scheduled', value: 'Scheduled' },
      { label: 'Archived', value: 'Archived' },
    ],
  },
  { name: 'isFeatured', label: 'Featured Category', type: 'switch' },
];

const formatDate = (value?: string) => (value ? new Date(value).toLocaleDateString() : '—');

export default function ServiceCategoriesCmsPage() {
  const {
    items: categories,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    pagination,
    setPagination,
    loadItems,
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
    handleTogglePublish,
  } = useCmsManager<ServiceCategory>('service-categories');

  const getItemId = (item: ServiceCategory) => item._id || item.id || '';
  const hasActiveFilters = Boolean(search || statusFilter);

  return (
    <ProtectedRoute requiredPermission="MANAGE_CONTENT">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <AdminSidebar currentPath="/dashboard/service-categories" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Service Categories CMS Manager" />

          <AdminContentContainer>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Service Categories</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Group service offerings into website taxonomy categories.</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', width: '220px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="search"
                      placeholder="Search categories..."
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setPagination((current) => ({ ...current, page: 1 }));
                      }}
                      style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 2.25rem', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(event.target.value);
                      setPagination((current) => ({ ...current, page: 1 }));
                    }}
                    aria-label="Filter categories by status"
                    style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                  >
                    <option value="">All statuses</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <button onClick={() => void loadItems()} disabled={loading} title="Refresh categories" aria-label="Refresh categories" style={{ background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', color: 'var(--color-royal-blue)' }}>
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  </button>
                  <button onClick={openCreateModal} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                    <Plus size={18} />
                    <span>Add Service Category</span>
                  </button>
                </div>
              </div>

              {error ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-danger)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{error}</p>
                  <button onClick={() => void loadItems()} style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', color: '#FFFFFF', cursor: 'pointer' }}>Retry</button>
                </div>
              ) : loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading service categories from database...</p>
                </div>
              ) : categories.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{hasActiveFilters ? 'No service categories match the current filters.' : 'No service categories found.'}</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Category Name</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Slug</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Order</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Created</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Updated</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((item) => {
                      const id = getItemId(item);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                            {item.name}
                            {item.isFeatured && <span style={{ marginLeft: '0.5rem', color: 'var(--color-orange)', fontSize: '0.75rem' }}>Featured</span>}
                          </td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontFamily: 'monospace', fontSize: '0.8125rem' }}>/{item.slug}</td>
                          <td style={{ padding: '1rem 1.5rem' }}>{item.order ?? 0}</td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <button onClick={() => void handleTogglePublish(id)} disabled={!id} title={item.status === 'Published' ? 'Unpublish category' : 'Publish category'} style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', border: 'none', backgroundColor: item.status === 'Published' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: item.status === 'Published' ? 'var(--color-success)' : '#D97706', fontSize: '0.75rem', fontWeight: 700, cursor: id ? 'pointer' : 'not-allowed' }}>
                              {item.status}
                            </button>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{formatDate(item.createdAt)}</td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{formatDate(item.updatedAt)}</td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button onClick={() => void handleDuplicate(id)} disabled={!id} title="Duplicate category" aria-label="Duplicate category" style={{ background: 'none', border: 'none', cursor: id ? 'pointer' : 'not-allowed', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => openEditModal(item)} title="Edit category" aria-label="Edit category" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => void handleDelete(id)} disabled={!id} title="Delete category" aria-label="Delete category" style={{ background: 'none', border: 'none', cursor: id ? 'pointer' : 'not-allowed', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {!loading && !error && pagination.totalPages > 1 && (
                <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-body)' }}>Page {pagination.page} of {pagination.totalPages} · {pagination.total} categories</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button disabled={pagination.page <= 1} onClick={() => setPagination((current) => ({ ...current, page: current.page - 1 }))} style={{ padding: '0.375rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
                    <button disabled={pagination.page >= pagination.totalPages} onClick={() => setPagination((current) => ({ ...current, page: current.page + 1 }))} style={{ padding: '0.375rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', cursor: pagination.page >= pagination.totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
                  </div>
                </div>
              )}
            </div>
          </AdminContentContainer>

          <CmsItemModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={editingItem ? 'Edit Service Category' : 'Create Service Category'}
            fields={categoryFields}
            initialValues={editingItem}
            isSubmitting={submitting}
            onSubmit={(formData) => (editingItem ? handleUpdate(getItemId(editingItem), formData) : handleCreate(formData))}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
