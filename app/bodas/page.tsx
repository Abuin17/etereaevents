import React from 'react';
import Bodas from '../../pages/Bodas/Bodas';
import PageWrapper from '../../components/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bodas a Medida — Etérea Events',
  description: 'Bodas exclusivas y personalizadas en Madrid. Creamos celebraciones únicas que reflejan vuestra historia de amor. Wedding planner de lujo.',
  keywords: ['bodas exclusivas', 'wedding planner Madrid', 'bodas de lujo', 'bodas personalizadas', 'organización bodas', 'bodas a medida'],
  openGraph: {
    title: 'Bodas a Medida — Etérea Events',
    description: 'Cada historia de amor es única. Creamos bodas que reflejan quienes sois.',
    url: '/bodas',
    images: [
      {
        url: '/assets/images/opt-slider-conocer.jpg',
        width: 1200,
        height: 630,
        alt: 'Bodas Etérea Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bodas a Medida — Etérea Events',
    description: 'Cada historia de amor es única. Creamos bodas que reflejan quienes sois.',
    images: ['/assets/images/opt-slider-conocer.jpg'],
  },
  alternates: {
    canonical: '/bodas',
  },
};

export default function BodasPage() {
  return (
    <PageWrapper backgroundColor="#FFFFFF">
      <Bodas />
    </PageWrapper>
  );
}
