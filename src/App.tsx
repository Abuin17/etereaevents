import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './styles/main.scss';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { AnimatePresence, motion } from 'framer-motion';

// Importar páginas
import Landing from './pages/Landing/Landing';
import Events from './pages/Events/Events';
import Nosotras from './pages/Nosotras/Nosotras';
import VipAssistance from './pages/VipAssistance/VipAssistance';
import Contacto from './pages/Contacto/Contacto';
// Importar otras páginas aquí...

const routesConfig = [
  { path: '/', element: <Landing /> },
  { path: '/eventos', element: <Events /> },
  { path: '/nosotras', element: <Nosotras /> },
  { path: '/vip-assistance', element: <VipAssistance /> },
  { path: '/contacto', element: <Contacto /> },
  // Agregar otras rutas aquí
];

const PageTransitionManager: React.FC = () => {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [pendingLocation, setPendingLocation] = useState(null as null | typeof location);

  useEffect(() => {
    if (location !== displayedLocation) {
      setIsFadingOut(true);
      setPendingLocation(location);
      document.body.classList.add('body--no-scroll');
    }
    // eslint-disable-next-line
  }, [location]);

  const handleFadeOutComplete = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setDisplayedLocation(pendingLocation!);
    setIsFadingOut(false);
    setPendingLocation(null);
    document.body.classList.remove('body--no-scroll');
  };

  // Encuentra el elemento de la ruta actual
  const currentRoute = routesConfig.find(r => r.path === displayedLocation.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayedLocation.pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={() => {
          if (isFadingOut) handleFadeOutComplete();
        }}
        style={{ minHeight: '100vh' }}
      >
        {currentRoute ? currentRoute.element : null}
      </motion.div>
    </AnimatePresence>
  );
};

// Añadir estilos globales para body--no-scroll
document.head.insertAdjacentHTML(
  'beforeend',
  `<style>.body--no-scroll { overflow: hidden !important; position: fixed; width: 100vw; }</style>`
);

const AppContent: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <PageTransitionManager />
      </main>
      <Footer />
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
