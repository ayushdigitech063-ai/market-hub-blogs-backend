const BASE_URL = 'https://todaydigitech.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Today Digitech',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [
    'https://www.linkedin.com/company/todaydigitech',
    'https://twitter.com/todaydigitech',
    'https://www.facebook.com/todaydigitech',
    'https://www.instagram.com/todaydigitech',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-11-XXXXXXXX',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
};

export const localBusinessSchema = (locationName: string, address: string, geo?: { lat: number; lng: number }) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}#localbusiness`,
  name: `Today Digitech — ${locationName}`,
  url: BASE_URL,
  telephone: '+91-11-XXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: address,
    addressLocality: locationName,
    addressRegion: 'Delhi NCR',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  ...(geo && {
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
  }),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
});

export const serviceSchema = (name: string, description: string, slug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: `${BASE_URL}/services/${slug}`,
  provider: {
    '@type': 'Organization',
    name: 'Today Digitech',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
});

export const articleSchema = (title: string, description: string, slug: string, authorName: string, publishDate: string, imageUrl?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url: `${BASE_URL}/blog/${slug}`,
  author: {
    '@type': 'Person',
    name: authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Today Digitech',
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
  },
  datePublished: publishDate,
  ...(imageUrl && { image: imageUrl }),
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
  })),
});

export const generateCanonicalUrl = (path: string): string => {
  return `${BASE_URL}${path}`;
};

export const generateRobotsMeta = (index: boolean, follow: boolean): string => {
  const parts: string[] = [];
  parts.push(index ? 'index' : 'noindex');
  parts.push(follow ? 'follow' : 'nofollow');
  return parts.join(', ');
};
