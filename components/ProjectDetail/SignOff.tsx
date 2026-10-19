'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './SignOff.scss';

/**
 * Cierre de cada proyecto: foto del equipo con la firma (SVG vectorial) por encima.
 * - Parallax: la foto se desplaza despacio y la firma más rápido y en sentido contrario.
 * - La firma se "escribe" de izquierda a derecha al entrar en pantalla.
 * - Contraste: firma en blanco sobre la foto, con una placa de desenfoque difuminada, un velo
 *   oscuro en la base y sombra suave.
 * Con prefers-reduced-motion no hay parallax ni animación de escritura.
 */
interface SignOffProps {
  /** Foto del cierre; por defecto, la del equipo. */
  photo?: { src: string; alt: string };
}

const SignOff: React.FC<SignOffProps> = ({ photo }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const inkBoxRef = useRef<HTMLSpanElement>(null);
  // Se observa el contenedor (sin recortar): un elemento con clip-path al 100% puede no contar como visible
  const inkVisible = useInView(inkBoxRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const signY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section className="signoff" aria-label="Con cariño, el equipo Etérea">
      <div className="signoff__frame" ref={frameRef}>
        {/* El parallax va en este contenedor, no en la <img>: PageTransition anima todas las imágenes
            con CSS (fadeInScale) y esa animación pisaría cualquier transform en línea de la imagen. */}
        <motion.div className="signoff__photo-wrap" style={reduceMotion ? undefined : { y: photoY }}>
          <img
            className="signoff__photo"
            src={photo?.src ?? '/assets/images/cierre-equipo.jpg'}
            alt={photo?.alt ?? 'El equipo de Etérea en un salón del palacio'}
            width={1200}
            height={1800}
            loading="lazy"
          />
        </motion.div>
        <div className="signoff__veil" aria-hidden="true" />

        <motion.div className="signoff__sign" style={reduceMotion ? undefined : { y: signY }}>
          {/* Placa de desenfoque difuminada bajo la firma, para que se lea sobre la foto */}
          <span className="signoff__plate" aria-hidden="true" />
          <span className="signoff__ink-shadow" ref={inkBoxRef}>
            <motion.span
              className="signoff__ink"
              role="img"
              aria-label="Con cariño, el equipo Etérea"
              initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
              animate={reduceMotion || inkVisible ? { clipPath: 'inset(0 0% 0 0)' } : undefined}
              transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            />
            {/* Isotipo blanco: aparece cuando la firma termina de escribirse */}
            <motion.span
              className="signoff__iso"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion || inkVisible ? { opacity: 1 } : undefined}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 2.1 }}
            >
              <img src="/assets/logos/ETÉREA_Icono_blanco.svg" alt="" aria-hidden="true" width={52} height={53} />
            </motion.span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SignOff;
