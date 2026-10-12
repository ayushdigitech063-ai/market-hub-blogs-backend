'use client';

import React, { useState } from 'react';
import { Bell, User, LogOut, Shield, ChevronDown, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export interface AdminHeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
    window.location.href = '/admin/login';
  };

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 800,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Left Mobile Menu Toggle Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          className="admin-sidebar-toggle-btn"
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            cursor: 'pointer',
            color: '#031735',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Toggle Navigation Sidebar"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right Controls: Notification Bell & Profile Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Notification Icon */}
        <button
          style={{
            position: 'relative',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Notifications"
        >
          <Bell size={19} />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-orange)',
              borderRadius: '50%',
            }}
          />
        </button>

        {/* Profile Circle Avatar with Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#031735',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                border: '2px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : <User size={20} />}
            </div>
            <ChevronDown size={16} style={{ color: '#64748B', transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
          </button>

          {/* Profile Dropdown Menu */}
          {isDropdownOpen && (
            <div
              onMouseLeave={() => setIsDropdownOpen(false)}
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '240px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 15px 35px -5px rgba(3, 23, 53, 0.25)',
                border: '1px solid #E2E8F0',
                padding: '0.5rem',
                zIndex: 999,
                animation: 'fadeIn 0.15s ease-out',
              }}
            >
              {/* User Brief */}
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #F1F5F9', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0F172A', display: 'block', lineHeight: 1.2 }}>
                  {user?.name || 'Super Admin'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '0.15rem' }}>
                  {user?.email || 'admin@todaydigitech.com'}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.4rem', padding: '0.15rem 0.5rem', backgroundColor: 'rgba(255, 106, 0, 0.1)', color: 'var(--color-orange)', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 800 }}>
                  <Shield size={12} /> {user?.role || 'SUPER ADMIN'}
                </span>
              </div>

              {/* Profile Link */}
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push('/admin/profile');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#1E293B',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <User size={16} color="#64748B" /> View Profile & Settings
              </button>

              {/* Logout Button */}
              <button
                onClick={() => void handleLogout()}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#EF4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.06)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginTop: '0.25rem',
                }}
              >
                <LogOut size={16} color="#EF4444" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
