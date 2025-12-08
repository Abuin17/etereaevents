import React, { useState } from 'react';
import Link from 'next/link';
import styles from './FeedbackForm.module.scss';

const nataliaVirginiaImage = '/assets/images/natalia-virginia.jpg';

export interface FeedbackFormData {
  // Step 1: Datos personales
  nombre: string;
  empresa: string;
  cargo: string;
  
  // Step 2: Preguntas abiertas
  sorpresa_positiva: string;
  tranquilidad: string;
  
  // Step 3-5: Multiple choice (separadas)
  cuidado_detalles: string;
  anticipacion: string;
  interpretacion_identidad: string;
  
  // Step 6: Pregunta abierta
  buenas_manos: string;
  
  // Step 7: Experiencia + autorización
  experiencia: string;
  autorizacion: 'nombre_completo' | 'anonimo' | '';
}

const FeedbackForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FeedbackFormData>({
    nombre: '',
    empresa: '',
    cargo: '',
    sorpresa_positiva: '',
    tranquilidad: '',
    cuidado_detalles: '',
    anticipacion: '',
    interpretacion_identidad: '',
    buenas_manos: '',
    experiencia: '',
    autorizacion: '',
  });

  const totalSteps = 8; // 7 steps + success

  const updateFormData = (updates: Partial<FeedbackFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps && !isTransitioning) {
      setAnimationDirection('next');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 400);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1 && !isTransitioning) {
      setAnimationDirection('prev');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 400);
    }
  };

  // Validación reactiva para el paso 1
  const canProceedStep1 = Boolean(
    formData.nombre.trim() && 
    formData.empresa.trim() && 
    formData.cargo.trim()
  );
  
  // Validación para el último paso
  const canSubmit = Boolean(
    formData.experiencia.trim() && 
    formData.autorizacion
  );

  const handleSubmit = async () => {
    if (isSubmitting || !canSubmit) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/client-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          autoriza_nombre_web: formData.autorizacion === 'nombre_completo',
          autoriza_experiencia_anonima: formData.autorizacion === 'anonimo',
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al enviar el formulario');
      }
      
      console.log('✅ Feedback enviado correctamente');
      setCurrentStep(8); // Go to success step
      
    } catch (error) {
      console.error('❌ Error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>CUÉNTANOS SOBRE TI</h2>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputWithLabel}>
                    <input
                      type="text"
                      placeholder="Tu nombre *"
                      value={formData.nombre}
                      onChange={(e) => updateFormData({ nombre: e.target.value })}
                      className={styles.textInput}
                      required
                    />
                  </div>
                  <div className={styles.inputWithLabel}>
                    <input
                      type="text"
                      placeholder="Empresa *"
                      value={formData.empresa}
                      onChange={(e) => updateFormData({ empresa: e.target.value })}
                      className={styles.textInput}
                      required
                    />
                  </div>
                  <div className={styles.inputWithLabel}>
                    <input
                      type="text"
                      placeholder="Cargo *"
                      value={formData.cargo}
                      onChange={(e) => updateFormData({ cargo: e.target.value })}
                      className={styles.textInput}
                      required
                    />
                  </div>
                </div>
                <p className={styles.disclaimer}>
                  Al final del formulario, podrás autorizar o no que esta información 
                  se refleje en nuestra web de forma anónima o con tu nombre.
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.step}>
            <div className={styles.stepContentScrollable}>
              <div className={styles.questionBlock}>
                <h2 className={styles.titleSmall}>¿QUÉ FUE LO QUE MÁS TE SORPRENDIÓ POSITIVAMENTE DE NUESTRO TRABAJO?</h2>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.sorpresa_positiva}
                  onChange={(e) => updateFormData({ sorpresa_positiva: e.target.value })}
                  className={styles.textarea}
                />
              </div>
              
              <div className={styles.questionBlock}>
                <h2 className={styles.titleSmall}>¿QUÉ PARTE DEL PROCESO TE DIO MÁS TRANQUILIDAD?</h2>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.tranquilidad}
                  onChange={(e) => updateFormData({ tranquilidad: e.target.value })}
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>¿CÓMO DESCRIBIRÍAS EL NIVEL DE CUIDADO EN LOS DETALLES?</h2>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.radioGroupVertical}>
                  {['Excepcional', 'Muy alto', 'Adecuado', 'Mejorable'].map((option) => (
                    <label key={option} className={styles.radioOption}>
                      <input
                        type="radio"
                        name="cuidado_detalles"
                        value={option}
                        checked={formData.cuidado_detalles === option}
                        onChange={(e) => updateFormData({ cuidado_detalles: e.target.value })}
                      />
                      <span className={styles.radioLabel}>{option.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>¿CÓMO CALIFICARÍAS NUESTRA CAPACIDAD PARA ANTICIPARNOS A PROBLEMAS O NECESIDADES?</h2>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.radioGroupVertical}>
                  {['Excelente', 'Muy buena', 'Correcta', 'Insuficiente'].map((option) => (
                    <label key={option} className={styles.radioOption}>
                      <input
                        type="radio"
                        name="anticipacion"
                        value={option}
                        checked={formData.anticipacion === option}
                        onChange={(e) => updateFormData({ anticipacion: e.target.value })}
                      />
                      <span className={styles.radioLabel}>{option.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>¿SENTISTE QUE INTERPRETAMOS BIEN VUESTRA IDENTIDAD Y OBJETIVOS?</h2>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.radioGroupVertical}>
                  {['Sí, completamente', 'En gran medida', 'Parcialmente', 'No'].map((option) => (
                    <label key={option} className={styles.radioOption}>
                      <input
                        type="radio"
                        name="interpretacion_identidad"
                        value={option}
                        checked={formData.interpretacion_identidad === option}
                        onChange={(e) => updateFormData({ interpretacion_identidad: e.target.value })}
                      />
                      <span className={styles.radioLabel}>{option.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>¿QUÉ TE HIZO SENTIR QUE ESTABAS EN BUENAS MANOS?</h2>
              </div>
              <div className={styles.stepBody}>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.buenas_manos}
                  onChange={(e) => updateFormData({ buenas_manos: e.target.value })}
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className={styles.step}>
            <div className={styles.stepContentScrollable}>
              <div className={styles.questionBlock}>
                <h2 className={styles.titleSmall}>¿CÓMO DESCRIBIRÍAS TU EXPERIENCIA CON ETÉREA? *</h2>
                <textarea
                  placeholder="Mi experiencia con Etérea..."
                  value={formData.experiencia}
                  onChange={(e) => updateFormData({ experiencia: e.target.value })}
                  className={styles.textareaLarge}
                  required
                />
              </div>

              <div className={styles.authorizationSimple}>
                <div className={styles.radioGroupVertical}>
                  <label className={styles.radioOptionAuth}>
                    <input
                      type="radio"
                      name="autorizacion"
                      value="nombre_completo"
                      checked={formData.autorizacion === 'nombre_completo'}
                      onChange={(e) => updateFormData({ autorizacion: e.target.value as 'nombre_completo' })}
                    />
                    <span className={styles.radioLabelAuth}>
                      Autorizo a que mi nombre, empresa y cargo aparezcan junto a mi reseña
                    </span>
                  </label>
                  
                  <label className={styles.radioOptionAuth}>
                    <input
                      type="radio"
                      name="autorizacion"
                      value="anonimo"
                      checked={formData.autorizacion === 'anonimo'}
                      onChange={(e) => updateFormData({ autorizacion: e.target.value as 'anonimo' })}
                    />
                    <span className={styles.radioLabelAuth}>
                      Prefiero que mi reseña aparezca de forma anónima
                    </span>
                  </label>
                </div>
              </div>

              {submitError && (
                <div className={styles.errorMessage}>
                  {submitError}
                </div>
              )}
              
              <div className={styles.submitButtonContainer}>
                <button 
                  className={styles.submitButton} 
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
                </button>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className={`${styles.step} ${styles.thankYouStep}`}>
            <div className={styles.thankYouContainer}>
              <div className={styles.thankYouLeft}>
                <div className={styles.titleGroup}>
                  <h2 className={styles.title}>MUCHAS GRACIAS.</h2>
                  <p className={styles.subtitleRevans}>
                    Tu feedback es muy valioso para nosotras.
                  </p>
                </div>
                <p className={styles.thankYouSubtitle}>
                  Gracias por confiar en Etérea y por tomarte el tiempo 
                  de compartir tu experiencia con nosotras.
                </p>
                <div className={styles.thankYouButtons}>
                  <button 
                    className={styles.secondaryButton}
                    onClick={() => {
                      window.location.href = '/';
                    }}
                  >
                    VOLVER A ETÉREA
                  </button>
                </div>
              </div>
              <div className={styles.thankYouRight}>
                <img 
                  src={nataliaVirginiaImage} 
                  alt="Natalia y Virginia - Equipo Etérea" 
                  className={styles.thankYouImage}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.feedbackForm}>
      {/* Header with logo */}
      <div className={styles.formHeader}>
        <Link href="/" className={styles.logoLink}>
          <img
            src="/assets/logos/ETÉREA_Icono_antracita.svg"
            alt="Etérea Events"
            className={styles.logo}
          />
        </Link>
        <h1 className={styles.formTitle}>FORMULARIO POST-EVENTO</h1>
        <div className={styles.headerSpacer} />
      </div>
      
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <div 
            className={`${styles.stepContainer} ${
              isTransitioning 
                ? animationDirection === 'next' 
                  ? styles.stepTransitionOutNext 
                  : styles.stepTransitionOutPrev
                : styles.stepTransitionIn
            }`}
          >
            {renderStep()}
          </div>
        </div>
        
        {/* Navigation */}
        {currentStep < 8 && (
          <div className={styles.navigationContainer}>
            <div className={styles.navigation}>
              {currentStep > 1 ? (
                <button 
                  className={styles.navButton}
                  onClick={handlePrev}
                  aria-label="Paso anterior"
                >
                  ←
                </button>
              ) : (
                <div className={styles.navPlaceholder} />
              )}
              
              {currentStep < 7 ? (
                <button 
                  className={styles.navButton}
                  onClick={handleNext}
                  disabled={currentStep === 1 && !canProceedStep1}
                  aria-label="Siguiente paso"
                >
                  →
                </button>
              ) : (
                <div className={styles.navPlaceholder} />
              )}
            </div>
            
            {/* Progress indicator */}
            <div className={styles.progress}>
              <div className={styles.progressLine}>
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className={`${styles.progressDot} ${
                      i + 1 === currentStep ? styles.progressDotActive : ''
                    } ${i + 1 < currentStep ? styles.progressDotCompleted : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
