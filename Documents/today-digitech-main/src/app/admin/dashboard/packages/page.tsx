'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { Plus, Trash2, Edit2, Copy, Loader2, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

interface PackageItem {
  _id?: string;
  id?: string;
  name: string;
  category?: string;
  price: string;
  period?: string;
  desc?: string;
  description?: string;
  features?: string[] | string;
  isRecommended?: boolean;
  isPopular?: boolean;
  showPricing?: boolean;
  status: 'Published' | 'Draft';
}

const defaultPackagesList: PackageItem[] = [
  {
    id: 'pkg-1',
    name: 'Growth Starter',
    category: 'Web Engineering',
    price: '₹49,999',
    period: '/ project',
    desc: 'Ideal for growing startups needing a high-performance web platform.',
    features: ['Custom Next.js Application', 'Responsive Mobile Design', 'Basic SEO Setup', '1 Month Cloud Support'],
    isRecommended: false,
    showPricing: true,
    status: 'Published',
  },
  {
    id: 'pkg-2',
    name: 'Enterprise Scale',
    category: 'Web Engineering',
    price: '₹1,49,999',
    period: '/ project',
    desc: 'Full-stack engineering with API backend, database, & admin portal.',
    features: ['Full Next.js + Express Stack', 'MongoDB Database Architecture', 'Admin Portal & Role RBAC', 'Cloudinary Media Management', '3 Months Dedicated Maintenance'],
    isRecommended: true,
    isPopular: true,
    showPricing: true,
    status: 'Published',
  },
  {
    id: 'pkg-3',
    name: 'Custom Architecture',
    category: 'Custom Solutions',
    price: 'Custom Quote',
    period: '',
    desc: 'Tailored microservices & dedicated engineering pod for enterprise.',
    features: ['Multi-tenant Architecture', 'DevOps & Kubernetes Setup', '24/7 SLA Monitoring', 'Dedicated Tech Lead & Squad'],
    isRecommended: false,
    showPricing: true,
    status: 'Published',
  },
];

export default function PackagesCmsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    items: packagesList,
    loading,
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
  } = useCmsManager<PackageItem>('packages', { page: 1, limit: 20 }, defaultPackagesList);

  const [formData, setFormData] = useState<Partial<PackageItem>>({
    name: '',
    category: 'Web Engineering',
    price: '₹49,999',
    period: '/ project',
    desc: '',
    features: 'Custom Next.js Application\nResponsive Mobile Design\nBasic SEO Setup',
    isRecommended: false,
    showPricing: true,
    status: 'Published',
  });

  const getItemId = (item: PackageItem) => item._id || item.id || '';

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      category: 'Web Engineering',
      price: '₹49,999',
      period: '/ project',
      desc: '',
      features: 'Custom Next.js Application\nResponsive Mobile Design\nBasic SEO Setup',
      isRecommended: false,
      showPricing: true,
      status: 'Published',
    });
    openCreateModal();
  };

  const handleOpenEdit = (item: PackageItem) => {
    setFormData({
      ...item,
      features: Array.isArray(item.features) ? item.features.join('\n') : item.features || '',
      desc: item.desc || item.description || '',
    });
    openEditModal(item);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedFeatures = typeof formData.features === 'string'
      ? formData.features.split('\n').map((f) => f.trim()).filter(Boolean)
      : formData.features;

    const payload = {
      ...formData,
      features: formattedFeatures,
      description: formData.desc,
      isPopular: formData.isRecommended,
    };

    if (editingItem) {
      await handleUpdate(getItemId(editingItem), payload);
    } else {
      await handleCreate(payload);
    }
  };

  return (
    <ProtectedRoute requiredPermission="MANAGE_CONTENT">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <AdminSidebar
          currentPath="/admin/dashboard/packages"
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader
            title="Pricing Packages CMS Portal"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />

          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  Pricing Plans & Packages CMS Manager
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                  Manage exact Pricing Cards (Growth Starter, Enterprise Scale, Custom Quote), Prices, Most Popular Tag & Feature Checklists.
                </p>
              </div>

              <button onClick={handleOpenCreate} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                <Plus size={16} /> Create Pricing Package
              </button>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading pricing packages...</p>
                </div>
              ) : packagesList.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No pricing packages added yet.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Package Name</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Pricing Rate</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Popular Badge</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packagesList.map((item) => {
                      const id = getItemId(item);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                              <Layers size={18} color="#07448D" />
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 800, color: '#07448D' }}>
                            {item.price} <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>{item.period || ''}</span>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: item.isRecommended || item.isPopular ? 'rgba(255,106,0,0.12)' : '#F1F5F9', color: item.isRecommended || item.isPopular ? '#FF6A00' : '#64748B', fontSize: '0.75rem', fontWeight: 800 }}>
                              {item.isRecommended || item.isPopular ? '🔥 MOST POPULAR' : 'STANDARD'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <button
                              onClick={() => handleTogglePublish(id)}
                              style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', border: 'none', backgroundColor: item.status === 'Published' ? 'rgba(16,185,129,0.12)' : '#F1F5F9', color: item.status === 'Published' ? 'var(--color-success)' : '#64748B', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              {item.status || 'Published'}
                            </button>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Package" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => handleOpenEdit(item)} title="Edit Package" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Package" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Custom Package Modal */}
            {isModalOpen && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(3, 23, 53, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={20} color="#FF6A00" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {editingItem ? 'Edit Pricing Package' : 'Create Pricing Package'}
                      </h3>
                    </div>
                    <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                  </div>

                  <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Package Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Enterprise Scale"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Price Amount / Text *</label>
                        <input
                          type="text"
                          required
                          value={formData.price || ''}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="₹1,49,999 or Custom Quote"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Pricing Subtext / Period</label>
                        <input
                          type="text"
                          value={formData.period || ''}
                          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                          placeholder="/ project"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                        <input
                          type="checkbox"
                          id="isRecommended"
                          checked={formData.isRecommended || false}
                          onChange={(e) => setFormData({ ...formData, isRecommended: e.target.checked, isPopular: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="isRecommended" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FF6A00', cursor: 'pointer' }}>
                          Highlight as MOST POPULAR Card
                        </label>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Short Description</label>
                      <textarea
                        rows={2}
                        value={formData.desc || formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value, description: e.target.value })}
                        placeholder="Full-stack engineering with API backend, database, & admin portal."
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Included Features List (One per line)</label>
                      <textarea
                        rows={5}
                        value={formData.features as string || ''}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        placeholder="Full Next.js + Express Stack&#10;MongoDB Database Architecture&#10;Admin Portal & Role RBAC&#10;3 Months Dedicated Maintenance"
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontFamily: 'monospace' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button type="button" onClick={closeModal} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" disabled={submitting} style={{ padding: '0.625rem 1.5rem', backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                        {submitting ? 'Saving Package...' : 'Save & Publish Package'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
