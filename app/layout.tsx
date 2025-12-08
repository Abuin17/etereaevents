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
        {/* Favicon dinámico basado en el tema del sistema operativo */}
        {/* SO en dark mode → Favicon-light.png (icono claro para fondo oscuro) */}
        {/* SO en light mode → Favicon-dark.png (icono oscuro para fondo claro) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                // Eliminar cualquier favicon existente para evitar conflictos
                var existingFavicons = document.querySelectorAll('link[rel="icon"]');
                existingFavicons.forEach(function(el) { el.remove(); });
                
                // Crear el enlace del favicon
                var link = document.createElement('link');
                link.id = 'dynamic-favicon';
                link.rel = 'icon';
                link.type = 'image/png';
                link.sizes = '32x32';
                document.head.appendChild(link);
                
                // Detectar preferencia de color del sistema
                var mq = window.matchMedia('(prefers-color-scheme: dark)');
                
                function setFavicon() {
                  // Si el SO está en dark mode → usar Favicon-light.png (icono claro)
                  // Si el SO está en light mode → usar Favicon-dark.png (icono oscuro)
                  var href = mq.matches 
                    ? '/assets/images/Favicon-light.png' 
                    : '/assets/images/Favicon-dark.png';
                  link.setAttribute('href', href + '?v=' + Date.now());
                }
                
                // Establecer el favicon inicial
                setFavicon();
                
                // Escuchar cambios en la preferencia del sistema
                if (mq.addEventListener) {
                  mq.addEventListener('change', setFavicon);
                } else if (mq.addListener) {
                  mq.addListener(setFavicon);
                }
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
