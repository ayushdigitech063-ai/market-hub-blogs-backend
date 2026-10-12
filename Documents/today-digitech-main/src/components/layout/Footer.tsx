'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from 'lucide-react';

import { WebsiteSettingsDTO } from '@today-digitech/shared';
import { defaultSettings, fetchPublicSettings } from '../../lib/api';
import { getMediaUrl } from '../../lib/publicApi';

export interface FooterProps {
  settings?: WebsiteSettingsDTO;
}

export const Footer: React.FC<FooterProps> = ({
  settings: initialSettings,
}) => {
  const [settings, setSettings] = useState<WebsiteSettingsDTO>(
    initialSettings || defaultSettings
  );

  useEffect(() => {
    fetchPublicSettings().then((s) => {
      if (s) setSettings(s);
    });
  }, []);

  const social = settings.socialLinks || {};

  return (
    <>
      {/* Footer Hover Styles */}
      <style jsx>{`
        /* ================================
           FOOTER LINKS
        ================================= */

        .footer-link {
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .footer-link:hover {
          color: #ff6a00 !important;
          transform: translateX(5px);
        }

        .footer-link:hover span {
          color: #ff6a00 !important;
        }

        .footer-link:hover svg {
          color: #ff6a00 !important;
        }

        /* ================================
           SOCIAL ICONS
        ================================= */

        .social-link {
          transition:
            all 0.3s ease;
        }

        .social-link:hover {
          background-color: #ff6a00 !important;
          color: #ffffff !important;
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(255, 106, 0, 0.25);
        }

        /* ================================
           CONTACT LINKS
        ================================= */

        .contact-link {
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .contact-link:hover {
          color: #ff6a00 !important;
          transform: translateX(4px);
        }

        /* ================================
           BOTTOM LINKS
        ================================= */

        .bottom-link {
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .bottom-link:hover {
          color: #ff6a00 !important;
        }
      `}</style>

      <footer
        style={{
          backgroundColor: 'var(--color-dark-navy)',
          color: '#94A3B8',
          paddingTop: '4rem',
          paddingBottom: '2rem',
          borderTop: '4px solid var(--color-orange)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '3rem',
              marginBottom: '3.5rem',
            }}
          >
            {/* ================================
                COMPANY INFO COLUMN
            ================================= */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                {settings.footerLogoUrl ? (
                  <img
                    src={getMediaUrl(settings.footerLogoUrl)}
                    alt={
                      settings.businessName || 'Today Digitech Logo'
                    }
                    style={{
                      height: '40px',
                      width: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                    }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="10"
                        fill="url(#footer_logo_grad)"
                      />

                      <path
                        d="M12 14L20 9L28 14V26L20 31L12 26V14Z"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />

                      <circle
                        cx="20"
                        cy="20"
                        r="4"
                        fill="#FF6A00"
                      />

                      <defs>
                        <linearGradient
                          id="footer_logo_grad"
                          x1="0"
                          y1="0"
                          x2="40"
                          y2="40"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#062B63" />
                          <stop
                            offset="1"
                            stopColor="#07448D"
                          />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {(settings.businessName || 'Today Digitech').split(
                        ' '
                      )[0]}

                      <span
                        style={{
                          color: 'var(--color-orange)',
                        }}
                      >
                        {(settings.businessName || 'Today Digitech').split(
                          ' '
                        )[1] || ''}
                      </span>
                    </span>
                  </>
                )}
              </div>

              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: '#94A3B8',
                }}
              >
                {settings.footerDescription}
              </p>

              {/* Social Links */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                }}
              >
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor:
                        'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <Facebook size={18} />
                  </a>
                )}

                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor:
                        'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <Twitter size={18} />
                  </a>
                )}

                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor:
                        'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <Linkedin size={18} />
                  </a>
                )}

                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor:
                        'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* ================================
                QUICK LINKS
            ================================= */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Quick Links
              </h4>

              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                }}
              >
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Services', href: '/services' },
                  { name: 'Portfolio', href: '/portfolio' },
                  { name: 'Insights & Blog', href: '/blog' },
                  { name: 'Contact Us', href: '/contact' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="footer-link"
                      style={{
                        fontSize: '0.875rem',
                        color: '#94A3B8',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        textDecoration: 'none',
                      }}
                    >
                      <ArrowRight
                        size={14}
                        color="var(--color-orange)"
                      />

                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================================
                CORE SERVICES
            ================================= */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Core Services
              </h4>

              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                }}
              >
                {[
                  {
                    name: 'Next.js & React Web Apps',
                    href: '/services/web-application-engineering',
                  },
                  {
                    name: 'Android & iOS Mobile Apps',
                    href: '/services/mobile-app-development',
                  },
                  {
                    name: 'Cloud Architecture & DevOps',
                    href: '/services/cloud-devops-automation',
                  },
                  {
                    name: 'Digital Growth & SEO',
                    href: '/services/digital-growth-seo',
                  },
                ].map((service, idx) => (
                  <li key={idx}>
                    <a
                      href={service.href}
                      className="footer-link"
                      style={{
                        fontSize: '0.875rem',
                        color: '#94A3B8',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        textDecoration: 'none',
                      }}
                    >
                      <ArrowRight
                        size={14}
                        color="var(--color-orange)"
                      />

                      <span>{service.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================================
                CONTACT DETAILS
            ================================= */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Contact Us
              </h4>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.875rem',
                  fontSize: '0.875rem',
                }}
              >
                {/* Address */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                  }}
                >
                  <MapPin
                    size={18}
                    color="var(--color-orange)"
                    style={{ marginTop: '0.2rem' }}
                  />

                  <span>{settings.address}</span>
                </div>

                {/* Phone */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                  }}
                >
                  <Phone
                    size={18}
                    color="var(--color-orange)"
                  />

                  <a
                    href={`tel:${(settings.phone || '').replace(
                      /\s+/g,
                      ''
                    )}`}
                    className="contact-link"
                    style={{
                      color: '#E2E8F0',
                      textDecoration: 'none',
                    }}
                  >
                    {settings.phone}
                  </a>
                </div>

                {/* Email */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                  }}
                >
                  <Mail
                    size={18}
                    color="var(--color-orange)"
                  />

                  <a
                    href={`mailto:${settings.email}`}
                    className="contact-link"
                    style={{
                      color: '#E2E8F0',
                      textDecoration: 'none',
                    }}
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================================
              COPYRIGHT
          ================================= */}
          <div
            style={{
              paddingTop: '1.5rem',
              borderTop:
                '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.8125rem',
            }}
          >
            <span>{settings.copyrightText}</span>

            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
              }}
            >
              <a
                href="/privacy-policy"
                className="bottom-link"
                style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                }}
              >
                Privacy Policy
              </a>

              <a
                href="/terms-and-conditions"
                className="bottom-link"
                style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                }}
              >
                Terms & Conditions
              </a>

              <a
                href="/refund-policy"
                className="bottom-link"
                style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                }}
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};