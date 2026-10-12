import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Work Showcase & Client Portfolio | Today Digitech',
  description: 'Explore full-stack web applications, mobile apps, and enterprise cloud solutions delivered by Today Digitech.',
};

interface PortfolioItem {
  title: string;
  slug: string;
  client?: string;
  clientName?: string;
  category?: string;
  summary?: string;
  excerpt?: string;
  tech?: string[];
  techStack?: string[];
  coverImageUrl?: string;
}

const defaultPortfolio: PortfolioItem[] = [
  {
    title: 'OmniLogistics Supply Chain & Fleet Portal',
    slug: 'omnilogistics-portal',
    client: 'OmniLogistics India',
    category: 'Web App & Cloud',
    summary: 'Real-time fleet tracking, automated shipment dispatching, and predictive route management portal built for enterprise scale.',
    tech: ['Next.js 14', 'Express', 'MongoDB', 'AWS'],
    coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Fitness Pulse Biometric Mobile Application',
    slug: 'fitness-pulse-app',
    client: 'Fitness Pulse Inc',
    category: 'Mobile App',
    summary: 'Cross-platform iOS and Android biometric health tracking application with real-time wearable telemetry integrations.',
    tech: ['React Native', 'Firebase', 'GraphQL', 'Tailwind'],
    coverImageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Axis High-Frequency Payment Gateway Engine',
    slug: 'axis-fintech-engine',
    client: 'Axis Fintech Corp',
    category: 'Fintech & Security',
    summary: 'Bank-grade encrypted transaction processing engine achieving sub-millisecond execution speeds for 10M+ daily operations.',
    tech: ['Node.js', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    coverImageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  },
];

export default async function PortfolioPage() {
  const fetchedProjects = await fetchPublicData<PortfolioItem[]>('/portfolio', defaultPortfolio);
  const projects: PortfolioItem[] = Array.isArray(fetchedProjects) && fetchedProjects.length > 0 ? fetchedProjects : defaultPortfolio;

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      {/* Hero Header Section */}
      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '4.5rem 0', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,106,0,0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.15)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={14} /> Proven Engineering Excellence
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Our Work Showcase & Client Projects
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Explore how we engineer scalable web applications, mobile platforms, and enterprise cloud infrastructure.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Work Showcase Grid */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {projects.map((proj: PortfolioItem, idx: number) => {
              const techList = Array.isArray(proj.tech) ? proj.tech : Array.isArray(proj.techStack) ? proj.techStack : [];
              return (
                <div
                  key={proj.slug || idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 10px 30px -8px rgba(3, 23, 53, 0.06)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Project Cover Image */}
                  <div style={{ height: '220px', backgroundColor: '#031735', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={proj.coverImageUrl || `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80`}
                      alt={proj.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: '#031735', color: '#FFFFFF', fontSize: '0.725rem', fontWeight: 800 }}>
                        {proj.category || 'Web App'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#07448D' }}>
                        Client: {proj.client || proj.clientName || 'Enterprise Partner'}
                      </span>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35 }}>
                        {proj.title}
                      </h3>

                      <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
                        {proj.summary || proj.excerpt}
                      </p>

                      {/* Tech Stack Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                        {techList.map((t: string, tIdx: number) => (
                          <span key={tIdx} style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', backgroundColor: '#F1F5F9', color: '#334155', fontSize: '0.725rem', fontWeight: 700 }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <a
                        href={`/portfolio/${proj.slug || 'omnilogistics-portal'}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#FF6A00',
                          fontWeight: 800,
                          fontSize: '0.84rem',
                          textDecoration: 'none',
                        }}
                      >
                        <span>View Project Details</span>
                        <ArrowRight size={15} />
                      </a>
                    </div>
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
