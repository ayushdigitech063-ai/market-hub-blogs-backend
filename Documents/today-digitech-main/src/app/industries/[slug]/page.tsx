import React from 'react';
import { notFound } from 'next/navigation';
import { TopInfoBar } from '../../../components/layout/TopInfoBar';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Container } from '../../../components/ui/Container';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface IndustryDetailProps {
  params: { slug: string };
}

const mockIndustryDetails: Record<string, { name: string; summary: string; description: string; solutions: string[] }> = {
  fintech: {
    name: 'Fintech & Banking Solutions',
    summary: 'High-security financial software, payment gateways, and real-time transaction processing.',
    description: 'We engineer PCI-DSS compliant fintech architectures, core banking APIs, and high-frequency trading platforms built to handle millions of requests with sub-millisecond execution times.',
    solutions: ['Core Banking API Gateways', 'PCI-DSS Compliant Payment Integrations', 'Fraud Detection & Compliance Engine', 'Real-Time Financial Dashboards'],
  },
  healthcare: {
    name: 'Healthcare & Digital Diagnostics',
    summary: 'HIPAA-compliant telemedicine platforms, electronic health records, and patient portals.',
    description: 'Our healthcare software practice builds secure patient management systems, IoT medical device integrations, and AI-assisted clinical diagnostic tools.',
    solutions: ['HIPAA-Compliant Telemedicine Web App', 'EHR / EMR System Integration', 'Patient Portal & Prescription Manager', 'Medical Device IoT Telemetry'],
  },
};

export async function generateMetadata({ params }: IndustryDetailProps) {
  const ind = mockIndustryDetails[params.slug] || { name: 'Industry Vertical', summary: 'Tailored enterprise domain software' };
  return {
    title: `${ind.name} | Today Digitech`,
    description: ind.summary,
  };
}

export default function IndustryDetailPage({ params }: IndustryDetailProps) {
  const ind = mockIndustryDetails[params.slug];

  if (!ind) return notFound();

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md">Industry Vertical</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>{ind.name}</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem' }}>{ind.summary}</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-heading)' }}>Domain Overview</h2>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>{ind.description}</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>Specialized Domain Solutions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {ind.solutions.map((sol, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                  <CheckCircle2 size={18} color="var(--color-orange)" />
                  <span>{sol}</span>
                </div>
              ))}
            </div>

            <a href="/contact" style={{ marginTop: '1rem' }}>
              <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>Discuss {ind.name} Strategy</Button>
            </a>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
