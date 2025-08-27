import React from 'react';
import './Legal.scss';
import rhombusIcon from '../../assets/icons/rombo.svg';

const Privacidad: React.FC = () => {
  return (
    <section className="legal-page">
      <h1 className="legal-page__title">POLÍTICA DE PRIVACIDAD</h1>
      <div className="legal-page__container">
        <div>
          <h2 className="legal-page__section-title">1. Responsable del tratamiento</h2>
          <ul className="legal-page__list legal-page__text">
            <li>Titular: Natalia Del Río Pérez</li>
            <li>NIF: 70815661H</li>
            <li>Domicilio fiscal: Calle Málaga 135, 28939, Arroyomolinos (Madrid), España</li>
            <li>Contacto: info@etereaevents.com</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">2. Finalidad del tratamiento</h2>
          <ul className="legal-page__list legal-page__text">
            <li>Responder a solicitudes de información o consultas.</li>
            <li>Gestionar la relación profesional derivada de la contratación de servicios (fuera de la web).</li>
            <li>Enviar comunicaciones comerciales y newsletter, si el usuario lo autoriza expresamente.</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">3. Legitimación</h2>
          <ul className="legal-page__list legal-page__text">
            <li>Consentimiento del interesado (formularios, newsletter).</li>
            <li>Ejecución de la relación contractual (cuando proceda).</li>
            <li>Interés legítimo en garantizar la seguridad de la web.</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">4. Cesión de datos</h2>
          <p className="legal-page__text">Los datos podrán comunicarse a proveedores tecnológicos (hosting, email marketing, analítica), y colaboradores necesarios para la ejecución del evento, siempre con garantías y obligaciones de confidencialidad.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">5. Derechos</h2>
          <p className="legal-page__text">Los usuarios pueden ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a info@etereaevents.com.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">6. Conservación</h2>
          <p className="legal-page__text">Los datos se conservarán mientras exista relación contractual o mientras el usuario no solicite su supresión, respetando los plazos legales aplicables.</p>
        </div>
      </div>
    </section>
  );
};

export default Privacidad;


