'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'slug' | 'textarea' | 'select' | 'switch' | 'number';
  required?: boolean;
  options?: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  slugFrom?: string;
}

interface CmsItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  initialValues?: Record<string, any> | null;
  onSubmit: (formData: Record<string, any>) => Promise<{ success: boolean; message?: string }>;
  isSubmitting?: boolean;
}

export const CmsItemModal: React.FC<CmsItemModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  initialValues,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setFormData({ ...initialValues });
    } else {
      const defaults: Record<string, any> = {};
      fields.forEach((f) => {
        if (f.type === 'switch') defaults[f.name] = false;
        else if (f.type === 'number') defaults[f.name] = 0;
        else if (f.type === 'select' && f.options && f.options.length > 0) defaults[f.name] = f.options[0].value;
        else defaults[f.name] = '';
      });
      setFormData(defaults);
    }
    setErrorMessage(null);
  }, [initialValues, fields, isOpen]);

  if (!isOpen) return null;

  const handleChange = (name: string, value: any) => {
    const updated = { ...formData, [name]: value };

    // Auto-generate slug if field type is slug and slugFrom matches
    fields.forEach((field) => {
      if (field.type === 'slug' && field.slugFrom === name && typeof value === 'string') {
        const generatedSlug = value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        updated[field.name] = generatedSlug;
      }
    });

    setFormData(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    for (const f of fields) {
      if (f.required && (formData[f.name] === undefined || formData[f.name] === '')) {
        setErrorMessage(`${f.label} is required.`);
        return;
      }
    }

    const result = await onSubmit(formData);
    if (!result.success) {
      setErrorMessage(result.message || 'Operation failed. Please check form data.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-heading)' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-body)',
              padding: '0.25rem',
              borderRadius: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {errorMessage && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  fontSize: '0.875rem',
                }}
              >
                {errorMessage}
              </div>
            )}

            {fields.map((f) => {
              return (
                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                    {f.label} {f.required && <span style={{ color: '#EF4444' }}>*</span>}
                  </label>

                  {f.type === 'text' || f.type === 'slug' ? (
                    <input
                      type="text"
                      value={formData[f.name] || ''}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.875rem',
                        outline: 'none',
                      }}
                    />
                  ) : f.type === 'number' ? (
                    <input
                      type="number"
                      value={formData[f.name] ?? 0}
                      onChange={(e) => handleChange(f.name, Number(e.target.value))}
                      placeholder={f.placeholder}
                      style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.875rem',
                        outline: 'none',
                      }}
                    />
                  ) : f.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      value={formData[f.name] || ''}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.875rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={formData[f.name] || ''}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                      style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.875rem',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      {f.options?.map((opt) => (
                        <option key={String(opt.value)} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === 'switch' ? (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={Boolean(formData[f.name])}
                        onChange={(e) => handleChange(f.name, e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-orange)' }}
                      />
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-heading)' }}>
                        {formData[f.name] ? 'Enabled / Active' : 'Disabled'}
                      </span>
                    </label>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Modal Actions */}
          <div
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#F8FAFC',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.75rem',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-heading)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: 'var(--color-orange)',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
