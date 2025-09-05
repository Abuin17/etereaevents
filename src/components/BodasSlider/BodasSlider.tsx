import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
import './BodasSlider.scss';

import bodasImage1 from '../../assets/images/slider-boda-1.jpg';
import bodasImage2 from '../../assets/images/copas-boda.jpg';
import bodasImage3 from '../../assets/images/slider-boda-3.jpg';

const slides = [bodasImage2, bodasImage1, bodasImage3];
const SLIDE_HEIGHT = 700; // px
const SLIDER_SCROLL_LENGTH = slides.length * SLIDE_HEIGHT;

const slideContent = [
  {
    title: "LIMITADO",
    body: "Lo que importa no se repite, permanece. Desarrollamos dos celebraciones al año porque lo extraordinario no admite prisas."
  },
  {
    title: "ÚNICO",
    body: "Paso a paso tejemos tu historia mediante un relato inolvidable. Cada suceso es un hilo conductor que refleja vuestra esencia."
  },
  {
    title: "SELECTO",
    body: "Escogemos aquello que nos mueve. Celebraciones con intención y dirección. Contamos solo lo extraordinario."
  }
];

const POLAROID_MAX_WIDTH = 422;

const BodasSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>(slides.map(() => 0));

  // Calcula el ancho ideal de la slide para que la polaroid esté centrada
  function getSlideWidth() {
    const vw = window.innerWidth;
    let polaroidWidth = Math.min(POLAROID_MAX_WIDTH, Math.round(vw * 0.6));
    // El ancho de la slide debe ser igual al ancho del viewport menos el padding lateral
    let slideWidth = vw - 200; // 100px padding a cada lado
    // Nunca menor que la polaroid + 2*32px margen
    if (slideWidth < polaroidWidth + 64) slideWidth = polaroidWidth + 64;
    return { slideWidth, polaroidWidth };
  }

  const { slideWidth, polaroidWidth } = getSlideWidth();

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
      
      // Verificar si el carrusel está realmente en la zona sticky
      const isInStickyZone = rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;
      
      // Solo activar si está realmente en la zona sticky y visible
      // Agregar un offset para asegurar que la sección anterior sea visible
      if (!isInStickyZone || rect.top > windowHeight / 2 - 100 || rect.bottom < windowHeight / 2) {
        return;
      }
      
      // Ajuste: el scroll horizontal empieza justo al hacer sticky
      const start = rect.top - windowHeight / 2;
      const end = rect.bottom - windowHeight / 2 - stickyHeight;
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

      // Stepper animado
      gsap.to('.bodas-slider__stepper-dot', {
        scale: (i: number) => (i === Math.round(progress * (slides.length - 1)) ? 1.4 : 1),
        background: (i: number) => (i === Math.round(progress * (slides.length - 1)) ? '#000' : '#bbb'),
        duration: 0.5,
        ease: 'power2.out',
      });

      // Línea del stepper
      gsap.to('.bodas-slider__stepper-line-inner', {
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
      style={{ height: `${SLIDER_SCROLL_LENGTH}px`, position: 'relative', marginTop: '400px' }}
      className="bodas-slider-scroll-wrapper"
    >
      <section
        className="bodas-slider bodas-slider--sticky"
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
          zIndex: 1,
        }}
      >
        {/* Slider Intro Text */}
        <div className="bodas-slider__intro">NUESTRO PROCESO</div>
        <div
          ref={sliderRef}
          className="bodas-slider__custom-track"
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
              className="bodas-slider__slide"
              style={{
                minWidth: isPortrait ? 'calc(100vw - 48px)' : `${slideWidth}px`,
                width: isPortrait ? 'calc(100vw - 48px)' : `${slideWidth}px`,
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
        <div className="bodas-slider__polaroid" style={{ 
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
          <div className="bodas-slider__polaroid-window" style={{ 
            width: '100%', 
            height: isPortrait ? '280px' : '354px', 
            background: 'transparent',
            marginBottom: '20px'
          }} />
          <div className="bodas-slider__polaroid-caption" style={{ 
            background: '#FFFFFF', 
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
                <div className="bodas-slider__polaroid-title" style={{ marginBottom: '0' }}>
                  {slideContent[idx].title}
                </div>
                <div style={{ height: '12px' }}></div>
                <div className="bodas-slider__polaroid-body">
                  {slideContent[idx].body}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bodas-slider__stepper" style={{ marginTop: '56px', alignSelf: 'center' }}>
          <div className="bodas-slider__stepper-line">
            <div className="bodas-slider__stepper-line-inner" style={{ width: 2, height: '100%', background: '#bbb', position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%) scaleY(0)', transformOrigin: 'top' }} />
          </div>
          <div className="bodas-slider__stepper-dots">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`bodas-slider__stepper-dot${activeIndex === idx ? ' bodas-slider__stepper-dot--active' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BodasSlider;
