import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MapPin, ArrowRight } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Service Locations & Regional Hubs | Today Digitech',
  description: 'Explore Today Digitech service centers and regional technology hubs in New Delhi NCR, Mumbai, and Bengaluru.',
};

interface LocationItem {
  name: string;
  slug: string;
  region?: string;
  desc?: string;
  summary?: string;
  description?: string;
}

const defaultLocations: LocationItem[] = [
  { name: 'New Delhi & NCR Headquarters', slug: 'delhi-ncr', region: 'North India', desc: 'Central technology & engineering headquarters serving enterprise clients across India.' },
  { name: 'Mumbai Financial Hub', slug: 'mumbai', region: 'West India', desc: 'Dedicated fintech & enterprise software development pod in Mumbai.' },
  { name: 'Bengaluru Tech Center', slug: 'bengaluru', region: 'South India', desc: 'Cloud infrastructure & AI research hub located in Bengaluru.' },
];

export default async function LocationsListingPage() {
  const fetched = await fetchPublicData<LocationItem[]>('/locations', defaultLocations);
  const locations = Array.isArray(fetched) && fetched.length > 0 ? fetched : defaultLocations;

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md" style={{ alignSelf: 'center' }}>Global & Regional Reach</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>Our Regional Technology Hubs</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem' }}>Local engineering presence backed by global enterprise standards.</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {locations.map((loc, idx) => (
              <Card key={loc.slug || idx} hoverable style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <MapPin size={28} color="var(--color-orange)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>{loc.name}</h3>
                <p style={{ color: 'var(--color-body)', lineHeight: 1.6, flex: 1 }}>{loc.desc || loc.summary || loc.description}</p>
                <a href={`/locations/${loc.slug}`}>
                  <Button variant="outline" size="sm" icon={<ArrowRight size={14} />}>View Hub Details</Button>
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
