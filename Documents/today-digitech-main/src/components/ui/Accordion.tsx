'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultExpandedId?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultExpandedId }) => {
  const [expandedId, setExpandedId] = useState<string | null>(defaultExpandedId || null);

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        const buttonId = `accordion-btn-${item.id}`;
        const contentId = `accordion-content-${item.id}`;

        return (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              transition: 'all var(--transition-fast)',
            }}
          >
            <button
              id={buttonId}
              type="button"
              role="button"
              aria-expanded={isExpanded}
              aria-controls={contentId}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--color-heading)',
                minHeight: '44px',
              }}
            >
              <span>{item.title}</span>
              <ChevronDown
                size={18}
                style={{
                  color: 'var(--color-orange)',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--transition-fast)',
                  flexShrink: 0,
                }}
              />
            </button>

            {isExpanded && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={buttonId}
                style={{
                  padding: '0 1.5rem 1.25rem 1.5rem',
                  fontSize: '0.9375rem',
                  color: 'var(--color-body)',
                  lineHeight: 1.7,
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '1rem',
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
