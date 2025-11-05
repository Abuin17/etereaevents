import React from 'react';
import './Legal.scss';
const rhombusIcon = '/assets/icons/rombo.svg';

const Cookies: React.FC = () => {
  return (
    <section className="legal-page">
      <h1 className="legal-page__title">POLÍTICA DE COOKIES</h1>
      <div className="legal-page__container">
        <div>
          <h2 className="legal-page__section-title">1. USO DE COOKIES</h2>
          <p className="legal-page__text">Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico y, cuando el usuario lo autoriza, mostrar publicidad personalizada.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">2. TIPOS DE COOKIES UTILIZADAS</h2>
          <ul className="legal-page__list legal-page__text">
            <li><strong>Técnicas o necesarias:</strong> imprescindibles para el funcionamiento básico del sitio.</li>
            <li><strong>Analíticas:</strong> utilizadas para medir la audiencia y el uso del sitio (por ejemplo, Google Analytics).</li>
            <li><strong>Publicitarias o de remarketing:</strong> utilizadas para mostrar anuncios personalizados (por ejemplo, Meta Pixel).</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">3. GESTIÓN DE COOKIES</h2>
          <p className="legal-page__text">Al acceder al sitio, el usuario puede aceptar, rechazar o configurar las cookies a través del banner habilitado.</p>
          <p className="legal-page__text">Puede modificar su configuración en cualquier momento mediante el enlace "Preferencias de cookies" o desde su navegador.</p>
          <p className="legal-page__text">Guías útiles:</p>
          <ul className="legal-page__list legal-page__text">
            <li>Chrome | Firefox | Safari | Edge</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">4. CONSENTIMIENTO</h2>
          <p className="legal-page__text">Las cookies analíticas y publicitarias solo se instalan tras el consentimiento expreso del usuario.</p>
          <p className="legal-page__text">Hasta ese momento, estos scripts permanecerán bloqueados.</p>
        </div>
      </div>
    </section>
  );
};

export default Cookies;