import React from 'react';
import AvisoLegal from '../../pages/Legal/AvisoLegal';
import PageWrapper from '../../components/PageWrapper';

export const metadata = {
  title: 'Aviso Legal — Etérea',
  description: 'Aviso legal de Etérea Events.',
};

export default function AvisoLegalPage() {
  return (
    <PageWrapper>
      <AvisoLegal />
    </PageWrapper>
  );
}

