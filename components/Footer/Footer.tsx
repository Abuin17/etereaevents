'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Footer.scss';
const etereaBgLogoGrisMedio = '/assets/logos/SIN_grisETÉREA_LOGO.svg';
const etereaBgLogoBeigeMedio = '/assets/logos/SIN_beige-medioETÉREA_LOGO.svg';
const etereaBgLogoBeigeOro = '/assets/logos/SIN_beige-oroETÉREA_LOGO.svg';
import CookiePreferencesButton from '../CookieConsent/CookiePreferencesButton';

interface FooterProps {
  variant?: 'light' | 'dark' | 'gold';
  onOpenCookiePreferences?: () => void;
}

const Footer: React.FC<FooterProps> = ({ variant, onOpenCookiePreferences }) => {
  const pathname = usePathname();
  // Determinar variante por ruta si no se pasa explícitamente
  let resolvedVariant = variant;
  if (!resolvedVariant) {
    if (pathname === '/vip-assistance') {
      resolvedVariant = 'dark';
    } else if (pathname === '/eventos') {
      resolvedVariant = 'gold';
    } else {
      resolvedVariant = 'light';
    }
  }

  // Selección de logo y opacidad
  let logoSrc = etereaBgLogoBeigeMedio;
  let logoOpacity = 1;
  if (resolvedVariant === 'dark') {
    logoSrc = etereaBgLogoGrisMedio;
    logoOpacity = 0.04;
  }
  if (resolvedVariant === 'gold') {
    logoSrc = etereaBgLogoBeigeOro;
    logoOpacity = 1;
  }

  return (
    <footer className={`footer${resolvedVariant === 'dark' ? ' footer--dark' : ''}`}> 
      <div className="footer__background">
        <img
          src={logoSrc}
          alt="Etérea"
          className="footer__background-logo"
          style={{ opacity: logoOpacity }}
        />
      </div>
      <div className="footer__content">
        {/* Main navigation links */}
        <nav className="footer__nav">
          <div className="footer__nav-links">
            <Link href="/" className="footer__nav-link">Home</Link>
            <span className="footer__separator">|</span>
            <Link href="/nosotras" className="footer__nav-link">Nosotras</Link>
            <span className="footer__separator">|</span>
            <Link href="/contacto" className="footer__nav-link">Contacto</Link>
          </div>
          <div className="footer__nav-line">
            <a href="https://www.instagram.com/eterea.events?igsh=MWhvNDJxbHZoeXYzdQ==" className="footer__nav-link" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </nav>
        {/* Footer info */}
        <div className="footer__info">
          <div className="footer__info-static">
            <span>2025</span>
            <span className="footer__separator">|</span>
            <span>Eterea Events</span>
            <span className="footer__separator">|</span>
            <span>Madrid, España</span>
            <span className="footer__separator">|</span>
          </div>
          <div className="footer__info-links">
            <Link href="/aviso-legal" className="footer__info-link">Aviso Legal</Link>
            <span className="footer__separator">|</span>
            <Link href="/cookies" className="footer__info-link">Política de cookies</Link>
            <span className="footer__separator">|</span>
            <Link href="/privacidad" className="footer__info-link">Política de privacidad</Link>
            <span className="footer__separator">|</span>
            <Link href="/propiedad-intelectual" className="footer__info-link">Política de Propiedad Intelectual</Link>
            <span className="footer__separator">|</span>
            {onOpenCookiePreferences && (
              <CookiePreferencesButton 
                onOpenModal={onOpenCookiePreferences}
                className="footer__info-link"
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 