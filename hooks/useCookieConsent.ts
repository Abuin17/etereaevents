import { useState, useEffect, useCallback } from 'react';
import { logConsentDecision } from '../utils/cookieConsent';

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

const COOKIE_CONSENT_KEY = 'eterea.cookieConsent.v1';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsentData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Leer consentimiento del localStorage
  const getStoredConsent = useCallback((): CookieConsentData | null => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) return null;
      
      const consent: CookieConsentData = JSON.parse(stored);
      
      // Verificar si ha expirado
      if (new Date(consent.expiresAt) < new Date()) {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        return null;
      }
      
      return consent;
    } catch {
      return null;
    }
  }, []);

  // Guardar consentimiento
  const saveConsent = useCallback((decision: 'accepted' | 'rejected' | 'custom', categories?: { analytics: boolean; marketing: boolean }) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (12 * 30 * 24 * 60 * 60 * 1000)); // 12 meses
    
    const consent: CookieConsentData = {
      version: 1,
      decision,
      categories: {
        necessary: true,
        analytics: decision === 'accepted' ? true : categories?.analytics || false,
        marketing: decision === 'accepted' ? true : categories?.marketing || false
      },
      timestamp: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setConsent(consent);
    
    // Actualizar atributos del documento
    document.documentElement.setAttribute('data-consent', consent.decision);
    document.documentElement.setAttribute('data-consent-analytics', consent.categories.analytics.toString());
    document.documentElement.setAttribute('data-consent-marketing', consent.categories.marketing.toString());
    
    // Log de la decisión
    logConsentDecision(consent);
    
    return consent;
  }, []);

  // Limpiar consentimiento
  const clearConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsent(null);
    
    // Limpiar atributos del documento
    document.documentElement.removeAttribute('data-consent');
    document.documentElement.removeAttribute('data-consent-analytics');
    document.documentElement.removeAttribute('data-consent-marketing');
  }, []);

  // Verificar si tiene consentimiento para una categoría específica
  const hasConsent = useCallback((category: 'analytics' | 'marketing') => {
    return consent?.categories[category] || false;
  }, [consent]);

  // Verificar si tiene algún consentimiento válido
  const hasValidConsent = useCallback(() => {
    return consent !== null;
  }, [consent]);

  // Inicialización
  useEffect(() => {
    const storedConsent = getStoredConsent();
    setConsent(storedConsent);
    setIsLoaded(true);
    
    // Aplicar atributos al documento si hay consentimiento
    if (storedConsent) {
      document.documentElement.setAttribute('data-consent', storedConsent.decision);
      document.documentElement.setAttribute('data-consent-analytics', storedConsent.categories.analytics.toString());
      document.documentElement.setAttribute('data-consent-marketing', storedConsent.categories.marketing.toString());
    }
  }, [getStoredConsent]);

  return {
    consent,
    isLoaded,
    hasConsent,
    hasValidConsent,
    saveConsent,
    clearConsent,
    getStoredConsent
  };
};
