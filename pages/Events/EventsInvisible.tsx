'use client';

import React, { useEffect, useState, useCallback } from 'react';
import './EventsInvisible.scss';
const redbullImage = '/assets/images/opt-redbull.jpg';
const pianoChristmasImage = '/assets/images/opt-piano christmas.jpg';
const torreCavaImage = '/assets/images/opt-torre-cava.jpg';
import Link from 'next/link';

const images = [redbullImage, pianoChristmasImage, torreCavaImage];
const projects = [
  {
    title: 'SHOWRUN REDBULL x CHECO PÉREZ - MADRID',
    year: '2023',
    description: ''
  },
  {
    title: 'FARLABO CHRISTMAS PARTY - LISBOA',
    year: '2024',
    description: ''
  },
  {
    title: 'ENCUENTRO "WELOVEBRANDS" DE VEEPEE CON SUS PRINCIPALES PARTNERS - MILÁN',
    year: '2024',
    description: ''
  }
];
const FADE_DURATION = 3000; // 3 segundos entre cambios

const EventsInvisible: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsPortrait(window.innerWidth < window.innerHeight);
    setIsPortrait(window.innerWidth < window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <div className="events-invisible__slider"
          style={isPortrait ? { width: '96vw', maxWidth: '96vw' } : undefined}
        >
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
          <div className="events-invisible__project-stack">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`events-invisible__project-info${
                  idx === activeIndex && !isFading ? ' active' : ''
                }${idx === nextIndex && isFading ? ' next fade-in' : ''}`}
              >
          <div className="events-invisible__project-title">
                  {project.title}
          </div>
          <div className="events-invisible__project-year">
                  {project.year}
          </div>
          <div className="events-invisible__project-description">
                  {project.description}
                </div>
              </div>
            ))}
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
          <div className="events__title eterea-title">EXTRAORDINARY BEGINS WHERE PERFECTION STOPS BEING ENOUGH</div>
          <Link href="/contacto" className="eterea-button eterea-button--auto">Contacto</Link>
        </div>
      </div>
    </section>
  );
};

export default EventsInvisible; 