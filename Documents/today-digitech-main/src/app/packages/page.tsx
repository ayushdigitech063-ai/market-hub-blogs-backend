export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Engineering Packages & Pricing | Today Digitech',
  description: 'Transparent web engineering, mobile app, and cloud DevOps packages engineered for startups and enterprise scale.',
};

interface PackageItem {
  category?: string;
  name: string;
  price: string;
  period?: string;
  desc?: string;
  description?: string;
  features?: string[];
  isRecommended?: boolean;
  isPopular?: boolean;
  showPricing?: boolean;
  ctaLabel?: string;
}

const defaultPackages: PackageItem[] = [
  {
    category: 'Web Engineering',
    name: 'Growth Starter Package',
    price: '₹49,999',
    period: '/ project',
    desc: 'Ideal for growing startups needing a high-performance web platform.',
    features: ['Custom Next.js Application', 'Responsive Mobile Design', 'Basic SEO Setup', '1 Month Cloud Support'],
    isRecommended: false,
    showPricing: true,
    ctaLabel: 'Select Growth Starter',
  },
  {
    category: 'Web Engineering',
    name: 'Enterprise Scale Package',
    price: '₹1,49,999',
    period: '/ project',
    desc: 'Full-stack engineering with API backend, database, & admin portal.',
    features: ['Full Next.js + Express Stack', 'MongoDB Database Architecture', 'Admin Portal & Role RBAC', 'Cloudinary Media Management', '3 Months Dedicated Maintenance'],
    isRecommended: true,
    showPricing: true,
    ctaLabel: 'Select Enterprise Scale',
  },
  {
    category: 'Custom Solutions',
    name: 'Custom Architecture Squad',
    price: 'Custom Quote',
    period: '',
    desc: 'Tailored microservices & dedicated engineering pod for enterprise.',
    features: ['Multi-tenant Architecture', 'DevOps & Kubernetes Setup', '24/7 SLA Monitoring', 'Dedicated Tech Lead & Squad'],
    isRecommended: false,
    showPricing: true,
    ctaLabel: 'Request Custom Proposal',
  },
];

export default async function PackagesPage() {
  const fetchedPackages = await fetchPublicData<PackageItem[]>('/packages', defaultPackages);
  const packagesList: PackageItem[] = Array.isArray(fetchedPackages) && fetchedPackages.length > 0 ? fetchedPackages : defaultPackages;

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      {/* Hero Header */}
      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '5rem 0 4.5rem', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.15)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
              Transparent Pricing
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Investment Plans & Packages
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Clear project scopes backed by enterprise SLA guarantees and source code ownership.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards Grid */}
      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
            {packagesList.map((pkg: PackageItem, idx: number) => {
              const isPopular = pkg.isRecommended || pkg.isPopular;
              const featureList = Array.isArray(pkg.features) ? pkg.features : [];
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '2.5rem 2rem',
                    border: isPopular ? '2.5px solid #FF6A00' : '1px solid #E2E8F0',
                    boxShadow: isPopular ? '0 20px 40px -10px rgba(255,106,0,0.25)' : '0 10px 30px -8px rgba(0,0,0,0.05)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {isPopular && (
                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#FF6A00', color: '#FFFFFF', padding: '0.35rem 1.25rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>{pkg.name}</h3>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>{pkg.price}</span>
                      {pkg.period && <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>{pkg.period}</span>}
                    </div>

                    <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6, minHeight: '44px' }}>
                      {pkg.desc || pkg.description}
                    </p>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {featureList.map((feat: string, fIdx: number) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <CheckCircle2 size={18} color="#FF6A00" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: 600 }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <a
                      href="/contact"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.875rem',
                        borderRadius: '12px',
                        backgroundColor: isPopular ? '#FF6A00' : '#07448D',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.9375rem',
                        textDecoration: 'none',
                        boxShadow: isPopular ? '0 8px 20px rgba(255,106,0,0.3)' : '0 4px 12px rgba(7,68,141,0.2)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{pkg.ctaLabel || 'Select Plan'}</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
