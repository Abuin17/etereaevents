import React from 'react';
import Cookies from '../../pages/Legal/Cookies';
import PageWrapper from '../../components/PageWrapper';

export const metadata = {
  title: 'Política de Cookies — Etérea',
  description: 'Política de cookies de Etérea Events.',
};

export default function CookiesPage() {
  return (
    <PageWrapper>
      <Cookies />
    </PageWrapper>
  );
}

