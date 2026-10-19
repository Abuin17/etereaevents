export interface EventProjectDetails {
  client: string;
  location: string;
  date: string;
  services: string;
  mainImage?: { src: string; alt: string };
  /** Imágenes de los folios que asoman de la carpeta (por orden: 1, 2, 3; el 3 es el que queda encima y se ve). Sin imagen = placeholder. */
  folioImages?: (string | undefined)[];
  /** Fotos de la galería (si falta, se muestran 12 placeholders). */
  gallery?: { src: string; alt: string }[];
  /** Punto de enfoque (object-position) de cada imagen de folio: el folio es una franja estrecha y se recorta a ese tramo. */
  folioImagePositions?: (string | undefined)[];
  /** Foto del cierre con la firma (si falta, la foto del equipo por defecto). */
  signoff?: { src: string; alt: string };
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
    image: '/assets/images/nazca/miniatura.jpg',
    details: {
      client: 'Nazca Capital',
      location: 'Real Casino de Madrid, España',
      date: 'Junio 2026',
      services: 'Curated Events',
      mainImage: {
        src: '/assets/images/evento1-principal.jpg',
        alt: 'Ilustración de una escalinata monumental con alfombra roja',
      },
      gallery: [
        { src: '/assets/images/nazca/foto-1.jpg', alt: 'Pareja disfrazada bajando la escalinata de alfombra roja bajo el arco' },
        { src: '/assets/images/nazca/foto-2.jpg', alt: 'Grupo de invitados con trajes de época en la escalera del Real Casino' },
        { src: '/assets/images/nazca/foto-3.jpg', alt: 'Pareja con sombrero de plumas rosas en el balcón de la escalinata' },
        { src: '/assets/images/nazca/foto-4.jpg', alt: 'Centro de mesa con peonías, musgo y velas, y el número de mesa' },
        { src: '/assets/images/nazca/foto-5.jpg', alt: 'Techo del salón con focos proyectados sobre las molduras y la placa del centenario' },
        { src: '/assets/images/nazca/foto-6.jpg', alt: 'Salón de banquete con lámparas de araña y mesas redondas' },
        { src: '/assets/images/nazca/foto-7.jpg', alt: 'Techo dorado con pinturas y claraboya de cristal' },
        { src: '/assets/images/nazca/foto-8.jpg', alt: 'Pianista con vestido dorado y tocado de plumas' },
        { src: '/assets/images/nazca/foto-9.jpg', alt: 'Escalinata del Real Casino vista desde arriba, con músicos y figuras de época' },
        { src: '/assets/images/nazca/foto-10.jpg', alt: 'Detalle de peonías rojas y rosas sobre musgo' },
        { src: '/assets/images/nazca/foto-11.jpg', alt: 'Mesa del banquete con flores rojas, lámparas y cuadros al fondo' },
        { src: '/assets/images/nazca/foto-12.jpg', alt: 'Bailarines con corsé turquesa y encaje ante un violonchelista' },
      ],
      folioImages: [undefined, undefined, '/assets/images/evento1-folio.jpg'], // el 3 es el folio visible (queda encima)
      video: {
        desktop: { src: '/assets/videos/redbull-desktop.mp4', poster: '/assets/videos/redbull-desktop-poster.jpg' },
        mobile: { src: '/assets/videos/redbull-mobile.mp4', poster: '/assets/videos/redbull-mobile-poster.jpg' },
      },
    },
  },
  {
    slug: 'farlabo-christmas-party-lisboa',
    title: 'Título Evento 2', // real: FARLABO CHRISTMAS PARTY - LISBOA
    image: '/assets/images/nordea/miniatura.jpg',
    details: {
      client: 'Nordea',
      location: 'Jardín del Hotel Rosewood Villa Magna, Madrid, España',
      date: 'Junio 2026',
      services: 'Curated Events',
      mainImage: {
        src: '/assets/images/evento2-principal.jpg',
        alt: 'Ilustración de la entrada del Hotel Rosewood Villa Magna',
      },
      gallery: [
        { src: '/assets/images/nordea/foto-1.jpg', alt: 'Cubitera con vinos y flores blancas' },
        { src: '/assets/images/nordea/foto-2.jpg', alt: 'Tarta con la silueta del alce y bollos de canela' },
        { src: '/assets/images/nordea/foto-3.jpg', alt: 'Camarero preparando un cóctel con naranja' },
        { src: '/assets/images/nordea/foto-4.jpg', alt: 'Mástil de Midsommar con coronas de flores' },
        { src: '/assets/images/nordea/foto-5.jpg', alt: 'Tarta de nata y fresas entre flores silvestres' },
        { src: '/assets/images/nordea/foto-6.jpg', alt: 'Barra azul con la carta de cócteles enmarcada' },
        { src: '/assets/images/nordea/foto-7.jpg', alt: 'Mesa de postres con carta, tartas y bollos' },
        { src: '/assets/images/nordea/foto-8.jpg', alt: 'Mesa auxiliar con un ramo silvestre azul y amarillo' },
        { src: '/assets/images/nordea/foto-9.jpg', alt: 'Servilleta con el logo de Nordea y Midsommar' },
        { src: '/assets/images/nordea/foto-10.jpg', alt: 'Invitados en el jardín bajo guirnaldas de luces' },
        { src: '/assets/images/nordea/foto-11.jpg', alt: 'Corona de hortensias y aquileas colgada del mástil' },
        { src: '/assets/images/nordea/foto-12.jpg', alt: 'Bandeja de bollos y fresas entre flores azules' },
      ],
      folioImages: [undefined, undefined, '/assets/images/nordea/folio.jpg'], // el 3 es el folio visible
      folioImagePositions: [undefined, undefined, '90% 50%'], // la franja muestra el ramillete de la derecha
      signoff: { src: '/assets/images/nordea/cierre.jpg', alt: 'Una invitada con corona de flores entre las flores del jardín' },
      // Sin vídeo todavía: se muestra el placeholder
    },
  },
  {
    slug: 'veepee-welovebrands-milan',
    title: 'Título Evento 3', // real: ENCUENTRO "WELOVEBRANDS" DE VEEPEE CON SUS PRINCIPALES PARTNERS - MILÁN
    image: '/assets/images/opt-torre-cava.jpg',
    // Placeholders: pendientes de los datos reales de este evento
    details: {
      client: 'Nombre del cliente',
      location: 'Ciudad, País',
      date: 'Fecha',
      services: 'Servicios',
      // mainImage y video: sin definir todavía (la plantilla muestra los huecos)
    },
  },
];
