'use client';

import { useLayoutEffect } from 'react';

/**
 * Entrada de la página de proyecto tras pasar de hoja. Lee la dirección que dejó ProjectNav
 * y marca .folder-page con is-entering-next / is-entering-prev ANTES de pintar (sin parpadeos).
 * No renderiza nada. Si se llega de otra forma (enlace, portfolio...), no hace nada.
 */
const ProjectTurnEnter: React.FC = () => {
  useLayoutEffect(() => {
    let dir: string | null = null;
    try {
      dir = sessionStorage.getItem('projectTurn');
      sessionStorage.removeItem('projectTurn');
    } catch {
      return;
    }
    if (dir !== 'next' && dir !== 'prev') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const page = document.querySelector<HTMLElement>('.folder-page');
    const sheet = page?.querySelector<HTMLElement>('.folder__sheet');
    if (!page || !sheet) return;

    const rect = sheet.getBoundingClientRect();
    sheet.style.setProperty('--turn-origin-y', `${window.innerHeight / 2 - rect.top}px`);
    page.classList.add(`is-entering-${dir}`);
    // Se limpia siempre (sin cleanup: en desarrollo, React ejecuta el efecto dos veces y cancelaría el temporizador)
    window.setTimeout(() => {
      page.classList.remove(`is-entering-${dir}`);
      sheet.style.removeProperty('--turn-origin-y');
    }, 1300);
  }, []);

  return null;
};

export default ProjectTurnEnter;
