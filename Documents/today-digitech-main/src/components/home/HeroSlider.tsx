'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { getMediaUrl } from '../../lib/publicApi';
import {
  ArrowRight,
  Sparkles,
  Target,
  Search,
  Code2,
  TrendingUp,
  BarChart3,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Users,
  Award,
  Zap,
} from 'lucide-react';

export interface HeroSlideItem {
  id: string;
  badgeText: string;
  headlineFixed: string;
  headlineAccent: string;
  subdescription: string;
  pills: Array<{ icon: React.ReactNode; label: string }>;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  trustedText: string;
  heroImageUrl: string;
  stats: Array<{
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    value: string;
    label: string;
    sublabel: string;
  }>;
}

interface HeroSliderProps {
  initialHeroData?: {
    badgeText?: string;
    headlineTitle?: string;
    headlineAccent?: string;
    subdescription?: string;
    primaryCtaText?: string;
    primaryCtaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    trustedText?: string;
    heroImageUrl?: string;
  };
}

export function HeroSlider({ initialHeroData }: HeroSliderProps) {
  const slides: HeroSlideItem[] = [
    {
      id: 'digital-marketing',
      badgeText: 'DIGITAL MARKETING • PERFORMANCE GROWTH • ROI',
      headlineFixed: 'Building Digital Products That',
      headlineAccent: 'Multiply Revenue & Growth',
      subdescription:
        'Execute hyper-targeted PPC, social media campaigns, brand strategy, and performance growth funnels that deliver maximum ROI.',
      pills: [
        { icon: <Target size={15} color="#FF6A00" />, label: 'Performance PPC' },
        { icon: <TrendingUp size={15} color="#FF6A00" />, label: 'Social Media Ads' },
        { icon: <BarChart3 size={15} color="#FF6A00" />, label: 'Funnel Growth' },
      ],
      primaryCtaText: 'Boost Marketing ROI',
      primaryCtaHref: '/contact',
      secondaryCtaText: 'Explore Marketing',
      secondaryCtaHref: '/solutions',
      trustedText: 'Trusted by 50+ high-growth brands worldwide',
      heroImageUrl: '/images/digital_marketing_hero.jpg',
      stats: [
        {
          icon: <TrendingUp size={22} />,
          color: '#FF6A00',
          bgColor: 'rgba(255, 106, 0, 0.15)',
          value: '350%+',
          label: 'Average ROI Boost',
          sublabel: 'Across All Campaigns',
        },
        {
          icon: <Globe size={22} />,
          color: '#3B82F6',
          bgColor: 'rgba(59, 130, 246, 0.15)',
          value: '10M+',
          label: 'Monthly Reach',
          sublabel: 'Targeted Impression Scale',
        },
        {
          icon: <BarChart3 size={22} />,
          color: '#A855F7',
          bgColor: 'rgba(168, 85, 247, 0.15)',
          value: '4.8x',
          label: 'Lead Conversion Rate',
          sublabel: 'Funnel Optimization',
        },
        {
          icon: <Award size={22} />,
          color: '#10B981',
          bgColor: 'rgba(16, 185, 129, 0.15)',
          value: '₹50Cr+',
          label: 'Ad Spend Managed',
          sublabel: 'Proven Growth Record',
        },
      ],
    },
    {
      id: 'seo-acceleration',
      badgeText: 'SEARCH ENGINE OPTIMIZATION • TOP RANKINGS • ORGANIC TRAFFIC',
      headlineFixed: 'Building Digital Products That',
      headlineAccent: 'Dominate Google Search #1',
      subdescription:
        'Outrank competitors on Google with technical SEO audits, keyword dominance, authority backlinks, and organic traffic growth.',
      pills: [
        { icon: <Search size={15} color="#FF6A00" />, label: 'Technical SEO Audit' },
        { icon: <Zap size={15} color="#FF6A00" />, label: 'Core Web Vitals' },
        { icon: <Award size={15} color="#FF6A00" />, label: 'Authority Backlinks' },
      ],
      primaryCtaText: 'Get Free SEO Audit',
      primaryCtaHref: '/contact',
      secondaryCtaText: 'View SEO Packages',
      secondaryCtaHref: '/packages',
      trustedText: 'Ranked #1 for 100+ Competitive Search Terms',
      heroImageUrl: '/images/seo_hero.jpg',
      stats: [
        {
          icon: <Search size={22} />,
          color: '#FF6A00',
          bgColor: 'rgba(255, 106, 0, 0.15)',
          value: 'Rank #1',
          label: 'Google SERP Dominance',
          sublabel: 'First Page Ranking',
        },
        {
          icon: <TrendingUp size={22} />,
          color: '#3B82F6',
          bgColor: 'rgba(59, 130, 246, 0.15)',
          value: '500K+',
          label: 'Monthly Organic Traffic',
          sublabel: 'Sustainable Growth',
        },
        {
          icon: <CheckCircle2 size={22} />,
          color: '#A855F7',
          bgColor: 'rgba(168, 85, 247, 0.15)',
          value: '98%',
          label: 'Technical Audit Score',
          sublabel: 'Lighthouse Standard',
        },
        {
          icon: <Award size={22} />,
          color: '#10B981',
          bgColor: 'rgba(16, 185, 129, 0.15)',
          value: '150+',
          label: 'Top 3 Ranked Keywords',
          sublabel: 'Proven Organic Results',
        },
      ],
    },
    {
      id: 'digital-engineering',
      badgeText: initialHeroData?.badgeText || 'DIGITAL TRANSFORMATION • ENGINEERING • INNOVATION',
      headlineFixed: 'Building Digital Products That',
      headlineAccent: initialHeroData?.headlineAccent || 'Move Businesses Forward',
      subdescription:
        initialHeroData?.subdescription ||
        'We build scalable web, mobile, AI and cloud solutions that drive innovation, growth and long-term impact.',
      pills: [
        { icon: <Code2 size={15} color="#FF6A00" />, label: 'Next.js & React' },
        { icon: <Globe size={15} color="#FF6A00" />, label: 'Mobile & Cloud' },
        { icon: <Sparkles size={15} color="#FF6A00" />, label: 'AI & DevOps' },
      ],
      primaryCtaText: initialHeroData?.primaryCtaText || 'Start a Project',
      primaryCtaHref: initialHeroData?.primaryCtaHref || '/contact',
      secondaryCtaText: initialHeroData?.secondaryCtaText || 'View Our Work',
      secondaryCtaHref: initialHeroData?.secondaryCtaHref || '/portfolio',
      trustedText: initialHeroData?.trustedText || 'Trusted by 50+ companies worldwide',
      heroImageUrl: initialHeroData?.heroImageUrl || '/images/hero_dashboard.jpg',
      stats: [
        {
          icon: <Zap size={22} />,
          color: '#FF6A00',
          bgColor: 'rgba(255, 106, 0, 0.15)',
          value: '50+',
          label: 'Projects Delivered',
          sublabel: 'Across 15+ Countries',
        },
        {
          icon: <ShieldCheck size={22} />,
          color: '#3B82F6',
          bgColor: 'rgba(59, 130, 246, 0.15)',
          value: '99.9%',
          label: 'Uptime & Reliability',
          sublabel: 'Enterprise Grade SLA',
        },
        {
          icon: <Users size={22} />,
          color: '#A855F7',
          bgColor: 'rgba(168, 85, 247, 0.15)',
          value: '40+',
          label: 'Experts & Engineers',
          sublabel: 'Passionate Professionals',
        },
        {
          icon: <Globe size={22} />,
          color: '#10B981',
          bgColor: 'rgba(16, 185, 129, 0.15)',
          value: '24/7',
          label: 'Cloud & SLA Support',
          sublabel: 'Always On Maintenance',
        },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setIsFading(false);
      }, 400); // 400ms smooth fade out, then swap slide & fade in
    }, 4500); // 4.5 seconds per slide (Comfortable reading speed)

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTabClick = (index: number) => {
    if (index === currentIndex || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 400);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      style={{
        background: 'radial-gradient(120% 120% at 50% -10%, #0F3B7A 0%, #0A2540 55%, #07192E 100%)',
        padding: '3.5rem 0 3.5rem',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '8%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(255, 106, 0, 0.25) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >

        {/* Slide Content Grid with Ultra-Smooth Fade & Scale Transition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            minHeight: '440px',
            opacity: isFading ? 0 : 1,
            transform: isFading ? 'translateY(12px) scale(0.98)' : 'translateY(0) scale(1)',
            transition: 'opacity 0.45s ease-in-out, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Left Column: Heading & CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex' }}>
              <span
                style={{
                  backgroundColor: 'rgba(255, 106, 0, 0.15)',
                  color: '#FF8A33',
                  border: '1px solid rgba(255, 106, 0, 0.4)',
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 0 15px rgba(255, 106, 0, 0.15)',
                }}
              >
                <Sparkles size={14} color="#FF8A33" /> {currentSlide.badgeText}
              </span>
            </div>

            {/* Title - Fully visible, responsive headline without clipping */}
            <h1
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)',
                fontWeight: 900,
                lineHeight: 1.25,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: 0,
                wordBreak: 'break-word',
              }}
            >
              <div>{currentSlide.headlineFixed}</div>
              <div style={{ color: '#FF6A00' }}>
                {currentSlide.headlineAccent}
              </div>
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#CBD5E1', lineHeight: 1.65, margin: 0 }}>
              {currentSlide.subdescription}
            </p>


            {/* Pill Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                fontSize: '0.85rem',
                color: '#E2E8F0',
                fontWeight: 600,
              }}
            >
              {currentSlide.pills.map((pill, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  {pill.icon} {pill.label}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', paddingTop: '0.35rem' }}>
              <a href={currentSlide.primaryCtaHref} style={{ textDecoration: 'none' }}>
                <Button variant="accent" size="lg" icon={<ArrowRight size={18} />}>
                  {currentSlide.primaryCtaText}
                </Button>
              </a>
              <a href={currentSlide.secondaryCtaHref} style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    padding: '0.875rem 2.25rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  }}
               onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = '#0A233E';
  e.currentTarget.style.borderColor = '#FF6A00';
  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
  e.currentTarget.style.boxShadow = '0 8px 25px rgba(10, 35, 62, 0.35)';
}}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <span>▷</span> {currentSlide.secondaryCtaText}
                </button>
              </a>
            </div>

            {/* Trust Avatars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '0.25rem' }}>
              <div style={{ display: 'flex' }}>
                {['/client1.png', '/client2.png', '/client3.png'].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid #0A2540',
                      backgroundColor: i === 0 ? '#FF6A00' : i === 1 ? '#07448D' : '#3B82F6',
                      marginLeft: i > 0 ? '-10px' : 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#FFF',
                    }}
                  >
                    {['DM', 'SEO', 'DEV'][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '0.875rem', color: '#94A3B8', fontWeight: 500 }}>
                {currentSlide.trustedText}
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Slide Image */}
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -10px rgba(0, 0, 0, 0.5), 0 0 45px rgba(59, 130, 246, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                lineHeight: 0,
                backgroundColor: '#0A2540',
              }}
            >
              <img
                src={getMediaUrl(currentSlide.heroImageUrl)}
                alt={currentSlide.headlineFixed}
                style={{
                  width: '100%',
                  height: '380px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
              
              {/* Category Floating Overlay Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(10, 37, 64, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF6A00' }} />
                <span>{currentIndex === 0 ? 'Digital Marketing' : currentIndex === 1 ? 'SEO Performance' : 'Tech & Engineering'}</span>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom 4 Key Stats Bar - Dynamic per slide with matching fade */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1.65rem 2rem',
            backgroundColor: 'rgba(10, 37, 64, 0.85)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(16px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.75rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            opacity: isFading ? 0.3 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          {currentSlide.stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: stat.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontSize: '0.725rem', color: '#94A3B8' }}>{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
