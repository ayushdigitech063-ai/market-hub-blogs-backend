'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { apiClient } from '@/lib/apiClient';
import { Plus, Trash2, Edit2, Copy, Loader2, Sparkles, Upload, FolderGit2 } from 'lucide-react';

interface PortfolioItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  client?: string;
  category?: string;
  tech?: string[] | string;
  techStack?: string[] | string;
  summary?: string;
  excerpt?: string;
  coverImageUrl?: string;
  status: 'Published' | 'Draft';
}

const defaultPortfolioList: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'OmniLogistics Supply Chain & Fleet Portal',
    slug: 'omnilogistics-portal',
    client: 'OmniLogistics India',
    category: 'Web App & Cloud',
    tech: ['Next.js 14', 'Express', 'MongoDB', 'AWS'],
    summary: 'Real-time fleet tracking, automated shipment dispatching, and predictive route management portal built for enterprise scale.',
    coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    status: 'Published',
  },
  {
    id: 'port-2',
    title: 'Fitness Pulse Biometric Mobile Application',
    slug: 'fitness-pulse-app',
    client: 'Fitness Pulse Inc',
    category: 'Mobile App',
    tech: ['React Native', 'Firebase', 'GraphQL', 'Tailwind'],
    summary: 'Cross-platform iOS and Android biometric health tracking application with real-time wearable telemetry integrations.',
    coverImageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
    status: 'Published',
  },
];

export default function PortfolioCmsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    items: projects,
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
  } = useCmsManager<PortfolioItem>('portfolio', { page: 1, limit: 20 }, defaultPortfolioList);

  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    slug: '',
    client: 'OmniLogistics India',
    category: 'Web App & Cloud',
    tech: 'Next.js 14, Express, MongoDB, AWS',
    summary: '',
    coverImageUrl: '',
    status: 'Published',
  });

  const [uploading, setUploading] = useState(false);
  const getItemId = (item: PortfolioItem) => item._id || item.id || '';

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      slug: '',
      client: 'OmniLogistics India',
      category: 'Web App & Cloud',
      tech: 'Next.js 14, Express, MongoDB, AWS',
      summary: 'Real-time fleet tracking, automated shipment dispatching, and predictive route management portal built for enterprise scale.',
      coverImageUrl: '',
      status: 'Published',
    });
    openCreateModal();
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    const techVal = Array.isArray(item.tech) ? item.tech.join(', ') : Array.isArray(item.techStack) ? item.techStack.join(', ') : item.tech || item.techStack || '';
    setFormData({
      ...item,
      tech: techVal,
    });
    openEditModal(item);
  };

  const handleTitleChange = (val: string) => {
    const slugVal = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : slugVal,
    }));
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append('image', file);

    try {
      const res = await apiClient<{ url: string }>('/settings/hero-image', {
        method: 'POST',
        body,
      });

      const url = res.data?.url || (res as any).url;
      if (res.success && url) {
        setFormData((prev) => ({ ...prev, coverImageUrl: url }));
      }
    } catch {
      // fallback
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTech = typeof formData.tech === 'string'
      ? formData.tech.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.tech;

    const payload = {
      ...formData,
      tech: formattedTech,
      techStack: formattedTech,
      excerpt: formData.summary,
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
          currentPath="/admin/dashboard/portfolio"
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader
            title="Work Showcase CMS Portal"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />

          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  Work / Portfolio CMS Manager
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                  Manage Work Project Cards with Multer Image Uploads, Tech Pills, Client Names, and Excerpts.
                </p>
              </div>

              <button onClick={handleOpenCreate} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                <Plus size={16} /> Create Work Project
              </button>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading work projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No portfolio projects added yet.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Project Showcase</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Client & Category</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Tech Stack Pills</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((item) => {
                      const id = getItemId(item);
                      const techArr = Array.isArray(item.tech) ? item.tech : Array.isArray(item.techStack) ? item.techStack : [];
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {item.coverImageUrl && (
                                <img src={item.coverImageUrl} alt={item.title} style={{ width: '54px', height: '38px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #E2E8F0' }} />
                              )}
                              <div>
                                <div style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{item.title}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>/{item.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <span style={{ fontWeight: 700, color: '#07448D' }}>{item.client || 'Client Partner'}</span>
                              <span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(7,68,141,0.08)', color: '#07448D', fontSize: '0.725rem', fontWeight: 700, width: 'fit-content' }}>
                                {item.category || 'Web App'}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: '240px' }}>
                              {techArr.map((t, idx) => (
                                <span key={idx} style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#334155', fontSize: '0.7rem', fontWeight: 700 }}>
                                  {t}
                                </span>
                              ))}
                            </div>
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
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Project" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => handleOpenEdit(item)} title="Edit Project" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Project" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Custom Work/Portfolio Modal */}
            {isModalOpen && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(3, 23, 53, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={20} color="#FF6A00" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {editingItem ? 'Edit Work Project' : 'Create Work Project'}
                      </h3>
                    </div>
                    <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                  </div>

                  <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Project Title *</label>
                        <input
                          type="text"
                          required
                          value={formData.title || ''}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="OmniLogistics Supply Chain & Fleet Portal"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>URL Slug *</label>
                        <input
                          type="text"
                          required
                          value={formData.slug || ''}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          placeholder="omnilogistics-portal"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Client Name</label>
                        <input
                          type="text"
                          value={formData.client || ''}
                          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                          placeholder="OmniLogistics India"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Category Badge</label>
                        <input
                          type="text"
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="Web App & Cloud"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Tech Stack Pills (Comma Separated)</label>
                      <input
                        type="text"
                        value={formData.tech as string || ''}
                        onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                        placeholder="Next.js 14, Express, MongoDB, AWS"
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>

                    {/* Cover Banner Image Upload (Multer) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Project Cover Banner Image (Multer Engine Upload)</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={formData.coverImageUrl || ''}
                          onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                          placeholder="/uploads/portfolio-cover.png"
                          style={{ flex: 1, padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                        />
                        <label style={{ backgroundColor: '#07448D', color: '#FFFFFF', padding: '0.625rem 1rem', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Upload size={14} />
                          {uploading ? 'Uploading...' : 'Choose & Upload Image'}
                          <input type="file" accept="image/*" onChange={(e) => void handleUploadImage(e)} disabled={uploading} style={{ display: 'none' }} />
                        </label>
                      </div>
                      {formData.coverImageUrl && (
                        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={formData.coverImageUrl} alt="Cover Preview" style={{ maxHeight: '50px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                          <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>✓ Project Banner Attached</span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Summary Description</label>
                      <textarea
                        rows={3}
                        value={formData.summary || ''}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Real-time fleet tracking, automated shipment dispatching, and predictive route management portal built for enterprise scale."
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button type="button" onClick={closeModal} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" disabled={submitting} style={{ padding: '0.625rem 1.5rem', backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                        {submitting ? 'Saving Project...' : 'Save & Publish Work Project'}
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
