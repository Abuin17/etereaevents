'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface GalleryItem {
  /** Ruta de la foto real. Sin src se muestra un placeholder. */
  src?: string;
  alt: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const isOpen = openIndex !== null;
  const total = items.length;

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);

  const go = useCallback(
    (delta: number) => {
      setOpenIndex((i) => (i === null ? i : (i + delta + total) % total));
    },
    [total]
  );

  useEffect(() => {
    if (!isOpen) return;
    const lenis = (window as any).lenis;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [isOpen, close, go]);

  const renderMedia = (item: GalleryItem, className: string) =>
    item.src ? (
      <img src={item.src} alt={item.alt} className={className} />
    ) : (
      <div className={`${className} ${className}--placeholder`} role="img" aria-label={`${item.alt} (placeholder)`} />
    );

  return (
    <>
      <ul className="project-gallery__grid">
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              className="project-gallery__thumb"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpenIndex(i);
              }}
              aria-label={`Abrir ${item.alt}`}
            >
              {renderMedia(item, 'project-gallery__thumb-media')}
            </button>
          </li>
        ))}
      </ul>

      {isOpen &&
        createPortal(
        <div
          className="project-gallery__overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Galería del proyecto"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="project-gallery__bar" onClick={(e) => e.stopPropagation()}>
            <span className="project-gallery__counter">
              {openIndex! + 1} / {total}
            </span>
            <button ref={closeRef} type="button" className="project-gallery__btn" onClick={close}>
              Cerrar
            </button>
          </div>

          <div className="project-gallery__main" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="project-gallery__arrow" onClick={() => go(-1)} aria-label="Foto anterior">
              <svg viewBox="0 0 48 24" aria-hidden="true">
                <path d="M47 12H2M12 2L2 12l10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="project-gallery__stage">{renderMedia(items[openIndex!], 'project-gallery__image')}</div>
            <button type="button" className="project-gallery__arrow" onClick={() => go(1)} aria-label="Foto siguiente">
              <svg viewBox="0 0 48 24" aria-hidden="true">
                <path d="M1 12h45M36 2l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProjectGallery;
