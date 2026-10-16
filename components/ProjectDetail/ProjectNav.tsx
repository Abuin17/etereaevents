'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { eventProjects } from '../../lib/eventProjects';
import './ProjectNav.scss';

interface ProjectNavProps {
  /** Slug del proyecto actual: se calcula el anterior y el siguiente (cíclico). */
  slug: string;
  className?: string;
}

type Direction = 'next' | 'prev';

// Duración de la salida (debe coincidir con las animaciones de ProjectFolder.scss)
const EXIT_MS: Record<Direction, number> = { next: 780, prev: 420 };

/**
 * Navegación mínima entre proyectos: título "Más proyectos" y, debajo, flecha + texto anterior / siguiente.
 * Al pulsar, la hoja central "pasa como una página" antes de cambiar de proyecto:
 *  - siguiente: la hoja gira sobre su borde izquierdo y se va; entra la nueva.
 *  - anterior: la hoja se retira y la anterior vuelve girando a su sitio (lo hace ProjectTurnEnter).
 * Sin movimiento (prefers-reduced-motion) o sin hoja en pantalla, navega de forma normal.
 */
const ProjectNav: React.FC<ProjectNavProps> = ({ slug, className = '' }) => {
  const router = useRouter();
  const busy = useRef(false);
  const i = Math.max(0, eventProjects.findIndex((p) => p.slug === slug));
  const prev = eventProjects[(i - 1 + eventProjects.length) % eventProjects.length];
  const next = eventProjects[(i + 1) % eventProjects.length];

  const turn = (e: React.MouseEvent<HTMLAnchorElement>, href: string, dir: Direction) => {
    // Respeta abrir en pestaña nueva, etc.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sheet = document.querySelector<HTMLElement>('.folder__sheet');
    const page = sheet?.closest('.folder-page');
    if (!sheet || !page) return; // página sin hoja: navegación normal
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;

    // La perspectiva se centra en lo que se ve ahora en pantalla (la hoja es muy alta)
    const rect = sheet.getBoundingClientRect();
    sheet.style.setProperty('--turn-origin-y', `${window.innerHeight / 2 - rect.top}px`);
    page.classList.add(`is-turning-${dir}`);
    try {
      sessionStorage.setItem('projectTurn', dir);
    } catch {
      /* sin sessionStorage: la entrada será la normal */
    }
    window.setTimeout(() => {
      router.push(href);
      busy.current = false;
    }, EXIT_MS[dir]);
  };

  return (
    <nav className={`project-nav ${className}`.trim()} aria-label="Navegación entre proyectos">
      <p className="project-nav__title">Más proyectos</p>
      <div className="project-nav__links">
        <Link href={`/eventos/${prev.slug}`} className="project-nav__link" aria-label="Proyecto anterior" onClick={(e) => turn(e, `/eventos/${prev.slug}`, 'prev')}>
          <svg viewBox="0 0 48 24" aria-hidden="true">
            <path d="M47 12H2M12 2L2 12l10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Anterior</span>
        </Link>
        <Link href={`/eventos/${next.slug}`} className="project-nav__link" aria-label="Siguiente proyecto" onClick={(e) => turn(e, `/eventos/${next.slug}`, 'next')}>
          <span>Siguiente</span>
          <svg viewBox="0 0 48 24" aria-hidden="true">
            <path d="M1 12h45M36 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default ProjectNav;
