import React from 'react';
import { TopInfoBar } from '../../../../components/layout/TopInfoBar';
import { Header } from '../../../../components/layout/Header';
import { Footer } from '../../../../components/layout/Footer';
import { Container } from '../../../../components/ui/Container';
import { Card } from '../../../../components/ui/Card';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';
import { ArrowRight, Clock } from 'lucide-react';
import { fetchPublicData } from '../../../../lib/publicApi';

interface CategoryPageProps {
  params: { slug: string };
}

interface BlogPostItem {
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  author?: string;
  readingTime?: number;
  category?: string;
}

const mockPosts: BlogPostItem[] = [
  {
    title: 'How We Achieved Sub-Second Load Times with Next.js App Router',
    slug: 'sub-second-load-times-nextjs',
    excerpt: 'Architecture decisions, server component patterns, and Cloudinary edge CDN integration.',
    author: 'Vikram Singh',
    readingTime: 8,
    category: 'engineering',
  },
  {
    title: 'MongoDB Aggregation Pipelines for Real-Time Analytics',
    slug: 'mongodb-aggregation-analytics',
    excerpt: 'Building performant analytics dashboards with MongoDB aggregation framework.',
    author: 'Priya Sharma',
    readingTime: 6,
    category: 'engineering',
  },
];

export async function generateMetadata({ params }: CategoryPageProps) {
  const formattedName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${formattedName} Articles | Today Digitech Blog`,
    description: `Browse all ${formattedName} articles and technical deep dives from Today Digitech engineering team.`,
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.slug.toLowerCase();
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const fetchedPosts = await fetchPublicData<BlogPostItem[]>(`/blog?category=${categorySlug}`, mockPosts);

  const posts = Array.isArray(fetchedPosts)
    ? fetchedPosts.filter((p) => !p.category || p.category.toLowerCase().includes(categorySlug.replace(/-/g, '')))
    : mockPosts;

  const displayPosts = posts.length > 0 ? posts : mockPosts;

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      <section style={{ background: 'var(--gradient-dark)', padding: '4rem 0', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Badge variant="accent" size="md" style={{ alignSelf: 'center' }}>Category</Badge>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>{categoryName} Articles</h1>
          </div>
        </Container>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {displayPosts.map((post, idx) => (
              <Card key={post.slug || idx} hoverable style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-heading)' }}>{post.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', lineHeight: 1.6, flex: 1 }}>{post.excerpt || post.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: '#64748B', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                  <span style={{ fontWeight: 700 }}>{post.author || 'Editorial Team'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {post.readingTime || 5} min</span>
                </div>
                <a href={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm" icon={<ArrowRight size={14} />}>Read Article</Button>
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
