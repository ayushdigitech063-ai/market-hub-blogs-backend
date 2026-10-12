'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { NavigationItemDTO, NavigationLocation } from '@today-digitech/shared';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';
import { Plus, Trash2, Edit2, ArrowUp, ArrowDown, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

type NavItem = NavigationItemDTO & { _id?: string };

const getNavId = (item: NavItem): string => item.id || item._id || '';

const normalizeNavItem = (item: NavItem): NavItem => ({
  ...item,
  id: getNavId(item),
  isExternal: !!item.isExternal || item.href.startsWith('http'),
});

export default function NavigationManagementPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [title, setTitle] = useState('');
  const [href, setHref] = useState('');
  const [location, setLocation] = useState<NavigationLocation>('header');
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const loadNavigation = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await apiClient<NavItem[]>('/navigation');
    if (res.success && Array.isArray(res.data)) {
      setNavItems(res.data.map(normalizeNavItem));
    } else {
      setNavItems([]);
      setError(res.message || 'Unable to load navigation items.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadNavigation();
  }, [loadNavigation]);

  const resetForm = () => {
    setTitle('');
    setHref('');
    setLocation('header');
    setOpenInNewTab(false);
    setIsActive(true);
    setEditingItem(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: NavItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setHref(item.href);
    setLocation(item.location);
    setOpenInNewTab(item.openInNewTab);
    setIsActive(item.isActive);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const persistReorder = async (items: NavItem[]) => {
    const res = await apiClient('/navigation/reorder', {
      method: 'POST',
      body: JSON.stringify({
        items: items.map((item, index) => ({ id: getNavId(item), order: index + 1 })),
      }),
    });
    if (!res.success) {
      setError(res.message || 'Failed to save navigation order.');
      await loadNavigation();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      title: title.trim(),
      href: href.trim(),
      location,
      isExternal: href.trim().startsWith('http'),
      openInNewTab,
      isActive,
    };

    const res = editingItem
      ? await apiClient<NavItem>(`/navigation/${getNavId(editingItem)}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        })
      : await apiClient<NavItem>('/navigation', {
          method: 'POST',
          body: JSON.stringify({
            ...payload,
            order: navItems.filter((item) => item.location === location).length + 1,
          }),
        });

    setSaving(false);
    if (res.success) {
      closeModal();
      await loadNavigation();
    } else {
      setError(res.message || 'Failed to save navigation item.');
    }
  };

  const handleDelete = async (item: NavItem) => {
    if (!confirm(`Delete "${item.title}" from navigation?`)) return;
    setError('');
    const res = await apiClient(`/navigation/${getNavId(item)}`, { method: 'DELETE' });
    if (res.success) {
      await loadNavigation();
    } else {
      setError(res.message || 'Failed to delete navigation item.');
    }
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const locationFilter = activeTab === 'header' ? 'header' : (loc: string) => loc.startsWith('footer');
    const group = navItems
      .filter((item) => (activeTab === 'header' ? item.location === 'header' : item.location.startsWith('footer')))
      .sort((a, b) => a.order - b.order);

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= group.length) return;

    const updatedGroup = [...group];
    [updatedGroup[index], updatedGroup[targetIndex]] = [updatedGroup[targetIndex], updatedGroup[index]];

    const reorderedGroup = updatedGroup.map((item, idx) => ({ ...item, order: idx + 1 }));
    const otherItems = navItems.filter((item) =>
      activeTab === 'header' ? item.location !== 'header' : !item.location.startsWith('footer'),
    );

    setNavItems([...otherItems, ...reorderedGroup].sort((a, b) => a.location.localeCompare(b.location) || a.order - b.order));
    await persistReorder(reorderedGroup);
  };

  const filteredItems = navItems
    .filter((item) => (activeTab === 'header' ? item.location === 'header' : item.location.startsWith('footer')))
    .sort((a, b) => a.order - b.order);

  return (
    <ProtectedRoute requiredPermission="MANAGE_SETTINGS">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
        <AdminSidebar currentPath="/navigation" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title="Navigation Menu Builder & Link Ordering" />

          <AdminContentContainer>
            {error && (
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#FEF2F2', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>Navigation Menu Items</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', marginTop: '0.25rem' }}>
                    Manage links, ordering, external targets, and active menu visibility.
                  </p>
                </div>

                <button
                  onClick={openCreateModal}
                  disabled={loading}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.875rem', opacity: loading ? 0.7 : 1 }}
                >
                  <Plus size={18} />
                  <span>Add Navigation Item</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '1rem', padding: '1rem 1.5rem 0 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                {(['header', 'footer'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9375rem', fontWeight: 700, border: 'none', borderBottom: activeTab === tab ? '3px solid var(--color-primary-navy)' : '3px solid transparent', color: activeTab === tab ? 'var(--color-primary-navy)' : 'var(--color-body)', backgroundColor: 'transparent', cursor: 'pointer' }}
                  >
                    {tab === 'header' ? 'Desktop & Mobile Header Menu' : 'Footer Category Menus'}
                  </button>
                ))}
              </div>

              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <Loader2 size={24} style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem' }}>Loading navigation items...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No navigation items in this section yet.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-body)', fontWeight: 600 }}>
                      <th style={{ padding: '0.875rem 1.5rem', width: '60px' }}>Order</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Link Title</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Target Path (URL)</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Location</th>
                      <th style={{ padding: '0.875rem 1.5rem' }}>Status</th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, idx) => (
                      <tr key={getNavId(item)} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button onClick={() => void moveItem(idx, 'up')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowUp size={14} /></button>
                            <button onClick={() => void moveItem(idx, 'down')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowDown size={14} /></button>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <span>{item.title}</span>
                            {item.openInNewTab && <ExternalLink size={12} color="var(--color-orange)" />}
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{item.href}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.75rem', fontWeight: 700 }}>
                            {item.location}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: item.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: item.isActive ? 'var(--color-success)' : 'var(--color-danger)' }}>
                            {item.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button onClick={() => openEditModal(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit2 size={16} /></button>
                            <button onClick={() => void handleDelete(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {isModalOpen && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{editingItem ? 'Edit Navigation Item' : 'Add Navigation Menu Item'}</h3>
                  <form onSubmit={(e) => void handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" required placeholder="Link Title (e.g. Services)" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    <input type="text" required placeholder="Target Path / URL (e.g. /services)" value={href} onChange={(e) => setHref(e.target.value)} style={{ padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    <select value={location} onChange={(e) => setLocation(e.target.value as NavigationLocation)} style={{ padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <option value="header">Header Menu</option>
                      <option value="footer-quick">Footer Quick Links</option>
                      <option value="footer-services">Footer Services</option>
                      <option value="footer-legal">Footer Legal Links</option>
                    </select>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                      <input type="checkbox" checked={openInNewTab} onChange={(e) => setOpenInNewTab(e.target.checked)} />
                      <span>Open in new tab</span>
                    </label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                      <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                      <span>Active (visible on website)</span>
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button type="button" onClick={closeModal} style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" disabled={saving} style={{ padding: '0.5rem 1.25rem', backgroundColor: 'var(--color-primary-navy)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                        {saving ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
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
