import React from 'react';
import { TopInfoBar } from '../../components/layout/TopInfoBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/ui/Container';
import { ArrowRight, Clock, User, Calendar, Tag, Sparkles } from 'lucide-react';
import { fetchPublicData } from '../../lib/publicApi';

export const metadata = {
  title: 'Blog & Engineering Insights | Today Digitech',
  description: 'Technical articles on Next.js, React, Node.js, cloud architecture, DevOps, and digital marketing strategy.',
};

interface BlogPostItem {
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  category?: string;
  author?: string;
  readingTime?: number;
  publishDate?: string;
  coverImageUrl?: string;
  createdAt?: string;
}

const defaultFeaturedPost: BlogPostItem = {
  title: 'How We Achieved Sub-Second Load Times with Next.js App Router & Edge Caching',
  slug: 'sub-second-load-times-nextjs',
  excerpt: 'A deep dive into our architecture decisions, server component patterns, and Cloudinary edge CDN integration that powers enterprise-grade web performance.',
  category: 'Engineering',
  author: 'Vikram Singh',
  readingTime: 8,
  publishDate: '2026-08-01',
  coverImageUrl: '/images/hero_dashboard.jpg',
};

const defaultPosts: BlogPostItem[] = [
  {
    title: 'MongoDB Aggregation Pipelines for Real-Time Analytics Dashboards',
    slug: 'mongodb-aggregation-analytics',
    excerpt: 'Building performant analytics dashboards with MongoDB aggregation framework and React charting libraries.',
    category: 'Engineering',
    author: 'Priya Sharma',
    readingTime: 6,
    publishDate: '2026-07-28',
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Complete Guide to Technical SEO for Next.js Applications',
    slug: 'technical-seo-nextjs',
    excerpt: 'Dynamic sitemaps, structured data, meta tag generation, and Core Web Vitals optimization strategies.',
    category: 'SEO & Marketing',
    author: 'Rohan Gupta',
    readingTime: 10,
    publishDate: '2026-07-25',
    coverImageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Kubernetes Deployment Strategies for Node.js Microservices',
    slug: 'kubernetes-nodejs-microservices',
    excerpt: 'Blue-green deployments, canary releases, and horizontal pod autoscaling for production-grade Node.js services.',
    category: 'Cloud & DevOps',
    author: 'Amit Patel',
    readingTime: 12,
    publishDate: '2026-07-20',
    coverImageUrl: 'https://images.unsplash.com/photo-1667372335854-c112a69f07a6?auto=format&fit=crop&w=800&q=80',
  },
];

export default async function BlogListingPage() {
  const categories = ['All', 'Engineering', 'Cloud & DevOps', 'SEO & Marketing', 'Design & UX', 'Case Studies'];

  const fetchedPosts = await fetchPublicData<BlogPostItem[]>('/blog', defaultPosts);
  const posts = Array.isArray(fetchedPosts) && fetchedPosts.length > 0 ? fetchedPosts : defaultPosts;
  const featuredPost = posts[0] || defaultFeaturedPost;
  const gridPosts = posts.length > 1 ? posts.slice(1) : posts;

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
              <Sparkles size={14} /> Today Digitech Engineering Insights
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Insights, Tutorials & Technical Deep Dives
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Written by engineering, design, and growth leads building enterprise-grade web applications.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '3.5rem 0 5rem' }}>
        <Container>


          {/* Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map((cat) => (
              <a
                key={cat}
                href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                style={{
                  padding: '0.5rem 1.125rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  backgroundColor: cat === 'All' ? '#07448D' : '#FFFFFF',
                  color: cat === 'All' ? '#FFFFFF' : '#475569',
                  textDecoration: 'none',
                  border: cat === 'All' ? 'none' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Articles Grid Cards (Clean 3 Cards Per Row Layout) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {posts.map((post, idx) => (
              <article
                key={post.slug || idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px -8px rgba(3, 23, 53, 0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Card Top Banner Image with Floating Category Pills */}
                <div style={{ position: 'relative', height: '220px', backgroundColor: '#031735', overflow: 'hidden' }}>
                  <img
                    src={post.coverImageUrl || (idx === 0 ? '/images/hero_dashboard.jpg' : `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80`)}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '0.3rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(3, 23, 53, 0.85)', color: '#FF6A00', backdropFilter: 'blur(4px)', fontSize: '0.725rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {post.category || 'ENGINEERING'}
                    </span>
                  </div>
                </div>

                {/* Card Main Content Area */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {/* Date & Author Header Metadata */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8125rem', color: '#64748B' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                        <Calendar size={14} color="#FF6A00" /> {post.publishDate || '11 Aug'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#0F172A' }}>
                        <User size={14} color="#07448D" /> {post.author || 'TodayDigitech Editorial'}
                      </span>
                    </div>

                    {/* Article Headline Title */}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                      <a href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {post.title}
                      </a>
                    </h3>

                    {/* Article Summary Excerpt */}
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt || post.summary}
                    </p>
                  </div>

                  {/* Card Bottom Footer: Read Time & READ -> Action */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} /> {post.readingTime || 5} min read
                    </span>

                    <a
                      href={`/blog/${post.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: '#FF6A00',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <span>READ</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
