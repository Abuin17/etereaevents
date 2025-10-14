import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bodas.scss';
import bodasImage from '../../assets/images/boda-2.jpg';
import etereaLogo from '../../assets/logos/ETÉREA_Icono_antracita.svg';
import BodasSlider from '../../components/BodasSlider/BodasSlider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Bodas: React.FC = () => {
  const navigate = useNavigate();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);



  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    // Establecer el color de fondo cuando el componente se monta
    document.documentElement.style.setProperty('--page-background', '#FFFFFF');

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
      );
    }

    // Limpiar cuando el componente se desmonta
    return () => {
      document.documentElement.style.setProperty('--page-background', '#F7F6F4');
      window.removeEventListener('resize', checkOrientation);
      if (tl) tl.kill();
    };
  }, [isPortrait]);

  return (
    <div className="bodas">
      <div className="bodas__header">
        <h1 className="events__title">BODAS</h1>
        <span className="events__subtitle">nuestro compromiso</span>
      </div>
      <p className="bodas__description">
        Desde la idea inicial hasta el último detalle. Escuchamos con atención, entendemos lo que importa, porque cada elección es parte de tu historia.
      </p>
      
      <div className="bodas__image-container" ref={imageContainerRef}>
        <div 
          className="bodas__image-wrapper" 
          ref={imageWrapperRef}
          style={isPortrait ? { width: '96vw', maxWidth: '96vw' } : undefined}
        >
          <img 
            src={bodasImage} 
            alt="Bodas Eterea" 
            className="bodas__image"
          />
        </div>
      </div>

      <section className="bodas__promise eterea-content-block">
        <h2 className="bodas__promise-title">CADA DETALLE, UNA PROMESA</h2>
        <p className="bodas__promise-text">
          Cada pareja es distinta, cada historia también. Por eso diseñamos celebraciones que reflejan vuestro estilo, valores y forma de vivir el amor.
        </p>
      </section>

      <BodasSlider />

      <div className="bodas__header-separator">
        <img src={etereaLogo} alt="Eterea" />
      </div>

      <section className="bodas__quote eterea-content-block">
        <h2 className="bodas__quote-title">LO QUE SE DICE, DA FORMA A LO QUE SE VIVE</h2>
        <span className="bodas__quote-subtitle">todo empieza aquí</span>
      </section>

      <section className="bodas__cta eterea-content-block">
        <button 
          className="eterea-button bodas__cta-button"
          onClick={() => navigate('/bodas/formulario')}
        >
          CUÉNTANOS TU HISTORIA
        </button>
      </section>

      <div className="bodas__footer-separator">
        <img src={etereaLogo} alt="Eterea" style={{ transform: 'scaleY(-1)' }} />
      </div>
    </div>
  );
};

export default Bodas;
