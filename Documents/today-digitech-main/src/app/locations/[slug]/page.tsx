import React from 'react';
import { notFound } from 'next/navigation';
import { TopInfoBar } from '../../../components/layout/TopInfoBar';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Container } from '../../../components/ui/Container';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StructuredData } from '../../../components/seo/StructuredData';
import { localBusinessSchema, breadcrumbSchema } from '../../../lib/seo';

interface LocationDetailProps {
  params: { slug: string };
}

interface LocationData {
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  desc: string;
  uniqueContent: {
    heroTagline: string;
    overview: string;
    keyServices: string[];
    localFocusText: string;
  };
  geo?: { lat: number; lng: number };
}

const mockLocationDetails: Record<string, LocationData> = {
  'digital-marketing-agency-delhi': {
    name: 'Digital Marketing Agency in Delhi',
    region: 'North India Hub',
    address: 'Connaught Place, Central Business District, New Delhi 110001, India',
    phone: '+91 98765 43210',
    email: 'delhi-marketing@todaydigitech.com',
    desc: 'Full-service digital marketing agency headquartered in Central Delhi delivering ROI-driven performance marketing, SEO, and brand growth.',
    geo: { lat: 28.6315, lng: 77.2167 },
    uniqueContent: {
      heroTagline: 'Empowering Delhi-NCR Enterprises with Performance-Driven Digital Growth & High-ROI Campaigns',
      overview: 'As a premier digital marketing agency in Delhi, Today Digitech crafts hyper-targeted performance marketing strategies tailored for Connaught Place, Gurgaon, and Noida business hubs. We combine data-driven Google Ads management, technical SEO optimization, and high-conversion landing page design to lower CPL by up to 35%.',
      keyServices: [
        'Enterprise Technical SEO & Local Citation Building for Delhi NCR',
        'High-Intent Google Ads & Bing Search Campaign Management',
        'Social Media Performance Advertising (Meta, LinkedIn, Instagram)',
        'Conversion Rate Optimization (CRO) & Landing Page Architecture',
      ],
      localFocusText: 'Operating from Connaught Place, our team directly services regional head offices in Cyber City Gurgaon, Sector 62 Noida, and Okhla Industrial Estate.',
    },
  },
  'seo-company-delhi': {
    name: 'SEO Company in Delhi NCR',
    region: 'North India Hub',
    address: 'Connaught Place, Central Business District, New Delhi 110001, India',
    phone: '+91 98765 43210',
    email: 'delhi-seo@todaydigitech.com',
    desc: 'Specialized enterprise search engine optimization firm in New Delhi focusing on technical SEO audit, organic growth, and top rankings.',
    geo: { lat: 28.6315, lng: 77.2167 },
    uniqueContent: {
      heroTagline: 'Dominate Search Engine Result Pages with Battle-Tested Technical SEO & Authority Building',
      overview: 'Our Delhi SEO specialists audit Core Web Vitals, implement Schema markup, eliminate crawl debt, and earn high-authority backlinks. We have driven over 140% organic traffic growth for Delhi NCR brands in competitive verticals like FinTech, Real Estate, and SaaS.',
      keyServices: [
        'Comprehensive Technical SEO Audits & Core Web Vitals Remediation',
        'Local SEO & Google Business Profile Optimization for Delhi Merchants',
        'E-Commerce SEO Architecture & Dynamic Schema Markup',
        'High-Authority Link Acquisition & Content Optimization',
      ],
      localFocusText: 'Specialized local ranking algorithms engineered specifically for competitive Delhi NCR micro-markets.',
    },
  },
  'google-ads-agency-delhi': {
    name: 'Google Ads Agency in Delhi',
    region: 'North India Hub',
    address: 'Connaught Place, Central Business District, New Delhi 110001, India',
    phone: '+91 98765 43210',
    email: 'delhi-ads@todaydigitech.com',
    desc: 'Certified Google Premier Partner agency in Delhi delivering high-converting PPC campaigns, Search Ads, Shopping Ads, and Remarketing.',
    geo: { lat: 28.6315, lng: 77.2167 },
    uniqueContent: {
      heroTagline: 'Maximize Ad Spend Efficiency with Data-Driven PPC Campaigns & AI Bidding Strategies',
      overview: 'Today Digitech is a leading Google Ads agency in Delhi NCR. We optimize Quality Scores, implement negative keyword lists, and structure high-converting search and performance max campaigns that average 4.2x ROAS across enterprise verticals.',
      keyServices: [
        'Google Search Ads & B2B Lead Generation Campaigns',
        'Google Shopping Ads & Smart Bidding E-Commerce Setup',
        'Display & YouTube Video Remarketing Funnels',
        'Conversion Tracking, GA4 Attribution & ROAS Optimization',
      ],
      localFocusText: 'Delivering hyper-targeted geotargeted PPC campaigns across Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad.',
    },
  },
  'seo-company-jaipur': {
    name: 'Top SEO Company in Jaipur',
    region: 'Rajasthan Regional Hub',
    address: 'MI Road, C-Scheme, Jaipur 302001, Rajasthan, India',
    phone: '+91 98765 43212',
    email: 'jaipur-seo@todaydigitech.com',
    desc: 'Leading enterprise SEO agency in Jaipur driving organic rank growth, Google Maps local ranking, and high-converting search visibility for Rajasthan businesses.',
    geo: { lat: 26.9124, lng: 75.7873 },
    uniqueContent: {
      heroTagline: 'Dominate Google Search Results in Jaipur & Rajasthan with Data-Backed SEO Strategies',
      overview: 'As the top-rated SEO company in Jaipur, Today Digitech empowers Pink City businesses, hospitality leaders, exporters, and startups to secure top rankings on Google. We deliver comprehensive technical SEO, local citation building, E-E-A-T content strategy, and high-authority backlink acquisition tailored for Rajasthan markets.',
      keyServices: [
        'Local SEO & Google Maps Pack Ranking for Jaipur Businesses',
        'Enterprise Technical SEO Audits & Core Web Vitals Optimization',
        'E-Commerce SEO for Handicrafts, Jewelry & Export Merchants',
        'B2B Search Engine Marketing & High-Intent Keyword Dominance',
      ],
      localFocusText: 'Directly servicing enterprise clients across C-Scheme, Malviya Nagar, Vaishali Nagar, Sitapura Industrial Area, and Mansarovar in Jaipur.',
    },
  },
  'delhi-ncr': {
    name: 'New Delhi & NCR Headquarters',
    region: 'North India',
    address: 'Connaught Place, Central Business District, New Delhi 110001, India',
    phone: '+91 98765 43210',
    email: 'delhi@todaydigitech.com',
    desc: 'Our primary engineering headquarters located in Central New Delhi, hosting solution architects, UX strategists, and core full-stack engineering pods.',
    geo: { lat: 28.6315, lng: 77.2167 },
    uniqueContent: {
      heroTagline: 'Central Technology & Digital Execution Hub for Capital Region Enterprises',
      overview: 'Our headquarters in Connaught Place serves as the command center for enterprise web development, mobile app engineering, and digital growth strategies across India.',
      keyServices: [
        'Full-Stack Next.js & React Web Application Engineering',
        'Mobile App Development (iOS, Android, React Native)',
        'Enterprise Cloud Deployment & DevOps Architecture',
        'Digital Strategy & Technology Consulting',
      ],
      localFocusText: 'Headquarters offering on-site technical consulting and strategic oversight across the Delhi NCR region.',
    },
  },
};

export async function generateMetadata({ params }: LocationDetailProps) {
  const loc = mockLocationDetails[params.slug];
  if (!loc) return { title: 'Location Not Found | Today Digitech' };
  
  return {
    title: `${loc.name} | Today Digitech`,
    description: loc.desc,
    alternates: {
      canonical: `https://todaydigitech.com/locations/${params.slug}`,
    },
    openGraph: {
      title: `${loc.name} | Today Digitech`,
      description: loc.desc,
      url: `https://todaydigitech.com/locations/${params.slug}`,
    },
  };
}

export default function LocationDetailPage({ params }: LocationDetailProps) {
  const loc = mockLocationDetails[params.slug];

  // Enforce unique content rule: Return 404 for unconfigured/duplicate template pages
  if (!loc || !loc.uniqueContent) {
    return notFound();
  }

  const localSchema = localBusinessSchema(loc.name, loc.address, loc.geo);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations' },
    { name: loc.name, url: `/locations/${params.slug}` },
  ]);

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StructuredData data={localSchema} />
      <StructuredData data={breadcrumbs} />

      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md">{loc.region}</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>{loc.name}</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>{loc.uniqueContent.heroTagline}</p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
            {/* Unique Content Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>Regional Overview</h2>
                <p style={{ color: 'var(--color-body)', lineHeight: 1.8, fontSize: '1rem' }}>{loc.uniqueContent.overview}</p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '1rem' }}>Key Specialized Solutions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {loc.uniqueContent.keyServices.map((service, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--color-success)', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: 'var(--color-heading)', fontSize: '0.9375rem' }}>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(7,68,141,0.05)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-royal-blue)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '0.5rem' }}>Delhi NCR Geographic Focus</h3>
                <p style={{ color: 'var(--color-body)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{loc.uniqueContent.localFocusText}</p>
              </div>
            </div>

            {/* Sidebar Contact Info */}
            <aside style={{ alignSelf: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>Hub Office Details</h3>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={20} color="var(--color-orange)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-heading)', fontSize: '0.875rem' }}>Address:</strong>
                    <span style={{ color: 'var(--color-body)', fontSize: '0.875rem' }}>{loc.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={20} color="var(--color-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-heading)', fontSize: '0.875rem' }}>Direct Phone:</strong>
                    <span style={{ color: 'var(--color-body)', fontSize: '0.875rem' }}>{loc.phone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={20} color="var(--color-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-heading)', fontSize: '0.875rem' }}>Hub Email:</strong>
                    <span style={{ color: 'var(--color-body)', fontSize: '0.875rem' }}>{loc.email}</span>
                  </div>
                </div>

                <a href="/contact" style={{ marginTop: '0.5rem' }}>
                  <Button variant="primary" size="md" style={{ width: '100%' }} icon={<ArrowRight size={16} />}>Get Location Strategy</Button>
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
