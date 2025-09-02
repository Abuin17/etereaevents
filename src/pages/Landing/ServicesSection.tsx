import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesSection.scss';
import etereaIcon from '../../assets/logos/ETÉREA_Icono_antracita.svg';

const ServicesSection: React.FC = () => (
  <section className="services-section">
    <div className="services-section__icon-wrapper">
      <img src={etereaIcon} alt="Etérea Icon" className="services-section__icon" />
    </div>
    <div className="services-section__center">
      <div className="services-section__title">
        PORQUE LO EXTRAORDINARIO DEBERÍA SENTIRSE NATURAL
      </div>
      <div className="services-section__desc">
        Etérea es una forma de estar presente, de escuchar con atención y traducir lo esencial en celebraciones que reflejan quién eres. No hay moldes ni repeticiones, solo proyectos únicos que respiran de tu historia y toman forma con intención y sensibilidad.
      </div>
      <div className="services-section__buttons">
        <Link to="/eventos" className="eterea-button">EVENTOS</Link>
        <Link to="/bodas" className="eterea-button" onClick={() => window.scrollTo(0, 0)}>BODAS</Link>
        <Link to="/vip-assistance" className="eterea-button" onClick={() => window.scrollTo(0, 0)}>VIP ASSISTANCE</Link>
      </div>
    </div>
    <div className="services-section__icon-wrapper services-section__icon-wrapper--bottom">
      <img src={etereaIcon} alt="Etérea Icon" className="services-section__icon services-section__icon--inverted" />
    </div>
  </section>
);

export default ServicesSection; 