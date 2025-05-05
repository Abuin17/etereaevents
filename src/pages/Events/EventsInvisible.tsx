import React, { useEffect, useState, useCallback } from 'react';
import './EventsInvisible.scss';
import rhudoImage from '../../assets/images/RHUDO_001 1.jpg';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.png';
import { Link } from 'react-router-dom';

const images = [rhudoImage, slider2, slider3];
const FADE_DURATION = 1000; // 1 segundos entre cambios

const EventsInvisible: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const transition = useCallback(() => {
    setIsFading(true);
    
    // Esperamos a que termine el fade para actualizar los índices
    setTimeout(() => {
      setActiveIndex(nextIndex);
      setNextIndex((nextIndex + 1) % images.length);
      setIsFading(false);
    }, 2000); // Duración del fade
  }, [nextIndex]);

  useEffect(() => {
    const interval = setInterval(transition, FADE_DURATION);
    return () => clearInterval(interval);
  }, [transition]);

  return (
    <section className="events-invisible">
      <div className="events-invisible__container">
        <div className="events__title">
          LO INVISIBLE COMO EXPERIENCIA
        </div>
        <div className="events-invisible__body">
          <p>Buen gusto y precisión.</p>
          <p>Nos inspiran las personas que saben lo que quieren, pero que se dejan sorprender.</p>
        </div>
      </div>

      <div className="events-invisible__showcase">
        <div className="events-invisible__slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`events-invisible__slide ${
                index === activeIndex ? 'active' : 
                index === nextIndex ? `next ${isFading ? 'fade-in' : ''}` : ''
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        
        <div className="events-invisible__project">
          <div className="events-invisible__project-title">
            FARLABO - MICHELÍN
          </div>
          <div className="events-invisible__project-year">
            2023
          </div>
          <div className="events-invisible__project-description">
            Veinticinco aniversario de Michelín en colaboración con Farlabo para el unvealing de su última creación.
          </div>
        </div>

        <div className="events-invisible__separator">
          <div className="events-invisible__separator-line">
            <div className="events-invisible__separator-dots">
              <div className="events-invisible__separator-dot" />
              <div className="events-invisible__separator-dot" />
            </div>
          </div>
        </div>

        <div className="events-invisible__contact eterea-content-block">
          <div className="events__title eterea-title">Extraordinary begins where perfection stops being enough</div>
          <Link to="/contacto" className="eterea-button eterea-button--auto">Contacto</Link>
        </div>
      </div>
    </section>
  );
};

export default EventsInvisible; 