import React, { useRef, useEffect, useState } from 'react';
import './HeroSection.scss';
import heroImage from '../../assets/images/carrusel-landing.jpg';
import etereaLogo from '../../assets/logos/ETÉREA_Logo_beige-claro.svg';

const MARQUEE_ITEMS = 6; // Número de repeticiones

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    const handleScroll = () => {
      if (sectionRef.current && !isPortrait) {
        const scrollY = window.scrollY;
        // Parallax: mueve el fondo más lento que el scroll
        sectionRef.current.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPortrait]);

  const items = Array.from({ length: MARQUEE_ITEMS }).map((_, i) => (
    <div className="hero-section__item" key={i}>
      <img src={etereaLogo} alt="Eterea Logo" className="hero-section__logo" />
      <div className="hero-section__text">
        NO ES APARIENCIA,<br />ES PRESENCIA
      </div>
    </div>
  ));

  return (
    <section
      className={`hero-section ${isPortrait ? 'hero-section--portrait' : ''}`}
      ref={sectionRef}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {isPortrait ? (
        <div className="hero-section__static">
          <img src={etereaLogo} alt="Eterea Logo" className="hero-section__logo" />
          <div className="hero-section__text">
            NO ES APARIENCIA,<br />ES PRESENCIA
          </div>
        </div>
      ) : (
        <div className="hero-section__marquee">
          <div className="hero-section__track">
            {items}
            {items}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection; 