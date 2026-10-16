import React from 'react';
import type { EventProject } from '../../lib/eventProjects';
import ProjectGallery from './ProjectGallery';
import './ProjectDetail.scss';

interface ProjectDetailProps {
  project: EventProject;
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const LOREM_2 =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// Mínimo 8 fotos. Placeholders: sustituir por { src, alt } reales.
const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => ({ alt: `Foto ${i + 1}` }));

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const { details } = project;
  if (!details) return null;

  const info = [
    { label: 'Cliente', value: details.client },
    { label: 'Localización', value: details.location },
    { label: 'Año', value: details.year },
    { label: 'Servicios', value: details.services },
  ];

  return (
    <div className="project-detail">
      <aside className="project-detail__sidebar">
        <h1 className="project-detail__title">{project.title}</h1>
        <div
          className="project-detail__thumb"
          style={{ backgroundImage: `url("${encodeURI(project.image)}")` }}
          role="img"
          aria-label={project.title}
        />
        <dl className="project-detail__info">
          {info.map((item) => (
            <div key={item.label} className="project-detail__info-row">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <div className="project-detail__content">
        <div className="project-detail__body">
          <p>{LOREM}</p>
          <p>{LOREM_2}</p>
        </div>

        {details.mainImage ? (
          <img src={details.mainImage.src} alt={details.mainImage.alt} className="project-detail__main-image" />
        ) : (
          <div className="project-detail__media project-detail__media--main" aria-label="Imagen principal (placeholder)" />
        )}

        {/* Vídeo: pasar src al <video> cuando exista; mientras tanto, placeholder */}
        <div className="project-detail__media project-detail__media--video" aria-label="Vídeo (placeholder)" />

        <ProjectGallery items={GALLERY_ITEMS} />
      </div>
    </div>
  );
};

export default ProjectDetail;
