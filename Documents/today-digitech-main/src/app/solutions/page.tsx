export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Zap, Server, Globe, BarChart3 } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Enterprise Solutions & Cloud AI Architecture | Today Digitech',
  description: 'Mission-critical enterprise software solutions, AI automation pipelines, and multi-cloud infrastructure.',
};

interface SolutionItem {
  id?: string;
  title: string;
  category: string;
  summary: string;
  features: string[];
  metrics: string;
}

const defaultSolutions: SolutionItem[] = [
  {
    title: 'Enterprise Cloud & Microservices Migration',
    category: 'Cloud & Infrastructure',
    summary: 'Zero-downtime modernization of legacy monolith systems into auto-scaling Kubernetes microservices.',
    features: ['Multi-Region AWS & Azure Deployment', 'Kubernetes HPA Auto-Scaling', 'Automated CI/CD Pipelines & Infrastructure as Code'],
    metrics: '99.99% Uptime Guarantee',
  },
  {
    title: 'Generative AI & Enterprise Data Engineering',
    category: 'AI & Machine Learning',
    summary: 'Automate high-volume workflows with custom fine-tuned LLMs, RAG knowledge bases, and real-time data pipelines.',
    features: ['Custom RAG Knowledge Engines', 'Automated Document & Invoice Processing', 'Real-Time Vector Database Indexing'],
    metrics: '4.5x Operational Velocity',
  },
  {
    title: 'High-Frequency Fintech & Payment Gateways',
    category: 'Fintech & Security',
    summary: 'Bank-grade encrypted transaction processing systems built for sub-millisecond execution speeds.',
    features: ['PCI-DSS Level 1 Compliance', 'Real-Time Fraud Detection ML', 'Distributed Ledger & Payment Reconciliation'],
    metrics: '10M+ Daily API Transactions',
  },
];

export default async function SolutionsPage() {
  const fetchedSolutions = await fetchPublicData<SolutionItem[]>('/case-studies', defaultSolutions);
  const solutions = Array.isArray(fetchedSolutions) && fetchedSolutions.length > 0 ? fetchedSolutions : defaultSolutions;

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '5rem 0 4.5rem', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.15)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
              ⚡ Enterprise Engineering Solutions
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Scalable Software & Cloud AI Solutions
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              We build, deploy, and scale high-performance software systems engineered for reliability, security, and market dominance.
            </p>
          </div>
        </Container>
      </section>

      {/* Solutions Grid */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {solutions.map((sol, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  boxShadow: '0 10px 30px -8px rgba(3, 23, 53, 0.05)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(7,68,141,0.08)', color: '#07448D', fontSize: '0.75rem', fontWeight: 800 }}>
                      {sol.category || 'Engineering'}
                    </span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#FF6A00' }}>
                      {sol.metrics || 'High Performance'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35 }}>
                    {sol.title}
                  </h3>

                  <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6 }}>
                    {sol.summary}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                    {sol.features?.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#334155', fontWeight: 600 }}>
                        <CheckCircle2 size={16} color="#FF6A00" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
                  <a
                    href="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#07448D',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Request Architecture Blueprint</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
