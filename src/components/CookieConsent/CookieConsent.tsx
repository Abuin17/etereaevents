import React, { useState, useEffect, useRef } from 'react';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import { executeQueuedCallbacks, applyConsentToScripts } from '../../utils/cookieConsent';
import './CookieConsent.scss';

interface CookieConsentProps {
  onConsentChange?: (consent: any) => void;
  onOpenModal?: () => void;
  shouldOpenModal?: boolean;
  onModalClose?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange, onOpenModal, shouldOpenModal, onModalClose }) => {
  const { consent, isLoaded, saveConsent } = useCookieConsent();
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false
  });
  
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Aplicar consentimiento a scripts y documento
  const applyConsent = (consent: any) => {
    // Actualizar atributos del documento
    document.documentElement.setAttribute('data-consent', consent.decision);
    document.documentElement.setAttribute('data-consent-analytics', consent.categories.analytics.toString());
    document.documentElement.setAttribute('data-consent-marketing', consent.categories.marketing.toString());

    // Aplicar a scripts
    applyConsentToScripts(consent);
    // Ejecutar callbacks encolados
    executeQueuedCallbacks(consent);
  };



  // Manejar aceptar todo
  const handleAcceptAll = () => {
    const newConsent = saveConsent('accepted');
    setShowBanner(false);
    onConsentChange?.(newConsent);
    applyConsent(newConsent);
  };

  // Manejar rechazar todo
  const handleRejectAll = () => {
    const newConsent = saveConsent('rejected');
    setShowBanner(false);
    onConsentChange?.(newConsent);
    applyConsent(newConsent);
  };

  // Manejar configuración personalizada
  const handleSavePreferences = () => {
    const newConsent = saveConsent('custom', preferences);
    setShowBanner(false);
    setShowModal(false);
    onConsentChange?.(newConsent);
    applyConsent(newConsent);
    onModalClose?.();
  };

  // Manejar cancelar configuración
  const handleCancelPreferences = () => {
    setPreferences({
      analytics: consent?.categories.analytics || false,
      marketing: consent?.categories.marketing || false
    });
    setShowModal(false);
    onModalClose?.();
  };

  // Abrir modal desde el exterior
  useEffect(() => {
    if (shouldOpenModal) {
      setShowModal(true);
      onModalClose?.(); // Resetear el estado en el padre
    }
  }, [shouldOpenModal, onModalClose]);

  // Focus trap para el modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancelPreferences();
    }
    
    if (e.key === 'Tab') {
      if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
        e.preventDefault();
        firstFocusableRef.current?.focus();
      } else if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
        e.preventDefault();
        lastFocusableRef.current?.focus();
      }
    }
  };

  // Inicialización
  useEffect(() => {
    if (isLoaded) {
      if (consent) {
        applyConsent(consent);
      } else {
        setShowBanner(true);
      }
    }
  }, [isLoaded, consent]);

  // Exponer funciones globalmente
  useEffect(() => {
    (window as any).applyConsentToScripts = applyConsentToScripts;
  }, []);

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Banner de consentimiento */}
      {showBanner && (
        <div className="cookie-banner" role="banner" aria-label="Consentimiento de cookies">
          <div className="cookie-banner__content">
            <div className="cookie-banner__text">
              <p>
                Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.
              </p>
            </div>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--secondary"
                onClick={handleRejectAll}
              >
                Rechazar
              </button>
                             <button
                 type="button"
                 className="cookie-banner__button cookie-banner__button--secondary"
                 onClick={() => {
                   setShowModal(true);
                   onOpenModal?.();
                 }}
               >
                 Configurar
               </button>
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--primary"
                onClick={handleAcceptAll}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de preferencias */}
      {showModal && (
        <div className="cookie-modal-overlay" onClick={handleCancelPreferences}>
          <div
            ref={modalRef}
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            aria-describedby="cookie-modal-description"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <div className="cookie-modal__header">
              <h2 id="cookie-modal-title" className="cookie-modal__title">
                Preferencias de cookies
              </h2>
              <button
                ref={firstFocusableRef}
                type="button"
                className="cookie-modal__close"
                onClick={handleCancelPreferences}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="cookie-modal__content">
              <p id="cookie-modal-description" className="cookie-modal__description">
                Selecciona las cookies que deseas permitir. Las cookies necesarias siempre están activadas.
              </p>

              <div className="cookie-modal__categories">
                <div className="cookie-modal__category">
                  <div className="cookie-modal__category-header">
                    <h3 className="cookie-modal__category-title">Necesarias</h3>
                    <span className="cookie-modal__category-status cookie-modal__category-status--required">
                      Siempre activas
                    </span>
                  </div>
                  <p className="cookie-modal__category-description">
                    Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
                  </p>
                </div>

                <div className="cookie-modal__category">
                  <div className="cookie-modal__category-header">
                    <h3 className="cookie-modal__category-title">Analíticas</h3>
                    <label className="cookie-modal__toggle">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                        className="cookie-modal__toggle-input"
                      />
                      <span className="cookie-modal__toggle-slider" />
                    </label>
                  </div>
                  <p className="cookie-modal__category-description">
                    Nos ayudan a entender cómo interactúas con el sitio web recopilando información de forma anónima.
                  </p>
                </div>

                <div className="cookie-modal__category">
                  <div className="cookie-modal__category-header">
                    <h3 className="cookie-modal__category-title">Marketing</h3>
                    <label className="cookie-modal__toggle">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                        className="cookie-modal__toggle-input"
                      />
                      <span className="cookie-modal__toggle-slider" />
                    </label>
                  </div>
                  <p className="cookie-modal__category-description">
                    Se utilizan para rastrear visitantes en sitios web para mostrar anuncios relevantes y atractivos.
                  </p>
                </div>
              </div>

              <div className="cookie-modal__footer">
                <a
                  href="/cookies"
                  className="cookie-modal__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de cookies
                </a>
                <div className="cookie-modal__actions">
                  <button
                    type="button"
                    className="cookie-modal__button cookie-modal__button--secondary"
                    onClick={handleCancelPreferences}
                  >
                    Cancelar
                  </button>
                  <button
                    ref={lastFocusableRef}
                    type="button"
                    className="cookie-modal__button cookie-modal__button--primary"
                    onClick={handleSavePreferences}
                  >
                    Guardar preferencias
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
