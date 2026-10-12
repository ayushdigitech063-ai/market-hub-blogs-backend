'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { WebsiteSettingsDTO } from '@today-digitech/shared';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';
import { AdminContentContainer } from '@/components/admin/layout/AdminContentContainer';
import { ProtectedRoute } from '@/components/admin/auth/ProtectedRoute';
import { apiClient } from '@/lib/apiClient';
import { getMediaUrl } from '@/lib/publicApi';
import { Globe, Phone, Search, Save, Check, Layout, BarChart2, Loader2, AlertCircle, Sparkles, ChevronDown, Upload, Megaphone, Image as ImageIcon, Handshake } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingHeaderLogo, setUploadingHeaderLogo] = useState(false);
  const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
  const [uploadingAdminLogo, setUploadingAdminLogo] = useState(false);

  const [isHeroSectionOpen, setisHeroSectionOpen] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setUrl: (url: string) => void,
    setLoadingState: (loading: boolean) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingState(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await apiClient<{ url: string }>('/settings/hero-image', {
        method: 'POST',
        body: formData,
      });

      const uploadedUrl = res.data?.url || (res as any).url;
      if (res.success && uploadedUrl) {
        setUrl(uploadedUrl);
      } else {
        setError(res.message || 'Logo upload failed.');
      }
    } catch {
      setError('Multer file upload error.');
    } finally {
      setLoadingState(false);
    }
  };

  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaHref, setCtaHref] = useState('');
  const [footerDesc, setFooterDesc] = useState('');
  const [copyright, setCopyright] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [googleAnalytics, setGoogleAnalytics] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Hero Section Customizer States
  const [heroBadge, setHeroBadge] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroAccent, setHeroAccent] = useState('');
  const [heroSubdesc, setHeroSubdesc] = useState('');
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState('');
  const [heroPrimaryCtaHref, setHeroPrimaryCtaHref] = useState('');
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState('');
  const [heroSecondaryCtaHref, setHeroSecondaryCtaHref] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [heroTrustedText, setHeroTrustedText] = useState('');

  const handleMulterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await apiClient<{ url: string }>('/settings/hero-image', {
        method: 'POST',
        body: formData,
      });

      const uploadedUrl = res.data?.url || (res as any).url;
      if (res.success && uploadedUrl) {
        setHeroImageUrl(uploadedUrl);
      } else {
        setError(res.message || 'Image upload failed.');
      }
    } catch {
      setError('Multer file upload error.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Announcement Bar & Logos & Partners States
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementBadge, setAnnouncementBadge] = useState('');
  const [announcementHref, setAnnouncementHref] = useState('');
  const [announcementActive, setAnnouncementActive] = useState(true);
  const [headerLogoUrl, setHeaderLogoUrl] = useState('');
  const [footerLogoUrl, setFooterLogoUrl] = useState('');
  const [adminPanelLogoUrl, setAdminPanelLogoUrl] = useState('');

  const [partnersTopCaption, setPartnersTopCaption] = useState('');
  const [partnersHeadline, setPartnersHeadline] = useState('');

  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(true);
  const [isLogosOpen, setIsLogosOpen] = useState(true);
  const [isPartnersOpen, setIsPartnersOpen] = useState(true);

  const applySettings = (settings: WebsiteSettingsDTO) => {
    setBusinessName(settings.businessName || '');
    setTagline(settings.tagline || '');
    setPhone(settings.phone || '');
    setWhatsapp(settings.whatsapp || '');
    setEmail(settings.email || '');
    setAddress(settings.address || '');
    setBusinessHours(settings.businessHours || '');
    setCtaText(settings.headerCta?.text || '');
    setCtaHref(settings.headerCta?.href || '');
    setFooterDesc(settings.footerDescription || '');
    setCopyright(settings.copyrightText || '');
    setMetaTitle(settings.defaultSeo?.metaTitle || '');
    setMetaDesc(settings.defaultSeo?.metaDescription || '');
    setGoogleAnalytics(settings.analyticsIds?.googleAnalyticsId || '');
    setMaintenanceMode(!!settings.maintenanceMode);

    setHeaderLogoUrl(settings.headerLogoUrl || '');
    setFooterLogoUrl(settings.footerLogoUrl || '');
    setAdminPanelLogoUrl(settings.adminPanelLogoUrl || '');

    if (settings.partnersSection) {
      setPartnersTopCaption(settings.partnersSection.topCaption || '');
      setPartnersHeadline(settings.partnersSection.headlineText || '');
    }

    if (settings.announcementBar) {
      setAnnouncementText(settings.announcementBar.text || '');
      setAnnouncementBadge(settings.announcementBar.badgeText || '');
      setAnnouncementHref(settings.announcementBar.href || '');
      setAnnouncementActive(settings.announcementBar.isActive !== false);
    }

    // Apply Hero Settings
    if (settings.heroSection) {
      setHeroBadge(settings.heroSection.badgeText || '');
      setHeroTitle(settings.heroSection.headlineTitle || '');
      setHeroAccent(settings.heroSection.headlineAccent || '');
      setHeroSubdesc(settings.heroSection.subdescription || '');
      setHeroPrimaryCtaText(settings.heroSection.primaryCtaText || '');
      setHeroPrimaryCtaHref(settings.heroSection.primaryCtaHref || '');
      setHeroSecondaryCtaText(settings.heroSection.secondaryCtaText || '');
      setHeroSecondaryCtaHref(settings.heroSection.secondaryCtaHref || '');
      setHeroImageUrl(settings.heroSection.heroImageUrl || '');
      setHeroTrustedText(settings.heroSection.trustedText || '');
    }
  };

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await apiClient<WebsiteSettingsDTO>('/settings');
    if (res.success && res.data) {
      applySettings(res.data);
    } else {
      setError(res.message || 'Unable to load website settings.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setIsSaved(false);

    const payload: Partial<WebsiteSettingsDTO> = {
      businessName,
      tagline,
      phone,
      whatsapp,
      email,
      address,
      businessHours,
      headerLogoUrl,
      footerLogoUrl,
      adminPanelLogoUrl,
      partnersSection: {
        topCaption: partnersTopCaption,
        headlineText: partnersHeadline,
      },
      announcementBar: {
        text: announcementText,
        badgeText: announcementBadge,
        href: announcementHref,
        isActive: announcementActive,
      },
      headerCta: { text: ctaText, href: ctaHref, isActive: true },
      heroSection: {
        badgeText: heroBadge,
        headlineTitle: heroTitle,
        headlineAccent: heroAccent,
        subdescription: heroSubdesc,
        primaryCtaText: heroPrimaryCtaText,
        primaryCtaHref: heroPrimaryCtaHref,
        secondaryCtaText: heroSecondaryCtaText,
        secondaryCtaHref: heroSecondaryCtaHref,
        heroImageUrl,
        trustedText: heroTrustedText,
      },
      footerDescription: footerDesc,
      copyrightText: copyright,
      defaultSeo: { metaTitle, metaDescription: metaDesc, keywords: [] },
      analyticsIds: { googleAnalyticsId: googleAnalytics },
      maintenanceMode,
    };

    const res = await apiClient<WebsiteSettingsDTO>('/settings', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.success && res.data) {
      applySettings(res.data);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } else {
      setError(res.message || 'Failed to save website settings.');
    }
  };

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredPermission="MANAGE_SETTINGS">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <AdminSidebar
          currentPath="/admin/settings"
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminHeader
            title="Website & Branding Settings"
            onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          />

          <AdminContentContainer>
            {/* Header Banner */}
            <div style={{ padding: '1.75rem 2rem', borderRadius: '16px', background: 'linear-gradient(135deg, #031735 0%, #07448D 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 25px -5px rgba(3, 23, 53, 0.3)', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                  System Settings & Branding Control
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>
                  Configure website business profile, branding logos, contact info, and SEO defaults.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={(e) => void handleSubmit(e)} disabled={saving} style={{ backgroundColor: '#FF6A00', color: '#FFFFFF', border: 'none', padding: '0.55rem 1.25rem', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(255,106,0,0.3)' }}>
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#FEF2F2', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {isSaved && (
              <div style={{ padding: '1rem 1.25rem', backgroundColor: '#F0FDF4', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={18} />
                <span>Website branding & configuration updated successfully across public APIs!</span>
              </div>
            )}

            {loading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-body)' }}>
                <Loader2 size={24} style={{ margin: '0 auto 0.5rem' }} />
                <p style={{ fontSize: '0.875rem' }}>Loading website settings...</p>
              </div>
            ) : (
              <form onSubmit={(e) => void handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Globe size={22} color="var(--color-primary-navy)" />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Business Branding & Identity</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Business Name</label>
                      <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Tagline</label>
                      <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                  </div>
                </div>

                {/* Contact Info Section */}
                <div id="contact-info" style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Phone size={22} color="var(--color-orange)" />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Contact Information & Location</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Phone Number</label>
                      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>WhatsApp Number</label>
                      <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email Address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Business Hours</label>
                      <input type="text" value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Full Address</label>
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                  </div>
                </div>

                {/* Top Announcement Bar Accordion */}
                <div id="announcement-bar" style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                  <div
                    onClick={() => setIsAnnouncementOpen(!isAnnouncementOpen)}
                    style={{ padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: isAnnouncementOpen ? '#F8FAFC' : '#FFFFFF', borderBottom: isAnnouncementOpen ? '1px solid #E2E8F0' : 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Megaphone size={20} color="var(--color-orange)" />
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Top Announcement Ribbon Bar</h3>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>Dynamically edit top notification ticker, active status, badge text, and link.</p>
                      </div>
                    </div>
                    <ChevronDown size={18} style={{ transform: isAnnouncementOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#64748B' }} />
                  </div>

                  {isAnnouncementOpen && (
                    <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Announcement Message</label>
                        <input type="text" value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} placeholder="🚀 Transforming Enterprises with Scalable Next.js 14..." style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Ribbon Badge Label</label>
                        <input type="text" value={announcementBadge} onChange={(e) => setAnnouncementBadge(e.target.value)} placeholder="NEW" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Click Destination Link (URL)</label>
                        <input type="text" value={announcementHref} onChange={(e) => setAnnouncementHref(e.target.value)} placeholder="/contact" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', gridColumn: '1 / -1', paddingTop: '0.25rem' }}>
                        <input type="checkbox" id="ann_active" checked={announcementActive} onChange={(e) => setAnnouncementActive(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                        <label htmlFor="ann_active" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', cursor: 'pointer' }}>
                          Enable Top Announcement Ribbon
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Brand Logos Accordion */}
                <div id="website-logos" style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                  <div
                    onClick={() => setIsLogosOpen(!isLogosOpen)}
                    style={{ padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: isLogosOpen ? '#F8FAFC' : '#FFFFFF', borderBottom: isLogosOpen ? '1px solid #E2E8F0' : 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <ImageIcon size={20} color="var(--color-royal-blue)" />
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Website Logos & Brand Icons</h3>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>Update Header Navbar Logo, Footer Logo, and Admin Portal logo dynamically.</p>
                      </div>
                    </div>
                    <ChevronDown size={18} style={{ transform: isLogosOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#64748B' }} />
                  </div>

                  {isLogosOpen && (
                    <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                      {/* Header Logo Field */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Header Navbar Logo (Multer Upload)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input type="text" value={headerLogoUrl} onChange={(e) => setHeaderLogoUrl(e.target.value)} placeholder="/images/logo-full.svg" style={{ flex: 1, padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                          <label style={{ backgroundColor: '#07448D', color: '#FFFFFF', padding: '0.625rem 1rem', borderRadius: '8px', cursor: uploadingHeaderLogo ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                            <Upload size={14} />
                            {uploadingHeaderLogo ? 'Uploading...' : 'Upload'}
                            <input type="file" accept="image/*" onChange={(e) => void handleLogoUpload(e, setHeaderLogoUrl, setUploadingHeaderLogo)} disabled={uploadingHeaderLogo} style={{ display: 'none' }} />
                          </label>
                        </div>
                        {headerLogoUrl && (
                          <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Live Preview:</span>
                            <img src={getMediaUrl(headerLogoUrl)} alt="Header Logo Preview" style={{ height: '32px', maxWidth: '160px', objectFit: 'contain', backgroundColor: '#031735', padding: '4px 8px', borderRadius: '6px' }} />
                          </div>
                        )}
                      </div>

                      {/* Footer Logo Field */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Footer Brand Logo (Multer Upload)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input type="text" value={footerLogoUrl} onChange={(e) => setFooterLogoUrl(e.target.value)} placeholder="/images/logo-full.svg" style={{ flex: 1, padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                          <label style={{ backgroundColor: '#07448D', color: '#FFFFFF', padding: '0.625rem 1rem', borderRadius: '8px', cursor: uploadingFooterLogo ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                            <Upload size={14} />
                            {uploadingFooterLogo ? 'Uploading...' : 'Upload'}
                            <input type="file" accept="image/*" onChange={(e) => void handleLogoUpload(e, setFooterLogoUrl, setUploadingFooterLogo)} disabled={uploadingFooterLogo} style={{ display: 'none' }} />
                          </label>
                        </div>
                        {footerLogoUrl && (
                          <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Live Preview:</span>
                            <img src={getMediaUrl(footerLogoUrl)} alt="Footer Logo Preview" style={{ height: '32px', maxWidth: '160px', objectFit: 'contain', backgroundColor: '#031735', padding: '4px 8px', borderRadius: '6px' }} />
                          </div>
                        )}
                      </div>

                      {/* Admin Logo Field */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Admin Control Panel Logo (Multer Upload)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input type="text" value={adminPanelLogoUrl} onChange={(e) => setAdminPanelLogoUrl(e.target.value)} placeholder="/images/logo-compact.svg" style={{ flex: 1, padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                          <label style={{ backgroundColor: '#07448D', color: '#FFFFFF', padding: '0.625rem 1rem', borderRadius: '8px', cursor: uploadingAdminLogo ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                            <Upload size={14} />
                            {uploadingAdminLogo ? 'Uploading...' : 'Upload'}
                            <input type="file" accept="image/*" onChange={(e) => void handleLogoUpload(e, setAdminPanelLogoUrl, setUploadingAdminLogo)} disabled={uploadingAdminLogo} style={{ display: 'none' }} />
                          </label>
                        </div>
                        {adminPanelLogoUrl && (
                          <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Live Preview:</span>
                            <img src={getMediaUrl(adminPanelLogoUrl)} alt="Admin Logo Preview" style={{ height: '32px', maxWidth: '160px', objectFit: 'contain', backgroundColor: '#031735', padding: '4px 8px', borderRadius: '6px' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Trusted Brand Partners Section Accordion */}
                <div id="trusted-partners" style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                  <div
                    onClick={() => setIsPartnersOpen(!isPartnersOpen)}
                    style={{ padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: isPartnersOpen ? '#F8FAFC' : '#FFFFFF', borderBottom: isPartnersOpen ? '1px solid #E2E8F0' : 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Handshake size={20} color="#2563EB" />
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Trusted Partners Section Content</h3>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>Dynamically edit top blue caption, heading text, and partner logos list.</p>
                      </div>
                    </div>
                    <ChevronDown size={18} style={{ transform: isPartnersOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#64748B' }} />
                  </div>

                  {isPartnersOpen && (
                    <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Top Blue Subtitle Caption</label>
                        <input type="text" value={partnersTopCaption} onChange={(e) => setPartnersTopCaption(e.target.value)} placeholder="TRUSTED BY BUSINESSES & GROWING TEAMS" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Main Headline Heading</label>
                        <input type="text" value={partnersHeadline} onChange={(e) => setPartnersHeadline(e.target.value)} placeholder="We’re proud to partner with ambitious companies..." style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Dynamic Hero Section Controls */}
                <div id="hero-banner" style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                  <div
                    onClick={() => setisHeroSectionOpen(!isHeroSectionOpen)}
                    style={{ padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: isHeroSectionOpen ? '#F8FAFC' : '#FFFFFF', borderBottom: isHeroSectionOpen ? '1px solid #E2E8F0' : 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Sparkles size={22} color="var(--color-orange)" />
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Homepage Hero Banner Settings</h3>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>Dynamically update homepage hero headline, badge, buttons, SEO metadata & upload image via Multer.</p>
                      </div>
                    </div>
                    <ChevronDown size={20} style={{ transform: isHeroSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#64748B' }} />
                  </div>

                  {isHeroSectionOpen && (
                    <div style={{ padding: '1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Hero Pill Badge Text</label>
                        <input type="text" value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} placeholder="DIGITAL TRANSFORMATION • ENGINEERING • INNOVATION" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Headline Title (White Text)</label>
                        <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Building Digital Products That" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Headline Accent (Orange Highlight)</label>
                        <input type="text" value={heroAccent} onChange={(e) => setHeroAccent(e.target.value)} placeholder="Move Businesses Forward" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Hero Subdescription Paragraph</label>
                        <textarea value={heroSubdesc} onChange={(e) => setHeroSubdesc(e.target.value)} rows={2} placeholder="We build scalable web, mobile, AI and cloud solutions..." style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', resize: 'vertical' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Primary Button Label</label>
                        <input type="text" value={heroPrimaryCtaText} onChange={(e) => setHeroPrimaryCtaText(e.target.value)} placeholder="Start a Project" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Primary Button Link (URL)</label>
                        <input type="text" value={heroPrimaryCtaHref} onChange={(e) => setHeroPrimaryCtaHref(e.target.value)} placeholder="/contact" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Secondary Button Label</label>
                        <input type="text" value={heroSecondaryCtaText} onChange={(e) => setHeroSecondaryCtaText(e.target.value)} placeholder="View Our Work" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Secondary Button Link (URL)</label>
                        <input type="text" value={heroSecondaryCtaHref} onChange={(e) => setHeroSecondaryCtaHref(e.target.value)} placeholder="/portfolio" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>

                      {/* Multer Direct Image Upload Field */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Upload 3D Hero Graphic Image (Multer Engine)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                          <input type="text" value={heroImageUrl} onChange={(e) => setHeroImageUrl(e.target.value)} placeholder="/images/hero_dashboard.jpg" style={{ flex: 1, minWidth: '240px', padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                          <label style={{ backgroundColor: '#07448D', color: '#FFFFFF', padding: '0.625rem 1.25rem', borderRadius: '8px', cursor: uploadingImage ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(7,68,141,0.2)' }}>
                            <Upload size={16} />
                            {uploadingImage ? 'Uploading via Multer...' : 'Upload Image'}
                            <input type="file" accept="image/*" onChange={(e) => void handleMulterUpload(e)} disabled={uploadingImage} style={{ display: 'none' }} />
                          </label>
                        </div>
                        {heroImageUrl && (
                          <div style={{ marginTop: '0.5rem', width: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                            <img src={heroImageUrl} alt="Hero Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Client Trust Caption</label>
                        <input type="text" value={heroTrustedText} onChange={(e) => setHeroTrustedText(e.target.value)} placeholder="Trusted by 50+ companies worldwide" style={{ padding: '0.625rem 0.875rem', fontSize: '0.9375rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none' }} />
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Layout size={22} color="var(--color-primary-navy)" />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Header CTA & Footer Options</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Header CTA Button Text</label>
                      <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Header CTA Target Link</label>
                      <input type="text" value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Footer Overview Description</label>
                      <textarea value={footerDesc} onChange={(e) => setFooterDesc(e.target.value)} rows={2} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', resize: 'vertical' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Copyright Notice Text</label>
                      <input type="text" value={copyright} onChange={(e) => setCopyright(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Search size={22} color="var(--color-royal-blue)" />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Default SEO & Analytics IDs</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Google Analytics Tracking Measurement ID</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <BarChart2 size={16} style={{ position: 'absolute', left: '0.75rem', color: '#94A3B8' }} />
                        <input type="text" value={googleAnalytics} onChange={(e) => setGoogleAnalytics(e.target.value)} style={{ width: '100%', padding: '0.625rem 0.875rem 0.625rem 2.25rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Default Meta Title</label>
                      <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Default Meta Description</label>
                      <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} rows={3} style={{ padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', resize: 'vertical' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <input type="checkbox" id="maint" checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                      <label htmlFor="maint" style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-heading)', cursor: 'pointer' }}>
                        Enable Maintenance Mode (Restricts public access)
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'var(--gradient-brand)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '1rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: 'var(--shadow-md)', alignSelf: 'flex-end', opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? <Loader2 size={18} /> : <Save size={18} />}
                  <span>{saving ? 'Saving...' : 'Save Website Settings'}</span>
                </button>
              </form>
            )}
          </AdminContentContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
}
