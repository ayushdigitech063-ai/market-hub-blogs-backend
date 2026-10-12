import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Thank You | Today Digitech',
  description: 'Thank you for contacting Today Digitech.',
};

export default function ThankYouPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ padding: '6rem 0', flex: 1, display: 'flex', alignItems: 'center' }}>
        <Container>
          <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <CheckCircle2 size={56} color="var(--color-success)" />
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-heading)' }}>Inquiry Received!</h1>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.6 }}>
              Thank you for reaching out to Today Digitech. Our solution architecture team has received your project details and will get back to you within 24 business hours.
            </p>
            <a href="/" style={{ marginTop: '1rem' }}>
              <Button variant="primary" size="md" icon={<ArrowRight size={16} />}>Return to Homepage</Button>
            </a>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
