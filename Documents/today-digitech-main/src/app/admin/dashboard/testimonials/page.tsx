'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, Trash2, Edit2, Star } from 'lucide-react';

export default function TestimonialsCmsPage() {
  const [testimonials, setTestimonials] = useState([
    { id: 'test-1', clientName: 'Rajesh Sharma', clientTitle: 'CTO', companyName: 'Fintech India Corp', rating: 5, status: 'Published', isFeatured: true },
    { id: 'test-2', clientName: 'Ananya Verma', clientTitle: 'VP Product', companyName: 'HealthCare Digital', rating: 5, status: 'Published', isFeatured: true },
    { id: 'test-3', clientName: 'Michael Miller', clientTitle: 'Head of Growth', companyName: 'Global Logistics Hub', rating: 5, status: 'Published', isFeatured: false },
  ]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/testimonials" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Client Testimonials CMS Manager" />

        <AdminContentContainer>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Client Testimonials & Reviews</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage social proof quotes, client ratings, photos, and featured homepage status.</p>
              </div>

              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                <Plus size={18} />
                <span>Add Testimonial</span>
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Client</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Company</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Rating</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Featured</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                      {item.clientName} ({item.clientTitle})
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{item.companyName}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B' }}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#F59E0B" />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: item.isFeatured ? 'rgba(255,106,0,0.1)' : 'rgba(100,116,139,0.1)', color: item.isFeatured ? 'var(--color-orange)' : '#64748B', fontSize: '0.75rem', fontWeight: 700 }}>
                        {item.isFeatured ? 'Featured' : 'Standard'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                        <button onClick={() => setTestimonials(testimonials.filter((t) => t.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminContentContainer>
      </div>
    </div>
  );
}
