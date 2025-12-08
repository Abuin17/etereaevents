import React from 'react';
import WeddingsFormPage from '../../../pages/weddings';
import PageWrapper from '../../../components/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulario de Bodas — Etérea Events',
  description: 'Cuéntanos vuestra historia de amor. Completa nuestro formulario y empezaremos a crear juntos la boda de vuestros sueños.',
  keywords: ['formulario bodas', 'presupuesto boda', 'wedding planner contacto', 'organizar boda Madrid'],
  openGraph: {
    title: 'Cuéntanos Tu Historia — Etérea Events',
    description: 'Completa nuestro formulario y empezaremos a crear juntos la boda de vuestros sueños.',
    url: '/bodas/formulario',
    images: [
      {
        url: '/assets/images/opt-slider-conocer.jpg',
        width: 1200,
        height: 630,
        alt: 'Formulario Bodas Etérea',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuéntanos Tu Historia — Etérea Events',
    description: 'Completa nuestro formulario y empezaremos a crear juntos la boda de vuestros sueños.',
    images: ['/assets/images/opt-slider-conocer.jpg'],
  },
  alternates: {
    canonical: '/bodas/formulario',
  },
  robots: {
    index: false, // No indexar el formulario
    follow: true,
  },
};

export default function BodasFormularioPage() {
  return (
    <PageWrapper>
      <WeddingsFormPage />
    </PageWrapper>
  );
}
