import type { Metadata } from "next";
import '../styles/main.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.etereaevents.com'),
  title: {
    default: 'Etérea — Luxury Events & VIP Assistance en Madrid',
    template: '%s | Etérea Events'
  },
  description: 'Agencia de eventos de lujo en Madrid. Especializados en eventos corporativos exclusivos, bodas a medida y servicios VIP Assistance. Creamos experiencias únicas y memorables.',
  keywords: ['eventos corporativos', 'VIP assistance', 'bodas exclusivas', 'eventos de lujo', 'event planning Madrid', 'wedding planner Madrid', 'concierge personal'],
  authors: [{ name: 'Etérea Events', url: 'https://www.etereaevents.com' }],
  creator: 'Etérea Events',
  publisher: 'Etérea Events',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    url: 'https://www.etereaevents.com',
    title: 'Etérea — Luxury Events & VIP Assistance',
    description: 'Agencia de eventos de lujo en Madrid. Eventos corporativos, bodas exclusivas y VIP Assistance.',
    siteName: 'Etérea Events',
    images: [
      {
        url: '/assets/images/opt-events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Etérea Events - Luxury Events & VIP Assistance',
      },
    ],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Etérea — Luxury Events & VIP Assistance',
    description: 'Agencia de eventos de lujo en Madrid. Eventos corporativos, bodas exclusivas y VIP Assistance.',
    images: ['/assets/images/opt-events-hero.jpg'],
    creator: '@etereaevents',
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
    canonical: 'https://www.etereaevents.com',
  },
  verification: {
    // Añadir cuando se configuren
    // google: 'verification-code',
  },
  category: 'business',
};

// JSON-LD Structured Data para SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EventPlanningBusiness',
  name: 'Etérea Events',
  description: 'Agencia de eventos de lujo en Madrid especializada en eventos corporativos, bodas exclusivas y servicios VIP Assistance.',
  url: 'https://www.etereaevents.com',
  logo: 'https://www.etereaevents.com/assets/logos/ETÉREA_Icono_antracita.svg',
  image: 'https://www.etereaevents.com/assets/images/opt-events-hero.jpg',
  telephone: '+34 XXX XXX XXX', // Actualizar con número real
  email: 'info@etereaevents.com', // Actualizar con email real
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.4168',
    longitude: '-3.7038',
  },
  areaServed: {
    '@type': 'Country',
    name: 'España',
  },
  priceRange: '€€€€',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
  sameAs: [
    'https://www.instagram.com/eterea.events',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Etérea Events',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Eventos Corporativos',
          description: 'Organización de eventos corporativos de alto nivel.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bodas a Medida',
          description: 'Planificación y coordinación de bodas exclusivas.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'VIP Assistance',
          description: 'Servicio de asistencia personal VIP.',
        },
      },
    ],
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
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Favicon dinámico basado en el tema del sistema operativo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var existingFavicons = document.querySelectorAll('link[rel="icon"]');
                existingFavicons.forEach(function(el) { el.remove(); });
                
                var link = document.createElement('link');
                link.id = 'dynamic-favicon';
                link.rel = 'icon';
                link.type = 'image/png';
                link.sizes = '32x32';
                document.head.appendChild(link);
                
                var mq = window.matchMedia('(prefers-color-scheme: dark)');
                
                function setFavicon() {
                  var href = mq.matches 
                    ? '/assets/images/Favicon-light.png' 
                    : '/assets/images/Favicon-dark.png';
                  link.setAttribute('href', href + '?v=' + Date.now());
                }
                
                setFavicon();
                
                if (mq.addEventListener) {
                  mq.addEventListener('change', setFavicon);
                } else if (mq.addListener) {
                  mq.addListener(setFavicon);
                }
              })();
            `,
          }}
        />
        
        {/* Preconnect para optimización de carga */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
