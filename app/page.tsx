import React from 'react';
import Landing from '../pages/Landing/Landing';
import PageWrapper from '../components/PageWrapper';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Etérea — Luxury Events & VIP Assistance',
  description: 'Eventos corporativos de alto nivel y VIP Assistance. Creamos experiencias únicas y memorables para eventos exclusivos.',
};

export default function Home() {
  return (
    <PageWrapper>
      <Landing />
    </PageWrapper>
  );
}
