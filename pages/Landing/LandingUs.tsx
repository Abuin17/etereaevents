'use client';

import React from 'react';
import './LandingUs.scss';
import Link from 'next/link';

const LandingUs: React.FC = () => {
  return (
    <section className="landing-us eterea-content-block">
      <h1 className="landing-us__title eterea-title">
        POR LAS IDEAS<br />
        QUE MERECEN SER CONTADAS
      </h1>
      <p className="landing-us__body">
        Somos precisión, sutileza y presencia. Hablamos con la seguridad de quien
        no necesita demostrar, sino hacer sentir; de quien sabe que el verdadero lujo
        no se impone, sino que se percibe.
      </p>
      <Link href="/nosotras" className="eterea-button eterea-button--auto eterea-button-top">
        Nosotras
      </Link>
    </section>
  );
};

export default LandingUs; 