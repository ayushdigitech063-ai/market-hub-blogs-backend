import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Star, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Success Stories & Client Testimonials | Today Digitech',
  description: 'Read reviews, watch video testimonials, and explore verified client feedback across our engineering engagements.',
};

export default function SuccessStoriesPage() {
  const testimonials = [
    {
      clientName: 'Rajesh Sharma',
      clientTitle: 'Chief Technology Officer',
      companyName: 'Axis Fintech Corp',
      quote: 'Today Digitech delivered our high-frequency payment platform with zero downtime. Transaction latency dropped by 45%.',
      rating: 5,
      serviceUsed: 'Web Application Engineering',
      googleReviewUrl: 'https://google.com',
    },
    {
      clientName: 'Dr. Ananya Verma',
      clientTitle: 'VP of Digital Product',
      companyName: 'MedPulse Health Care',
      quote: 'Their engineering team built a HIPAA-compliant diagnostic portal in record time. Sub-second load times have boosted patient engagement.',
      rating: 5,
      serviceUsed: 'Cloud & Healthcare Tech',
      googleReviewUrl: 'https://google.com',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md" style={{ alignSelf: 'center' }}>Social Proof Wall</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>Client Success Stories & Verified Feedback</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem' }}>Direct feedback from engineering leads, CTOs, and product directors.</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, idx) => (
              <Card key={idx} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', color: '#F59E0B' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" />
                    ))}
                  </div>
                  <Badge variant="neutral" size="sm">{t.serviceUsed}</Badge>
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--color-body)', fontStyle: 'italic', lineHeight: 1.6, flex: 1 }}>
                  "{t.quote}"
                </p>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-heading)' }}>{t.clientName}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{t.clientTitle}, {t.companyName}</div>
                  </div>
                  {t.googleReviewUrl && (
                    <a href={t.googleReviewUrl} target="_blank" rel="noreferrer" title="Verified Google Review" style={{ color: 'var(--color-royal-blue)' }}>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
