import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ArrowRight, MapPin, Briefcase, Clock } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Careers & Open Positions | Today Digitech',
  description: 'Join the engineering team building enterprise-grade web platforms. Explore open positions in full-stack development, DevOps, and digital marketing.',
};

interface JobItem {
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type?: string;
  employmentType?: string;
  experience?: string;
}

const defaultJobs: JobItem[] = [
  { title: 'Senior Full-Stack Engineer (Next.js + Node.js)', slug: 'senior-fullstack-engineer', department: 'Engineering', location: 'New Delhi, India', type: 'Full-Time', experience: '4-6 Years' },
  { title: 'React Native Mobile Developer', slug: 'react-native-developer', department: 'Engineering', location: 'Remote (India)', type: 'Full-Time', experience: '2-4 Years' },
  { title: 'DevOps & Cloud Infrastructure Engineer', slug: 'devops-cloud-engineer', department: 'Cloud & DevOps', location: 'New Delhi, India', type: 'Full-Time', experience: '3-5 Years' },
  { title: 'SEO & Content Marketing Specialist', slug: 'seo-content-specialist', department: 'Marketing', location: 'Hybrid (Delhi NCR)', type: 'Full-Time', experience: '1-3 Years' },
];

export default async function CareersPage() {
  const fetchedJobs = await fetchPublicData<JobItem[]>('/careers', defaultJobs);
  const jobs = Array.isArray(fetchedJobs) && fetchedJobs.length > 0 ? fetchedJobs : defaultJobs;

  const perks = [
    'Competitive CTC & Performance Bonuses',
    'Remote-First Engineering Culture',
    'Health Insurance for Family',
    'Learning & Conference Budget',
    'Latest MacBook Pro & Equipment',
    'Flexible Work Hours',
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md" style={{ alignSelf: 'center' }}>We Are Hiring</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>Build the Future of Enterprise Web</h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem' }}>Join a team of engineers shipping high-performance Next.js applications for Fintech, Healthcare, and Logistics enterprises.</p>
          </div>
        </Container>
      </section>

      {/* Why Join Us */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-heading)', textAlign: 'center', marginBottom: '2rem' }}>Why Engineers Choose Today Digitech</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {perks.map((perk, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-orange)', flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: 'var(--color-heading)', fontSize: '0.9375rem' }}>{perk}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section style={{ padding: '4rem 0' }}>
        <Container>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '2rem' }}>Open Positions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.map((job, idx) => (
              <Card key={job.slug || idx} hoverable style={{ padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-heading)' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8125rem', color: '#64748B', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14} /> {job.department || 'Engineering'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {job.location || 'New Delhi'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {job.experience || '2+ Years'}</span>
                    <Badge variant="neutral" size="sm">{job.type || job.employmentType || 'Full-Time'}</Badge>
                  </div>
                </div>
                <a href={`/careers/${job.slug}`}>
                  <Button variant="primary" size="sm" icon={<ArrowRight size={14} />}>View & Apply</Button>
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
