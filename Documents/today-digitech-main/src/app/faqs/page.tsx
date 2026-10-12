import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Accordion } from '../../components/ui/Accordion';
import { EmptyState, ErrorState } from '../../components/ui/EmptyState';
import { getPublicCmsData } from '../../lib/publicApi';

export const metadata = {
  title: 'Frequently Asked Questions | Today Digitech',
  description: 'Find answers to common questions regarding software development timelines, cloud DevOps, SLAs, and pricing.',
};

interface FaqItem {
  id?: string;
  title: string;
  question?: string;
  content: string;
  answer?: string;
}

const defaultFaqsList: FaqItem[] = [
  {
    id: 'f-1',
    title: 'How long does a typical custom web application project take?',
    content: 'Most enterprise web projects take between 4 to 8 weeks depending on backend complexity, database architecture, and third-party API integrations.',
  },
  {
    id: 'f-2',
    title: 'Do you provide post-launch support and SLA maintenance?',
    content: 'Yes, we provide 24/7 cloud infrastructure monitoring, security vulnerability patching, and dedicated SLA maintenance squad support.',
  },
  {
    id: 'f-3',
    title: 'Will I have full access to source code and database assets?',
    content: 'Absolutely. Upon delivery, you own 100% of the GitHub repository source code, IP rights, and database assets.',
  },
];

export default async function FaqsPage() {
  const result = await getPublicCmsData<FaqItem[]>('/faqs');
  const fetchedFaqs = result.data;
  const faqs = Array.isArray(fetchedFaqs) && fetchedFaqs.length > 0 ? fetchedFaqs : defaultFaqsList;

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '5rem 0 4.5rem', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.15)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
              Got Questions?
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Clear answers regarding project timelines, tech stacks, SLAs, and deliverables.
            </p>
          </div>
        </Container>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <Accordion
              items={faqs.map((f, idx) => ({
                id: f.id || `faq-${idx}`,
                title: f.title || f.question || '',
                content: f.content || f.answer || '',
              }))}
            />
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
