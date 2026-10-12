import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';

export const metadata = {
  title: 'Privacy Policy | Today Digitech',
  description: 'Today Digitech Privacy Policy outlining data collection, security standards, and user privacy rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>Privacy Policy</h1>
            <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Last updated: August 5, 2026</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginTop: '1rem' }}>1. Data Collection & Usage</h2>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>
              Today Digitech collects personal information provided voluntarily through contact forms, technical audit requests, and inquiry forms. We use this data solely to communicate project roadmaps and improve our software services.
            </p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginTop: '1rem' }}>2. Data Security & Storage</h2>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>
              We implement industry-standard encryption, SSL protocols, and restricted database access controls. We never sell, rent, or lease your personal data to third parties.
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
