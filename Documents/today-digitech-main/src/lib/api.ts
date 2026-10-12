import { WebsiteSettingsDTO, NavigationItemDTO } from '@today-digitech/shared';
import { getPublicData } from './publicApi';

export const defaultSettings: WebsiteSettingsDTO = {
  businessName: 'Today Digitech',
  tagline: 'Enterprise Digital Transformation & Engineering',
  fullLogoUrl: '/images/logo-full.svg',
  compactLogoUrl: '/images/logo-compact.svg',
  headerLogoUrl: '/images/logo-full.svg',
  footerLogoUrl: '/images/logo-full.svg',
  adminPanelLogoUrl: '/images/logo-compact.svg',
  partnersSection: {
    topCaption: 'TRUSTED BY BUSINESSES & GROWING TEAMS',
    headlineText: 'We’re proud to partner with ambitious companies across industries.',
  },
  announcementBar: {
    text: '🚀 Transforming Enterprises with Scalable Next.js 14 & AI Engineering',
    badgeText: 'NEW',
    href: '/contact',
    isActive: true,
  },
  faviconUrl: '/favicon.ico',
  phone: '+91 7678444607',
  whatsapp: '+91 7678444607',
  email: 'info@todaydigitech.com',
  address: 'Connaught Place, Central Business District, New Delhi 110001, India',
  googleMapsUrl: 'https://maps.google.com',
  businessHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  socialLinks: {
    facebook: 'https://facebook.com/todaydigitech',
    twitter: 'https://twitter.com/todaydigitech',
    linkedin: 'https://linkedin.com/company/todaydigitech',
    instagram: 'https://instagram.com/todaydigitech',
  },
  headerCta: {
    text: 'Get Started',
    href: '/contact',
    isActive: true,
  },
  heroSection: {
    badgeText: 'DIGITAL TRANSFORMATION • ENGINEERING • INNOVATION',
    headlineTitle: 'Building Digital Products That',
    headlineAccent: 'Move Businesses Forward',
    subdescription: 'We build scalable web, mobile, AI and cloud solutions that drive innovation, growth and long-term impact.',
    primaryCtaText: 'Start a Project',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Our Work',
    secondaryCtaHref: '/portfolio',
    heroImageUrl: '/images/hero_dashboard.jpg',
    trustedText: 'Trusted by 50+ companies worldwide',
  },
  footerDescription:
    'Today Digitech is an enterprise digital transformation partner enabling organizations through web engineering, mobile apps, cloud DevOps, and digital growth strategies.',
  copyrightText: '© 2026 Today Digitech. All rights reserved.',
  analyticsIds: {},
  defaultSeo: {
    metaTitle: 'Today Digitech - Next-Gen Digital Solutions',
    metaDescription: 'Enterprise Digital Transformation, Software Engineering & Tech Innovation Platform.',
    keywords: ['Next.js', 'Express', 'TypeScript', 'Digital Marketing'],
  },
  maintenanceMode: false,
  recipientEmails: ['leads@todaydigitech.com'],
};

export async function fetchPublicSettings(): Promise<WebsiteSettingsDTO> {
  try {
    return await getPublicData<WebsiteSettingsDTO>('/settings', { timeoutMs: 1200, cache: 'no-store' });
  } catch {
    return defaultSettings;
  }
}

export async function fetchPublicNavigation(): Promise<Record<string, NavigationItemDTO[]>> {
  try {
    return await getPublicData<Record<string, NavigationItemDTO[]>>('/navigation');
  } catch {
    return {};
  }
}
