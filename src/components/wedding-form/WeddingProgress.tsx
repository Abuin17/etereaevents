import React from 'react';
import styles from './WeddingForm.module.scss';

interface WeddingProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const WeddingProgress: React.FC<WeddingProgressProps> = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className={styles.progress}>
      <div className={styles.progressLine}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`${styles.progressDot} ${
              index === currentStep ? styles.progressDotActive : ''
            } ${index < currentStep ? styles.progressDotCompleted : ''}`}
            onClick={() => onStepClick(index + 1)}
            role="button"
            tabIndex={0}
            aria-label={`Ir al paso ${index + 1}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onStepClick(index + 1);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WeddingProgress;
