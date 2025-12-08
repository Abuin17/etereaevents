import React from 'react';
import VipAssistance from '../../pages/VipAssistance/VipAssistance';
import PageWrapper from '../../components/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIP Assistance — Etérea Events | Asistencia Personal de Lujo',
  description: 'Servicio de asistencia VIP sin límites en Madrid. Tu presencia, libre. Lo inesperado, previsto. Concierge personal de alto nivel.',
  keywords: ['VIP assistance', 'concierge personal', 'asistente personal lujo', 'servicios VIP Madrid', 'concierge Madrid'],
  openGraph: {
    title: 'VIP Assistance — Etérea Events',
    description: 'Servicio de asistencia VIP sin límites. Tu presencia, libre. Lo inesperado, previsto.',
    url: '/vip-assistance',
    images: [
      {
        url: '/assets/images/opt-events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'VIP Assistance Etérea',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIP Assistance — Etérea Events',
    description: 'Servicio de asistencia VIP sin límites. Tu presencia, libre. Lo inesperado, previsto.',
    images: ['/assets/images/opt-events-hero.jpg'],
  },
  alternates: {
    canonical: '/vip-assistance',
  },
};

export default function VipAssistancePage() {
  return (
    <PageWrapper backgroundColor="#393431">
      <VipAssistance />
    </PageWrapper>
  );
}
