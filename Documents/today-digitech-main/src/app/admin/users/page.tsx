'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Plus, ShieldCheck, User, Trash2, Edit2, Lock, UserPlus } from 'lucide-react';

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Vikram Sharma', email: 'vikram@todaydigitech.com', role: 'Super Admin', isSuperAdmin: true, status: 'Active' },
    { id: 'usr-2', name: 'Ananya Roy', email: 'ananya@todaydigitech.com', role: 'Content Manager', isSuperAdmin: false, status: 'Active' },
    { id: 'usr-3', name: 'Rohan Mehta', email: 'rohan@todaydigitech.com', role: 'SEO Manager', isSuperAdmin: false, status: 'Active' },
    { id: 'usr-4', name: 'Pooja Kapoor', email: 'pooja@todaydigitech.com', role: 'Sales Executive', isSuperAdmin: false, status: 'Disabled' },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Content Manager');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: `usr-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      isSuperAdmin: false,
      status: 'Active',
    };
    setUsers([...users, newUser]);
    setIsCreateModalOpen(false);
    setNewName('');
    setNewEmail('');
  };

  const handleDeleteUser = (id: string, isSuperAdmin: boolean) => {
    if (isSuperAdmin) {
      alert('Forbidden: Primary Super Admin account cannot be deleted!');
      return;
    }
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <AdminSidebar currentPath="/admin/users" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Admin User Management" />

        <AdminContentContainer>
          {/* Header Banner */}
          <div style={{ padding: '1.75rem 2rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                Users & Roles Governance
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>
                Manage team administrator permissions, authority levels, and access credentials.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setIsCreateModalOpen(true)} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                <UserPlus size={16} /> Add Admin User
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                  Administrator Accounts & Authority
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', marginTop: '0.25rem' }}>
                  Manage admin user access, role assignments, and account status.
                </p>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}
              >
                <Plus size={18} />
                <span>Create Admin User</span>
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Admin Name</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Work Email</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Assigned Role</th>
                  <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((usr) => (
                  <tr key={usr.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={16} />
                        </div>
                        <span>{usr.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{usr.email}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: usr.isSuperAdmin ? 'rgba(255,106,0,0.1)' : 'rgba(6,43,99,0.08)', color: usr.isSuperAdmin ? 'var(--color-orange)' : 'var(--color-primary-navy)' }}>
                        {usr.isSuperAdmin && <ShieldCheck size={12} />}
                        {usr.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: usr.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: usr.status === 'Active' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                        {usr.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                          <Edit2 size={16} />
                        </button>
                        {usr.isSuperAdmin ? (
                          <span title="Super Admin Protected">
                            <Lock size={16} color="#94A3B8" />
                          </span>
                        ) : (
                          <button onClick={() => handleDeleteUser(usr.id, usr.isSuperAdmin)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}>
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create User Modal */}
          {isCreateModalOpen && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Create New Admin Account</h3>
                <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" required placeholder="Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                  <input type="email" required placeholder="Work Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                  <select value={newRole} onChange={(e) => setNewRole(e.target.value)} style={{ padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <option value="Admin">Admin</option>
                    <option value="Content Manager">Content Manager</option>
                    <option value="SEO Manager">SEO Manager</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Sales Executive">Sales Executive</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button type="button" onClick={() => setIsCreateModalOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" style={{ padding: '0.5rem 1.25rem', backgroundColor: 'var(--color-primary-navy)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>Create User</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </AdminContentContainer>
      </div>
    </div>
  );
}
