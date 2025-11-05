import React from 'react';
import BusinessCard from '../../../pages/BusinessCard/BusinessCard';
import PageWrapper from '../../../components/PageWrapper';
import type { Metadata } from 'next';

// Definir los miembros del equipo (debe coincidir con BusinessCard.tsx)
const teamMembers = [
  {
    id: 'natalia',
    name: 'Natalia',
    fullName: 'NATALIA DEL RÍO PÉREZ',
    role: 'Fundadora y Directora Creativa',
    phone: '+34697309380',
    image: '/assets/images/natalia.jpg'
  },
  {
    id: 'virginia',
    name: 'Virginia',
    fullName: 'VIRGINIA DE LA HOZ GONZÁLEZ',
    role: 'Responsable de Producción y Experiencia',
    phone: '+34663575095',
    image: '/assets/images/opt-virginia.jpg'
  }
];

export async function generateMetadata(
  { params }: { params: { memberId: string } }
): Promise<Metadata> {
  const member = teamMembers.find(m => m.id === params.memberId);
  
  if (!member) {
    return {
      title: 'Tarjeta de Visita — Etérea',
      description: 'Tarjeta de visita de los miembros del equipo de Etérea.',
    };
  }

  // Construir URL base - usar metadataBase del layout como referencia
  // En producción, Vercel proporciona VERCEL_URL automáticamente
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://etereaevents-14.vercel.app';
  
  // La imagen debe ser URL absoluta para que funcione en previews
  const imageUrl = member.image.startsWith('http') 
    ? member.image 
    : `${baseUrl}${member.image}`;
  const pageUrl = `${baseUrl}/card/${member.id}`;

  return {
    title: `${member.fullName} - ${member.role} | ETÉREA EVENTS`,
    description: `Conecta con ${member.fullName} de ETÉREA EVENTS. ${member.role} especializada en eventos de lujo y experiencias únicas.`,
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: `${member.fullName} - ${member.role} | ETÉREA EVENTS`,
      description: `Conecta con ${member.fullName} de ETÉREA EVENTS. ${member.role} especializada en eventos de lujo y experiencias únicas.`,
      siteName: 'ETÉREA EVENTS',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: member.fullName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${member.fullName} - ${member.role} | ETÉREA EVENTS`,
      description: `Conecta con ${member.fullName} de ETÉREA EVENTS. ${member.role} especializada en eventos de lujo y experiencias únicas.`,
      images: [imageUrl],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function CardPage({ params }: { params: { memberId: string } }) {
  return (
    <PageWrapper chromeless>
      <BusinessCard memberId={params.memberId} />
    </PageWrapper>
  );
}

