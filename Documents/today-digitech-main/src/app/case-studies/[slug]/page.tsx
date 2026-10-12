import React from 'react';
import { notFound } from 'next/navigation';
import { TopInfoBar } from '../../../components/layout/TopInfoBar';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Container } from '../../../components/ui/Container';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { ArrowRight } from 'lucide-react';

interface CaseStudyDetailProps {
  params: { slug: string };
}

const mockCaseStudyDetails: Record<string, { title: string; client: string; industry: string; problem: string; strategy: string; implementation: string; results: string; metrics: Array<{ label: string; value: string; change: string }>; beforeAfter: { before: string; after: string } }> = {
  'axis-fintech-scaling': {
    title: 'Axis Fintech High-Frequency Platform Scaling',
    client: 'Axis Fintech Corp',
    industry: 'Fintech',
    problem: 'Legacy platform experienced 3.2s page load latency, frequent database bottlenecks during peak trading hours, and high drop-off rate on checkout forms.',
    strategy: 'Decoupled monolithic backend into Node.js micro-services with Redis caching, implemented Next.js App Router with server component caching, and optimized database queries.',
    implementation: 'Engineered custom TypeScript micro-frontends, established automated CI/CD pipeline, and routed media via Cloudinary edge CDN.',
    results: 'Sub-second page load times achieved across 1M+ daily active sessions with zero downtime.',
    metrics: [
      { label: 'Organic Traffic', value: '+140%', change: 'Increase' },
      { label: 'Qualified Leads', value: '+180%', change: 'Increase' },
      { label: 'ROAS', value: '4.2x', change: 'Multiplier' },
      { label: 'Cost Per Lead', value: '-32%', change: 'Reduction' },
      { label: 'Conversion Rate', value: '+65%', change: 'Increase' },
    ],
    beforeAfter: {
      before: '3.2 Seconds Load Time (Monolithic)',
      after: '0.4 Seconds Sub-Second Load Time (Next.js SSR)',
    },
  },
};

export async function generateMetadata({ params }: CaseStudyDetailProps) {
  const cs = mockCaseStudyDetails[params.slug] || { title: 'Case Study Detail', results: 'Enterprise success story by Today Digitech' };
  return {
    title: `${cs.title} | Today Digitech Case Study`,
    description: cs.results,
  };
}

export default function CaseStudyDetailPage({ params }: CaseStudyDetailProps) {
  const cs = mockCaseStudyDetails[params.slug];

  if (!cs) return notFound();

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md">{cs.industry} Case Study</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>{cs.title}</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem' }}>Client Partner: {cs.client}</p>
          </div>
        </Container>
      </section>

      {/* Metrics Banner */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '3rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {cs.metrics.map((m, idx) => (
              <div key={idx} style={{ padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>{m.label}</span>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-orange)', margin: '0.25rem 0' }}>{m.value}</div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)' }}>{m.change}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Problem */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>1. The Challenge & Problem</h2>
              <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>{cs.problem}</p>
            </div>

            {/* Strategy */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>2. Architecture & Strategy</h2>
              <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>{cs.strategy}</p>
            </div>

            {/* Implementation */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>3. Technical Implementation</h2>
              <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>{cs.implementation}</p>
            </div>

            {/* Before vs After */}
            <Card style={{ padding: '2rem', backgroundColor: '#F8FAFC' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '1rem' }}>Before & After Performance Comparison</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-sm)', color: '#991B1B' }}>
                  <strong>Before Today Digitech:</strong>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.375rem' }}>{cs.beforeAfter.before}</p>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: 'var(--radius-sm)', color: '#065F46' }}>
                  <strong>After Engineering:</strong>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.375rem' }}>{cs.beforeAfter.after}</p>
                </div>
              </div>
            </Card>

            <a href="/contact">
              <Button variant="accent" size="lg" icon={<ArrowRight size={18} />}>Achieve Similar Results for Your Brand</Button>
            </a>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
