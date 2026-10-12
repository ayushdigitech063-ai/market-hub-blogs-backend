import React from 'react';
import { TopInfoBar } from '../components/layout/TopInfoBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ padding: '6rem 0', flex: 1, display: 'flex', alignItems: 'center' }}>
        <Container>
          <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--color-orange)', lineHeight: 1 }}>404</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-heading)' }}>Page Not Found</h1>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.6 }}>
              The requested page route could not be located on the Today Digitech platform. It may have been moved or updated.
            </p>
            <a href="/" style={{ marginTop: '1rem' }}>
              <Button variant="primary" size="md" icon={<ArrowLeft size={16} />}>Back to Homepage</Button>
            </a>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
