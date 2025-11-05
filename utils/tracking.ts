// Tracking utilities for Google Analytics and Meta Pixel
// These functions only execute when user has given consent

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
    consent_analytics?: boolean;
    consent_marketing?: boolean;
  }
}

// Check if user has given consent for analytics
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for consent cookie or global variable
  const consentCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('consent_analytics='));
  
  const consentValue = consentCookie?.split('=')[1];
  return consentValue === 'true' || window.consent_analytics === true;
}

// Check if user has given consent for marketing
function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for consent cookie or global variable
  const consentCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('consent_marketing='));
  
  const consentValue = consentCookie?.split('=')[1];
  return consentValue === 'true' || window.consent_marketing === true;
}

// Load Google Analytics script dynamically
function loadGoogleAnalytics(): void {
  if (!hasAnalyticsConsent()) {
    console.log('Google Analytics blocked - no consent');
    return;
  }

  // Create script element
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID', {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  console.log('Google Analytics loaded with consent');
}

// Load Meta Pixel script dynamically
function loadMetaPixel(): void {
  if (!hasMarketingConsent()) {
    console.log('Meta Pixel blocked - no consent');
    return;
  }

  // Create script element
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'META_PIXEL_ID');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  // Initialize fbq
  window.fbq = window.fbq || function(...args: any[]) {
    (window.fbq as any).q = (window.fbq as any).q || [];
    (window.fbq as any).q.push(args);
  };

  console.log('Meta Pixel loaded with consent');
}

// Initialize Google Analytics
export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;
  
  try {
    loadGoogleAnalytics();
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
}

// Initialize Meta Pixel
export function initMetaPixel(): void {
  if (typeof window === 'undefined') return;
  
  try {
    loadMetaPixel();
  } catch (error) {
    console.error('Error initializing Meta Pixel:', error);
  }
}

// Track page view (only if consent given)
export function trackPageView(url: string): void {
  if (hasAnalyticsConsent() && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url
    });
  }

  if (hasMarketingConsent() && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

// Track custom event (only if consent given)
export function trackEvent(eventName: string, parameters?: Record<string, any>): void {
  if (hasAnalyticsConsent() && window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  if (hasMarketingConsent() && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
}

// Track form submission (only if consent given)
export function trackFormSubmission(formName: string): void {
  trackEvent('form_submit', {
    form_name: formName,
    event_category: 'engagement',
    event_label: 'wedding_form'
  });
}

// Track conversion (only if consent given)
export function trackConversion(conversionType: string, value?: number): void {
  if (hasAnalyticsConsent() && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'GA_MEASUREMENT_ID/CONVERSION_LABEL',
      value: value,
      currency: 'EUR'
    });
  }

  if (hasMarketingConsent() && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: conversionType,
      value: value,
      currency: 'EUR'
    });
  }
}

// Initialize all tracking (call this when consent is given)
export function initializeTracking(): void {
  initGoogleAnalytics();
  initMetaPixel();
}

// Check consent status
export function getConsentStatus(): {
  analytics: boolean;
  marketing: boolean;
} {
  return {
    analytics: hasAnalyticsConsent(),
    marketing: hasMarketingConsent()
  };
}
