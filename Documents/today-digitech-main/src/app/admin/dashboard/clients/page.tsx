'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2, Handshake, Upload, Search, RefreshCw } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';

export default function ClientsCmsPage() {
  const [clients, setClients] = useState([
    { id: 'cli-1', name: 'TATA', logoUrl: '', color: '#00539B', symbol: '🔷', status: 'Published' },
    { id: 'cli-2', name: 'PhonePe', logoUrl: '', color: '#5F259F', symbol: 'पे', status: 'Published' },
    { id: 'cli-3', name: 'ACKO', logoUrl: '', color: '#7B2CBF', symbol: '🟣', status: 'Published' },
    { id: 'cli-4', name: 'DREAM11', logoUrl: '', color: '#E10600', symbol: '🏆', status: 'Published' },
    { id: 'cli-5', name: 'zepto', logoUrl: '', color: '#FF0055', symbol: '', status: 'Published' },
    { id: 'cli-6', name: 'lenskart', logoUrl: '', color: '#000042', symbol: '👓', status: 'Published' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await apiClient<{ url: string }>('/settings/hero-image', {
        method: 'POST',
        body: formData,
      });

      const uploadedUrl = res.data?.url || (res as any).url;
      if (res.success && uploadedUrl) {
        setNewLogoUrl(uploadedUrl);
      }
    } catch {
      // fallback
    } finally {
      setUploading(false);
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;

    setClients([
      ...clients,
      {
        id: `cli-${Date.now()}`,
        name: newClientName,
        logoUrl: newLogoUrl,
        color: '#07448D',
        symbol: '🏢',
        status: 'Published',
      },
    ]);

    setNewClientName('');
    setNewLogoUrl('');
    setShowAddModal(false);
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <AdminSidebar
        currentPath="/admin/dashboard/clients"
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title="Trusted Brand Partners CMS"
          onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        />
        {/* Sleek Dark Integrated Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)',
            padding: '2.25rem 2rem',
            color: '#FFFFFF',
            boxShadow: '0 4px 20px rgba(3, 23, 53, 0.15)',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.35rem' }}>
                  <Handshake size={24} color="#FF6A00" />
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: '#FFFFFF' }}>
                    Trusted Brand Partners CMS
                  </h1>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: 0 }}>
                  Manage corporate client logos, partner brands, and trust icons displayed on the homepage Section 4.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#FF6A00',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(255, 106, 0, 0.35)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <Plus size={18} />
                <span>Add Partner Brand</span>
              </button>
            </div>

            {/* Controls Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Search partner brand name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 1rem 0.625rem 2.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                onClick={() => setSearchQuery('')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.625rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: '#E2E8F0',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <RefreshCw size={15} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Partner Brand Name</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Logo / Graphic Preview</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 800, color: '#0F172A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {item.symbol && <span style={{ fontSize: '1.1rem' }}>{item.symbol}</span>}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt={item.name} style={{ maxHeight: '28px', maxWidth: '100px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '1rem', fontWeight: 900, color: item.color || '#07448D' }}>
                          {item.name}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.25rem 0.65rem', borderRadius: '9999px', backgroundColor: 'rgba(16,185,129,0.12)', color: '#10B981', fontSize: '0.75rem', fontWeight: 800 }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button onClick={() => setClients(clients.filter((c) => c.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '0.35rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminContentContainer>
      </div>

      {/* Add Partner Brand Modal (Fully Responsive) */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Add Partner Brand Logo</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer', fontWeight: 700 }}>✕</button>
            </div>

            <form onSubmit={handleAddClient} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Brand Name</label>
                <input type="text" required value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="e.g. Infosys, Wipro, Google..." style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Logo Image Upload (Multer Engine)</label>
                
                <label
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: '12px',
                    padding: '1.25rem 1rem',
                    textAlign: 'center',
                    backgroundColor: uploading ? '#FEF3C7' : newLogoUrl ? '#F0FDF4' : '#F8FAFC',
                    borderColor: uploading ? '#F59E0B' : newLogoUrl ? '#10B981' : '#CBD5E1',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <input type="file" accept="image/*" onChange={(e) => void handleUpload(e)} disabled={uploading} style={{ display: 'none' }} />
                  
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: uploading ? '#FDE68A' : newLogoUrl ? '#D1FAE5' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={20} color={uploading ? '#B45309' : newLogoUrl ? '#059669' : '#07448D'} />
                  </div>

                  {uploading ? (
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#B45309' }}>Uploading image to Multer server...</span>
                  ) : newLogoUrl ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                      <img src={newLogoUrl} alt="Uploaded Logo" style={{ maxHeight: '45px', maxWidth: '140px', objectFit: 'contain' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669' }}>✓ File Uploaded: {newLogoUrl}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Click to change image</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#07448D' }}>Click to Browse & Upload Image File</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Supports PNG, SVG, JPG (Max 5MB)</span>
                    </div>
                  )}
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.625rem 1.5rem', backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
