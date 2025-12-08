import React from 'react';
import Events from '../../pages/Events/Events';
import PageWrapper from '../../components/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventos Corporativos de Lujo — Etérea Events',
  description: 'Eventos corporativos de alto nivel en Madrid. Creamos experiencias únicas con intención, belleza y alma para marcas exigentes.',
  keywords: ['eventos corporativos', 'eventos de lujo Madrid', 'eventos empresa', 'organización eventos', 'event planner', 'eventos exclusivos'],
  openGraph: {
    title: 'Eventos Corporativos — Etérea Events',
    description: 'Somos una firma especializada en experiencias únicas. Creamos eventos con intención, belleza y alma.',
    url: '/eventos',
    images: [
      {
        url: '/assets/images/opt-events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Eventos Etérea',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventos Corporativos — Etérea Events',
    description: 'Somos una firma especializada en experiencias únicas. Creamos eventos con intención, belleza y alma.',
    images: ['/assets/images/opt-events-hero.jpg'],
  },
  alternates: {
    canonical: '/eventos',
  },
};

export default function EventosPage() {
  return (
    <PageWrapper backgroundColor="#EFECE7">
      <Events />
    </PageWrapper>
  );
}
