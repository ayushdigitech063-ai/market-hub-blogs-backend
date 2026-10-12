'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  ChevronRight,
  Sparkles,
  Handshake,
  Globe,
  FolderGit2,
  Quote,
  Shield,
  Layers,
  HelpCircle,
  UserCheck,
  FileSpreadsheet,
  Search,
  Link2,
  History,
  X,
  Phone,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Permission } from '@today-digitech/shared';

export interface AdminSidebarProps {
  currentPath?: string;
  isCollapsed?: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  permission?: Permission;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPath,
  isCollapsed = false,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { hasPermission } = useAuth();
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  const menuItems: MenuItem[] = [
    { label: 'Overview', icon: <LayoutDashboard size={18} />, href: '/admin' },
    { label: 'Hero & Site Settings', icon: <Sparkles size={18} />, href: '/admin/settings' },
    { label: 'Services', icon: <Briefcase size={18} />, href: '/admin/dashboard/services' },
    { label: 'Solutions', icon: <FileText size={18} />, href: '/admin/dashboard/case-studies' },
    { label: 'Industries', icon: <Globe size={18} />, href: '/admin/dashboard/industries' },
    { label: 'Work', icon: <FolderGit2 size={18} />, href: '/admin/dashboard/portfolio' },
    { label: 'Pricing Packages', icon: <Layers size={18} />, href: '/admin/dashboard/packages' },
    { label: 'FAQs Accordions', icon: <HelpCircle size={18} />, href: '/admin/dashboard/faqs' },
    { label: 'About Us', icon: <Users size={18} />, href: '/admin/dashboard/team' },
    { label: 'Blog', icon: <FileText size={18} />, href: '/admin/dashboard/blog' },
    { label: 'Client Partners', icon: <Handshake size={18} />, href: '/admin/dashboard/clients' },
    { label: 'Leads & CRM', icon: <MessageSquare size={18} />, href: '/admin/dashboard/leads' },
    { label: 'User Roles & Access', icon: <Shield size={18} />, href: '/admin/users' },
  ];

  const visibleMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  const checkIsActive = (href: string) => {
    if (!activePath) return false;
    if (href === '/admin') {
      return activePath === '/admin' || activePath === '/admin/dashboard';
    }
    return activePath === href || activePath.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(3, 23, 53, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
        />
      )}

      <aside
        className={`admin-sidebar-aside ${isOpenMobile ? 'mobile-open' : ''}`}
        style={{
          width: isCollapsed ? '72px' : '260px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          backgroundColor: '#031735',
          color: '#94A3B8',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), width 200ms ease',
          zIndex: 999,
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            height: '70px',
            padding: '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF6A00 0%, #FF8A33 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(255, 106, 0, 0.3)',
              }}
            >
              <LayoutDashboard size={20} />
            </div>
            {!isCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  TD <span style={{ color: 'var(--color-orange)' }}>ADMIN</span>
                </span>
                <span style={{ fontSize: '0.625rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.1em' }}>
                  CONTROL PORTAL
                </span>
              </div>
            )}
          </div>

          {/* Close X Button for Mobile Drawer */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav
          style={{
            padding: '1rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {visibleMenuItems.map((item, idx) => {
            const isActive = checkIsActive(item.href);
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onCloseMobile}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  backgroundColor: isActive ? '#07448D' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(7, 68, 141, 0.4)' : 'none',
                  overflow: 'hidden',
                }}
              >
                {/* Left Curved Orange Indicator Pill */}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '6px',
                      backgroundColor: '#FF6A00',
                      borderTopRightRadius: '4px',
                      borderBottomRightRadius: '4px',
                    }}
                  />
                )}
                <span style={{ color: isActive ? '#FF6A00' : '#64748B', display: 'flex', transition: 'color 0.15s ease' }}>
                  {item.icon}
                </span>
                {!isCollapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
                {!isCollapsed && isActive && (
                  <ChevronRight size={14} style={{ color: '#FF6A00' }} />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
