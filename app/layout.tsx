import type { Metadata } from "next";
import '../styles/main.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.etereaevents.com'),
  title: 'Etérea — Luxury Events & VIP Assistance',
  description: 'Eventos corporativos de alto nivel y VIP Assistance. Creamos experiencias únicas y memorables para eventos exclusivos.',
  keywords: ['eventos corporativos', 'VIP assistance', 'bodas exclusivas', 'eventos de lujo', 'event planning', 'Madrid'],
  authors: [{ name: 'Etérea Events' }],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Etérea — Luxury Events & VIP Assistance',
    description: 'Eventos corporativos de alto nivel y VIP Assistance. Creamos experiencias únicas y memorables para eventos exclusivos.',
    siteName: 'Etérea Events',
    images: [
      {
        url: '/assets/images/opt-events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Etérea Events',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Etérea — Luxury Events & VIP Assistance',
    description: 'Eventos corporativos de alto nivel y VIP Assistance.',
    images: ['/assets/images/opt-events-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/Favicon-light.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var link = document.getElementById('dynamic-favicon') || document.createElement('link');
                link.id = 'dynamic-favicon';
                link.rel = 'icon';
                link.type = 'image/png';
                link.sizes = '32x32';
                document.head.appendChild(link);
                var mq = window.matchMedia('(prefers-color-scheme: dark)');
                function setFavicon() {
                  var href = mq.matches ? '/assets/Favicon-dark.png' : '/assets/Favicon-light.png';
                  link.setAttribute('href', href + '?v=' + Date.now());
                }
                setFavicon();
                if (mq.addEventListener) mq.addEventListener('change', setFavicon);
                else if (mq.addListener) mq.addListener(setFavicon);
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
