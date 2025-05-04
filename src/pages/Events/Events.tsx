import React, { useEffect, useRef, useState } from 'react';
import './Events.scss';
import eventsImage from '../../assets/images/events.jpg';
import EventsInvisible from './EventsInvisible';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Events: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    // Establecer el color de fondo cuando el componente se monta
    document.documentElement.style.setProperty('--page-background', '#EFECE7');

    // Configurar la animación de scroll
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "+=50%",
          scrub: 1,
          pin: false,
          pinSpacing: false
        }
      });

      tl.to(imageWrapperRef.current, {
        width: "100vw",
        maxWidth: "100vw",
        ease: "none",
        duration: 1
      })
      .to([leftTextRef.current, rightTextRef.current], {
        x: 0,
        scale: (i) => i === 0 ? 0.95 : 0.95,
        ease: "none",
        duration: 0.3
      }, 0);
    }, imageContainerRef);

    // Limpiar cuando el componente se desmonta
    return () => {
      document.documentElement.style.setProperty('--page-background', '#F7F6F4');
      ctx.revert();
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  return (
    <div className="events">
      <div className="events__header">
        <h1 className="events__title">Eventos</h1>
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
          style={isPortrait ? { width: '80%', maxWidth: '80%' } : undefined}
        >
          <img 
            src={eventsImage} 
            alt="Eventos Eterea" 
            className="events__image"
          />
          <div 
            className="events__image-text events__image-text--left"
            ref={leftTextRef}
          >
            SOIRÉE PRIVÉE<br />
            Chamartín
          </div>
          <div 
            className="events__image-text events__image-text--right"
            ref={rightTextRef}
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