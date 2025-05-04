import React from 'react';
import './Contacto.scss';

const Contacto: React.FC = () => {
  return (
    <div className="contacto">
      <div className="contacto__main">
        <section className="section-intro contacto__intro">
          LAS MEJORES EXPERIENCIAS <br />COMIENZAN CON UNA CONVERSACIÓN
        </section>
        <div className="contacto__content">
          <div className="contacto__group">
            <div className="contacto__line">
              <span className="contacto__label">PHONE</span>
              <span className="contacto__separator">|</span>
              <span className="contacto__value">+34 697 309 380</span>
            </div>
            <div className="contacto__line">
              <span className="contacto__label">MAIL</span>
              <span className="contacto__separator">|</span>
              <span className="contacto__value">info@etereaevents.com</span>
            </div>
          </div>
          <div className="contacto__group contacto__group--social">
            <div className="contacto__line">
              <span className="contacto__label">LINKEDIN</span>
              <span className="contacto__separator">|</span>
              <span className="contacto__value">Etérea Eventos</span>
            </div>
            <div className="contacto__line">
              <span className="contacto__label">INSTAGRAM</span>
              <span className="contacto__separator">|</span>
              <span className="contacto__value">@etereaevents</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 