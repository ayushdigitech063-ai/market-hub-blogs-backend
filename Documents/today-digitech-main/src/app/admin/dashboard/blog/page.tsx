'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { apiClient } from '@/lib/apiClient';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { Plus, Trash2, Edit2, Copy, Loader2, Globe, Sparkles, Tag, Upload } from 'lucide-react';

interface BlogPostItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  author?: string;
  category?: string;
  tags?: string[] | string;
  summary?: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[] | string;
  status: 'Published' | 'Draft' | 'Scheduled' | 'Archived';
  readingTime?: number;
  isFeatured?: boolean;
}

export default function BlogPostsCmsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    items: posts,
    loading,
    statusFilter,
    setStatusFilter,
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
  } = useCmsManager<BlogPostItem>('blog-posts');

  const [formData, setFormData] = useState<Partial<BlogPostItem>>({
    title: '',
    slug: '',
    author: 'Editorial Team',
    category: 'Engineering',
    tags: 'Next.js, React, SEO',
    summary: '',
    content: '',
    coverImageUrl: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    status: 'Published',
    isFeatured: false,
  });

  const [uploading, setUploading] = useState(false);

  const statusFilters = ['ALL', 'Published', 'Draft', 'Scheduled', 'Archived'];
  const getItemId = (item: BlogPostItem) => item._id || item.id || '';

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      slug: '',
      author: 'Editorial Team',
      category: 'Engineering',
      tags: 'Next.js, React, Performance',
      summary: '',
      content: '<h2>Introduction</h2><p>Write your article body here...</p>',
      coverImageUrl: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: 'digital, technology, delhi',
      status: 'Published',
      isFeatured: false,
    });
    openCreateModal();
  };

  const handleOpenEdit = (item: BlogPostItem) => {
    setFormData({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
      seoKeywords: Array.isArray(item.seoKeywords) ? item.seoKeywords.join(', ') : item.seoKeywords || '',
    });
    openEditModal(item);
  };

  const handleTitleChange = (val: string) => {
    const slugVal = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : slugVal,
      seoTitle: prev.seoTitle ? prev.seoTitle : `${val} | Today Digitech`,
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
    const formattedTags = typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : formData.tags;
    const formattedKeywords = typeof formData.seoKeywords === 'string' ? formData.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean) : formData.seoKeywords;

    const payload = {
      ...formData,
      tags: formattedTags,
      seoKeywords: formattedKeywords,
      excerpt: formData.summary,
    };

    if (editingItem) {
      await handleUpdate(getItemId(editingItem), payload);
    } else {
      await handleCreate(payload);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return { bg: 'rgba(16,185,129,0.12)', color: 'var(--color-success)' };
      case 'Draft': return { bg: 'rgba(100,116,139,0.12)', color: '#64748B' };
      case 'Scheduled': return { bg: 'rgba(59,130,246,0.12)', color: 'var(--color-info)' };
      case 'Archived': return { bg: 'rgba(239,68,68,0.12)', color: 'var(--color-danger)' };
      default: return { bg: '#F1F5F9', color: '#64748B' };
    }
  };

  return (
    <ProtectedRoute requiredPermission="MANAGE_CONTENT">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <AdminSidebar
          currentPath="/admin/dashboard/blog"
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader
            title="Blog & Content Marketing CMS"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />

          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  Blog Article CMS Portal
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                  Publish SEO-ready blog posts with auto-slugs, tags, keywords, and TinyMCE Rich Editor.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={handleOpenCreate} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                  <Plus size={16} /> Create New Blog Post
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>

              {/* Status Filter Bar */}
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {statusFilters.map((sf) => (
                  <button
                    key={sf}
                    onClick={() => setStatusFilter(sf === 'ALL' ? '' : sf)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '9999px',
                      border: (statusFilter || 'ALL') === sf || (sf === 'ALL' && !statusFilter) ? 'none' : '1px solid var(--color-border)',
                      backgroundColor: (statusFilter || 'ALL') === sf || (sf === 'ALL' && !statusFilter) ? 'var(--color-primary-navy)' : '#F8FAFC',
                      color: (statusFilter || 'ALL') === sf || (sf === 'ALL' && !statusFilter) ? '#FFFFFF' : 'var(--color-heading)',
                      cursor: 'pointer',
                    }}
                  >
                    {sf}
                  </button>
                ))}
              </div>

              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading articles...</p>
                </div>
              ) : posts.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No blog posts published yet.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Article Details</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Category & Tags</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((item) => {
                      const id = getItemId(item);
                      const badge = getStatusColor(item.status);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {item.coverImageUrl && (
                                <img src={item.coverImageUrl} alt={item.title} style={{ width: '48px', height: '36px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #E2E8F0' }} />
                              )}
                              <div>
                                <div style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{item.title}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.125rem' }}>
                                  <Globe size={12} /> /{item.slug} • {item.author || 'Editorial'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <span style={{ display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.75rem', fontWeight: 700, width: 'fit-content' }}>
                                {item.category || 'Engineering'}
                              </span>
                              {item.tags && (
                                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                                  {Array.isArray(item.tags) ? item.tags.join(', ') : item.tags}
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <button
                              onClick={() => handleTogglePublish(id)}
                              style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', border: 'none', backgroundColor: badge.bg, color: badge.color, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              {item.status || 'Draft'}
                            </button>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Article" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => handleOpenEdit(item)} title="Edit Article" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Article" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Custom Full-Featured Blog CMS Creator Modal */}
            {isModalOpen && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(3, 23, 53, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '820px', maxHeight: '92vh', overflowY: 'auto', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={20} color="#FF6A00" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {editingItem ? 'Edit Blog Article' : 'Create SEO Blog Post'}
                      </h3>
                    </div>
                    <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                  </div>

                  <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Basic Info Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Article Title *</label>
                        <input
                          type="text"
                          required
                          value={formData.title || ''}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="e.g. Next.js Performance Optimization Guide"
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
                          placeholder="nextjs-performance-optimization-guide"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Author Name</label>
                        <input
                          type="text"
                          value={formData.author || ''}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          placeholder="Vikram Singh"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Category</label>
                        <select
                          value={formData.category || 'Engineering'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', backgroundColor: '#FFFFFF' }}
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="SEO & Marketing">SEO & Marketing</option>
                          <option value="Cloud & DevOps">Cloud & DevOps</option>
                          <option value="Design & UX">Design & UX</option>
                          <option value="Case Studies">Case Studies</option>
                          <option value="Company News">Company News</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Tags (Comma Separated)</label>
                        <input
                          type="text"
                          value={formData.tags as string || ''}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          placeholder="Next.js, React, Performance"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* SEO & Keywords Row */}
                    <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#07448D', fontWeight: 700, fontSize: '0.875rem' }}>
                        <Tag size={16} /> SEO Meta Title, Meta Description & Keywords
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                        <input
                          type="text"
                          value={formData.seoTitle || ''}
                          onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                          placeholder="SEO Meta Title..."
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', border: '1px solid #E2E8F0', borderRadius: '6px' }}
                        />
                        <input
                          type="text"
                          value={formData.seoKeywords as string || ''}
                          onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                          placeholder="SEO Keywords (comma separated)..."
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', border: '1px solid #E2E8F0', borderRadius: '6px' }}
                        />
                      </div>
                    </div>

                    {/* Cover Image Upload (Multer) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Cover Banner Image (Multer Engine Upload)</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={formData.coverImageUrl || ''}
                          onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                          placeholder="/uploads/blog-banner.png"
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
                          <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>✓ Cover Banner Image Attached</span>
                        </div>
                      )}
                    </div>

                    {/* Article Summary Excerpt */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Article Summary Excerpt (Short Card Description)</label>
                      <textarea
                        rows={2}
                        value={formData.summary || ''}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Brief summary displayed on blog cards..."
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>

                    {/* ReactQuill Rich Text Editor */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Full Article Content (React Quill Editor)</label>
                      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden' }}>
                        <ReactQuill
                          theme="snow"
                          value={formData.content || ''}
                          onChange={(contentValue) => setFormData((prev) => ({ ...prev, content: contentValue }))}
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, 3, 4, 5, 6, false] }],
                              ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                              [{ color: [] }, { background: [] }],
                              [{ align: [] }],
                              ['link', 'image', 'video'],
                              ['clean'],
                            ],
                          }}
                          placeholder="Write your blog article content here..."
                          style={{ minHeight: '260px' }}
                        />
                      </div>
                    </div>

                    {/* Footer Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
                      <button type="button" onClick={closeModal} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" disabled={submitting} style={{ padding: '0.625rem 1.5rem', backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                        {submitting ? 'Saving Article...' : 'Publish / Save Article'}
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
