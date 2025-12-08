'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Bodas.scss';

const bodasHeroImage = '/assets/images/opt-slider-conocer.jpg';

const Bodas: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

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

    return () => {
      window.removeEventListener('resize', checkOrientation);
      if (tl) tl.kill();
    };
  }, [isPortrait]);

  return (
    <div className="bodas-landing">
      <div className="bodas-landing__header">
        <h1 className="bodas-landing__title">BODAS</h1>
        <span className="bodas-landing__subtitle">a medida</span>
      </div>
      <p className="bodas-landing__description">
        Cada historia de amor es única.<br />
        Creamos bodas que reflejan quienes sois.
      </p>
      <div className="bodas-landing__image-container" ref={imageContainerRef}>
        <div 
          className="bodas-landing__image-wrapper" 
          ref={imageWrapperRef}
          style={isPortrait ? { width: '96vw', maxWidth: '96vw' } : undefined}
        >
          <img 
            src={bodasHeroImage} 
            alt="Bodas Etérea" 
            className="bodas-landing__image"
          />
          <div 
            className="bodas-landing__image-text bodas-landing__image-text--left"
            ref={leftTextRef}
            style={isPortrait ? { left: 12, bottom: 12, right: 'auto', paddingLeft: 0, paddingRight: 0, width: 'auto', boxSizing: 'border-box' } : undefined}
          >
            TAILORED<br />
            WEDDINGS
          </div>
          <div 
            className="bodas-landing__image-text bodas-landing__image-text--right"
            ref={rightTextRef}
            style={isPortrait ? { right: 12, bottom: 12, left: 'auto', paddingRight: 0, paddingLeft: 0, width: 'auto', boxSizing: 'border-box' } : undefined}
          >
            ETÉREA
          </div>
        </div>
      </div>
      
      {/* Sección de proceso */}
      <section className="bodas-landing__process">
        <h2 className="eterea-title">NUESTRO PROCESO</h2>
        <p className="eterea-body">
          Desde la idea inicial hasta el último detalle. Escuchamos con atención, 
          entendemos lo que importa y traducimos vuestra historia en una 
          celebración que os representa.
        </p>
        
        <div className="bodas-landing__steps">
          <div className="bodas-landing__step">
            <span className="bodas-landing__step-number">01</span>
            <h3 className="bodas-landing__step-title">CONOCER</h3>
            <p className="bodas-landing__step-text">
              Cada historia comienza con una conversación. Tomamos tiempo para 
              entender quién sois, qué os inspira y cómo imagináis ese momento especial.
            </p>
          </div>
          
          <div className="bodas-landing__step">
            <span className="bodas-landing__step-number">02</span>
            <h3 className="bodas-landing__step-title">CREAR</h3>
            <p className="bodas-landing__step-text">
              Desde la idea inicial hasta el último detalle, combinamos estética, 
              emoción y precisión para dar forma a bodas que no se parecen a ninguna otra.
            </p>
          </div>
          
          <div className="bodas-landing__step">
            <span className="bodas-landing__step-number">03</span>
            <h3 className="bodas-landing__step-title">VIVIR</h3>
            <p className="bodas-landing__step-text">
              Aquello que está presente sin necesidad de ser evidente, aquello intangible 
              que evoca la profundidad. Cada instante, a vuestra medida.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bodas-landing__cta">
        <h2 className="eterea-title">¿EMPEZAMOS?</h2>
        <p className="eterea-body">
          Cuéntanos vuestra historia y empecemos a crear juntos 
          la boda de vuestros sueños.
        </p>
        <Link 
          href="/bodas/formulario" 
          className="eterea-button"
          onClick={() => window.scrollTo(0, 0)}
        >
          CUÉNTANOS TU HISTORIA
        </Link>
      </section>
    </div>
  );
};

export default Bodas;

