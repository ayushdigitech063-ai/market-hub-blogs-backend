'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';
import { Search, Phone, Mail, MessageSquare, Download, Eye, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';

interface NoteItem {
  id?: string;
  _id?: string;
  note: string;
  author: string;
  createdAt: string;
}

interface LeadItem {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  interestedService?: string;
  budget?: string;
  website?: string;
  message?: string;
  leadSource?: string;
  formType: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST' | 'SPAM';
  isDuplicate?: boolean;
  notes?: NoteItem[];
  createdAt: string;
}

export default function LeadsCrmPage() {
  const [activeStatus, setActiveStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [leadsList, setLeadsList] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNote, setNewNote] = useState<string>('');

  const statuses = ['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST', 'SPAM'];

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (activeStatus !== 'ALL') query.append('status', activeStatus);
      if (searchQuery) query.append('search', searchQuery);

      const res = await apiClient<LeadItem[]>(`/leads?${query.toString()}`);
      if (res.success && Array.isArray(res.data)) {
        setLeadsList(res.data);
      } else {
        setLeadsList([]);
      }
    } catch {
      setLeadsList([]);
    } finally {
      setLoading(false);
    }
  }, [activeStatus, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await apiClient(`/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.success) {
        setLeadsList((prev) => prev.map((l) => ((l._id || l.id) === id ? { ...l, status: newStatus as any } : l)));
        if (selectedLead && (selectedLead._id || selectedLead.id) === id) {
          setSelectedLead({ ...selectedLead, status: newStatus as any });
        }
      }
    } catch {
      alert('Failed to update status');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead) return;

    const leadId = selectedLead._id || selectedLead.id;
    if (!leadId) return;

    try {
      const res = await apiClient<LeadItem>(`/leads/${leadId}`, {
        method: 'PATCH',
        body: JSON.stringify({ note: newNote.trim() }),
      });

      if (res.success && res.data) {
        setSelectedLead(res.data);
        setLeadsList((prev) => prev.map((l) => ((l._id || l.id) === leadId ? res.data! : l)));
        setNewNote('');
      }
    } catch {
      alert('Failed to add note');
    }
  };

  const getItemId = (item: LeadItem) => item._id || item.id || '';

  return (
    <ProtectedRoute requiredPermission="MANAGE_INQUIRIES">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <AdminSidebar currentPath="/admin/dashboard/leads" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Lead Generation & CRM Dashboard" />

          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.75rem 2rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  Lead Generation & CRM Center
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>
                  Manage incoming client inquiries, project quotes, and tech audit submissions.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => void fetchLeads()} disabled={loading} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '0.55rem 1.125rem', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <RefreshCw size={15} /> Refresh Leads
                </button>
              </div>
            </div>

            {/* Metrics Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-body)' }}>Total Inquiries</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-heading)', marginTop: '0.25rem' }}>{leadsList.length}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-body)' }}>New Uncontacted Leads</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-orange)', marginTop: '0.25rem' }}>
                  {leadsList.filter((l) => l.status === 'NEW').length}
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-body)' }}>Qualified Opportunities</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-royal-blue)', marginTop: '0.25rem' }}>
                  {leadsList.filter((l) => l.status === 'QUALIFIED').length}
                </div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-body)' }}>Won Conversion Rate</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '0.25rem' }}>
                  {leadsList.length > 0 ? `${((leadsList.filter((l) => l.status === 'WON').length / leadsList.length) * 100).toFixed(1)}%` : '0%'}
                </div>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {statuses.map((st) => (
                    <button
                      key={st}
                      onClick={() => setActiveStatus(st)}
                      style={{
                        padding: '0.375rem 0.875rem',
                        borderRadius: '9999px',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        backgroundColor: activeStatus === st ? 'var(--color-primary-navy)' : '#F1F5F9',
                        color: activeStatus === st ? '#FFFFFF' : 'var(--color-body)',
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative', width: '220px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      placeholder="Search lead..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '0.375rem 0.75rem 0.375rem 2.25rem', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <a
                    href="/api/v1/leads/export/csv"
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: '#FFFFFF', fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-heading)', textDecoration: 'none' }}
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </a>
                </div>
              </div>

              {/* Data Table */}
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading inquiry records...</p>
                </div>
              ) : leadsList.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No inquiry leads found.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Lead Contact</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Business Name</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Form / Service</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Shortcuts</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsList.map((item) => {
                      const id = getItemId(item);
                      return (
                        <tr key={id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div>
                                <div style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{item.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.email}</div>
                              </div>
                              {item.isDuplicate && (
                                <span title="Duplicate Lead" style={{ color: '#D97706' }}><AlertTriangle size={14} /></span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.businessName || 'N/A'}</td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--color-primary-navy)' }}>{item.formType}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.interestedService || 'General'}</div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange(id, e.target.value)}
                              style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: 700 }}
                            >
                              {statuses.filter((s) => s !== 'ALL').map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              {item.phone && (
                                <>
                                  <a href={`tel:${item.phone}`} title="Call Direct" style={{ padding: '0.375rem', backgroundColor: '#F1F5F9', borderRadius: '4px', color: 'var(--color-primary-navy)' }}><Phone size={14} /></a>
                                  <a href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" title="WhatsApp Direct" style={{ padding: '0.375rem', backgroundColor: '#DCFCE7', borderRadius: '4px', color: 'var(--color-success)' }}><MessageSquare size={14} /></a>
                                </>
                              )}
                              <a href={`mailto:${item.email}`} title="Email Direct" style={{ padding: '0.375rem', backgroundColor: '#FEF3C7', borderRadius: '4px', color: '#D97706' }}><Mail size={14} /></a>
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <button onClick={() => setSelectedLead(item)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: 'var(--color-primary-navy)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8125rem' }}>
                              <Eye size={14} /> Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Lead Inspector Modal */}
            {selectedLead && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1100, backgroundColor: 'rgba(4,31,73,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '720px', maxHeight: '85vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Lead Inspector: {selectedLead.name}</h3>
                    <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800 }}>✕</button>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Full Inquiry Details & Info Grid */}
                    <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
                        <div><strong style={{ color: '#0F172A' }}>Email:</strong> <span style={{ color: '#07448D', fontWeight: 600 }}>{selectedLead.email}</span></div>
                        <div><strong style={{ color: '#0F172A' }}>Phone:</strong> {selectedLead.phone || 'N/A'}</div>
                        <div><strong style={{ color: '#0F172A' }}>Business Name:</strong> {selectedLead.businessName || 'N/A'}</div>
                        <div><strong style={{ color: '#0F172A' }}>Form Type:</strong> <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#E0F2FE', color: '#0369A1', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>{selectedLead.formType}</span></div>
                        <div><strong style={{ color: '#0F172A' }}>Requested Service:</strong> {selectedLead.interestedService || 'N/A'}</div>
                        <div><strong style={{ color: '#0F172A' }}>Budget Range:</strong> {selectedLead.budget || 'N/A'}</div>
                        <div><strong style={{ color: '#0F172A' }}>Website URL:</strong> {selectedLead.website ? <a href={selectedLead.website} target="_blank" rel="noreferrer" style={{ color: '#FF6A00', fontWeight: 700 }}>{selectedLead.website}</a> : 'N/A'}</div>
                        <div><strong style={{ color: '#0F172A' }}>Lead Source:</strong> {selectedLead.leadSource || 'Organic Website'}</div>
                      </div>

                      {/* Full User Inquiry Message */}
                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.875rem' }}>
                        <strong style={{ fontSize: '0.875rem', color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>User Inquiry Message / Requirements:</strong>
                        <div style={{ backgroundColor: '#FFFFFF', padding: '0.875rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                          {selectedLead.message || 'No additional message provided by user.'}
                        </div>
                      </div>
                    </div>

                    {/* Notes Timeline */}
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Internal CRM Notes</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '160px', overflowY: 'auto', marginBottom: '1rem' }}>
                        {!selectedLead.notes || selectedLead.notes.length === 0 ? (
                          <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>No internal notes recorded yet.</span>
                        ) : (
                          selectedLead.notes.map((n, idx) => (
                            <div key={n.id || idx} style={{ backgroundColor: '#F8FAFC', padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}>
                              <div style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{n.author}</div>
                              <div style={{ color: 'var(--color-body)' }}>{n.note}</div>
                            </div>
                          ))
                        )}
                      </div>

                      <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="Add internal note..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                        />
                        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-primary-navy)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                          Add Note
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
