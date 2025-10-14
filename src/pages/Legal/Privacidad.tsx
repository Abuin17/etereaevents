import React from 'react';
import './Legal.scss';
import rhombusIcon from '../../assets/icons/rombo.svg';

const Privacidad: React.FC = () => {
  return (
    <section className="legal-page">
      <h1 className="legal-page__title">POLÍTICA DE PRIVACIDAD</h1>
      <div className="legal-page__container">
        <div>
          <h2 className="legal-page__section-title">1. RESPONSABLE DEL TRATAMIENTO</h2>
          <ul className="legal-page__list legal-page__text">
            <li>Titular: Natalia Del Río Pérez</li>
            <li>NIF: 70815616H</li>
            <li>Domicilio fiscal: Calle Málaga 135, 28939, Arroyomolinos (Madrid), España</li>
            <li>Correo electrónico: info@etereaevents.com</li>
            <li>Teléfono: 679303980</li>
            <li>Nombre comercial: Etérea Events</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">2. FINALIDAD DEL TRATAMIENTO</h2>
          <p className="legal-page__text">En Etérea tratamos los datos personales que nos proporcionas con las siguientes finalidades:</p>
          <ul className="legal-page__list legal-page__text">
            <li>Gestionar las solicitudes recibidas a través de los formularios de la web, incluyendo el formulario de bodas.</li>
            <li>Organizar reuniones o presentaciones de nuestros servicios de eventos.</li>
            <li>Enviar comunicaciones informativas relacionadas con los servicios solicitados, si así lo autorizas expresamente.</li>
          </ul>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">3. LEGITIMACIÓN</h2>
          <p className="legal-page__text">La base legal para el tratamiento es el consentimiento expreso del interesado, otorgado al marcar la casilla correspondiente antes de enviar el formulario.</p>
          <p className="legal-page__text">En caso de contratación de servicios, la ejecución del contrato será la base jurídica adicional.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">4. CESIÓN DE DATOS</h2>
          <p className="legal-page__text">Los datos se almacenan en <strong>Airtable</strong>, servicio prestado por Formagrid Inc. (EE. UU.), que actúa como encargado del tratamiento conforme al RGPD mediante cláusulas contractuales tipo aprobadas por la Comisión Europea.</p>
          <p className="legal-page__text">Podrán comunicarse a colaboradores o proveedores tecnológicos estrictamente necesarios para la ejecución de los servicios, siempre bajo obligaciones de confidencialidad.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">5. DERECHOS</h2>
          <p className="legal-page__text">Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <strong>info@etereaevents.com</strong>, indicando en el asunto "Protección de Datos".</p>
          <p className="legal-page__text">También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">6. CONSERVACIÓN</h2>
          <p className="legal-page__text">Los datos se conservarán mientras exista una relación contractual o comercial, o hasta que solicites su supresión, y durante los plazos legales aplicables.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">7. TRANSFERENCIAS INTERNACIONALES</h2>
          <p className="legal-page__text">Airtable realiza transferencias internacionales amparadas en cláusulas contractuales tipo aprobadas por la Comisión Europea, garantizando un nivel adecuado de protección.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">8. SEGURIDAD</h2>
          <p className="legal-page__text">Etérea adopta las medidas técnicas y organizativas necesarias para garantizar la confidencialidad e integridad de los datos personales, evitando su alteración, pérdida o acceso no autorizado.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">9. CONTACTO</h2>
          <p className="legal-page__text">Para cualquier duda sobre privacidad, puedes escribirnos a <strong>info@etereaevents.com</strong>.</p>
        </div>
      </div>
    </section>
  );
};

export default Privacidad;