import React from 'react';
import './Legal.scss';
import rhombusIcon from '../../assets/icons/rombo.svg';

const Cookies: React.FC = () => {
  return (
    <section className="legal-page">
      <h1 className="legal-page__title">POLÍTICA DE COOKIES</h1>
      <div className="legal-page__container">
        <div>
          <h2 className="legal-page__section-title">1. Uso de cookies</h2>
          <p className="legal-page__text">Este sitio utiliza cookies propias y de terceros para mejorar la experiencia, analizar el tráfico y, en su caso, mostrar publicidad personalizada.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">2. Tipos de cookies utilizadas</h2>
          <ul className="legal-page__list legal-page__text">
            <li>Cookies técnicas o necesarias: imprescindibles para el funcionamiento básico.</li>
            <li>Cookies de análisis: Google Analytics.</li>
            <li>Cookies de publicidad comportamental: Meta Pixel.</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">3. Gestión de cookies</h2>
          <p className="legal-page__text">Al acceder a la web, el usuario puede aceptar, rechazar o configurar las cookies a través del banner habilitado. También puede gestionarlas desde su navegador.</p>
          <ul className="legal-page__list legal-page__text">
            <li>Chrome: Ayuda Google</li>
            <li>Firefox: Ayuda Mozilla</li>
            <li>Safari: Ayuda Apple</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">4. Consentimiento</h2>
          <p className="legal-page__text">La instalación de cookies de análisis y publicidad requiere consentimiento expreso, que puede retirarse en cualquier momento desde el panel de configuración o contactando en info@etereaevents.com.</p>
        </div>
      </div>
    </section>
  );
};

export default Cookies;


