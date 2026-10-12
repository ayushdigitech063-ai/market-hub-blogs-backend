'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { useCmsManager } from '@/hooks/useCmsManager';
import { Plus, Trash2, Edit2, Copy, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

interface SolutionItem {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  summary: string;
  metrics?: string;
  features?: string[] | string;
  status: 'Published' | 'Draft';
}

const defaultSolutionsList: SolutionItem[] = [
  {
    id: 'sol-1',
    title: 'Enterprise Cloud & Microservices Migration',
    category: 'Cloud & Infrastructure',
    summary: 'Zero-downtime modernization of legacy monolith systems into auto-scaling Kubernetes microservices.',
    metrics: '99.99% Uptime Guarantee',
    features: ['Multi-Region AWS Deployment', 'Kubernetes HPA Auto-Scaling', 'Automated CI/CD Security'],
    status: 'Published',
  },
  {
    id: 'sol-2',
    title: 'Generative AI & Enterprise Data Engineering',
    category: 'AI & Machine Learning',
    summary: 'Automate high-volume workflows with custom fine-tuned LLMs, RAG knowledge bases, and real-time data pipelines.',
    metrics: '4.5x Operational Velocity',
    features: ['Custom RAG Knowledge Engines', 'Automated Document Processing', 'Real-Time Vector Database'],
    status: 'Published',
  },
  {
    id: 'sol-3',
    title: 'High-Frequency Fintech & Payment Gateways',
    category: 'Fintech & Security',
    summary: 'Bank-grade encrypted transaction processing systems built for sub-millisecond execution speeds.',
    metrics: '10M+ Daily API Transactions',
    features: ['PCI-DSS Level 1 Compliance', 'Real-Time Fraud Detection ML', 'Distributed Ledger'],
    status: 'Published',
  },
];

export default function SolutionsCmsPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    items: solutions,
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
  } = useCmsManager<SolutionItem>('case-studies', { page: 1, limit: 20 }, defaultSolutionsList);

  const [formData, setFormData] = useState<Partial<SolutionItem>>({
    title: '',
    category: 'Cloud & Infrastructure',
    summary: '',
    metrics: '99.99% Uptime Guarantee',
    features: 'Multi-Region AWS & Azure Deployment\nKubernetes HPA Auto-Scaling\nAutomated CI/CD Pipelines',
    status: 'Published',
  });

  const getItemId = (item: SolutionItem) => item._id || item.id || '';

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      category: 'Cloud & Infrastructure',
      summary: '',
      metrics: '99.99% Uptime Guarantee',
      features: 'Multi-Region AWS Deployment\nKubernetes HPA Auto-Scaling\nAutomated CI/CD Security',
      status: 'Published',
    });
    openCreateModal();
  };

  const handleOpenEdit = (item: SolutionItem) => {
    setFormData({
      ...item,
      features: Array.isArray(item.features) ? item.features.join('\n') : item.features || '',
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
          currentPath="/admin/dashboard/case-studies"
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader
            title="Solutions Card CMS Portal"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />

          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.5rem 1.75rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  Solutions Page CMS Manager
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                  Manage the exact Solutions cards (Category Badge, Title, Excerpt, Metrics Callout & Feature Checklists).
                </p>
              </div>

              <button onClick={handleOpenCreate} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                <Plus size={16} /> Create Solution Card
              </button>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading solutions...</p>
                </div>
              ) : solutions.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No solution cards added yet.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Solution Title</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Category & Metrics</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Features Keyed</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solutions.map((item) => {
                      const id = getItemId(item);
                      const featureList = Array.isArray(item.features) ? item.features : [];
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                            {item.title}
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(7,68,141,0.08)', color: '#07448D', fontSize: '0.75rem', fontWeight: 700, width: 'fit-content' }}>
                                {item.category}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#FF6A00', fontWeight: 700 }}>
                                ⚡ {item.metrics || 'High Performance'}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', color: '#64748B', fontSize: '0.75rem' }}>
                            {featureList.length} Checkpoints Keyed
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
                              <button onClick={() => handleDuplicate(id)} title="Duplicate Card" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Copy size={16} /></button>
                              <button onClick={() => handleOpenEdit(item)} title="Edit Card" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(id)} title="Delete Card" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Custom Solution Modal */}
            {isModalOpen && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(3, 23, 53, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={20} color="#FF6A00" />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {editingItem ? 'Edit Solution Card' : 'Create New Solution Card'}
                      </h3>
                    </div>
                    <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                  </div>

                  <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Solution Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Enterprise Cloud & Microservices Migration"
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Category Badge</label>
                        <input
                          type="text"
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="Cloud & Infrastructure"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Highlight Metric Callout</label>
                        <input
                          type="text"
                          value={formData.metrics || ''}
                          onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                          placeholder="99.99% Uptime Guarantee"
                          style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Summary Description</label>
                      <textarea
                        rows={3}
                        value={formData.summary || ''}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Zero-downtime modernization of legacy monolith systems into auto-scaling Kubernetes microservices."
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Feature Checkpoints (One per line)</label>
                      <textarea
                        rows={4}
                        value={formData.features as string || ''}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        placeholder="Multi-Region AWS & Azure Deployment&#10;Kubernetes HPA Auto-Scaling&#10;Automated CI/CD Pipelines & Security"
                        style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontFamily: 'monospace' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button type="button" onClick={closeModal} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" disabled={submitting} style={{ padding: '0.625rem 1.5rem', backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                        {submitting ? 'Saving Card...' : 'Save & Publish Solution'}
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
