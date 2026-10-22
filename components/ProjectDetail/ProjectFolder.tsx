import React from 'react';
import type { EventProject } from '../../lib/eventProjects';
import ProjectGallery from './ProjectGallery';
import AutoplayVideo from './AutoplayVideo';
import SignOff from './SignOff';
import ProjectNav from './ProjectNav';
import './ProjectDetail.scss'; // estilos compartidos de la galería y su overlay
import './ProjectFolder.scss';

interface ProjectFolderProps {
  project: EventProject;
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const LOREM_2 =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// Mínimo 8 fotos. Placeholders: sustituir por { src, alt } reales.
const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => ({ alt: `Foto ${i + 1}` }));

// Folios de en medio (entre la carpeta trasera y la delantera). Placeholders: cada proyecto
// aportará sus imágenes; con { src } se mostrará la imagen en lugar del bloque de color.
// `notes`: anotaciones a mano de relleno (decorativas, casi ilegibles a propósito).
const FOLIOS: { src?: string; alt: string; notes: string[] }[] = [
  { alt: 'Folio 1', notes: ['briefing con cliente', 'moodboard v2 ok', 'presupuesto ✓', 'llamar a Marta'] },
  { alt: 'Folio 2', notes: ['pedir permisos calle', 'confirmar aforo', 'catering?', 'pendiente firma'] },
  { alt: 'Folio 3', notes: ['montaje viernes 7am', 'revisar sonido!!', 'guion invitados', 'ver luces / backstage'] },
];

// Clip metálico de un solo hilo continuo, dibujado en dos piezas para que AGARRE de verdad:
// - delantera: el alambre largo (que entra en la curva JUSTO en el canto exterior de la pestaña),
//   la curva inferior y el extremo libre; va por encima de los folios y de la pestaña.
// - trasera: la curva exterior y el alambre interior, que quedan detrás de la carpeta y solo se
//   ven pasado el canto.
// Las dos mitades comparten el punto (25,16): ahí se unen sin costura.
// Topología de un clip real (tres curvas): arco superior -> U interior pequeña -> U exterior grande.
// Medidas calcadas de un clip real (alambre grueso, arco superior 17 de ancho, U exterior 21, U interior 13).
// Un único alambre continuo: arco superior -> U exterior grande (un lado) y U interior pequeña (el otro).
// - delantero: el arco y la U exterior, de una sola pieza (sin costura en el canto); se recorta el tramo
//   del arco que se mete detrás de la carpeta (CLIP_HIDE) para que el alambre se hunda en el canto.
// - trasero: la U interior, que arranca justo debajo del arco y queda detrás de la carpeta.
// - completo (móvil): todo el alambre por encima, sin cortes.
const CLIP_OUTER = 'M25 13.5 C25 1 8 1 8 13.5 V66.5 C8 82 29 82 29 66.5 V24';
const CLIP_INNER = 'M25 13.5 V60.5 C25 73 12 73 12 60.5 V24';
const CLIP_HIDE = 'M-50 -50H100V150H-50Z M22 13.5H27.2V40H22Z';

const Paperclip: React.FC<{ part: 'back' | 'front' | 'full' }> = ({ part }) => {
  const d = part === 'back' ? CLIP_INNER : part === 'front' ? CLIP_OUTER : `${CLIP_OUTER} ${CLIP_INNER}`;
  const id = `clip-${part}`;
  return (
    <svg className={`folder__clip folder__clip--${part}`} viewBox="0 0 34 92" aria-hidden="true" overflow="visible">
      <defs>
        {/* Reflejos a lo largo del alambre: bandas claras y oscuras como en el acero pulido */}
        <linearGradient id={`${id}-metal`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="92">
          <stop offset="0" stopColor="#8e9094" />
          <stop offset=".16" stopColor="#f3f4f5" />
          <stop offset=".31" stopColor="#a7a9ad" />
          <stop offset=".47" stopColor="#e9eaec" />
          <stop offset=".64" stopColor="#868a8f" />
          <stop offset=".82" stopColor="#dfe0e3" />
          <stop offset="1" stopColor="#8e9094" />
        </linearGradient>
        <clipPath id={`${id}-cut`} clipPathUnits="userSpaceOnUse">
          <path d={CLIP_HIDE} clipRule="evenodd" />
        </clipPath>
        {/* Las sombras del arco se difuminan al hundirse en el canto (sin corte seco) */}
        <linearGradient id={`${id}-fade`} gradientUnits="userSpaceOnUse" x1="0" y1="11" x2="0" y2="17">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={`${id}-shade`} maskUnits="userSpaceOnUse" x="-50" y="-50" width="150" height="200">
          <rect x="-50" y="-50" width="150" height="200" fill="#fff" />
          <rect x="19" y="11" width="14" height="6" fill={`url(#${id}-fade)`} />
          <rect x="19" y="17" width="14" height="3" fill="#000" />
        </mask>
        {/* Oclusión del canto: el alambre que asoma por detrás de la carpeta se oscurece al salir y se aclara después */}
        <linearGradient id={`${id}-occ`} gradientUnits="userSpaceOnUse" x1="0" y1="13.5" x2="0" y2="4">
          <stop offset="0" stopColor="#14100a" stopOpacity=".92" />
          <stop offset=".4" stopColor="#14100a" stopOpacity=".5" />
          <stop offset="1" stopColor="#14100a" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-occclip`} clipPathUnits="userSpaceOnUse">
          <rect x="17" y="-10" width="15" height="23.5" />
        </clipPath>
        <filter id={`${id}-soft`} x="-60%" y="-30%" width="220%" height="160%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        <filter id={`${id}-contact`} x="-60%" y="-30%" width="220%" height="160%">
          <feGaussianBlur stdDeviation="0.35" />
        </filter>
      </defs>
      <g mask={part === 'front' ? `url(#${id}-shade)` : undefined}>
      {/* Sombra suave (la luz cae desde arriba a la izquierda) y sombra de contacto, más oscura y pegada */}
      <path d={d} transform="translate(1.6 2.6)" fill="none" stroke="#2c2418" strokeOpacity=".24" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}-soft)`} />
      <path d={d} transform="translate(0.55 0.9)" fill="none" stroke="#1c160c" strokeOpacity=".5" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}-contact)`} />
      </g>
      <g clipPath={part === 'front' ? `url(#${id}-cut)` : undefined}>
      {/* Alambre como tubo cilíndrico (acero cromado): borde oscuro, cuerpo claro, sombra interior hacia abajo-derecha y brillo especular hacia arriba-izquierda */}
      <path d={d} fill="none" stroke="#54565b" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#b9bbbf" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={`url(#${id}-metal)`} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} transform="translate(0.45 0.42)" fill="none" stroke="#5d6065" strokeOpacity=".7" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} transform="translate(-0.42 -0.4)" fill="none" stroke="#ffffff" strokeOpacity=".95" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} transform="translate(-0.5 -0.46)" fill="none" stroke="#ffffff" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" />
      {part === 'front' && (
        <g clipPath={`url(#${id}-occclip)`}>
          <path d={d} fill="none" stroke={`url(#${id}-occ)`} strokeWidth="3.2" strokeLinecap="butt" strokeLinejoin="round" />
        </g>
      )}
      </g>
    </svg>
  );
};

const ProjectFolder: React.FC<ProjectFolderProps> = ({ project }) => {
  const { details } = project;
  if (!details) return null;


  const info = [
    { label: 'Cliente', value: details.client },
    { label: 'Localización', value: details.location },
    { label: 'Fecha', value: details.date },
    { label: 'Servicios', value: details.services },
  ];

  return (
    <div className="folder-page">
      <div className="folder-wrap">
      {/* Clip, parte trasera: detrás de la carpeta (solo asoma por fuera del canto de la pestaña) */}
      <Paperclip part="back" />
      <aside className="folder">
        {/* La pestaña es la propia silueta de la carpeta (máscara); aquí solo va su etiqueta */}
        <span className="folder__tab-label" aria-hidden="true">Portfolio · Eventos</span>

        {/* Folios entre la carpeta trasera y la delantera, sujetos con clip */}
        <div className="folder__folios" aria-hidden="true">
          {FOLIOS.map((folio, i) => (
            <div key={i} className={`folder__folio folder__folio--${i + 1}`}>
              {(details.folioImages?.[i] ?? folio.src) ? (
                <img
                  src={details.folioImages?.[i] ?? folio.src}
                  alt=""
                  className="folder__folio-image"
                  style={{ objectPosition: details.folioImagePositions?.[i] }}
                />
              ) : (
                <div className="folder__folio-image folder__folio-image--placeholder" />
              )}
              <div className="folder__folio-notes">
                {folio.notes.map((line, n) => (
                  <span key={n}>{line}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carpeta delantera */}
        <div className="folder__front" aria-hidden="true" />

        {/* Recorte con la info del proyecto: sobre la delantera, sin clip */}
        <div className="folder__slip">
          <h1 className="folder__title">{project.title}</h1>
          <div
            className="folder__thumb"
            style={{ backgroundImage: `url("${encodeURI(project.image)}")` }}
            role="img"
            aria-label={project.title}
          />
          <dl className="folder__info">
            {info.map((item) => (
              <div key={item.label} className="folder__info-row">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Navegación entre proyectos: solo dos flechas */}
        <ProjectNav slug={project.slug} className="folder__nav" />
      </aside>
      {/* Clip, parte delantera: sobre folios y pestaña */}
      <Paperclip part="front" />
      <Paperclip part="full" />
      </div>

      <div className="folder__sheet">
        <div className="folder__body">
          <p>{LOREM}</p>
          <p>{LOREM_2}</p>
        </div>

        {details.mainImage ? (
          <img src={details.mainImage.src} alt={details.mainImage.alt} className="folder__main-image" />
        ) : (
          <div className="folder__media folder__media--main" aria-label="Imagen principal (placeholder)" />
        )}

        {details.video ? (
          <div className="folder__video">
            <AutoplayVideo
              className="folder__video-el folder__video-el--desktop"
              src={details.video.desktop.src}
              poster={details.video.desktop.poster}
            />
            <AutoplayVideo
              className="folder__video-el folder__video-el--mobile"
              src={details.video.mobile.src}
              poster={details.video.mobile.poster}
            />
          </div>
        ) : (
          <div className="folder__media folder__media--video" aria-label="Vídeo (placeholder)" />
        )}

        <ProjectGallery items={details.gallery ?? GALLERY_ITEMS} />

        {/* Cierre: foto del equipo con la firma, en todos los proyectos */}
        <SignOff photo={details.signoff} />
      </div>
    </div>
  );
};

export default ProjectFolder;
