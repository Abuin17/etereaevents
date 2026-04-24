import React from 'react';
import './Contacto.scss';
import Footer from '../../components/Footer/Footer';

const Contacto: React.FC = () => {
  return (
    <div className="contacto">
      <div className="contacto__main">
        <section className="section-intro contacto__intro">
          NO NECESITAS TENERLO TODO CLARO. <br /> CUÉNTANOS TU IDEA Y TE AYUDAMOS A TRANSFORMARLA EN UNA EXPERIENCIA.
        </section>
        <div className="contacto__content">
          <div className="contacto__group">
            <a
              href="tel:+34697309380"
              className="contacto__line contacto__line--link"
            >
              <span className="contacto__label">PHONE</span>
              <span className="contacto__separator">|</span>
              <span className="contacto__value">+34 697 309 380</span>
            </a>
            <a
              href="mailto:info@etereaevents.com"
              className="contacto__line contacto__line--link"
            >
              <span className="contacto__label">MAIL</span>
              <span className="contacto__separator">|</span>
              <span className="contacto__value">info@etereaevents.com</span>
            </a>
            <a
              href="https://www.instagram.com/eterea.events?igsh=MWhvNDJxbHZoeXYzdQ=="
              className="contacto__line contacto__line--link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contacto__label">INSTAGRAM</span>
              <span className="contacto__separator">|</span>
              <span className="contacto__value">@eterea.events</span>
            </a>
          </div>
          <div className="contacto__group contacto__group--social">
          </div>
        </div>
      </div>
      <Footer variant="light" />
    </div>
  );
};

export default Contacto; 