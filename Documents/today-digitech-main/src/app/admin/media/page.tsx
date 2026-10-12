'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { Upload, Grid, List, Search, Copy, Trash2, Eye, Check } from 'lucide-react';

export default function AdminMediaLibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<any | null>(null);

  const folders = [
    'all',
    'branding',
    'services',
    'industries',
    'blogs',
    'case-studies',
    'portfolio',
    'testimonials',
    'team',
    'careers',
  ];

  const [mediaList, setMediaList] = useState([
    { id: 'med-1', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', fileName: 'hero-banner-main.jpg', folder: 'branding', fileType: 'image/jpeg', fileSize: '340 KB', dimensions: '1920x1080', altText: 'Today Digitech Platform Architecture', caption: 'Official hero banner asset', credit: 'Design Team' },
    { id: 'med-2', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600', fileName: 'nextjs-portal-diagram.png', folder: 'services', fileType: 'image/png', fileSize: '520 KB', dimensions: '1200x800', altText: 'Next.js App Router Architecture', caption: 'High performance portal flow', credit: 'Engineering Team' },
    { id: 'med-3', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600', fileName: 'engineering-team-delhi.webp', folder: 'team', fileType: 'image/webp', fileSize: '210 KB', dimensions: '1000x667', altText: 'Senior Software Engineers', caption: 'New Delhi innovation hub team', credit: 'HR Team' },
    { id: 'med-4', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600', fileName: 'cloud-devops-insights.jpg', folder: 'blogs', fileType: 'image/jpeg', fileSize: '290 KB', dimensions: '1400x900', altText: 'Cloud Architecture & Microservices', caption: 'Blog article cover', credit: 'Content Team' },
    { id: 'med-5', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600', fileName: 'mobile-app-ui-mockup.png', folder: 'portfolio', fileType: 'image/png', fileSize: '480 KB', dimensions: '1100x850', altText: 'Fitness Mobile Application Mockup', caption: 'Client case study mockup', credit: 'UI/UX Studio' },
  ]);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this media asset from Cloudinary and database?')) {
      setMediaList(mediaList.filter((m) => m.id !== id));
      if (previewItem?.id === id) setPreviewItem(null);
    }
  };

  const filteredMedia = mediaList.filter((item) => {
    const matchesFolder = activeFolder === 'all' || item.folder === activeFolder;
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) || item.altText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <AdminSidebar currentPath="/admin/content" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader title="Cloudinary Media Library & Asset Manager" />

        <AdminContentContainer>
          {/* Top Bar Actions */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>Cloudinary Media Assets</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>Manage image uploads, folder structures, alt text, and media replacement.</p>
              </div>

              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--gradient-brand)', color: '#FFFFFF', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}>
                <Upload size={18} />
                <span>Upload New Asset</span>
                <input type="file" accept="image/*" style={{ display: 'none' }} />
              </label>
            </div>

            {/* Folder Tabs & Search & View Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              {/* Folder Selector */}
              <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', maxWidth: '70%' }}>
                {folders.map((folder) => (
                  <button
                    key={folder}
                    onClick={() => setActiveFolder(folder)}
                    style={{
                      padding: '0.375rem 0.875rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      borderRadius: '9999px',
                      border: activeFolder === folder ? 'none' : '1px solid var(--color-border)',
                      backgroundColor: activeFolder === folder ? 'var(--color-primary-navy)' : '#F8FAFC',
                      color: activeFolder === folder ? '#FFFFFF' : 'var(--color-heading)',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {folder}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Search Bar */}
                <div style={{ position: 'relative', width: '220px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    type="text"
                    placeholder="Search media..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '0.375rem 0.75rem 0.375rem 2.25rem', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                  />
                </div>

                {/* Grid / List Toggle */}
                <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    style={{ padding: '0.375rem 0.625rem', border: 'none', backgroundColor: viewMode === 'grid' ? 'var(--color-primary-navy)' : '#FFFFFF', color: viewMode === 'grid' ? '#FFFFFF' : '#64748B', cursor: 'pointer' }}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{ padding: '0.375rem 0.625rem', border: 'none', backgroundColor: viewMode === 'list' ? 'var(--color-primary-navy)' : '#FFFFFF', color: viewMode === 'list' ? '#FFFFFF' : '#64748B', cursor: 'pointer' }}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid View Mode */}
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {filteredMedia.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '160px', backgroundColor: '#F8FAFC', overflow: 'hidden' }}>
                    <img src={item.url} alt={item.altText} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '8px', left: '8px', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(4,31,73,0.75)', color: '#FFFFFF', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {item.folder}
                    </span>
                  </div>

                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.fileName}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {item.dimensions} • {item.fileSize}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
                      <button
                        onClick={() => handleCopyUrl(item.id, item.url)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: copiedId === item.id ? 'var(--color-success)' : 'var(--color-royal-blue)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedId === item.id ? 'Copied!' : 'Copy URL'}</span>
                      </button>

                      <div style={{ display: 'flex', gap: '0.375rem' }}>
                        <button onClick={() => setPreviewItem(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                          <Eye size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View Mode */
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Asset Preview</th>
                    <th style={{ padding: '0.875rem 1.5rem' }}>File Name</th>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Folder</th>
                    <th style={{ padding: '0.875rem 1.5rem' }}>Size & Dim</th>
                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1.5rem' }}>
                        <img src={item.url} alt={item.altText} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                      </td>
                      <td style={{ padding: '0.75rem 1.5rem', fontWeight: 700, color: 'var(--color-heading)' }}>{item.fileName}</td>
                      <td style={{ padding: '0.75rem 1.5rem' }}>
                        <span style={{ padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.75rem', fontWeight: 700 }}>
                          {item.folder}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1.5rem', color: '#64748B' }}>{item.fileSize} ({item.dimensions})</td>
                      <td style={{ padding: '0.75rem 1.5rem', textAlign: 'right' }}>
                        <button onClick={() => handleCopyUrl(item.id, item.url)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-royal-blue)', fontWeight: 600, marginRight: '0.75rem' }}>
                          {copiedId === item.id ? 'Copied' : 'Copy Link'}
                        </button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Media Inspector Modal */}
          {previewItem && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1050, backgroundColor: 'rgba(4,31,73,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '720px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Media Asset Inspector</h3>
                  <button onClick={() => setPreviewItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                </div>
                <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <img src={previewItem.url} alt={previewItem.altText} style={{ width: '100%', borderRadius: 'var(--radius-md)', objectFit: 'cover', maxHeight: '280px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div><strong>File Name:</strong> {previewItem.fileName}</div>
                    <div><strong>Cloudinary Folder:</strong> {previewItem.folder}</div>
                    <div><strong>Format:</strong> {previewItem.fileType}</div>
                    <div><strong>Size:</strong> {previewItem.fileSize}</div>
                    <div><strong>Dimensions:</strong> {previewItem.dimensions}</div>
                    <div><strong>Alt Text:</strong> {previewItem.altText}</div>
                    <div><strong>Caption:</strong> {previewItem.caption}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AdminContentContainer>
      </div>
    </div>
  );
}
