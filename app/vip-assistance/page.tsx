import React from 'react';
import VipAssistance from '../../pages/VipAssistance/VipAssistance';
import PageWrapper from '../../components/PageWrapper';

export const metadata = {
  title: 'VIP Assistance — Etérea',
  description: 'Servicio de asistencia VIP sin límites. Tu presencia, libre. Lo inesperado, previsto.',
};

export default function VipAssistancePage() {
  return (
    <PageWrapper>
      <VipAssistance />
    </PageWrapper>
  );
}

