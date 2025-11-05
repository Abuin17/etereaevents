'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import CookieConsent from './CookieConsent/CookieConsent';
import CookieConsentDebug from './CookieConsent/CookieConsentDebug';

interface PageWrapperProps {
  children: React.ReactNode;
  chromeless?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, chromeless = false }) => {
  const pathname = usePathname();
  const isContactPage = pathname === '/contacto';
  const isCardPage = pathname?.startsWith('/card/');
  const [shouldOpenCookieModal, setShouldOpenCookieModal] = useState(false);

  const handleOpenCookiePreferences = () => {
    setShouldOpenCookieModal(true);
  };

  // Modo chromeless para tarjetas de visita
  if (isCardPage || chromeless) {
    return (
      <div className="app app--chromeless">
        {children}
      </div>
    );
  }

  // Modo normal para el resto de páginas
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        {children}
      </main>
      {!isContactPage && <Footer onOpenCookiePreferences={handleOpenCookiePreferences} />}
      <CookieConsent 
        shouldOpenModal={shouldOpenCookieModal}
        onModalClose={() => setShouldOpenCookieModal(false)}
      />
      <CookieConsentDebug />
    </div>
  );
};

export default PageWrapper;

