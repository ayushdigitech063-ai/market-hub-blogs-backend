export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
}

const UTM_KEY = 'today_digitech_utm_params';

export const saveUtmParams = (): void => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const utmContent = urlParams.get('utm_content');
  const utmTerm = urlParams.get('utm_term');

  if (utmSource || utmMedium || utmCampaign) {
    const params: UtmParams = {
      utm_source: utmSource || '',
      utm_medium: utmMedium || '',
      utm_campaign: utmCampaign || '',
      utm_content: utmContent || '',
      utm_term: utmTerm || '',
      referrer: document.referrer || '',
    };
    try {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(params));
    } catch {
      // Ignore storage errors
    }
  }
};

export const getUtmParams = (): UtmParams => {
  if (typeof window === 'undefined') return {};
  try {
    const data = sessionStorage.getItem(UTM_KEY);
    return data ? JSON.parse(data) : { referrer: document.referrer || '' };
  } catch {
    return {};
  }
};

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;

export const trackEvent = (eventName: string, eventParams: Record<string, unknown> = {}): void => {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  const win = window as unknown as { gtag?: GtagFn; fbq?: FbqFn };
  if (typeof win.gtag === 'function') {
    win.gtag('event', eventName, eventParams);
  }

  // Meta Pixel
  if (typeof win.fbq === 'function') {
    win.fbq('trackCustom', eventName, eventParams);
  }
};

export const trackCallClick = (phoneNumber: string = '+91 98765 43210'): void => {
  trackEvent('click_call', { phone_number: phoneNumber, page: typeof window !== 'undefined' ? window.location.pathname : '' });
};

export const trackWhatsappClick = (whatsappNumber: string = '+91 98765 43210'): void => {
  trackEvent('click_whatsapp', { whatsapp_number: whatsappNumber, page: typeof window !== 'undefined' ? window.location.pathname : '' });
};

export const trackFormSubmit = (formName: string, service?: string): void => {
  trackEvent('form_submit', { form_name: formName, service: service || 'General', page: typeof window !== 'undefined' ? window.location.pathname : '' });
};

export const trackThankYouConversion = (leadId?: string): void => {
  trackEvent('conversion_thank_you', { lead_id: leadId || '', value: 1, currency: 'INR' });
};
