import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Award, Target } from 'lucide-react';
import { EmptyState, ErrorState } from '../../components/ui/EmptyState';
import { getPublicCmsData } from '../../lib/publicApi';

export const metadata = {
  title: 'About Us | Today Digitech',
  description: 'Learn about Today Digitech, our executive leadership team, engineering philosophy, and mission in digital transformation.',
};

const defaultTeamMembers: TeamMember[] = [
  {
    name: 'Vikramaditya Roy',
    role: 'Founder & Chief Executive Officer',
    bio: '12+ years leading full-stack software architecture, enterprise cloud transformations, and growth strategy.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. Neha Malhotra',
    role: 'Head of AI & Machine Learning',
    bio: 'Ph.D. in Data Science specializing in fine-tuned LLM architectures, predictive analytics, and enterprise vector search.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Amitabh Sen',
    role: 'VP of Cloud Infrastructure & DevOps',
    bio: 'AWS Certified Solutions Architect leading Kubernetes auto-scaling, CI/CD security, and zero-downtime microservices.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  description?: string;
  avatarUrl?: string;
  imageUrl?: string;
}

export default async function AboutPage() {
  const result = await getPublicCmsData<TeamMember[]>('/team');
  const fetchedTeam = result.data;
  const teamMembers = Array.isArray(fetchedTeam) && fetchedTeam.length > 0 ? fetchedTeam : defaultTeamMembers;

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      {/* Hero Header */}
      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '5rem 0 4.5rem', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.15)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
              About Today Digitech
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Engineering the Future of Enterprise Technology
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              We bridge complex tech challenges with clean, scalable, high-performance web applications.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2.5rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px -8px rgba(3,23,53,0.05)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,106,0,0.12)', color: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>Our Mission</h3>
              <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                To empower enterprises and high-growth organizations through resilient TypeScript architectures, cloud native microservices, and human-centered digital experiences.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2.5rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px -8px rgba(3,23,53,0.05)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(7,68,141,0.12)', color: '#07448D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>Our Quality Code Oath</h3>
              <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                We enforce strict modular boundaries, zero superficial symptom patches, zero unhandled errors, and sub-second core web vitals across every product we build.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Executive Leadership Team */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '5rem 0', borderTop: '1px solid #E2E8F0' }}>
        <Container>
          <SectionHeading badge="Leadership" title="Meet Our Executive Team" description="Senior software leaders and cloud architects guiding product engineering." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px -8px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Executive Avatar Image */}
                <div style={{ height: '260px', backgroundColor: '#031735', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={member.avatarUrl || member.imageUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Member Profile Details */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{member.name}</h4>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{member.role}</div>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>{member.bio || member.description}</p>
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
