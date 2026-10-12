'use client';

import React, { useState } from 'react';
import { Search, Check, X } from 'lucide-react';

export interface MediaItem {
  id: string;
  url: string;
  fileName: string;
  folder: string;
  fileType: string;
  fileSize: string;
}

export interface MediaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
}

export const MediaSelectionModal: React.FC<MediaSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const mockMediaItems: MediaItem[] = [
    { id: 'm-1', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500', fileName: 'hero-dashboard.jpg', folder: 'branding', fileType: 'image/jpeg', fileSize: '240 KB' },
    { id: 'm-2', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500', fileName: 'nextjs-architecture.png', folder: 'services', fileType: 'image/png', fileSize: '410 KB' },
    { id: 'm-3', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500', fileName: 'engineering-team.webp', folder: 'team', fileType: 'image/webp', fileSize: '180 KB' },
    { id: 'm-4', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500', fileName: 'cloud-infrastructure.jpg', folder: 'blogs', fileType: 'image/jpeg', fileSize: '320 KB' },
  ];

  if (!isOpen) return null;

  const filteredItems = mockMediaItems.filter((item) => {
    const matchesFolder = activeFolder === 'all' || item.folder === activeFolder;
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const selectedItem = mockMediaItems.find((i) => i.id === selectedId);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(4, 31, 73, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '80vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)' }}>Select Media Asset</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {['all', 'branding', 'services', 'blogs', 'team', 'portfolio'].map((folder) => (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                style={{
                  padding: '0.375rem 0.875rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  border: activeFolder === folder ? 'none' : '1px solid var(--color-border)',
                  backgroundColor: activeFolder === folder ? 'var(--color-primary-navy)' : '#FFFFFF',
                  color: activeFolder === folder ? '#FFFFFF' : 'var(--color-heading)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {folder}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.375rem 0.75rem 0.375rem 2.25rem', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
            />
          </div>
        </div>

        {/* Media Grid */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '3px solid var(--color-orange)' : '1px solid var(--color-border)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF',
                  boxShadow: isSelected ? 'var(--shadow-accent)' : 'var(--shadow-sm)',
                }}
              >
                <img src={item.url} alt={item.fileName} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                {isSelected && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-orange)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} />
                  </div>
                )}
                <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--color-heading)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.fileName}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>
            {selectedItem ? `Selected: ${selectedItem.fileName}` : 'Select an asset from library'}
          </span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose} style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer' }}>Cancel</button>
            <button
              disabled={!selectedItem}
              onClick={() => { if (selectedItem) { onSelect(selectedItem); onClose(); } }}
              style={{ padding: '0.5rem 1.25rem', backgroundColor: 'var(--color-primary-navy)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: selectedItem ? 'pointer' : 'not-allowed', opacity: selectedItem ? 1 : 0.6 }}
            >
              Insert Selected Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
