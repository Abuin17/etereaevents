'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
import './LandingSlider.scss';

const slider1 = '/assets/images/conocer.jpg';
const slider2 = '/assets/images/crear.png';
const slider3 = '/assets/images/vivir.png';

const slides = [slider1, slider2, slider3];
const SLIDE_HEIGHT = 700; // px
const SLIDER_SCROLL_LENGTH = slides.length * SLIDE_HEIGHT;

const slideContent = [
  {
    title: "CONOCER",
    body: "Definimos juntos el alma del proyecto. Entendemos el propósito y la energía que debe transmitir. A partir de aquí, trazamos el concepto que guiará cada decisión posterior."
  },
  {
    title: "CREAR",
    body: "Diseñamos el universo visual y sensorial del evento. Definimos el espacio, seleccionamos proveedores y damos forma a cada decisión: estética, tiempos, presupuesto y producción. Todo lo que se ve, y lo que no, queda bajo control."
  },
  {
    title: "VIVIR",
    body: "Nuestra presencia sostiene cada momento, desde el montaje hasta la retirada final. Coordinamos equipo, proveedores y tiempos con discreción, asegurando que todo suceda con precisión, calma y armonía."
  }
];

const POLAROID_MAX_WIDTH = 422;

const LandingSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>(slides.map(() => 0));

  // Calcula el ancho de la polaroid
  function getPolaroidWidth() {
    if (typeof window === 'undefined') return POLAROID_MAX_WIDTH;
    const vw = window.innerWidth;
    return Math.min(POLAROID_MAX_WIDTH, Math.round(vw * 0.6));
  }

  const [polaroidWidth, setPolaroidWidth] = useState(POLAROID_MAX_WIDTH);
  
  // Estado para saber si ya se inicializaron las dimensiones en cliente
  const [isClientReady, setIsClientReady] = useState(false);

  // Inicializar los arrays de refs
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
    textRefs.current = textRefs.current.slice(0, slides.length);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setPolaroidWidth(getPolaroidWidth());
    };

    setIsPortrait(window.innerHeight > window.innerWidth);
    setPolaroidWidth(getPolaroidWidth());
    setIsClientReady(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Establecer scroll inicial después de que las dimensiones estén listas
  // Usamos un ref para rastrear si ya inicializamos el scroll
  const hasInitializedScroll = useRef(false);
  
  useEffect(() => {
    // Solo ejecutar cuando el cliente esté listo y no se haya inicializado el scroll
    if (!isClientReady || hasInitializedScroll.current) return;
    
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;
    
    // Deshabilitar scroll-snap temporalmente para evitar que interfiera
    sliderEl.style.scrollSnapType = 'none';
    
    // Forzar scroll a 0 inmediatamente
    sliderEl.scrollLeft = 0;
    
    // Marcar como inicializado
    hasInitializedScroll.current = true;
    
    // Restaurar scroll-snap después de un frame
    requestAnimationFrame(() => {
      if (sliderEl) {
        sliderEl.style.scrollSnapType = 'x mandatory';
      }
    });
  }, [isClientReady]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const stickyEl = stickyRef.current;
    const sliderEl = sliderRef.current;
    if (!scrollEl || !stickyEl || !sliderEl) return;

    let lastIndex = 0;

    const handleScroll = () => {
      const rect = scrollEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyHeight = stickyEl.offsetHeight;
      // Ajuste: el scroll horizontal empieza justo al hacer sticky
      const start = rect.top - windowHeight / 2; // Quita stickyHeight/2
      const end = rect.bottom - windowHeight / 2 - stickyHeight; // Quita stickyHeight/2
      const total = end - start;
      const scrolled = Math.min(Math.max(-start, 0), total);
      const progress = total > 0 ? scrolled / total : 0;

      // Calcular el scroll horizontal objetivo
      const maxScrollLeft = sliderEl.scrollWidth - sliderEl.clientWidth;
      const targetScrollLeft = progress * maxScrollLeft;

      // Parallax: calcula el offset para cada slide
      const newParallaxOffsets = slides.map((_, idx) => {
        // El parallax depende de la posición de la slide y el progreso
        // Puedes ajustar el factor (ej: 40px) para más/menos efecto
        return (progress - idx) * 40;
      });
      setParallaxOffsets(newParallaxOffsets);

      // GSAP para suavidad
      gsap.to(sliderEl, {
        scrollTo: { x: targetScrollLeft },
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
                 onUpdate: () => {
           // Calcular opacidad para cada texto basado en el progreso del scroll
           const maxScrollLeft = sliderEl.scrollWidth - sliderEl.clientWidth;
           const currentScrollLeft = sliderEl.scrollLeft;
           const progress = maxScrollLeft > 0 ? currentScrollLeft / maxScrollLeft : 0;
           
           // Calcular qué slide está activa basada en el progreso
           const slideProgress = progress * (slides.length - 1);
           const currentSlideIndex = Math.floor(slideProgress);
           const slideFraction = slideProgress - currentSlideIndex;
           
           slideRefs.current.forEach((slideRef, index) => {
             if (slideRef && textRefs.current[index]) {
               let opacity = 0;
               
               if (index === currentSlideIndex) {
                 // Texto actual: visible cuando su slide está activa
                 if (slideFraction <= 0.5) {
                   // Primera mitad de la transición: texto actual completamente visible
                   opacity = 1;
                 } else {
                   // Segunda mitad: cross-fade con el siguiente
                   opacity = 1 - ((slideFraction - 0.5) * 2);
                 }
               } else if (index === currentSlideIndex + 1) {
                 // Texto siguiente: aparece en la segunda mitad de la transición
                 if (slideFraction >= 0.5) {
                   // Segunda mitad: cross-fade con el actual
                   opacity = (slideFraction - 0.5) * 2;
                 }
               }
               
               // Asegurar que la opacidad esté entre 0 y 1
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
          top: '50%',
          transform: 'translateY(-50%)',
          height: `${SLIDE_HEIGHT}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          zIndex: 2,
        }}
      >
        {/* Slider Intro Text */}
        <div className="landing-slider__intro">NUESTRO PROCESO</div>
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
            padding: isPortrait ? '0 24px' : `0 100px`,
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
                // Usar calc() para evitar problemas de hidratación SSR
                minWidth: isPortrait ? 'calc(100vw - 48px)' : 'calc(100vw - 200px)',
                width: isPortrait ? 'calc(100vw - 48px)' : 'calc(100vw - 200px)',
                height: '506px',
                scrollSnapAlign: 'center',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: `calc(50% + ${parallaxOffsets[idx] || 0}px) center`,
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
          top: '60%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          width: isPortrait ? '80%' : `${polaroidWidth}px`,
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
            minHeight: '250px', // Altura fija para el contenedor
            padding: '32px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  opacity: idx === 0 ? 1 : 0,
                  padding: '20px 24px 40px 24px',
                  boxSizing: 'border-box',
                  border: 'none'
                }}
              >
                <div className="landing-slider__polaroid-title" style={{ marginBottom: '0' }}>
                  {slideContent[idx].title}
                </div>
                <div style={{ height: '12px' }}></div>
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