'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { User, Shield, Lock, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';

export default function ProfilePage() {
  const { user, refreshSession } = useAuth();
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccessMsg('');
    setErrorMsg('');

    const res = await apiClient('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });

    setIsUpdating(false);
    if (res.success) {
      setSuccessMsg('Profile details updated successfully.');
      await refreshSession();
    } else {
      setErrorMsg(res.message || 'Failed to update profile.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccessMsg('');
    setErrorMsg('');

    const res = await apiClient('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    setIsUpdating(false);
    if (res.success) {
      setSuccessMsg('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setErrorMsg(res.message || 'Failed to change password.');
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <AdminSidebar currentPath="/profile" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Admin Profile & Security Settings" />

          <AdminContentContainer>
            {successMsg && (
              <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
              {/* Profile Info Form */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(6,43,99,0.06)', color: 'var(--color-primary-navy)' }}>
                    <User size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Profile Details</h3>
                </div>

                <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: '#F8FAFC', color: '#64748B' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Role & Authority</label>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.1)', color: 'var(--color-orange)', fontSize: '0.8125rem', fontWeight: 700, width: 'fit-content' }}>
                      <Shield size={14} />
                      <span>{user?.role} ({user?.role === 'Super Admin' ? 'Full Authority' : 'Assigned Permissions'})</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', backgroundColor: 'var(--color-primary-navy)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem' }}
                  >
                    <Save size={16} />
                    <span>{isUpdating ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </form>
              </div>

              {/* Change Password Form */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(255,106,0,0.08)', color: 'var(--color-orange)' }}>
                    <Lock size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Security & Password</h3>
                </div>

                <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-accent)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem' }}
                  >
                    <Lock size={16} />
                    <span>{isUpdating ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </form>
              </div>
            </div>
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
