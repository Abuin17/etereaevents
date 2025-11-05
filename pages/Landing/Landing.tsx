'use client';

import React, { useEffect } from 'react';
import './Landing.scss';
import HeroSection from './HeroSection';
import SectionIntro from './SectionIntro';
import ServicesSection from './ServicesSection';
import LandingSlider from './LandingSlider';
import LandingUs from './LandingUs';
import PreFooter from './PreFooter';

const Landing: React.FC = () => {
  useEffect(() => {
    // Establecer el color de fondo cuando el componente se monta
    document.documentElement.style.setProperty('--page-background', '#F7F6F4');

    // Limpiar cuando el componente se desmonta
    return () => {
      document.documentElement.style.setProperty('--page-background', '#F7F6F4');
    };
  }, []);

  return (
    <div className="landing">
      <HeroSection />
      <SectionIntro />
      <ServicesSection />
      <LandingSlider />
      <LandingUs />
      <PreFooter />
    </div>
  );
};

export default Landing; 