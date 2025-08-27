import React from 'react';
import { useCookieConsent } from '../../hooks/useCookieConsent';

interface CookiePreferencesButtonProps {
  onOpenModal: () => void;
  className?: string;
}

const CookiePreferencesButton: React.FC<CookiePreferencesButtonProps> = ({ 
  onOpenModal, 
  className = '' 
}) => {
  const { hasValidConsent } = useCookieConsent();

  // Solo mostrar si hay consentimiento válido (no mostrar si no hay decisión)
  if (!hasValidConsent()) {
    return null;
  }

  return (
    <button
      type="button"
      className={`cookie-preferences-button ${className}`}
      onClick={onOpenModal}
      aria-label="Abrir preferencias de cookies"
    >
      Preferencias de cookies
    </button>
  );
};

export default CookiePreferencesButton;
