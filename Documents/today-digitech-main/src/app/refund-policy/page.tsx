import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';

export const metadata = {
  title: 'Refund Policy | Today Digitech',
  description: 'Today Digitech milestone settlement and refund policy for software projects.',
};

export default function RefundPolicyPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>Refund & Cancellation Policy</h1>
            <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Last updated: August 5, 2026</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginTop: '1rem' }}>1. Milestone Payments</h2>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>
              Our engineering services are executed under milestone-based contracts. Each milestone payment is subject to client acceptance after demonstration in staging environments.
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
