import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulario Post-Evento | Etérea Events',
  description: 'Comparte tu experiencia trabajando con Etérea Events.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

