import React from 'react';
import PropiedadIntelectual from '../../pages/Legal/PropiedadIntelectual';
import PageWrapper from '../../components/PageWrapper';

export const metadata = {
  title: 'Política de Propiedad Intelectual — Etérea',
  description: 'Política de propiedad intelectual de Etérea Events.',
};

export default function PropiedadIntelectualPage() {
  return (
    <PageWrapper>
      <PropiedadIntelectual />
    </PageWrapper>
  );
}

