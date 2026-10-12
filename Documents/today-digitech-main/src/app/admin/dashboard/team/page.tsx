'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { apiClient } from '@/lib/apiClient';
import { Plus, Trash2, Edit2, Copy, Loader2, Sparkles, Upload, User } from 'lucide-react';

interface TeamMemberItem {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  bio?: string;
  description?: string;
  avatarUrl?: string;
  imageUrl?: string;
  status: 'Published' | 'Draft';
}

const defaultTeamList: TeamMemberItem[] = [
  {
    id: 'tm-1',
    name: 'Vikramaditya Roy',
    role: 'Founder & Chief Executive Officer',
    bio: '12+ years leading full-stack software architecture, enterprise cloud transformations, and growth strategy.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    status: 'Published',
  },
  {
    id: 'tm-2',
    name: 'Dr. Neha Malhotra',
    role: 'Head of AI & Machine Learning',
    bio: 'Ph.D. in Data Science specializing in fine-tuned LLM architectures, predictive analytics, and enterprise vector search.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    status: 'Published',
  },
  {
    id: 'tm-3',
    name: 'Amitabh Sen',
    role: 'VP of Cloud Infrastructure & DevOps',
    bio: 'AWS Certified Solutions Architect leading Kubernetes auto-scaling, CI/CD security, and zero-downtime microservices.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'Published',
  },
];

export default function TeamCmsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    items: teamMembers,
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
  } = useCmsManager<TeamMemberItem>('team', { page: 1, limit: 20 }, defaultTeamList);

  const [formData, setFormData] = useState<Partial<TeamMemberItem>>({
    name: '',
    role: '',
    bio: '',
    avatarUrl: '',
    status: 'Published',
  });

  const [uploading, setUploading] = useState(false);
  const getItemId = (item: TeamMemberItem) => item._id || item.id || '';

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      avatarUrl: '',
      status: 'Published',
    });
    openCreateModal();
  };

  const handleOpenEdit = (item: TeamMemberItem) => {
    setFormData({
      ...item,
      avatarUrl: item.avatarUrl || item.imageUrl || '',
    });
    openEditModal(item);
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
        setFormData((prev) => ({ ...prev, avatarUrl: url, imageUrl: url }));
      }
    } catch {
      // fallback
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      imageUrl: formData.avatarUrl,
      description: formData.bio,
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
          currentPath="/admin/dashboard/team"
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader
            title="Team & Executive Leadership CMS"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />

          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  About Us Executive Team CMS
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                  Manage Executive Leadership profiles (CEO, Head of AI, VP Cloud), Photos (Multer Upload), Titles & Bios.
                </p>
              </div>

              <button onClick={handleOpenCreate} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                <Plus size={16} /> Add Executive Member
              </button>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading team members...</p>
                </div>
              ) : teamMembers.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No executive members added yet.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Executive Details</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Role Title</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((item) => {
                      const id = getItemId(item);
                      const photo = item.avatarUrl || item.imageUrl;
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {photo ? (
                                <img src={photo} alt={item.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #E2E8F0' }} />
                              ) : (
                                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                                  <User size={20} />
                                </div>
                              )}
                              <div>
                                <div style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#FF6A00' }}>
                            {item.role}
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
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Member" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => handleOpenEdit(item)} title="Edit Member" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Member" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Custom Executive Member Modal */}
            {isModalOpen && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(3, 23, 53, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={20} color="#FF6A00" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {editingItem ? 'Edit Executive Member' : 'Add Executive Member'}
                      </h3>
                    </div>
                    <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                  </div>

                  <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Executive Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Vikramaditya Roy"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Role Title *</label>
                        <input
                          type="text"
                          required
                          value={formData.role || ''}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="Founder & Chief Executive Officer"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Executive Photo Upload (Multer) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Executive Photo Image (Multer Engine Upload)</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={formData.avatarUrl || ''}
                          onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                          placeholder="/uploads/executive-photo.png"
                          style={{ flex: 1, padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                        />
                        <label style={{ backgroundColor: '#07448D', color: '#FFFFFF', padding: '0.625rem 1rem', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Upload size={14} />
                          {uploading ? 'Uploading...' : 'Choose & Upload Photo'}
                          <input type="file" accept="image/*" onChange={(e) => void handleUploadImage(e)} disabled={uploading} style={{ display: 'none' }} />
                        </label>
                      </div>
                      {formData.avatarUrl && (
                        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={formData.avatarUrl} alt="Photo Preview" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #CBD5E1', objectFit: 'cover' }} />
                          <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>✓ Executive Photo Attached</span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Bio Description</label>
                      <textarea
                        rows={4}
                        value={formData.bio || formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value, description: e.target.value })}
                        placeholder="12+ years leading full-stack software architecture, enterprise cloud transformations, and growth strategy."
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button type="button" onClick={closeModal} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" disabled={submitting} style={{ padding: '0.625rem 1.5rem', backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                        {submitting ? 'Saving Member...' : 'Save & Publish Member'}
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
