'use client';

import React, { useState } from 'react';
import { TopInfoBar } from '../../../components/layout/TopInfoBar';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Container } from '../../../components/ui/Container';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { MapPin, Briefcase, Clock, CheckCircle2, Upload } from 'lucide-react';

const mockJobs: Record<string, { title: string; department: string; location: string; type: string; experience: string; description: string; requirements: string[]; responsibilities: string[]; benefits: string[] }> = {
  'senior-fullstack-engineer': {
    title: 'Senior Full-Stack Engineer (Next.js + Node.js)',
    department: 'Engineering',
    location: 'New Delhi, India',
    type: 'Full-Time',
    experience: '4-6 Years',
    description: 'We are looking for a Senior Full-Stack Engineer to join our core product team. You will architect, build, and ship enterprise-grade web applications using Next.js 14 App Router, React Server Components, Node.js with Express/Fastify, and MongoDB. You will work directly with clients to understand requirements and deliver solutions that scale.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or equivalent experience',
      '4+ years production experience with React/Next.js and Node.js',
      'Strong understanding of TypeScript, REST APIs, and GraphQL',
      'Experience with MongoDB aggregation pipelines and schema design',
      'Familiarity with AWS/GCP cloud services and Docker',
      'Strong communication skills for client-facing interactions',
    ],
    responsibilities: [
      'Architect and build full-stack web applications for enterprise clients',
      'Design and implement RESTful APIs with proper authentication and authorization',
      'Write clean, maintainable TypeScript code with comprehensive test coverage',
      'Conduct code reviews and mentor junior engineers',
      'Collaborate with design and product teams to ship pixel-perfect UIs',
      'Optimize application performance and Core Web Vitals',
    ],
    benefits: [
      'Competitive CTC ₹18-28 LPA based on experience',
      'Health insurance for you and your family',
      'Latest MacBook Pro and external displays',
      'Annual learning budget of ₹50,000',
      'Flexible work hours with remote options',
    ],
  },
};

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = mockJobs[params.slug];
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', coverLetter: '', linkedin: '', portfolio: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopInfoBar />
        <Header />
        <Container>
          <div style={{ padding: '6rem 0', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-heading)' }}>Position Not Found</h1>
            <p style={{ color: 'var(--color-body)', marginTop: '0.5rem' }}>This job posting may have been closed or removed.</p>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Badge variant="accent" size="md">{job.department}</Badge>
              <Badge variant="neutral" size="md">{job.type}</Badge>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>{job.title}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#94A3B8', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {job.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14} /> {job.department}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {job.experience}</span>
            </div>
          </div>
        </Container>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
            {/* Job Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>About the Role</h2>
                <p style={{ color: 'var(--color-body)', lineHeight: 1.8 }}>{job.description}</p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>Requirements</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {job.requirements.map((req, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'var(--color-body)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--color-success)', marginTop: '4px', flexShrink: 0 }} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>Responsibilities</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'var(--color-body)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--color-royal-blue)', marginTop: '4px', flexShrink: 0 }} />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', marginBottom: '0.75rem' }}>Benefits & Perks</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {job.benefits.map((b, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'var(--color-body)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--color-orange)', marginTop: '4px', flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application Form Sidebar */}
            <aside style={{ position: 'sticky', top: '2rem', alignSelf: 'start' }}>
              <Card style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '2px solid var(--color-orange)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <CheckCircle2 size={48} style={{ color: 'var(--color-success)', margin: '0 auto' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)', marginTop: '1rem' }}>Application Submitted!</h3>
                    <p style={{ color: 'var(--color-body)', fontSize: '0.875rem', marginTop: '0.5rem' }}>We will review your application and get back to you within 5-7 business days.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-heading)' }}>Apply for This Position</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input
                        type="text" required placeholder="Full Name *"
                        value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none' }}
                      />
                      <input
                        type="email" required placeholder="Email Address *"
                        value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none' }}
                      />
                      <input
                        type="tel" required placeholder="Phone Number *"
                        value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none' }}
                      />
                      <input
                        type="url" placeholder="LinkedIn Profile"
                        value={formState.linkedin} onChange={(e) => setFormState({ ...formState, linkedin: e.target.value })}
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none' }}
                      />
                      <input
                        type="url" placeholder="Portfolio URL"
                        value={formState.portfolio} onChange={(e) => setFormState({ ...formState, portfolio: e.target.value })}
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none' }}
                      />

                      {/* Resume Upload */}
                      <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '2px dashed var(--color-border)', cursor: 'pointer', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
                          <Upload size={16} style={{ color: '#64748B' }} />
                          <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>
                            {resumeFile ? resumeFile.name : 'Upload Resume (PDF, DOC, DOCX) *'}
                          </span>
                          <input
                            type="file" required accept=".pdf,.doc,.docx" hidden
                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      <textarea
                        placeholder="Cover Letter (Optional)"
                        value={formState.coverLetter} onChange={(e) => setFormState({ ...formState, coverLetter: e.target.value })}
                        rows={4}
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.875rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                      />

                      <Button type="submit" variant="accent" size="lg" style={{ width: '100%' }}>Submit Application</Button>
                    </form>
                  </>
                )}
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
