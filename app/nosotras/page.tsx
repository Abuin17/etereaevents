import React from 'react';
import Nosotras from '../../pages/Nosotras/Nosotras';
import PageWrapper from '../../components/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotras — Etérea Events | Quiénes Somos',
  description: 'Conoce al equipo de Etérea Events. Más de diez años creando experiencias únicas y memorables en Madrid.',
  keywords: ['equipo Etérea', 'wedding planners Madrid', 'event planners', 'organización eventos Madrid'],
  openGraph: {
    title: 'Nosotras — Etérea Events',
    description: 'Conoce al equipo detrás de las experiencias más exclusivas de Madrid.',
    url: '/nosotras',
    images: [
      {
        url: '/assets/images/opt-slider-vivir.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo Etérea Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotras — Etérea Events',
    description: 'Conoce al equipo detrás de las experiencias más exclusivas de Madrid.',
    images: ['/assets/images/opt-slider-vivir.jpg'],
  },
  alternates: {
    canonical: '/nosotras',
  },
};

export default function NosotrasPage() {
  return (
    <PageWrapper>
      <Nosotras />
    </PageWrapper>
  );
}
