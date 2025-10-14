import React from 'react';
import './Legal.scss';
import rhombusIcon from '../../assets/icons/rombo.svg';

const AvisoLegal: React.FC = () => {
  return (
    <section className="legal-page">
      <h1 className="legal-page__title">AVISO LEGAL</h1>
      <div className="legal-page__container">
        <div>
          <h2 className="legal-page__section-title">1. Identificación del titular</h2>
          <ul className="legal-page__list legal-page__text">
            <li>Titular: Natalia Del Río Pérez</li>
            <li>NIF: 70815661H</li>
            <li>Domicilio fiscal: Calle Málaga 135, 28939, Arroyomolinos (Madrid), España</li>
            <li>Correo electrónico: info@etereaevents.com</li>
            <li>Teléfono: 697309380</li>
            <li>Nombre comercial: Etérea Events</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">2. OBJETO DEL SITIO WEB</h2>
          <p className="legal-page__text">La finalidad del presente sitio web es dar a conocer los servicios de organización de eventos de alto nivel y lujo prestados por Etérea Events, así como gestionar las consultas y solicitudes recibidas a través de sus formularios.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">3. Condiciones de uso</h2>
          <p className="legal-page__text">El usuario se compromete a hacer un uso adecuado del contenido y servicios, no empleándolos para actividades ilícitas, contrarias a la buena fe o al orden público.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">4. Propiedad intelectual e industrial</h2>
          <p className="legal-page__text">Todos los contenidos de la web (textos, imágenes, diseño, logotipos) son propiedad de Etérea Events o de terceros con autorización. Queda prohibida su reproducción sin consentimiento expreso.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">5. Responsabilidad</h2>
          <p className="legal-page__text">Etérea Events no se hace responsable de los daños derivados del mal uso de la web, ni de los enlaces a terceros ajenos.</p>
        </div>
      </div>
    </section>
  );
};

export default AvisoLegal;


