import React from 'react';
import './Legal.scss';
import rhombusIcon from '../../assets/icons/rombo.svg';

const PropiedadIntelectual: React.FC = () => {
  return (
    <section className="legal-page">
      <h1 className="legal-page__title">PROPIEDAD INTELECTUAL Y USO DE CONTENIDOS</h1>
      <div className="legal-page__container">
        <div>
          <h2 className="legal-page__section-title">1. Contenidos del sitio web</h2>
          <p className="legal-page__text">Los textos, fotografías, logotipos, diseños y demás elementos de esta web son propiedad de Etérea Events o cuentan con autorización de terceros.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">2. Derechos de imagen en eventos</h2>
          <p className="legal-page__text">El uso de imágenes o vídeos de eventos organizados por Etérea Events se realiza siempre con autorización previa y expresa de clientes y/o asistentes, respetando sus derechos de imagen.</p>
        </div>

        <img src={rhombusIcon} alt="" className="legal-page__separator" />

        <div>
          <h2 className="legal-page__section-title">3. Prohibición de usos no autorizados</h2>
          <p className="legal-page__text">Queda prohibida la reproducción, distribución o transformación de los contenidos sin consentimiento expreso de Etérea Events.</p>
        </div>
      </div>
    </section>
  );
};

export default PropiedadIntelectual;


