import React, { useState } from 'react';
import styles from './FeedbackForm.module.scss';

export interface FeedbackFormData {
  // Step 1: Datos personales
  nombre: string;
  empresa: string;
  cargo: string;
  
  // Step 2-3: Preguntas abiertas
  sorpresa_positiva: string;
  tranquilidad: string;
  
  // Step 4-6: Multiple choice
  cuidado_detalles: string;
  anticipacion: string;
  interpretacion_identidad: string;
  
  // Step 7-8: Preguntas abiertas
  buenas_manos: string;
  experiencia: string;
  
  // Autorizaciones
  autoriza_nombre_web: boolean;
  autoriza_experiencia_anonima: boolean;
}

const FeedbackForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    autoriza_nombre_web: false,
    autoriza_experiencia_anonima: false,
  });

  const totalSteps = 10; // Including thank you

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

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/client-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al enviar el formulario');
      }
      
      console.log('✅ Feedback enviado correctamente');
      setCurrentStep(10); // Go to thank you step
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert(`Error al enviar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) => updateFormData({ nombre: e.target.value })}
                      className={styles.textInput}
                    />
                  </div>
                  <div className={styles.inputWithLabel}>
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={formData.empresa}
                      onChange={(e) => updateFormData({ empresa: e.target.value })}
                      className={styles.textInput}
                    />
                  </div>
                  <div className={styles.inputWithLabel}>
                    <input
                      type="text"
                      placeholder="Cargo"
                      value={formData.cargo}
                      onChange={(e) => updateFormData({ cargo: e.target.value })}
                      className={styles.textInput}
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
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>¿QUÉ FUE LO QUE MÁS TE SORPRENDIÓ POSITIVAMENTE DE NUESTRO TRABAJO?</h2>
              </div>
              <div className={styles.stepBody}>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.sorpresa_positiva}
                  onChange={(e) => updateFormData({ sorpresa_positiva: e.target.value })}
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
                <h2 className={styles.title}>¿QUÉ PARTE DEL PROCESO TE DIO MÁS TRANQUILIDAD?</h2>
              </div>
              <div className={styles.stepBody}>
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

      case 4:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>¿CÓMO DESCRIBIRÍAS EL NIVEL DE CUIDADO EN LOS DETALLES?</h2>
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

      case 5:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>¿CÓMO CALIFICARÍAS NUESTRA CAPACIDAD PARA ANTICIPARNOS A PROBLEMAS O NECESIDADES?</h2>
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

      case 6:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>¿SENTISTE QUE INTERPRETAMOS BIEN VUESTRA IDENTIDAD Y OBJETIVOS?</h2>
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

      case 7:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>¿QUÉ TE HIZO SENTIR QUE ESTABAS EN BUENAS MANOS?</h2>
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

      case 8:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>¿CÓMO DESCRIBIRÍAS TU EXPERIENCIA TRABAJANDO CON ETÉREA?</h2>
              </div>
              <div className={styles.stepBody}>
                <p className={styles.experienceNote}>
                  Esta descripción podría convertirse en una reseña para nuestra web, 
                  de forma anónima o con tu autorización. Tenlo en cuenta al escribir.
                </p>
                <textarea
                  placeholder="Mi experiencia con Etérea..."
                  value={formData.experiencia}
                  onChange={(e) => updateFormData({ experiencia: e.target.value })}
                  className={styles.textareaLarge}
                />
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>AUTORIZACIONES</h2>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.authorizationBlock}>
                  <label className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={formData.autoriza_nombre_web}
                      onChange={(e) => updateFormData({ autoriza_nombre_web: e.target.checked })}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>
                      Autorizo a que mi nombre personal, nombre de empresa y cargo aparezcan 
                      en la web de Etérea como referencia, conforme a la{' '}
                      <a href="/privacidad" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
                        Política de Privacidad
                      </a>.
                    </span>
                  </label>
                  
                  <label className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={formData.autoriza_experiencia_anonima}
                      onChange={(e) => updateFormData({ autoriza_experiencia_anonima: e.target.checked })}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>
                      Autorizo la publicación de la descripción de mi experiencia de forma anónima 
                      en la web de Etérea.
                    </span>
                  </label>
                </div>
                
                <div className={styles.submitButtonContainer}>
                  <button 
                    className={styles.submitButton} 
                    onClick={handleSubmit}
                    disabled={!formData.nombre || isSubmitting}
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>MUCHAS GRACIAS.</h2>
                <p className={styles.subtitleRevans}>
                  Tu feedback es muy valioso para nosotras.
                </p>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.thankYouContent}>
                  <p className={styles.thankYouSubtitle}>
                    Gracias por confiar en Etérea y por tomarte el tiempo 
                    de compartir tu experiencia con nosotras.
                  </p>
                </div>
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
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.feedbackForm}>
      {/* Header */}
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>FORMULARIO POST-EVENTO · ETÉREA</h1>
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
        {currentStep < 10 && (
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
              
              {currentStep < 9 ? (
                <button 
                  className={styles.navButton}
                  onClick={handleNext}
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
                {Array.from({ length: 9 }, (_, i) => (
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

