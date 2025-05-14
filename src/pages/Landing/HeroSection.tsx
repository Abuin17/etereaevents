import React, { useRef, useEffect, useState } from 'react';
import './HeroSection.scss';
// import heroImage1 from '../../assets/images/wedding.jpg';
// import heroImage2 from '../../assets/images/home3.jpg';
import heroImage3 from '../../assets/images/Landing sabana.jpg';
import etereaLogo from '../../assets/logos/ETÉREA_Logo_beige-claro.svg';

const MARQUEE_ITEMS = 6;
const SLIDE_INTERVAL = 8000; // 8 segundos

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // const images = [heroImage1, heroImage2, heroImage3];
  const images = [heroImage3]; // Solo la imagen de la sabana

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    const handleScroll = () => {
      if (sectionRef.current && !isPortrait) {
        const scrollY = window.scrollY;
        sectionRef.current.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    };

    // Carrusel automático
    // const carouselInterval = setInterval(() => {
    //   setIsTransitioning(true);
    //   setTimeout(() => {
    //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     setIsTransitioning(false);
    //   }, 1000); // Duración del fade
    // }, SLIDE_INTERVAL);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      // clearInterval(carouselInterval);
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
    >
      <div className="hero-section__background">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-section__background-image ${
              index === currentImageIndex ? 'hero-section__background-image--active' : ''
            } ${isTransitioning ? 'hero-section__background-image--transitioning' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

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