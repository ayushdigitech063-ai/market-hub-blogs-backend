'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LeadSubmissionPayload } from '@today-digitech/shared';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { PublicApiError, submitPublicLead } from '../../lib/publicApi';
import { fetchPublicSettings } from '../../lib/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interestedService: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  interestedService: 'Web Engineering',
  message: '',
};

const validateContactForm = (data: ContactFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (data.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.phone.trim() && data.phone.replace(/\D/g, '').length < 8) errors.phone = 'Please enter a valid phone number.';
  if (data.message.trim().length < 10) errors.message = 'Please provide at least 10 characters about your project.';
  return errors;
};

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isRetryable, setIsRetryable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ id: string; message: string } | null>(null);
  const [liveAddress, setLiveAddress] = useState('Connaught Place, Central Business District, New Delhi 110001, India');
  const [livePhone, setLivePhone] = useState('+91 98765 43210');
  const [liveEmail, setLiveEmail] = useState('info@todaydigitech.com');
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetchPublicSettings().then((s) => {
      if (s) {
        if (s.address) setLiveAddress(s.address);
        if (s.phone) setLivePhone(s.phone);
        if (s.email) setLiveEmail(s.email);
      }
    });
    return () => requestRef.current?.abort();
  }, []);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: '' }));
    setFormError('');
    setIsRetryable(false);
  };

  const submitContactForm = async (): Promise<void> => {
    if (loading || requestRef.current) return;

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setFormError('');
    setIsRetryable(false);

    const payload: LeadSubmissionPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      businessName: formData.company.trim() || undefined,
      interestedService: formData.interestedService,
      message: formData.message.trim(),
      formType: 'CONTACT',
    };

    try {
      await submitPublicLead(payload, { signal: controller.signal });
      setFormData(initialFormData);
      setToast({ id: 'contact-success', message: 'Your inquiry has been submitted successfully.' });
      window.setTimeout(() => router.push('/thank-you'), 300);
    } catch (error) {
      if (error instanceof PublicApiError) {
        setFieldErrors(error.fieldErrors);
        setFormError(error.message);
        setIsRetryable(error.retryable);
      } else {
        setFormError('Unable to submit your inquiry. Please try again.');
        setIsRetryable(true);
      }
    } finally {
      requestRef.current = null;
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitContactForm();
  };

  const getInputStyle = (field: keyof ContactFormData): React.CSSProperties => ({
    padding: '0.75rem 1rem',
    fontSize: '0.9375rem',
    border: fieldErrors[field] ? '1.5px solid #EF4444' : '1px solid #CBD5E1',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    outline: 'none',
  });

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {toast && (
        <div style={{ position: 'fixed', right: '1rem', top: '1rem', zIndex: 1200 }}>
          <Toast {...toast} type="success" onDismiss={() => setToast(null)} />
        </div>
      )}
      <TopInfoBar />
      <Header />

      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '5rem 0 4.5rem', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.15)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
              Contact Us
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2 }}>Start Your Enterprise Transformation</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>Our technology team in New Delhi is ready to assist with your engineering roadmap.</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '4.5rem 0 5.5rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* Contact Form Container */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 15px 35px -10px rgba(3,23,53,0.06)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>Send Us a Message</h3>
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Full Name *</label>
                  <input type="text" required placeholder="John Doe" value={formData.name} onChange={(event) => updateField('name', event.target.value)} style={getInputStyle('name')} />
                  {fieldErrors.name && <p style={{ color: '#EF4444', fontSize: '0.75rem', margin: 0, fontWeight: 600 }}>{fieldErrors.name}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Email Address *</label>
                    <input type="email" required placeholder="john@company.com" value={formData.email} onChange={(event) => updateField('email', event.target.value)} style={getInputStyle('email')} />
                    {fieldErrors.email && <p style={{ color: '#EF4444', fontSize: '0.75rem', margin: 0, fontWeight: 600 }}>{fieldErrors.email}</p>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} style={getInputStyle('phone')} />
                    {fieldErrors.phone && <p style={{ color: '#EF4444', fontSize: '0.75rem', margin: 0, fontWeight: 600 }}>{fieldErrors.phone}</p>}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Company</label>
                  <input type="text" placeholder="Company name" value={formData.company} onChange={(event) => updateField('company', event.target.value)} style={getInputStyle('company')} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Service Interest</label>
                  <select value={formData.interestedService} onChange={(event) => updateField('interestedService', event.target.value)} style={getInputStyle('interestedService')}>
                    <option value="Web Engineering">Web Application Engineering</option>
                    <option value="Mobile App">Mobile App Development</option>
                    <option value="Cloud DevOps">Cloud Infrastructure & DevOps</option>
                    <option value="SEO Growth">Digital Growth & SEO Acceleration</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Project Details *</label>
                  <textarea required rows={4} placeholder="Describe your project scope, requirements, and target timeline..." value={formData.message} onChange={(event) => updateField('message', event.target.value)} style={{ ...getInputStyle('message'), resize: 'vertical' }} />
                  {fieldErrors.message && <p style={{ color: '#EF4444', fontSize: '0.75rem', margin: 0, fontWeight: 600 }}>{fieldErrors.message}</p>}
                </div>

                {formError && <p role="alert" style={{ color: '#EF4444', fontSize: '0.875rem', margin: 0, fontWeight: 600 }}>{formError}</p>}
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', backgroundColor: '#FF6A00', color: '#FFFFFF', fontWeight: 800, fontSize: '0.9375rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(255,106,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Send size={18} />
                  <span>{loading ? 'Submitting inquiry...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            </div>

            {/* Office Contact Info Container (Live Super Admin Synced) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px -8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                  New Delhi Headquarters
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,106,0,0.12)', color: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <span style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.9375rem', fontWeight: 600 }}>{liveAddress}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(7,68,141,0.12)', color: '#07448D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <span style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.9375rem' }}>{livePhone}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,106,0,0.12)', color: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <span style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.9375rem' }}>{liveEmail}</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
