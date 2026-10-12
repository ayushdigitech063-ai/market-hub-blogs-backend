import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';

export const metadata = {
  title: 'Terms and Conditions | Today Digitech',
  description: 'Terms and conditions governing the use of Today Digitech software development services.',
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>Terms and Conditions</h1>
            <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Last updated: August 5, 2026</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginTop: '1rem' }}>1. Scope of Services</h2>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>
              Today Digitech provides software engineering, web application development, mobile app development, and cloud DevOps consulting. All project deliverables are defined in signed Statements of Work (SOW).
            </p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', marginTop: '1rem' }}>2. Intellectual Property Rights</h2>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>
              Upon final milestone settlement, 100% of the custom source code, IP rights, and database schemas created for the client are assigned to the client.
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
