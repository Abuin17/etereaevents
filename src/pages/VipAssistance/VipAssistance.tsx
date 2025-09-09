import React, { useEffect, useRef, useState } from 'react';
import './VipAssistance.scss';
import vipImage from '../../assets/images/opt-hero-vip.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const VipAssistance: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    document.documentElement.style.setProperty('--page-background', '#393431');

    let tl: gsap.core.Timeline | null = null;
    if (!isPortrait) {
      tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=50%",
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

    return () => {
      document.documentElement.style.setProperty('--page-background', '#F7F6F4');
      window.removeEventListener('resize', checkOrientation);
      if (tl) tl.kill();
    };
  }, [isPortrait]);

  return (
    <div className="vip-assistance">
      <div className="vip-assistance__header">
        <h1 className="vip-assistance__title">Vip Assistance</h1>
        <span className="vip-assistance__subtitle">sin límites</span>
      </div>
      <p className="vip-assistance__description">
      Nuestro servicio de asistencia VIP está pensado para acompañarte con discreción, eficiencia y cuidado.
      Tu presencia, libre. Lo inesperado, previsto.
      </p>
      <div className="vip-assistance__image-container" ref={imageContainerRef}>
        <div 
          className="vip-assistance__image-wrapper" 
          ref={imageWrapperRef}
          style={isPortrait ? { width: '96vw', maxWidth: '96vw' } : undefined}
        >
          <img 
            src={vipImage} 
            alt="VIP Assistance" 
            className="vip-assistance__image"
          />
        </div>
          <div 
            className="vip-assistance__image-text vip-assistance__image-text--bottom"
            ref={bottomTextRef}
          >
            SERVICIO PREMIUM
            EXCLUSIVITY ISN'T ABOUT LUXURY.<br />
            IT'S ABOUT ACCESS
          </div>
        </div>
      <section className="vip-assistance__contact eterea-content-block">
        <h2 className="vip-assistance__title">IT'S NOT JUST WHERE YOU GO.<br />
        IT'S WHO BRINGS YOU THERE.</h2>
        <p className="vip-assistance__contact-text">
        Cada petición es una oportunidad para diseñar un instante único. Seleccionamos con precisión a los colaboradores adecuados en cada  situación, sin fórmulas fijas, para que cada instante se sienta hecho a tu medida.
        <br />Nos aseguramos de que cada decisión responda a tu propia visión del lujo, cumpliendo con los estándares de calidad que tú defines y elevándolos a la medida exacta de tus expectativas. 
        Cada detalle está pensado para que disfrutes con libertad y con la certeza de que todo estA bajo control.
        </p>
        <Link to="/contacto" className="eterea-button eterea-button--vip">Contacto</Link>
      </section>
    </div>
  );
};

export default VipAssistance; 