// Utilidades para el consentimiento de cookies

interface CookieConsentData {
  version: number;
  decision: 'accepted' | 'rejected' | 'custom';
  categories: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  timestamp: string;
  expiresAt: string;
}

// Función para logging de consentimiento
export const logConsentDecision = (consent: CookieConsentData) => {
  const logData = {
    event: 'cookie_consent_decision',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    consent: {
      decision: consent.decision,
      categories: consent.categories,
      version: consent.version
    },
    // Información adicional útil
    page: window.location.pathname,
    referrer: document.referrer,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language
  };

  // 1. Log en consola (desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('🍪 Cookie Consent Decision:', logData);
  }

  // 2. Enviar a analytics si está habilitado
  if (consent.categories.analytics) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cookie_consent', {
        consent_decision: consent.decision,
        analytics_enabled: consent.categories.analytics,
        marketing_enabled: consent.categories.marketing
      });
    }

    // Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'cookie_consent',
        consent_decision: consent.decision,
        analytics_enabled: consent.categories.analytics,
        marketing_enabled: consent.categories.marketing
      });
    }
  }

  // 3. Enviar a tu propio endpoint (opcional)
  // Puedes crear un endpoint en tu backend para registrar las decisiones
  if (process.env.NODE_ENV === 'production') {
    // Ejemplo: enviar a tu API
    // fetch('/api/consent-log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logData)
    // }).catch(console.error);
  }
};

// Cola de callbacks esperando consentimiento
const consentQueue: { [key: string]: (() => void)[] } = {
  analytics: [],
  marketing: []
};

// Función para encolar callbacks hasta consentimiento
export const queueUntilConsent = (callback: () => void, category: 'analytics' | 'marketing') => {
  // Verificar si ya hay consentimiento
  const consent = getStoredConsent();
  if (consent?.categories[category]) {
    callback();
  } else {
    consentQueue[category].push(callback);
  }
};

// Ejecutar callbacks encolados
export const executeQueuedCallbacks = (consent: CookieConsentData) => {
  Object.keys(consentQueue).forEach((category) => {
    if (consent.categories[category as keyof typeof consent.categories]) {
      consentQueue[category].forEach(callback => callback());
      consentQueue[category] = [];
    }
  });
};

// Leer consentimiento del localStorage
export const getStoredConsent = (): CookieConsentData | null => {
  try {
    const stored = localStorage.getItem('eterea.cookieConsent.v1');
    if (!stored) return null;
    
    const consent: CookieConsentData = JSON.parse(stored);
    
    // Verificar si ha expirado
    if (new Date(consent.expiresAt) < new Date()) {
      localStorage.removeItem('eterea.cookieConsent.v1');
      return null;
    }
    
    return consent;
  } catch {
    return null;
  }
};

// Aplicar consentimiento a scripts existentes
export const applyConsentToScripts = (consent: CookieConsentData) => {
  const scripts = document.querySelectorAll('script[type="text/plain"][data-cookie-category]');
  
  scripts.forEach((script) => {
    const category = script.getAttribute('data-cookie-category');
    const src = script.getAttribute('data-src');
    
    if (category && src && consent.categories[category as keyof typeof consent.categories]) {
      // Crear nuevo script
      const newScript = document.createElement('script');
      newScript.src = src;
      newScript.async = script.hasAttribute('async');
      newScript.defer = script.hasAttribute('defer');
      
      // Reemplazar el script original
      script.parentNode?.replaceChild(newScript, script);
    }
  });
};

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
  (window as any).queueUntilConsent = queueUntilConsent;
  (window as any).applyConsentToScripts = applyConsentToScripts;
  (window as any).logConsentDecision = logConsentDecision;
}
