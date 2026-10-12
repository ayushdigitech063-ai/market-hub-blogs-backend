'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { CmsItemModal, FieldConfig } from '@/components/admin/cms/CmsItemModal';
import { Plus, Search, Trash2, Edit2, Copy, Loader2 } from 'lucide-react';

interface JobItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type?: string;
  experienceLevel?: string;
  status: 'Published' | 'Draft' | 'Closed';
}

const jobFields: FieldConfig[] = [
  { name: 'title', label: 'Job Title', type: 'text', required: true, placeholder: 'e.g. Senior Full Stack Engineer' },
  { name: 'slug', label: 'URL Slug', type: 'slug', required: true, slugFrom: 'title', placeholder: 'senior-full-stack-engineer' },
  { name: 'department', label: 'Department', type: 'select', options: [
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Design & UX', value: 'Design & UX' },
    { label: 'Digital Marketing', value: 'Digital Marketing' },
    { label: 'Sales & Business', value: 'Sales & Business' },
  ] },
  { name: 'location', label: 'Location', type: 'text', placeholder: 'New Delhi / Jaipur / Remote' },
  { name: 'type', label: 'Employment Type', type: 'select', options: [
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Contract', value: 'Contract' },
  ] },
  { name: 'experienceLevel', label: 'Experience Level', type: 'text', placeholder: '3-5 Years' },
  { name: 'status', label: 'Publish Status', type: 'select', options: [
    { label: 'Published', value: 'Published' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Closed', value: 'Closed' },
  ] },
];

export default function JobsCmsPage() {
  const {
    items: jobs,
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
    handleTogglePublish,
  } = useCmsManager<JobItem>('jobs');

  const getItemId = (item: JobItem) => item._id || item.id || '';

  return (
    <ProtectedRoute requiredPermission="MANAGE_CONTENT">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <AdminSidebar currentPath="/dashboard/jobs" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Job Openings CMS" />

          <AdminContentContainer>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Career Job Postings</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage job listings, required experience levels, and application routing.</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative', width: '220px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      placeholder="Search jobs..."
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
                    <span>Create Job Posting</span>
                  </button>
                </div>
              </div>

              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading jobs from database...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No job postings found.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Job Title</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Department</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Location</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((item) => {
                      const id = getItemId(item);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>{item.title}</td>
                          <td style={{ padding: '1rem 1.5rem' }}>{item.department || 'General'}</td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{item.location || 'Remote'}</td>
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
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Job" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => openEditModal(item)} title="Edit Job" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Job" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
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
              title={editingItem ? 'Edit Job Posting' : 'Create Job Posting'}
              fields={jobFields}
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
