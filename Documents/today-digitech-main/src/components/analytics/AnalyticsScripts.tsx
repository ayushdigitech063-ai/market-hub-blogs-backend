'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { saveUtmParams } from '../../lib/analytics';
import { getPublicData } from '../../lib/publicApi';

interface ScriptsData {
  ga4MeasurementId: string;
  gscVerificationTag: string;
  metaPixelId: string;
  googleAdsConversionId: string;
}

export function AnalyticsScripts() {
  const [scripts, setScripts] = useState<ScriptsData>({
    ga4MeasurementId: '',
    gscVerificationTag: '',
    metaPixelId: '',
    googleAdsConversionId: '',
  });

  useEffect(() => {
    saveUtmParams();

    void getPublicData<ScriptsData>('/analytics/scripts')
      .then(setScripts)
      .catch(() => undefined);
  }, []);

  return (
    <>
      {/* Google Search Console Verification Meta Tag */}
      {scripts.gscVerificationTag && (
        <meta name="google-site-verification" content={scripts.gscVerificationTag} />
      )}

      {/* GA4 Script */}
      {scripts.ga4MeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${scripts.ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${scripts.ga4MeasurementId}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel Script */}
      {scripts.metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${scripts.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
