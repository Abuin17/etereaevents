import React from 'react';
import Nosotras from '../../pages/Nosotras/Nosotras';
import PageWrapper from '../../components/PageWrapper';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Nosotras — Etérea',
  description: 'Conoce al equipo de Etérea Events. Más de diez años creando experiencias únicas.',
};

export default function NosotrasPage() {
  return (
    <PageWrapper>
      <Nosotras />
    </PageWrapper>
  );
}

