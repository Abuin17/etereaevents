import React from 'react';
import { Link } from 'react-router-dom';
import './WhoWeAreSection.scss';
import etereaIcon from '../../assets/logos/ETÉREA_Icono_antracita.svg';
import rhombusIcon from '../../assets/icons/rombo.svg';

const WhoWeAreSection: React.FC = () => {
  return (
    <section className="who-we-are-section">
      <div className="who-we-are-section__icon-wrapper">
        <img src={etereaIcon} alt="Etérea Icon" className="who-we-are-section__icon" />
      </div>
      <div className="who-we-are-section__content">
        <h2 className="who-we-are-section__title eterea-title">QUIÉNES SOMOS</h2>
        <div className="who-we-are-section__blocks">
          <div className="who-we-are-section__block">
            <h3 className="who-we-are-section__subtitle">¿HASTA DÓNDE LLEGAMOS?</h3>
            <p className="who-we-are-section__body">
              Somos precisión, sutileza y presencia. Hablamos con la seguridad de quien
              no necesita demostrar, sino hacer sentir; de quien sabe que el verdadero lujo
              no se impone, sino que se percibe.
            </p>
            <img src={rhombusIcon} alt="" className="who-we-are-section__separator" />
          </div>
          <div className="who-we-are-section__block">
            <h3 className="who-we-are-section__subtitle">¿POR QUÉ CONFIAR?</h3>
            <p className="who-we-are-section__body">
              Nuestro recorrido se mide en confianza. En quienes repiten, en quienes nos recomiendan, 
              en quienes sienten que no hay otra forma de hacerlo. Llevamos más de quince años trabajando para firmas como Lamborghini, Armany Beauty, Farlabo, Benefit, Snapchat y Redbull.
            </p>
            <img src={rhombusIcon} alt="" className="who-we-are-section__separator" />
          </div>
          <div className="who-we-are-section__block">
            <h3 className="who-we-are-section__subtitle">¿POR QUÉ NOSOTRAS?</h3>
            <p className="who-we-are-section__body">
              Elegirnos es elegir sentirse acompañada de verdad.
              Saber que alguien entiende lo que necesitas antes incluso de que lo pidas.
              Y que, detrás de cada propuesta, hay una mirada atenta, cálida y experta 
              que cuida de ti mientras todo fluye.
            </p>
          </div>
        </div>
        <Link to="/contacto" className="eterea-button eterea-button--auto">Contacto</Link>
      </div>
      <div className="who-we-are-section__icon-wrapper who-we-are-section__icon-wrapper--bottom">
        <img src={etereaIcon} alt="Etérea Icon" className="who-we-are-section__icon who-we-are-section__icon--inverted" />
      </div>
    </section>
  );
};

export default WhoWeAreSection; 