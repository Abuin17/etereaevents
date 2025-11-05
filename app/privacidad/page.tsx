import React from 'react';
import Privacidad from '../../pages/Legal/Privacidad';
import PageWrapper from '../../components/PageWrapper';

export const metadata = {
  title: 'Política de Privacidad — Etérea',
  description: 'Política de privacidad de Etérea Events.',
};

export default function PrivacidadPage() {
  return (
    <PageWrapper>
      <Privacidad />
    </PageWrapper>
  );
}

