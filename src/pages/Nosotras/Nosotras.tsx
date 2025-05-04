import React from 'react';
import './Nosotras.scss';
import UsSection from './UsSection';
import LandingSlider from '../Landing/LandingSlider';
import TeamSection from './TeamSection';
import WhoWeAreSection from './WhoWeAreSection';

const Nosotras: React.FC = () => {
  return (
    <div className="nosotras">
      <UsSection />
      <LandingSlider />
      <TeamSection />
      <WhoWeAreSection />
    </div>
  );
};

export default Nosotras; 