'use client';

import React, { useEffect, useRef, useState } from 'react';
import './Events.scss';
const eventsImage = '/assets/images/opt-events-hero.jpg';
import EventsInvisible from './EventsInvisible';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Events: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Registrar el plugin ScrollTrigger solo en el cliente
    gsap.registerPlugin(ScrollTrigger);
    
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    // Establecer el color de fondo cuando el componente se monta
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--page-background', '#EFECE7');
    }

    let tl: gsap.core.Timeline | null = null;
    if (!isPortrait) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "+=40%",
          scrub: 1,
          pin: false,
          pinSpacing: false
        }
      });
      tl.fromTo(imageWrapperRef.current,
        { width: "90vw", maxWidth: "90vw" },
        { width: "100vw", maxWidth: "100vw", ease: "none", duration: 1 }
      )
      .fromTo([leftTextRef.current, rightTextRef.current],
        { x: (i) => i === 0 ? -60 : 60, y: 0 },
        { x: 0, y: -40, ease: "none", duration: 1 }, 0
      );
    }

    // Limpiar cuando el componente se desmonta
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--page-background', '#F7F6F4');
      }
      window.removeEventListener('resize', checkOrientation);
      if (tl) tl.kill();
    };
  }, [isPortrait]);

  return (
    <div className="events">
      <div className="events__header">
        <h1 className="events__title">EVENTOS</h1>
        <span className="events__subtitle">profundamente tuyos</span>
      </div>
      <p className="events__description">
        Somos una firma especializada en experiencias únicas.<br />
        Creamos eventos con intención, belleza y alma.
      </p>
      <div className="events__image-container" ref={imageContainerRef}>
        <div 
          className="events__image-wrapper" 
          ref={imageWrapperRef}
          style={isPortrait ? { width: '96vw', maxWidth: '96vw' } : undefined}
        >
          <img 
            src={eventsImage} 
            alt="Eventos Eterea" 
            className="events__image"
          />
          <div 
            className="events__image-text events__image-text--left"
            ref={leftTextRef}
            style={isPortrait ? { left: 12, bottom: 12, right: 'auto', paddingLeft: 0, paddingRight: 0, width: 'auto', boxSizing: 'border-box' } : undefined}
          >
            SOIRÉE PRIVÉE<br />
            Chamartín
          </div>
          <div 
            className="events__image-text events__image-text--right"
            ref={rightTextRef}
            style={isPortrait ? { right: 12, bottom: 12, left: 'auto', paddingRight: 0, paddingLeft: 0, width: 'auto', boxSizing: 'border-box' } : undefined}
          >
            NATURA BISÉE
          </div>
        </div>
      </div>
      <EventsInvisible />
    </div>
  );
};

export default Events; 