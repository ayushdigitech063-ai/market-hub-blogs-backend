'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Smartphone, BarChart3, Cloud, ArrowRight } from 'lucide-react';

export interface ServiceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  items: { name: string; href: string }[];
}

export const servicesData: ServiceCategory[] = [
  {
    title: 'Web Engineering & Portals',
    description: 'High-performance web apps, Next.js portals & e-commerce platforms.',
    icon: <Code size={22} color="var(--color-orange)" />,
    href: '/services/web-development',
    items: [
      { name: 'Custom Next.js & React Apps', href: '/services/nextjs-development' },
      { name: 'Enterprise Portal Development', href: '/services/enterprise-portals' },
      { name: 'Full-Stack Node/Express Solutions', href: '/services/node-development' },
      { name: 'Headless CMS & E-Commerce', href: '/services/ecommerce' },
    ],
  },
  {
    title: 'Mobile App Development',
    description: 'Native Android, iOS & Cross-platform React Native applications.',
    icon: <Smartphone size={22} color="var(--color-orange)" />,
    href: '/services/mobile-apps',
    items: [
      { name: 'Android Application Engineering', href: '/services/android-apps' },
      { name: 'iOS Application Engineering', href: '/services/ios-apps' },
      { name: 'React Native & Flutter Apps', href: '/services/cross-platform-apps' },
      { name: 'App Maintenance & Optimization', href: '/services/app-maintenance' },
    ],
  },
  {
    title: 'Digital Marketing & Growth',
    description: 'Data-driven SEO, PPC campaigns, branding & lead generation.',
    icon: <BarChart3 size={22} color="var(--color-orange)" />,
    href: '/services/digital-marketing',
    items: [
      { name: 'Search Engine Optimization (SEO)', href: '/services/seo' },
      { name: 'Pay-Per-Click (Google & Meta Ads)', href: '/services/ppc-advertising' },
      { name: 'Social Media Strategy & Marketing', href: '/services/social-media' },
      { name: 'Content Marketing & Branding', href: '/services/content-marketing' },
    ],
  },
  {
    title: 'Cloud & AI Solutions',
    description: 'AWS/Azure cloud DevOps, microservices & custom AI integration.',
    icon: <Cloud size={22} color="var(--color-orange)" />,
    href: '/services/cloud-ai',
    items: [
      { name: 'Cloud Architecture & DevOps', href: '/services/cloud-devops' },
      { name: 'AI & Automation Integration', href: '/services/ai-solutions' },
      { name: 'API Infrastructure & Integration', href: '/services/api-services' },
      { name: 'Cybersecurity & Compliance', href: '/services/cybersecurity' },
    ],
  },
];

export interface ServicesMegaMenuProps {
  onClose?: () => void;
}

export const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 4px)',
        left: '-180px',
        width: '860px',
        maxWidth: 'calc(100vw - 2rem)',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 20px 40px -10px rgba(6, 43, 99, 0.25)',
        borderRadius: '16px',
        borderTop: '3px solid var(--color-orange)',
        borderLeft: '1px solid var(--color-border)',
        borderRight: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        zIndex: 999,
        padding: '1.75rem 0',
        animation: 'fadeIn 200ms ease-out',
      }}
      onMouseLeave={onClose}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '2rem',
          }}
        >
          {servicesData.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(6, 43, 99, 0.05)',
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-heading)' }}>
                    {cat.title}
                  </h4>
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-body)', lineHeight: 1.4 }}>
                {cat.description}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                                 <Link
                      href={item.href}
                      onClick={onClose}
                      className="mega-menu-link"
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-heading)',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        transition: 'color var(--transition-fast), transform var(--transition-fast)',
                      }}
                    >
                      <span>• {item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--color-body)' }}>
            Need a tailored enterprise digital solution? Speak to our engineering architects.
          </span>
          <Link
            href="/contact"
            onClick={onClose}
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--color-orange)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <span>Request Custom Proposal</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
            <style jsx>{`
        .mega-menu-link:hover {
          color: var(--color-orange) !important;
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
};

