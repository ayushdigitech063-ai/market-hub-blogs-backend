'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { CmsItemModal, FieldConfig } from '@/components/admin/cms/CmsItemModal';
import { Plus, Search, Trash2, Edit2, Copy, Loader2, RefreshCw } from 'lucide-react';

interface ServiceItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category?: string;
  description?: string;
  status: 'Published' | 'Draft';
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const serviceFields: FieldConfig[] = [
  { name: 'title', label: 'Service Title', type: 'text', required: true, placeholder: 'e.g. Enterprise Cloud Engineering' },
  { name: 'slug', label: 'URL Slug', type: 'slug', required: true, slugFrom: 'title', placeholder: 'enterprise-cloud-engineering' },
  { name: 'category', label: 'Service Category', type: 'select', options: [
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Mobile Apps', value: 'Mobile Apps' },
    { label: 'Cloud & AI', value: 'Cloud & AI' },
    { label: 'Digital Marketing', value: 'Digital Marketing' },
  ] },
  { name: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Brief summary of the service offering...' },
  { name: 'status', label: 'Publish Status', type: 'select', options: [
    { label: 'Published', value: 'Published' },
    { label: 'Draft', value: 'Draft' },
  ] },
  { name: 'isFeatured', label: 'Featured on Homepage', type: 'switch' },
];

const defaultServicesList: ServiceItem[] = [
  { id: 'srv-1', title: 'Enterprise Full-Stack Web Applications', slug: 'full-stack-web-apps', category: 'Web Development', description: 'Custom Next.js & Node.js web portals built for high performance.', status: 'Published', isFeatured: true },
  { id: 'srv-2', title: 'Cross-Platform Mobile Apps (iOS & Android)', slug: 'mobile-app-development', category: 'Mobile Apps', description: 'Native performance mobile apps built with React Native.', status: 'Published', isFeatured: true },
  { id: 'srv-3', title: 'Cloud Infrastructure & Microservices DevOps', slug: 'cloud-devops-microservices', category: 'Cloud & AI', description: 'AWS & Azure Kubernetes auto-scaling CI/CD deployments.', status: 'Published', isFeatured: true },
  { id: 'srv-4', title: 'AI Integration & Fine-Tuned LLM Pipelines', slug: 'ai-llm-integration', category: 'Cloud & AI', description: 'Custom RAG knowledge engines and vector database automation.', status: 'Published', isFeatured: true },
];

export default function ServicesCmsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    items: services,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    pagination,
    setPagination,
    error,
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
  } = useCmsManager<ServiceItem>('services', { page: 1, limit: 20 }, defaultServicesList);

  const getItemId = (item: ServiceItem) => item._id || item.id || '';

  return (
    <ProtectedRoute requiredPermission="MANAGE_CONTENT">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <AdminSidebar 
          currentPath="/admin/dashboard/services"
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader 
            title="Services CMS Manager"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />

          <AdminContentContainer>
            {/* Header Banner with Integrated Controls */}
            <div style={{ padding: '1.75rem 2rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  Services Management
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                  Manage live service offerings, tech stacks, pricing tiers, and SEO metadata.
                </p>
              </div>

              {/* Integrated Control Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '220px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 2.25rem', fontSize: '0.875rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPagination((current) => ({ ...current, page: 1 })); }} style={{ padding: '0.5rem 0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#FFFFFF', fontSize: '0.875rem', outline: 'none' }}>
                  <option value="" style={{ color: '#000' }}>All statuses</option>
                  <option value="Published" style={{ color: '#000' }}>Published</option>
                  <option value="Draft" style={{ color: '#000' }}>Draft</option>
                  <option value="Scheduled" style={{ color: '#000' }}>Scheduled</option>
                  <option value="Archived" style={{ color: '#000' }}>Archived</option>
                </select>

                <input value={categoryFilter} onChange={(event) => { setCategoryFilter(event.target.value); setPagination((current) => ({ ...current, page: 1 })); }} placeholder="Filter category" style={{ width: '130px', padding: '0.5rem 0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#FFFFFF', fontSize: '0.875rem', outline: 'none' }} />

                <button onClick={() => void loadItems()} disabled={loading} title="Refresh services" style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFFFFF', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </button>

                <button onClick={openCreateModal} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                  <Plus size={16} /> Create New Service
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>

              {error ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-danger)' }}><p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{error}</p><button onClick={() => void loadItems()} style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', color: '#FFFFFF', cursor: 'pointer' }}>Retry</button></div>
              ) : loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading services from database...</p>
                </div>
              ) : services.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No services found.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Service Title</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Category</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Slug</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Updated</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((item) => {
                      const id = getItemId(item);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>{item.title}</td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.75rem', fontWeight: 700 }}>
                              {item.category || 'General'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontSize: '0.8125rem' }}>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : '—'}</td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>/{item.slug}</td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <button
                              onClick={() => handleTogglePublish(id)}
                              style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', border: 'none', backgroundColor: item.status === 'Published' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: item.status === 'Published' ? 'var(--color-success)' : '#D97706', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              {item.status || 'Draft'}
                            </button>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Service" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => openEditModal(item)} title="Edit Service" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Service" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              {!loading && !error && pagination.totalPages > 1 && (
                <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)' }}><span style={{ fontSize: '0.8125rem', color: 'var(--color-body)' }}>Page {pagination.page} of {pagination.totalPages} · {pagination.total} services</span><div style={{ display: 'flex', gap: '0.5rem' }}><button disabled={pagination.page <= 1} onClick={() => setPagination((current) => ({ ...current, page: current.page - 1 }))} style={{ padding: '0.375rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', cursor: 'pointer' }}>Previous</button><button disabled={pagination.page >= pagination.totalPages} onClick={() => setPagination((current) => ({ ...current, page: current.page + 1 }))} style={{ padding: '0.375rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: '#FFFFFF', cursor: 'pointer' }}>Next</button></div></div>
              )}
            </div>
          </AdminContentContainer>

          <CmsItemModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={editingItem ? 'Edit Service' : 'Create Service'}
            fields={serviceFields}
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
        </div>
      </div>
    </ProtectedRoute>
  );
}
