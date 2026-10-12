'use client';

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultTabId }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || items[0]?.id || '');

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid var(--color-border)',
          marginBottom: '1.5rem',
          overflowX: 'auto',
        }}
      >
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: isActive ? 'var(--color-primary-navy)' : 'var(--color-body)',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--color-primary-navy)' : '3px solid transparent',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                marginBottom: '-2px',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div>{items.find((t) => t.id === activeTab)?.content}</div>
    </div>
  );
};
