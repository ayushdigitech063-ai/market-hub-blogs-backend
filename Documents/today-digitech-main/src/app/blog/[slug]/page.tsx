import React from 'react';
import { TopInfoBar } from '../../../components/layout/TopInfoBar';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Container } from '../../../components/ui/Container';
import { Clock } from 'lucide-react';
import { fetchPublicData } from '../../../lib/publicApi';

interface BlogDetailProps {
  params: { slug: string };
}

interface BlogPostData {
  title: string;
  excerpt?: string;
  content: string;
  category?: string;
  author?: string;
  authorRole?: string;
  readingTime?: number;
  publishDate?: string;
  coverImageUrl?: string;
  imageUrl?: string;
  tags?: string[];
  toc?: Array<{ id: string; text: string }>;
  relatedPosts?: Array<{ title: string; slug: string; readingTime: number }>;
}

const defaultDetailPost: BlogPostData = {
  title: 'How We Achieved Sub-Second Load Times with Next.js App Router & Edge Caching',
  excerpt: 'A deep dive into our architecture decisions, server component patterns, and Cloudinary edge CDN integration.',
  content: `
    <p>Our client's enterprise e-commerce platform was experiencing 3.2-second average load times, resulting in a 45% bounce rate on mobile devices. The monolithic React SPA was shipping 2.1MB of JavaScript to every visitor.</p>
    <h2>Architecture Decisions & RSC</h2>
    <p>We migrated to Next.js 14 App Router with React Server Components (RSC), implementing a hybrid rendering strategy: static generation for product listing pages, server-side rendering for personalized content, and client components only for interactive elements like cart and search.</p>
    <h2>Edge Caching Strategy</h2>
    <p>By deploying to Vercel Edge Functions and configuring Cloudinary's auto-format and responsive image transformations, we reduced image payload by 72% while maintaining visual quality across 2x and 3x displays.</p>
    <h2>Results and Key Performance Metrics</h2>
    <p>The final architecture achieved a 0.4-second Largest Contentful Paint (LCP), 98/100 Lighthouse performance score, and 0.02 Cumulative Layout Shift (CLS). Bounce rate dropped from 45% to 12%.</p>
  `,
  category: 'Engineering',
  author: 'Vikram Singh',
  authorRole: 'Lead Full-Stack Architect',
  readingTime: 6,
  publishDate: 'August 16, 2026',
  coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  tags: ['Next.js', 'Performance', 'Edge Computing', 'React Server Components'],
  relatedPosts: [
    { title: 'MongoDB Aggregation Pipelines for Real-Time Analytics', slug: 'mongodb-aggregation-analytics', readingTime: 6 },
    { title: 'Complete Guide to Technical SEO for Next.js', slug: 'technical-seo-nextjs', readingTime: 10 },
  ],
};

export async function generateMetadata({ params }: BlogDetailProps) {
  const post = await fetchPublicData<BlogPostData | null>(
    `/blog/${params.slug}`,
    defaultDetailPost
  );

  const titleStr = post?.title || 'Blog Article | Today Digitech';
  return {
    title: `${titleStr} | Today Digitech Blog`,
    description: post?.excerpt || 'Read our latest engineering and tech insights.',
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const postResult = await fetchPublicData<BlogPostData | null>(
    `/blog/${params.slug}`,
    defaultDetailPost
  );

  const post = postResult || defaultDetailPost;
  const author = post.author || 'Today Digitech Engineering Team';
  const category = post.category || 'Engineering';
  const tags = post.tags || ['Web Development', 'Cloud Architecture'];
  const cover = post.coverImageUrl || post.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
  const relatedPosts = post.relatedPosts || defaultDetailPost.relatedPosts || [];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopInfoBar />
      <Header />

      {/* Hero Article Header */}
      <section style={{ background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', padding: '4.5rem 0 4rem', color: '#FFFFFF', position: 'relative' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span style={{ padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(255,106,0,0.2)', color: '#FF6A00', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
                {category}
              </span>
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              {post.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.875rem', color: '#94A3B8', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FF6A00', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {author.charAt(0)}
                </div>
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{author}</span>
              </div>

              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {post.readingTime || 6} min read</span>
              <span>•</span>
              <span>{post.publishDate || 'Published Recently'}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Article Container */}
      <section style={{ padding: '3.5rem 0 5rem' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>

            {/* Article Cover Image Banner */}
            {cover && (
              <div style={{ width: '100%', height: '380px', borderRadius: '20px', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 15px 35px -10px rgba(3,23,53,0.15)', border: '1px solid #E2E8F0' }}>
                <img src={cover} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            {/* Article Main Body Content */}
            <article style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px -8px rgba(0,0,0,0.04)' }}>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: '#334155' }}
              />

              {/* Tags Pills */}
              {tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '3rem', paddingTop: '1.75rem', borderTop: '1px solid #F1F5F9' }}>
                  {tags.map((tag, idx) => (
                    <span key={idx} style={{ padding: '0.3rem 0.85rem', borderRadius: '9999px', backgroundColor: '#F1F5F9', color: '#07448D', fontSize: '0.8125rem', fontWeight: 700 }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Author Profile Box */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem', marginTop: '2rem', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1.25rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #07448D 0%, #FF6A00 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', flexShrink: 0 }}>
                {author.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Written by {author}</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0.25rem 0 0' }}>{post.authorRole || 'Senior Software Engineer & Contributor at Today Digitech'}</p>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>Related Engineering Articles</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {relatedPosts.map((rp, idx) => (
                    <a key={idx} href={`/blog/${rp.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', transition: 'all 0.15s ease' }}>
                      <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9375rem', lineHeight: 1.4 }}>{rp.title}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#FF6A00', fontWeight: 700 }}><Clock size={12} /> {rp.readingTime} min read</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
