import React from 'react';
import Contacto from '../../pages/Contacto/Contacto';
import PageWrapper from '../../components/PageWrapper';

export const metadata = {
  title: 'Contacto — Etérea',
  description: 'Las mejores experiencias comienzan con una conversación. Contáctanos para tu evento.',
};

export default function ContactoPage() {
  return (
    <PageWrapper>
      <Contacto />
    </PageWrapper>
  );
}

