import React, { useState, useEffect } from 'react';
import { getStoredConsent } from '../../utils/cookieConsent';

const CookieConsentDebug: React.FC = () => {
  const [consent, setConsent] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = getStoredConsent();
    setConsent(storedConsent);
  }, []);

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const clearConsent = () => {
    localStorage.removeItem('eterea.cookieConsent.v1');
    setConsent(null);
    window.location.reload();
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#393431',
          color: '#F7F6F4',
          border: 'none',
          padding: '10px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 10002
        }}
      >
        🍪 Debug
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#393431',
        color: '#F7F6F4',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        fontSize: '14px',
        zIndex: 10002,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>🍪 Cookie Consent Debug</h3>
        <button
          onClick={toggleVisibility}
          style={{
            background: 'none',
            border: 'none',
            color: '#F7F6F4',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ×
        </button>
      </div>

      {consent ? (
        <div>
          <p><strong>Estado:</strong> {consent.decision}</p>
          <p><strong>Analytics:</strong> {consent.categories.analytics ? '✅' : '❌'}</p>
          <p><strong>Marketing:</strong> {consent.categories.marketing ? '✅' : '❌'}</p>
          <p><strong>Versión:</strong> {consent.version}</p>
          <p><strong>Fecha:</strong> {new Date(consent.timestamp).toLocaleString()}</p>
          <p><strong>Expira:</strong> {new Date(consent.expiresAt).toLocaleString()}</p>
          
          <button
            onClick={clearConsent}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
              fontSize: '12px'
            }}
          >
            Limpiar Consentimiento
          </button>
        </div>
      ) : (
        <div>
          <p>❌ No hay consentimiento guardado</p>
          <p>El banner debería estar visible</p>
        </div>
      )}

      <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(247,246,244,0.2)' }}>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
          <strong>Atributos del documento:</strong><br />
          data-consent: {document.documentElement.getAttribute('data-consent') || 'no establecido'}<br />
          data-consent-analytics: {document.documentElement.getAttribute('data-consent-analytics') || 'no establecido'}<br />
          data-consent-marketing: {document.documentElement.getAttribute('data-consent-marketing') || 'no establecido'}
        </p>
      </div>
    </div>
  );
};

export default CookieConsentDebug;
