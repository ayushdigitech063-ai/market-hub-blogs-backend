import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { ArrowRight, Building2, Stethoscope, ShoppingBag, Truck, Landmark, GraduationCap } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Industry Verticals & Digital Domain Expertise | Today Digitech',
  description: 'Specialized technology solutions for Fintech, Healthcare, E-Commerce, Logistics, EdTech, and Real Estate.',
};

interface IndustryItem {
  id?: string;
  name: string;
  slug: string;
  summary?: string;
  description?: string;
  iconName?: string;
}

const defaultIndustries: IndustryItem[] = [
  {
    name: 'Banking & Financial Technology (FinTech)',
    slug: 'fintech',
    summary: 'High-frequency trading platforms, PCI-compliant payment gateways, core banking APIs, and fraud detection AI models.',
  },
  {
    name: 'Healthcare & Digital Diagnostics',
    slug: 'healthcare',
    summary: 'HIPAA-compliant telemedicine platforms, EHR integration, AI-driven diagnostic imaging analysis, and remote patient monitoring.',
  },
  {
    name: 'E-Commerce & Digital Retail Marketplaces',
    slug: 'e-commerce',
    summary: 'Sub-second headless storefronts, multi-vendor marketplaces, real-time inventory sync, and AI recommendation engines.',
  },
  {
    name: 'Logistics, Fleet & Supply Chain Automation',
    slug: 'logistics',
    summary: 'GPS fleet tracking, automated warehouse dispatch management, route optimization algorithms, and IoT cargo monitoring.',
  },
  {
    name: 'Real Estate & PropTech Automation',
    slug: 'real-estate',
    summary: 'Interactive 3D virtual tour engines, CRM property lead automation, automated tenant agreement workflows.',
  },
  {
    name: 'EdTech & Adaptive Learning Platforms',
    slug: 'edtech',
    summary: 'Interactive live classroom WebRTC video streaming, AI learning path personalization, and automated grading dashboards.',
  },
];

export default async function IndustriesPage() {
  const fetchedIndustries = await fetchPublicData<IndustryItem[]>('/industries', defaultIndustries);
  const list = Array.isArray(fetchedIndustries) && fetchedIndustries.length > 0 ? fetchedIndustries : defaultIndustries;

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '5rem 0 4.5rem', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.15)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
              🌐 Industry Domain Expertise
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Tailored Engineering for Industry Leaders
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              We bring deep domain compliance, regulatory awareness, and battle-tested code to solve industry-specific engineering bottlenecks.
            </p>
          </div>
        </Container>
      </section>

      {/* Industry Cards Grid */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {list.map((ind, idx) => (
              <div
                key={ind.slug || idx}
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
                  transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(7,68,141,0.08)', color: '#07448D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={24} color="#07448D" />
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35 }}>
                    {ind.name}
                  </h3>

                  <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6 }}>
                    {ind.summary || ind.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
                  <a
                    href="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#FF6A00',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Explore Industry Case Studies</span>
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
