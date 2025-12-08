import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulario Post-Evento | Etérea Events',
  description: 'Comparte tu experiencia trabajando con Etérea Events. Tu feedback nos ayuda a mejorar y crear experiencias aún más memorables.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Formulario Post-Evento — Etérea Events',
    description: 'Comparte tu experiencia trabajando con Etérea Events. Tu feedback nos ayuda a mejorar y crear experiencias aún más memorables.',
    url: 'https://www.etereaevents.com/feedback',
    type: 'website',
    siteName: 'Etérea Events',
    images: [
      {
        url: '/assets/images/opt-events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Etérea Events - Formulario Post-Evento',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formulario Post-Evento — Etérea Events',
    description: 'Comparte tu experiencia trabajando con Etérea Events.',
    images: ['/assets/images/opt-events-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.etereaevents.com/feedback',
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
