import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, useLocation, Routes, Route } from 'react-router-dom';
import './styles/main.scss';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CookieConsent from './components/CookieConsent/CookieConsent';
import CookieConsentDebug from './components/CookieConsent/CookieConsentDebug';
import BusinessCard from './pages/BusinessCard/BusinessCard';
import { AnimatePresence, motion } from 'framer-motion';

// Importar páginas
import Landing from './pages/Landing/Landing';
import Events from './pages/Events/Events';
import Bodas from './pages/Bodas/Bodas';
import Nosotras from './pages/Nosotras/Nosotras';
import VipAssistance from './pages/VipAssistance/VipAssistance';
import Contacto from './pages/Contacto/Contacto';
import AvisoLegal from './pages/Legal/AvisoLegal';
import Privacidad from './pages/Legal/Privacidad';
import Cookies from './pages/Legal/Cookies';
import PropiedadIntelectual from './pages/Legal/PropiedadIntelectual';
// Importar otras páginas aquí...

const routesConfig = [
  { path: '/', element: <Landing />, bg: '#F7F6F4' },
  { path: '/eventos', element: <Events />, bg: '#EFECE7' },
  { path: '/bodas', element: <Bodas />, bg: '#FFFFFF' },
  { path: '/nosotras', element: <Nosotras />, bg: '#F7F6F4' },
  { path: '/vip-assistance', element: <VipAssistance />, bg: '#393431' },
  { path: '/contacto', element: <Contacto />, bg: '#F7F6F4' },
  { path: '/aviso-legal', element: <AvisoLegal />, bg: '#F7F6F4' },
  { path: '/privacidad', element: <Privacidad />, bg: '#F7F6F4' },
  { path: '/cookies', element: <Cookies />, bg: '#F7F6F4' },
  { path: '/propiedad-intelectual', element: <PropiedadIntelectual />, bg: '#F7F6F4' },
  { path: '/card/:memberId', element: <BusinessCard />, bg: '#EFECE7' },
  // Agregar otras rutas aquí
];

const PageTransitionManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [pendingLocation, setPendingLocation] = useState(null as null | typeof location);
  const [prevBg, setPrevBg] = useState('#F7F6F4');
  const [nextBg, setNextBg] = useState('#F7F6F4');
  const [showBgFade, setShowBgFade] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const bgFadeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentRoute = routesConfig.find(r => {
      if (r.path.includes(':')) {
        // Para rutas con parámetros, verificar si el path base coincide
        const basePath = r.path.split(':')[0];
        return displayedLocation.pathname.startsWith(basePath);
      }
      return r.path === displayedLocation.pathname;
    });
    setPrevBg(currentRoute?.bg || '#F7F6F4');
  }, [displayedLocation]);

  useEffect(() => {
    if (location !== displayedLocation) {
      setIsFadingOut(true);
      setPendingLocation(location);
      const nextRoute = routesConfig.find(r => {
        if (r.path.includes(':')) {
          // Para rutas con parámetros, verificar si el path base coincide
          const basePath = r.path.split(':')[0];
          return location.pathname.startsWith(basePath);
        }
        return r.path === location.pathname;
      });
      setNextBg(nextRoute?.bg || '#F7F6F4');
      setShowBgFade(true);
      document.body.classList.add('body--no-scroll');
    }
  }, [location, displayedLocation]);

  const handleFadeOutComplete = () => {
    setIsTransitioning(true); // Hide content
    setShowOverlay(true); // Show overlay
    setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setDisplayedLocation(pendingLocation!);
    setIsFadingOut(false);
    setPendingLocation(null);
      setTimeout(() => {
        setIsTransitioning(false); // Show new content
        setShowOverlay(false); // Hide overlay
      }, 100); // Small delay to ensure overlay covers during scroll
    document.body.classList.remove('body--no-scroll');
      // Hide bg fade after a short delay to allow crossfade
      if (bgFadeTimeout.current) clearTimeout(bgFadeTimeout.current);
      bgFadeTimeout.current = setTimeout(() => setShowBgFade(false), 500);
    }, 10); // Small delay to ensure content is hidden before scroll
  };



  return (
    <>
      {/* Crossfade background layer */}
      <AnimatePresence>
        {showBgFade && (
          <motion.div
            key={nextBg}
            initial={{ opacity: 0, background: prevBg }}
            animate={{ opacity: 1, background: nextBg }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
      {/* Overlay that covers everything during scroll to top */}
      {showOverlay && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: nextBg,
            zIndex: 9999,
            pointerEvents: 'auto',
            transition: 'background 0.3s',
          }}
        />
      )}
    <AnimatePresence mode="wait">
        {!isTransitioning && (
      <motion.div
        key={displayedLocation.pathname}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isFadingOut ? 0 : 1, y: isFadingOut ? -40 : 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={() => {
          if (isFadingOut) handleFadeOutComplete();
        }}
            style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

// Añadir estilos globales para body--no-scroll
document.head.insertAdjacentHTML(
  'beforeend',
  `<style>.body--no-scroll { overflow: hidden !important; position: fixed; width: 100vw; }</style>`
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contacto';
  const isCardPage = location.pathname.startsWith('/card/');
  const [shouldOpenCookieModal, setShouldOpenCookieModal] = useState(false);

  const handleOpenCookiePreferences = () => {
    setShouldOpenCookieModal(true);
  };

  // Modo chromeless para tarjetas de visita
  if (isCardPage) {
    return (
      <div className="app app--chromeless">
        <Routes>
          {routesConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </div>
    );
  }

  // Modo normal para el resto de páginas
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          {routesConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PageTransitionManager>
                  {route.element}
                </PageTransitionManager>
              }
            />
          ))}
        </Routes>
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

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
