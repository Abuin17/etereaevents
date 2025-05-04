import React from 'react';
import './TeamSection.scss';
import nataliaImage from '../../assets/images/natalia.jpg';
import virginiaImage from '../../assets/images/virginia.jpg';

const TeamSection: React.FC = () => {
  return (
    <section className="team-section">
      <h2 className="team-section__title">EQUIPO</h2>
      <div className="team-section__grid">
        <div className="team-section__member">
          <img src={nataliaImage} alt="Natalia del Río Pérez" className="team-section__image" />
          <div className="team-section__info">
            <h3 className="team-section__name">NATALIA DEL RÍO PÉREZ</h3>
            <p className="team-section__role">Fundadora y Directora Creativa</p>
          </div>
        </div>
        <div className="team-section__member">
          <img src={virginiaImage} alt="Virginia de la Hoz González" className="team-section__image" />
          <div className="team-section__info">
            <h3 className="team-section__name">VIRGINIA DE LA HOZ GONZÁLEZ</h3>
            <p className="team-section__role">Producción</p>
          </div>
        </div>
      </div>
      <p className="team-section__description">
        Discretas por naturaleza, perfeccionistas en cada detalle y conseguidoras de lo imposible.<br />
        Diseñamos y producimos experiencias memorables, pensadas desde la emoción y hechas para durar.
      </p>
    </section>
  );
};

export default TeamSection; 