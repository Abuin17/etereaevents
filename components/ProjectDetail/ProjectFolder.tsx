import React from 'react';
import type { EventProject } from '../../lib/eventProjects';
import ProjectGallery from './ProjectGallery';
import AutoplayVideo from './AutoplayVideo';
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

const Paperclip: React.FC = () => (
  <svg className="folder__clip" viewBox="0 0 34 92" aria-hidden="true">
    <defs>
      <filter id="clip-blur" x="-50%" y="-20%" width="200%" height="140%">
        <feGaussianBlur stdDeviation="1.4" />
      </filter>
    </defs>
    <path d="M11 70 V16 C11 5 25 5 25 16 V74 C25 85 7 85 7 74 V26" transform="translate(1.6 2.6)" fill="none" stroke="#000" strokeOpacity=".28" strokeWidth="3.4" strokeLinecap="round" filter="url(#clip-blur)" />
    <path d="M11 70 V16 C11 5 25 5 25 16 V74 C25 85 7 85 7 74 V26" fill="none" stroke="#5a5652" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 70 V16 C11 5 25 5 25 16 V74 C25 85 7 85 7 74 V26" fill="none" stroke="#b4b0ab" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.4 68 V16 C10.4 6.4 24.4 6.4 24.4 16 V73" fill="none" stroke="#f6f4f1" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".95" />
  </svg>
);

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
      <aside className="folder">
        {/* La pestaña es la propia silueta de la carpeta (máscara); aquí solo va su etiqueta */}
        <span className="folder__tab-label" aria-hidden="true">Portfolio · Eventos</span>

        {/* Folios entre la carpeta trasera y la delantera, sujetos con clip */}
        <div className="folder__folios" aria-hidden="true">
          {FOLIOS.map((folio, i) => (
            <div key={i} className={`folder__folio folder__folio--${i + 1}`}>
              {folio.src ? (
                <img src={folio.src} alt="" className="folder__folio-image" />
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
          <Paperclip />
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
      </aside>
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

        <ProjectGallery items={GALLERY_ITEMS} />
      </div>
    </div>
  );
};

export default ProjectFolder;
