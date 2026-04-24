import React from 'react';
import './IdentifierSection.scss';

const rhombusIcon = '/assets/icons/rombo.svg';

const IdentifierSection: React.FC = () => (
  <section className="identifier-section">
    <div className="identifier-section__icon-wrapper">
      <img src={rhombusIcon} alt="" className="identifier-section__rhombus" />
    </div>

    <p className="identifier-section__text">
      {'Quieres algo a la altura de lo que celebras o de la marca que representas.\nEn ETÉREA no hay moldes ni repeticiones, solo proyectos únicos que respiran de tu historia y toman forma con intención y sensibilidad.'}
    </p>

    <div className="identifier-section__icon-wrapper identifier-section__icon-wrapper--bottom">
      <img src={rhombusIcon} alt="" className="identifier-section__rhombus" />
    </div>
  </section>
);

export default IdentifierSection;
