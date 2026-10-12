import React from 'react';
import { notFound } from 'next/navigation';
import { TopInfoBar } from '../../../components/layout/TopInfoBar';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Container } from '../../../components/ui/Container';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ErrorState } from '../../../components/ui/EmptyState';
import { getPublicCmsData } from '../../../lib/publicApi';

interface ServiceDetailProps {
  params: { slug: string };
}

interface ServiceData {
  title: string;
  summary: string;
  description: string;
  features: string[];
  techStack: string[];
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const result = await getPublicCmsData<ServiceData>(`/services/${params.slug}`);
  const service = result.data;

  return {
    title: `${service?.title || 'Service Details'} | Today Digitech`,
    description: service?.summary || 'Enterprise digital transformation partner',
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const result = await getPublicCmsData<ServiceData>(`/services/${params.slug}`);
  const defaultServices: Record<string, ServiceData> = {
    'custom-software': {
      title: 'Custom Software & Enterprise Web Architecture',
      summary: 'Tailor-made cloud applications, microservices architecture, and scalable full-stack web platforms built for enterprise speed.',
      description: 'We architect mission-critical custom web systems using modern stack technologies including Next.js, React, Node.js microservices, and high-performance MongoDB/PostgreSQL clusters.',
      features: ['Serverless & Microservices Architecture', 'Sub-Second Page Load Optimization', 'Automated CI/CD Pipelines & Docker Security', 'Real-time WebSocket & Event-Driven Systems'],
      techStack: ['Next.js 14', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker', 'AWS'],
    },
    'cloud-ai': {
      title: 'Cloud Infrastructure & AI Engineering Solutions',
      summary: 'Automate enterprise workflows with generative AI integration, custom ML pipelines, and resilient multi-cloud DevOps.',
      description: 'Unlock business growth with automated AI data pipelines, LLM fine-tuning, and automated cloud deployments on AWS, Azure, and Google Cloud Platform.',
      features: ['Generative AI & LLM Integration', 'Predictive Analytics & ML Dashboards', 'Kubernetes HPA & Auto-scaling Clusters', 'Zero-Downtime Migration & Disaster Recovery'],
      techStack: ['Python', 'PyTorch', 'Kubernetes', 'AWS Lambda', 'Terraform', 'PostgreSQL'],
    },
    'digital-growth': {
      title: 'Digital Growth & Technical SEO Engineering',
      summary: 'Data-driven marketing, core web vitals optimization, and high-converting performance campaigns for rapid brand scale.',
      description: 'Maximize organic market dominance with technical SEO audits, dynamic sitemaps, structured schema data, and conversion rate optimized funnel architecture.',
      features: ['Technical SEO Audits & Schema Markup', 'Core Web Vitals Performance Optimization', 'Programmatic Landing Page Generation', 'End-to-End Analytics & Attribution Tracking'],
      techStack: ['Google Tag Manager', 'Next.js SSR', 'Schema.org', 'Lighthouse CI', 'Mixpanel'],
    },
  };

  const fallback = defaultServices[params.slug] || defaultServices['custom-software'];
  const service = result.data || fallback;

  const features = service.features || [];
  const techStack = service.techStack || [];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md">Service Offering</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>{service.title}</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>{service.summary}</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-heading)' }}>Capabilities & Architecture Overview</h2>
              <p style={{ color: 'var(--color-body)', lineHeight: 1.7 }}>{service.description}</p>

              {features.length > 0 && (
                <>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', marginTop: '1rem' }}>Key Architectural Features</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-heading)' }}>
                        <CheckCircle2 size={18} color="var(--color-orange)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {techStack.length > 0 && (
                <Card style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>Tech Stack Applied</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {techStack.map((tech, idx) => (
                      <span key={idx} style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', backgroundColor: 'rgba(6,43,99,0.08)', color: 'var(--color-primary-navy)', fontSize: '0.8125rem', fontWeight: 700 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              <Card style={{ padding: '2rem', background: 'var(--gradient-brand)', color: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>Ready to Build Your Platform?</h3>
                <p style={{ opacity: 0.9, fontSize: '0.875rem', lineHeight: 1.6 }}>Talk to our solution architects for a free consultation and project estimation.</p>
                <a href="/contact">
                  <Button variant="accent" size="md" icon={<ArrowRight size={16} />}>Schedule Consultation</Button>
                </a>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
