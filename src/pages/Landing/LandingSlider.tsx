import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
import './LandingSlider.scss';

import slider1 from '../../assets/images/slider1.jpg';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.png';

const slides = [slider1, slider2, slider3];
const SLIDE_HEIGHT = 700; // px
const SLIDER_SCROLL_LENGTH = slides.length * SLIDE_HEIGHT;

const slideContent = [
  {
    title: "CREAR",
    body: "Desde la idea inicial hasta el último detalle, combinamos estética, emoción y precisión para dar forma a eventos que no se parecen a ningún otro."
  },
  {
    title: "EXCLUSIVO",
    body: "Lo que importa no se repite, permanece. Desarrollamos dos celebraciones al año porque lo extraordinario no admite prisas."
  },
  {
    title: "CONOCER",
    body: "Cada historia comienza con una conversación. Tomamos tiempo para entender quién eres, qué te inspira y cómo imaginas ese momento especial."
  }
];

const LandingSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  // Inicializar los arrays de refs
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
    textRefs.current = textRefs.current.slice(0, slides.length);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const stickyEl = stickyRef.current;
    const sliderEl = sliderRef.current;
    if (!scrollEl || !stickyEl || !sliderEl) return;

    // Asegurar que empiece por la primera slide
    setTimeout(() => {
      sliderEl.scrollTo({ left: 0, behavior: 'instant' });
    }, 0);

    let lastIndex = 0;

    const handleScroll = () => {
      const rect = scrollEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyHeight = stickyEl.offsetHeight;
      const start = rect.top - windowHeight / 2 + stickyHeight / 2;
      const end = rect.bottom - windowHeight / 2 - stickyHeight / 2;
      const total = end - start;
      const scrolled = Math.min(Math.max(-start, 0), total);
      const progress = total > 0 ? scrolled / total : 0;

      // Calcular el scroll horizontal objetivo
      const maxScrollLeft = sliderEl.scrollWidth - sliderEl.clientWidth;
      const targetScrollLeft = progress * maxScrollLeft;

      // GSAP para suavidad
      gsap.to(sliderEl, {
        scrollTo: { x: targetScrollLeft },
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
        onUpdate: () => {
          // Calcular opacidad para cada slide basado en su posición
          slideRefs.current.forEach((slideRef, index) => {
            if (slideRef && textRefs.current[index]) {
              const slideRect = slideRef.getBoundingClientRect();
              const sliderRect = sliderEl.getBoundingClientRect();
              
              // Calcular qué tan centrada está la slide
              const slideCenter = slideRect.left + (slideRect.width / 2);
              const sliderCenter = sliderRect.left + (sliderRect.width / 2);
              const distanceFromCenter = Math.abs(slideCenter - sliderCenter);
              const maxDistance = slideRect.width * 0.5;
              
              // Calcular opacidad basada en la distancia al centro
              let opacity = 1 - (distanceFromCenter / maxDistance);
              opacity = Math.max(0, Math.min(1, opacity));

              // Aplicar opacidad al texto correspondiente
              gsap.set(textRefs.current[index], {
                opacity: opacity
              });
            }
          });

          // Actualizar índice activo
          const slideWidth = sliderEl.clientWidth;
          const currentIndex = Math.round(sliderEl.scrollLeft / slideWidth);
          if (currentIndex !== lastIndex) {
            setActiveIndex(currentIndex);
            lastIndex = currentIndex;
          }
        },
      });

      // Stepper animado
      gsap.to('.landing-slider__stepper-dot', {
        scale: (i: number) => (i === Math.round(progress * (slides.length - 1)) ? 1.4 : 1),
        background: (i: number) => (i === Math.round(progress * (slides.length - 1)) ? '#000' : '#bbb'),
        duration: 0.5,
        ease: 'power2.out',
      });

      // Línea del stepper
      gsap.to('.landing-slider__stepper-line-inner', {
        scaleY: progress,
        transformOrigin: 'top',
        duration: 0.7,
        ease: 'power3.out',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{ height: `${SLIDER_SCROLL_LENGTH}px`, position: 'relative' }}
      className="landing-slider-scroll-wrapper"
    >
      <section
        className="landing-slider landing-slider--sticky"
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: `${SLIDE_HEIGHT}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          zIndex: 2,
        }}
      >
        <div
          ref={sliderRef}
          className="landing-slider__custom-track"
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'hidden',
            scrollSnapType: 'x mandatory',
            width: '100vw',
            height: '100%',
            gap: '16px',
            boxSizing: 'border-box',
            padding: isPortrait ? '0 24px' : '0 100px',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {slides.map((img, idx) => (
            <div
              key={idx}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              className="landing-slider__slide"
              style={{
                minWidth: isPortrait ? 'calc(100vw - 48px)' : '1062px',
                height: '506px',
                scrollSnapAlign: 'center',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '0px',
              }}
            />
          ))}
        </div>
        <div className="landing-slider__polaroid" style={{ 
          position: 'absolute', 
          top: '59%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          width: isPortrait ? '80%' : '422px',
          maxWidth: '422px'
        }}>
          <div className="landing-slider__polaroid-window" style={{ 
            width: '100%', 
            height: isPortrait ? '280px' : '354px', 
            background: 'transparent',
            marginBottom: '20px'
          }} />
          <div className="landing-slider__polaroid-caption" style={{ 
            background: '#F7F6F4', 
            textAlign: 'center',
            width: '100%',
            position: 'relative',
            minHeight: '200px', // Altura fija para el contenedor
            padding: '32px 24px'
          }}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  textRefs.current[idx] = el;
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  left: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: idx === 0 ? 1 : 0,
                  padding: '0 24px',
                  boxSizing: 'border-box'
                }}
              >
                <div className="landing-slider__polaroid-title">
                  {slideContent[idx].title}
                </div>
                <div className="landing-slider__polaroid-body">
                  {slideContent[idx].body}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="landing-slider__stepper" style={{ marginTop: '56px', alignSelf: 'center' }}>
          <div className="landing-slider__stepper-line">
            <div className="landing-slider__stepper-line-inner" style={{ width: 2, height: '100%', background: '#bbb', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%) scaleY(0)', transformOrigin: 'top' }} />
          </div>
          <div className="landing-slider__stepper-dots">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`landing-slider__stepper-dot${activeIndex === idx ? ' landing-slider__stepper-dot--active' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingSlider; 