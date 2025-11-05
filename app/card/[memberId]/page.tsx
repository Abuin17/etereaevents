import React from 'react';
import BusinessCard from '../../../pages/BusinessCard/BusinessCard';
import PageWrapper from '../../../components/PageWrapper';

export const metadata = {
  title: 'Tarjeta de Visita — Etérea',
  description: 'Tarjeta de visita de los miembros del equipo de Etérea.',
};

export default function CardPage({ params }: { params: { memberId: string } }) {
  return (
    <PageWrapper chromeless>
      <BusinessCard memberId={params.memberId} />
    </PageWrapper>
  );
}

