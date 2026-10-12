import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Code2 } from 'lucide-react';
import { EmptyState, ErrorState } from '../../components/ui/EmptyState';
import { getPublicCmsData } from '../../lib/publicApi';

export const metadata = {
  title: 'Software Services & Capabilities | Today Digitech',
  description: 'Explore our full suite of web application engineering, mobile app development, cloud DevOps, and digital growth services.',
};

interface ServiceItem {
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  icon?: string;
}

export default async function ServicesListingPage() {
  const result = await getPublicCmsData<ServiceItem[]>('/services');
  const services = result.data || [];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md" style={{ alignSelf: 'center' }}>Engineering Capabilities</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>Our Software Engineering & Digital Services</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem' }}>Tailored enterprise technology offerings built on clean architecture standards.</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {result.status === 'unavailable' || result.status === 'not_found' ? (
              <ErrorState title="Services are unavailable" message={result.message || 'Please try again shortly.'} />
            ) : services.length === 0 ? (
              <EmptyState title="No services are available" description="Published services will appear here when available." />
            ) : services.map((srv, idx) => (
              <Card key={srv.slug || idx} hoverable style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div><Code2 size={28} color="#FF6A00" /></div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>{srv.title}</h3>
                <p style={{ color: 'var(--color-body)', lineHeight: 1.6, flex: 1 }}>{srv.summary || srv.description}</p>
                <a href={`/services/${srv.slug}`}>
                  <Button variant="outline" size="sm" icon={<ArrowRight size={14} />}>View Details</Button>
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
