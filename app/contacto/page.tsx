import React from 'react';
import Contacto from '../../pages/Contacto/Contacto';
import PageWrapper from '../../components/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto — Etérea Events | Hablemos de Tu Evento',
  description: 'Las mejores experiencias comienzan con una conversación. Contáctanos para crear tu evento único en Madrid.',
  keywords: ['contacto Etérea', 'presupuesto eventos', 'contactar wedding planner', 'eventos Madrid contacto'],
  openGraph: {
    title: 'Contacto — Etérea Events',
    description: 'Las mejores experiencias comienzan con una conversación. Contáctanos.',
    url: '/contacto',
    images: [
      {
        url: '/assets/images/opt-events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacto Etérea Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto — Etérea Events',
    description: 'Las mejores experiencias comienzan con una conversación. Contáctanos.',
    images: ['/assets/images/opt-events-hero.jpg'],
  },
  alternates: {
    canonical: '/contacto',
  },
};

export default function ContactoPage() {
  return (
    <PageWrapper backgroundColor="#393431">
      <Contacto />
    </PageWrapper>
  );
}
