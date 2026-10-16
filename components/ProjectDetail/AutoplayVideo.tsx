'use client';

import React, { useEffect, useRef } from 'react';

interface AutoplayVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * Vídeo en bucle y sin sonido que solo se reproduce mientras está en pantalla.
 * - No descarga nada hasta que entra en el viewport (un <video> oculto con display:none nunca intersecta).
 * - Con prefers-reduced-motion no se reproduce solo: queda el póster y los controles.
 */
const AutoplayVideo: React.FC<AutoplayVideoProps> = ({ src, poster, className }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // imprescindible para el autoplay (política de los navegadores)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay bloqueado: se queda el póster con controles */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      loop
      muted
      playsInline
      controls
      preload="none"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default AutoplayVideo;
