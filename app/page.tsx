import React from 'react';
import Landing from '../pages/Landing/Landing';
import PageWrapper from '../components/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Etérea — Luxury Events & VIP Assistance en Madrid',
  description: 'Agencia de eventos de lujo en Madrid. Especializados en eventos corporativos exclusivos, bodas a medida y servicios VIP Assistance. Creamos experiencias únicas.',
  keywords: ['eventos de lujo Madrid', 'wedding planner', 'eventos corporativos', 'VIP assistance', 'bodas exclusivas'],
  openGraph: {
    title: 'Etérea — Luxury Events & VIP Assistance',
    description: 'Agencia de eventos de lujo en Madrid. Eventos corporativos, bodas exclusivas y VIP Assistance.',
    url: '/',
    images: [
      {
        url: '/assets/images/opt-events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Etérea Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Etérea — Luxury Events & VIP Assistance',
    description: 'Agencia de eventos de lujo en Madrid.',
    images: ['/assets/images/opt-events-hero.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <PageWrapper>
      <Landing />
    </PageWrapper>
  );
}
