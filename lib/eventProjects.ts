export interface EventProjectDetails {
  client: string;
  location: string;
  date: string;
  services: string;
  mainImage?: { src: string; alt: string };
  /** Vídeo del proyecto: horizontal para escritorio y vertical para móvil. */
  video?: {
    desktop: { src: string; poster: string };
    mobile: { src: string; poster: string };
  };
}

export interface EventProject {
  slug: string;
  title: string;
  image: string;
  details?: EventProjectDetails;
}

export const eventProjects: EventProject[] = [
  {
    slug: 'showrun-redbull-checo-perez-madrid',
    title: 'Título Evento 1', // real: SHOWRUN REDBULL x CHECO PÉREZ - MADRID
    image: '/assets/images/opt-redbull.jpg',
    details: {
      client: 'Nazca Capital',
      location: 'Real Casino de Madrid, España',
      date: 'Junio 2026',
      services: 'Curated Events',
      mainImage: {
        src: '/assets/images/evento1-principal.jpg',
        alt: 'Ilustración de una escalinata monumental con alfombra roja',
      },
      video: {
        desktop: { src: '/assets/videos/redbull-desktop.mp4', poster: '/assets/videos/redbull-desktop-poster.jpg' },
        mobile: { src: '/assets/videos/redbull-mobile.mp4', poster: '/assets/videos/redbull-mobile-poster.jpg' },
      },
    },
  },
  {
    slug: 'farlabo-christmas-party-lisboa',
    title: 'Título Evento 2', // real: FARLABO CHRISTMAS PARTY - LISBOA
    image: '/assets/images/opt-piano christmas.jpg',
    details: {
      client: 'Nordea',
      location: 'Jardín del Hotel Rosewood Villa Magna, Madrid, España',
      date: 'Junio 2026',
      services: 'Curated Events',
      mainImage: {
        src: '/assets/images/evento2-principal.jpg',
        alt: 'Ilustración de la entrada del Hotel Rosewood Villa Magna',
      },
      // Sin vídeo todavía: se muestra el placeholder
    },
  },
  {
    slug: 'veepee-welovebrands-milan',
    title: 'Título Evento 3', // real: ENCUENTRO "WELOVEBRANDS" DE VEEPEE CON SUS PRINCIPALES PARTNERS - MILÁN
    image: '/assets/images/opt-torre-cava.jpg',
  },
];
