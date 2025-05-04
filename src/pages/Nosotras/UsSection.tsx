import React from 'react';
import './UsSection.scss';

const UsSection: React.FC = () => {
  return (
    <section className="us-section">
      <h1 className="us-section__title">NOSOTRAS</h1>
      <p className="us-section__body">
        Creamos desde la escucha, trabajamos con intención.<br />
        Cada proyecto empieza con una historia, la tuya.
      </p>
    </section>
  );
};

export default UsSection; 