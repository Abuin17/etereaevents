import React, { useRef, useEffect } from 'react';
import './TeamSection.scss';
import nataliaImage from '../../assets/images/natalia.jpg';
import virginiaImage from '../../assets/images/virginia.jpg';

const TeamSection: React.FC = () => {
  const nataliaMemberRef = useRef<HTMLDivElement>(null);
  const virginiaMemberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const speed = 0.1; // Parallax factor
      [nataliaMemberRef, virginiaMemberRef].forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementHeight = rect.height;
          
          // Calculate how much of the element is visible
          const visibleAmount = Math.min(
            Math.max(0, windowHeight - rect.top),
            Math.max(0, rect.bottom),
            elementHeight
          );
          
          // Only apply parallax if element is at least partially visible
          if (visibleAmount > 0) {
            // Calculate the center point of the element relative to viewport
            const elementCenter = rect.top + elementHeight / 2;
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = elementCenter - viewportCenter;
            
            // Apply parallax effect
            const translateY = distanceFromCenter * speed;
            ref.current.style.transform = `translateY(${translateY}px)`;
          }
        }
      });
    };

    // Use requestAnimationFrame for smoother animation
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Initial position
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <section className="team-section">
      <h2 className="team-section__title">EQUIPO</h2>
      <div className="team-section__grid">
        <div ref={nataliaMemberRef} className="team-section__member">
          <img src={nataliaImage} alt="Natalia del Río Pérez" className="team-section__image" />
          <div className="team-section__info">
            <h3 className="team-section__name">NATALIA DEL RÍO PÉREZ</h3>
            <p className="team-section__role">Fundadora y Directora Creativa</p>
          </div>
        </div>
        <div ref={virginiaMemberRef} className="team-section__member">
          <img src={virginiaImage} alt="Virginia de la Hoz González" className="team-section__image" />
          <div className="team-section__info">
            <h3 className="team-section__name">VIRGINIA DE LA HOZ GONZÁLEZ</h3>
            <p className="team-section__role">Responsable de Producción y Experiencia</p>
          </div>
        </div>
      </div>
      <p className="team-section__description">
        Discretas por naturaleza, perfeccionistas en cada detalle y conseguidoras de lo imposible.<br />
        Diseñamos y producimos experiencias memorables, pensadas desde la emoción y hechas para durar.
      </p>
    </section>
  );
};

export default TeamSection; 