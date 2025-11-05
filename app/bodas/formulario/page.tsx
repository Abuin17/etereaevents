import React from 'react';
import WeddingsFormPage from '../../../pages/weddings';
import PageWrapper from '../../../components/PageWrapper';

export const metadata = {
  title: 'Formulario de Bodas — Etérea',
  description: 'Cuéntanos tu historia para crear la boda de tus sueños.',
};

export default function BodasFormularioPage() {
  return (
    <PageWrapper>
      <WeddingsFormPage />
    </PageWrapper>
  );
}

