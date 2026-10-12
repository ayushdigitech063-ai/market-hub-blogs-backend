export interface SocialLinksDTO {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
}

export interface HeaderCtaDTO {
  text: string;
  href: string;
  isActive: boolean;
}

export interface AnalyticsIdsDTO {
  googleAnalyticsId?: string;
  metaPixelId?: string;
  googleTagManagerId?: string;
}

export interface DefaultSeoDTO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}

export interface HeroSectionDTO {
  badgeText?: string;
  headlineTitle?: string;
  headlineAccent?: string;
  subdescription?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  heroImageUrl?: string;
  trustedText?: string;
}

export interface AnnouncementBarDTO {
  text?: string;
  badgeText?: string;
  href?: string;
  isActive?: boolean;
}

export interface PartnersSectionDTO {
  topCaption?: string;
  headlineText?: string;
}

export interface WebsiteSettingsDTO {
  businessName: string;
  tagline: string;
  fullLogoUrl: string;
  compactLogoUrl: string;
  headerLogoUrl?: string;
  footerLogoUrl?: string;
  adminPanelLogoUrl?: string;
  partnersSection?: PartnersSectionDTO;
  announcementBar?: AnnouncementBarDTO;
  faviconUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  businessHours: string;
  socialLinks: SocialLinksDTO;
  headerCta: HeaderCtaDTO;
  heroSection?: HeroSectionDTO;
  footerDescription: string;
  copyrightText: string;
  analyticsIds: AnalyticsIdsDTO;
  defaultSeo: DefaultSeoDTO;
  maintenanceMode: boolean;
  recipientEmails: string[];
  updatedAt?: string;
}
