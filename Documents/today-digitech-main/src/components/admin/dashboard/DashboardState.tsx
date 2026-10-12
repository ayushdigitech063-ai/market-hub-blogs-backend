import React from 'react';
import { AlertCircle, Inbox } from 'lucide-react';

export const DashboardSkeleton: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
    {Array.from({ length: 4 }, (_, index) => <div key={index} style={{ height: '150px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(90deg, #E2E8F0 0%, #F1F5F9 50%, #E2E8F0 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }} />)}
  </div>
);

export const DashboardEmptyState: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-body)' }}><Inbox size={24} style={{ marginBottom: '0.5rem' }} /><h4>{title}</h4><p>{description}</p></div>
);

export const DashboardErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFF5F5', borderRadius: 'var(--radius-lg)' }}><AlertCircle size={24} color="var(--color-danger)" /><p>{message}</p><button onClick={onRetry} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', color: '#FFFFFF', cursor: 'pointer' }}>Retry</button></div>
);
