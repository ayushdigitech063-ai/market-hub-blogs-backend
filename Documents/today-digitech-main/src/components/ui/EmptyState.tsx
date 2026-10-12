import React from 'react';
import { Inbox, AlertCircle } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There are currently no items to display.',
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px border-dash var(--color-border)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(6, 43, 99, 0.06)',
          color: 'var(--color-primary-navy)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        {icon || <Inbox size={28} />}
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.375rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--color-body)', maxWidth: '400px', marginBottom: actionText ? '1.25rem' : '0' }}>
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading content.',
  onRetry,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        backgroundColor: '#FFF5F5',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--color-danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <AlertCircle size={28} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.375rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--color-body)', maxWidth: '400px', marginBottom: onRetry ? '1.25rem' : '0' }}>
        {message}
      </p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
