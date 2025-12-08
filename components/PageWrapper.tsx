'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import CookieConsent from './CookieConsent/CookieConsent';
import PageTransition from './PageTransition/PageTransition';

interface PageWrapperProps {
  children: React.ReactNode;
  chromeless?: boolean;
  backgroundColor?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  chromeless = false,
  backgroundColor 
}) => {
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

  // Modo normal con transiciones elegantes
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <PageTransition backgroundColor={backgroundColor}>
          {children}
        </PageTransition>
      </main>
      {!isContactPage && <Footer onOpenCookiePreferences={handleOpenCookiePreferences} />}
      <CookieConsent 
        shouldOpenModal={shouldOpenCookieModal}
        onModalClose={() => setShouldOpenCookieModal(false)}
      />
    </div>
  );
};

export default PageWrapper;
