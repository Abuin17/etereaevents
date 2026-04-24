'use client';

import React from 'react';
import './Nosotras.scss';
import UsSection from './UsSection';
import TeamSection from './TeamSection';
import WhoWeAreSection from './WhoWeAreSection';

const Nosotras: React.FC = () => {
  return (
    <div className="nosotras">
      <UsSection />
      <TeamSection />
      <WhoWeAreSection />
    </div>
  );
};

export default Nosotras; 