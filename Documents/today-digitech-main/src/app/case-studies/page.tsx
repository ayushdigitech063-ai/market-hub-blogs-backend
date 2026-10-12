import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Client Case Studies & Results | Today Digitech',
  description: 'Explore real-world case studies demonstrating +140% organic traffic, +180% leads, 4.2x ROAS, and sub-second web app performance.',
};

interface MetricItem {
  label: string;
  value: string;
}

interface CaseStudyItem {
  title: string;
  slug: string;
  client?: string;
  clientName?: string;
  industry?: string;
  summary?: string;
  description?: string;
  metrics?: MetricItem[];
}

const defaultCaseStudies: CaseStudyItem[] = [
  {
    title: 'Axis Fintech Scaling & High-Frequency Platform',
    slug: 'axis-fintech-scaling',
    client: 'Axis Fintech Corp',
    industry: 'Fintech',
    metrics: [
      { label: 'Organic Traffic', value: '+140%' },
      { label: 'Qualified Leads', value: '+180%' },
      { label: 'ROAS', value: '4.2x' },
      { label: 'Cost Per Lead', value: '-32%' },
    ],
    summary: 'Re-architected core payment processing backend into micro-frontends with real-time audit logs and zero downtime.',
  },
  {
    title: 'MedPulse Diagnostic Portal Digital Transformation',
    slug: 'medpulse-digital-health',
    client: 'MedPulse Health Care',
    industry: 'Healthcare',
    metrics: [
      { label: 'Conversion Rate', value: '+65%' },
      { label: 'Page Load Speed', value: '0.4s' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    summary: 'Migrated monolithic portal to Next.js App Router with server-side rendering and HIPAA-compliant data pipelines.',
  },
];

export default async function CaseStudiesListingPage() {
  const fetched = await fetchPublicData<CaseStudyItem[]>('/case-studies', defaultCaseStudies);
  const caseStudies = Array.isArray(fetched) && fetched.length > 0 ? fetched : defaultCaseStudies;

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md" style={{ alignSelf: 'center' }}>Enterprise Results</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>Client Case Studies & Proven Metrics</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem' }}>Quantifiable impact delivered across Fintech, Healthcare, E-Commerce, and Logistics.</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {caseStudies.map((cs, idx) => {
              const metrics = cs.metrics || [{ label: 'Performance', value: '99/100' }, { label: 'Uptime', value: '99.99%' }];
              return (
                <Card key={cs.slug || idx} hoverable style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Badge variant="neutral" size="sm">{cs.industry || 'Enterprise'}</Badge>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748B' }}>{cs.client || cs.clientName}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>{cs.title}</h3>
                  <p style={{ color: 'var(--color-body)', lineHeight: 1.6 }}>{cs.summary || cs.description}</p>

                  {/* Metrics Highlight Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', margin: '0.5rem 0' }}>
                    {metrics.map((m, mIdx) => (
                      <div key={mIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{m.label}</span>
                        <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-orange)' }}>{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <a href={`/case-studies/${cs.slug}`}>
                    <Button variant="primary" size="md" icon={<ArrowRight size={16} />}>Read Full Case Study</Button>
                  </a>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
