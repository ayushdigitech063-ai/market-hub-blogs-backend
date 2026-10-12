import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, type, message, onDismiss }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return { icon: <CheckCircle2 size={18} color="var(--color-success)" />, border: '1px solid rgba(16, 185, 129, 0.3)', bg: '#F0FDF4' };
      case 'warning':
        return { icon: <AlertTriangle size={18} color="var(--color-warning)" />, border: '1px solid rgba(245, 158, 11, 0.3)', bg: '#FFFBEB' };
      case 'error':
        return { icon: <AlertCircle size={18} color="var(--color-danger)" />, border: '1px solid rgba(239, 68, 68, 0.3)', bg: '#FEF2F2' };
      case 'info':
      default:
        return { icon: <Info size={18} color="var(--color-info)" />, border: '1px solid rgba(59, 130, 246, 0.3)', bg: '#EFF6FF' };
    }
  };

  const config = getTypeStyles();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.875rem 1.125rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: config.bg,
        border: config.border,
        boxShadow: 'var(--shadow-lg)',
        minWidth: '280px',
        maxWidth: '400px',
      }}
    >
      {config.icon}
      <span style={{ fontSize: '0.9375rem', color: 'var(--color-heading)', fontWeight: 500, flex: 1 }}>
        {message}
      </span>
      <button
        onClick={() => onDismiss(id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};
