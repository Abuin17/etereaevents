'use client';

import Link from 'next/link';
import styles from './error.module.scss';

export default function FeedbackErrorPage() {
  return (
    <div className={styles.errorPage}>
      {/* Header with logo */}
      <div className={styles.header}>
        <Link href="/" className={styles.logoLink}>
          <img
            src="/assets/logos/ETÉREA_Icono_antracita.svg"
            alt="Etérea Events"
            className={styles.logo}
          />
        </Link>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>HA OCURRIDO UN ERROR</h1>
        <p className={styles.subtitle}>
          Lo sentimos, algo no ha funcionado correctamente.
        </p>
        <p className={styles.description}>
          Por favor, inténtalo de nuevo más tarde o contacta con nosotras 
          si el problema persiste.
        </p>
        
        <div className={styles.buttons}>
          <button 
            className={styles.primaryButton}
            onClick={() => window.history.back()}
          >
            VOLVER A INTENTAR
          </button>
          <Link href="/" className={styles.secondaryButton}>
            IR A ETÉREA
          </Link>
        </div>
      </div>
    </div>
  );
}

