import React from 'react';
import { TopInfoBar } from '../../../components/layout/TopInfoBar';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Container } from '../../../components/ui/Container';
import { CheckCircle2, ArrowRight, Sparkles, Building2, Code2 } from 'lucide-react';
import { fetchPublicData } from '../../../lib/publicApi';

interface PortfolioDetailProps {
  params: { slug: string };
}

interface PortfolioDetailData {
  title: string;
  client?: string;
  clientName?: string;
  category?: string;
  summary?: string;
  description?: string;
  coverImageUrl?: string;
  tech?: string[];
  techStack?: string[];
  features?: string[];
}

const defaultProjectDetail: PortfolioDetailData = {
  title: 'Fitness Pulse Biometric Mobile Application',
  client: 'Fitness Pulse Inc',
  category: 'Mobile App',
  summary: 'Cross-platform iOS and Android biometric health tracking application with real-time wearable telemetry integrations.',
  description: 'We engineered a native-performance cross-platform mobile application utilizing React Native and Firebase. The app syncs biometrics via Bluetooth LE from Apple Watch, Garmin, and Fitbit wearables, displaying real-time heart rate zones, SPO2 analytics, and AI recovery coaching.',
  coverImageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
  tech: ['React Native', 'Firebase', 'GraphQL', 'Tailwind', 'Node.js', 'AWS IoT'],
  features: [
    'Sub-Second Bluetooth Telemetry Data Sync',
    'AI-Powered Workout & Recovery Score Calculator',
    'Offline-First Encrypted SQLite Local Database',
    'PCI-Compliant In-App Subscription Gateways',
  ],
};

export async function generateMetadata({ params }: PortfolioDetailProps) {
  const proj = await fetchPublicData<PortfolioDetailData | null>(
    `/portfolio/${params.slug}`,
    defaultProjectDetail
  );

  const titleStr = proj?.title || 'Work Project Details | Today Digitech';
  return {
    title: `${titleStr} | Today Digitech Work Showcase`,
    description: proj?.summary || proj?.description,
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailProps) {
  const projResult = await fetchPublicData<PortfolioDetailData | null>(
    `/portfolio/${params.slug}`,
    defaultProjectDetail
  );

  const proj = projResult || defaultProjectDetail;
  const clientName = proj.client || proj.clientName || 'Enterprise Client Partner';
  const category = proj.category || 'Web App & Cloud';
  const techList = Array.isArray(proj.tech) ? proj.tech : Array.isArray(proj.techStack) ? proj.techStack : ['Next.js', 'TypeScript', 'Node.js', 'AWS'];
  const featureList = Array.isArray(proj.features) && proj.features.length > 0 ? proj.features : defaultProjectDetail.features!;
  const coverImage = proj.coverImageUrl || 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80';

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      {/* Hero Header */}
      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '5rem 0 4.5rem', color: '#FFFFFF', position: 'relative' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.2)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
                {category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94A3B8', fontSize: '0.875rem', fontWeight: 700 }}>
                <Building2 size={16} color="#FF6A00" /> Client: {clientName}
              </span>
            </div>

            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {proj.title}
            </h1>

            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              {proj.summary}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Details Body */}
      <section style={{ padding: '3.5rem 0 5rem' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Project Cover Banner */}
            <div style={{ width: '100%', height: '380px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 15px 35px -10px rgba(3,23,53,0.15)', backgroundColor: '#031735' }}>
              <img src={coverImage} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Overview & Architecture Box */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px -8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                Project Engineering Overview
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#475569', lineHeight: 1.8 }}>
                {proj.description || proj.summary}
              </p>
            </div>

            {/* Applied Tech Stack Pills Box */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code2 size={20} color="#FF6A00" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Applied Tech Stack & Infrastructure</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {techList.map((t, idx) => (
                  <span key={idx} style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', backgroundColor: '#F1F5F9', color: '#07448D', fontSize: '0.875rem', fontWeight: 800, border: '1px solid #E2E8F0' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Technical Deliverables */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px -8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Core Deliverables & Architecture Features
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {featureList.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255,106,0,0.12)', color: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#334155' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Bottom Banner */}
            <div style={{ padding: '2.5rem', borderRadius: '20px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', boxShadow: '0 15px 35px -10px rgba(3,23,53,0.3)' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Want to Build a Similar Application?</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginTop: '0.25rem' }}>Get in touch with our lead software architects for a free technical consultation.</p>
              </div>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  borderRadius: '12px',
                  backgroundColor: '#FF6A00',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(255,106,0,0.4)',
                }}
              >
                <span>Request Project Proposal</span>
                <ArrowRight size={18} />
              </a>
            </div>

          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
