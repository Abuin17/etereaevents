'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './PageTransition.scss';

interface PageTransitionProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

// Mapeo de rutas a colores de fondo
const routeBackgrounds: Record<string, string> = {
  '/': '#F7F6F4',
  '/eventos': '#EFECE7',
  '/bodas': '#FFFFFF',
  '/bodas/formulario': '#FFFFFF',
  '/nosotras': '#F7F6F4',
  '/vip-assistance': '#393431',
  '/contacto': '#393431',
};

const PageTransition: React.FC<PageTransitionProps> = ({ children, backgroundColor }) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [currentBg, setCurrentBg] = useState<string>('#F7F6F4');
  const [nextBg, setNextBg] = useState<string>('#F7F6F4');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef<string>(pathname || '/');

  useEffect(() => {
    // Determinar color de fondo para la ruta actual
    const bgColor = backgroundColor || routeBackgrounds[pathname || '/'] || '#F7F6F4';
    
    // Si es la primera carga o cambio de ruta
    if (prevPathRef.current !== pathname) {
      setIsTransitioning(true);
      setNextBg(bgColor);
      
      // Fade out del contenido actual
      setIsVisible(false);
      
      // Después de fade out, cambiar el fondo y hacer fade in
      const transitionTimer = setTimeout(() => {
        setCurrentBg(bgColor);
        document.documentElement.style.setProperty('--page-background', bgColor);
        
        // Pequeño delay para el fade in
        setTimeout(() => {
          setIsVisible(true);
          setIsTransitioning(false);
        }, 50);
      }, 300);
      
      prevPathRef.current = pathname || '/';
      return () => clearTimeout(transitionTimer);
    } else {
      // Primera carga
      setCurrentBg(bgColor);
      document.documentElement.style.setProperty('--page-background', bgColor);
      
      // Fade in inicial con un pequeño delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, backgroundColor]);

  return (
    <div className="page-transition">
      {/* Capa de fondo para cross-fade */}
      <div 
        className="page-transition__background"
        style={{ backgroundColor: currentBg }}
      />
      {isTransitioning && (
        <div 
          className="page-transition__background page-transition__background--next"
          style={{ backgroundColor: nextBg }}
        />
      )}
      
      {/* Contenido con fade-in */}
      <div className={`page-transition__content ${isVisible ? 'page-transition__content--visible' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default PageTransition;

