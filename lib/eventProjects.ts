export interface EventProjectDetails {
  client: string;
  location: string;
  year: string;
  services: string;
  mainImage?: { src: string; alt: string };
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
    title: 'SHOWRUN REDBULL x CHECO PÉREZ - MADRID',
    image: '/assets/images/opt-redbull.jpg',
    // Placeholders: pendientes de contenido real
    details: {
      client: 'Nombre del cliente',
      location: 'Ciudad, País',
      year: 'Año',
      services: 'Servicios del proyecto',
      mainImage: {
        src: '/assets/images/redbull-principal.jpeg',
        alt: 'Ilustración de una escalinata monumental con alfombra roja',
      },
    },
  },
  {
    slug: 'farlabo-christmas-party-lisboa',
    title: 'FARLABO CHRISTMAS PARTY - LISBOA',
    image: '/assets/images/opt-piano christmas.jpg',
  },
  {
    slug: 'veepee-welovebrands-milan',
    title: 'ENCUENTRO "WELOVEBRANDS" DE VEEPEE CON SUS PRINCIPALES PARTNERS - MILÁN',
    image: '/assets/images/opt-torre-cava.jpg',
  },
];
