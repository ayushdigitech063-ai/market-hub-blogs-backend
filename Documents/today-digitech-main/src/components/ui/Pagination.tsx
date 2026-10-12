import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.375rem',
        margin: '1.5rem 0',
      }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
          backgroundColor: '#FFFFFF',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              border: isActive ? 'none' : '1px solid var(--color-border)',
              backgroundColor: isActive ? 'var(--color-primary-navy)' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : 'var(--color-heading)',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
          backgroundColor: '#FFFFFF',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
