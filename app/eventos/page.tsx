import React from 'react';
import Events from '../../pages/Events/Events';
import PageWrapper from '../../components/PageWrapper';

export const metadata = {
  title: 'Eventos — Etérea',
  description: 'Eventos corporativos de alto nivel. Creamos experiencias únicas con intención, belleza y alma.',
};

export default function EventosPage() {
  return (
    <PageWrapper>
      <Events />
    </PageWrapper>
  );
}

