'use client';

import React from 'react';
import Link from 'next/link';
import './ServicesSection.scss';

const services = [
  {
    title: 'CURATED EVENTS',
    href: '/eventos',
    image: '/assets/images/events.jpg',
    description:
      'Eventos corporativos con dirección creativa y diseño estratégico.\n\nCada evento es una herramienta de posicionamiento pensada desde el concepto hasta el último detalle de producción.',
  },
  {
    title: 'TAILORED WEDDINGS',
    href: '/bodas',
    image: '/assets/images/tailored-weddings.jpg',
    description:
      'Bodas diseñadas desde la escucha, sin fórmulas ni catálogos. Aceptamos dos celebraciones al año porque cada una merece meses de dedicación exclusiva.\n\nDesde la primera conversación hasta el último instante, vuestra historia guía cada decisión.',
  },
  {
    title: 'VIP ASSISTANCE',
    href: '/vip-assistance',
    image: '/assets/images/vip-assistance.jpg',
    description:
      'Asistencia personal para quienes necesitan que todo esté resuelto antes de llegar.\n\nViajes, reservas, experiencias privadas, hospitality corporativo y acompañamiento ejecutivo. \n\nTu tiempo, libre. \nTodo lo demás, previsto.',
  },
];

const ServicesSection: React.FC = () => (
  <section className="services-section">
    <div className="services-section__center">
      <div className="services-section__title">
        PORQUE LO EXTRAORDINARIO DEBERÍA SENTIRSE NATURAL
      </div>
      <div className="services-section__cards" aria-label="Servicios de Etérea">
        {services.map((service) => (
          <Link href={service.href} className="services-section__card" key={service.title}>
            <div className="services-section__card-media">
              <img src={service.image} alt={service.title} className="services-section__card-image" />
            </div>
            <div className="services-section__card-content">
              <h3 className="services-section__card-title">{service.title}</h3>
              <p className="services-section__card-description">{service.description}</p>
              <span className="services-section__card-cta" aria-hidden="true">
                DESCUBRIR
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection; 