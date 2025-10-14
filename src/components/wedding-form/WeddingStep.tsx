import React from 'react';
import styles from './WeddingForm.module.scss';

interface WeddingStepProps {
  title: string;
  subtitle?: string;
  subtitleRevans?: boolean;
  children: React.ReactNode;
  customSubmitButton?: React.ReactNode;
}

const WeddingStep: React.FC<WeddingStepProps> = ({
  title,
  subtitle,
  subtitleRevans = false,
  children,
  customSubmitButton
}) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepContent}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && (
            <span className={subtitleRevans ? styles.subtitleRevans : styles.subtitle}>
              {subtitle}
            </span>
          )}
        </div>
        
        <div className={styles.stepBody}>
          {children}
        </div>
      </div>
      
      {customSubmitButton && (
        <div className={styles.customSubmitContainer}>
          {customSubmitButton}
        </div>
      )}
    </div>
  );
};

export default WeddingStep;
