import React from 'react';
import Link from 'next/link';
import { eventProjects } from '../../lib/eventProjects';
import './ProjectNav.scss';

interface ProjectNavProps {
  /** Slug del proyecto actual: se calcula el anterior y el siguiente (cíclico). */
  slug: string;
  className?: string;
}

/** Navegación mínima entre proyectos: solo dos flechas, anterior y siguiente. */
const ProjectNav: React.FC<ProjectNavProps> = ({ slug, className = '' }) => {
  const i = Math.max(0, eventProjects.findIndex((p) => p.slug === slug));
  const prev = eventProjects[(i - 1 + eventProjects.length) % eventProjects.length];
  const next = eventProjects[(i + 1) % eventProjects.length];

  return (
    <nav className={`project-nav ${className}`.trim()} aria-label="Navegación entre proyectos">
      <Link href={`/eventos/${prev.slug}`} className="project-nav__arrow" aria-label="Proyecto anterior" title="Proyecto anterior">
        <svg viewBox="0 0 48 24" aria-hidden="true">
          <path d="M47 12H2M12 2L2 12l10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <Link href={`/eventos/${next.slug}`} className="project-nav__arrow" aria-label="Siguiente proyecto" title="Siguiente proyecto">
        <svg viewBox="0 0 48 24" aria-hidden="true">
          <path d="M1 12h45M36 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  );
};

export default ProjectNav;
