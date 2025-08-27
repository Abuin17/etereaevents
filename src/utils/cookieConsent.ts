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
}
