import React, { useState } from 'react';
import Link from 'next/link';
import styles from './FeedbackForm.module.scss';

const nataliaVirginiaImage = '/assets/images/natalia-virginia.jpg';

export interface FeedbackFormData {
  nombre: string;
  empresa: string;
  cargo: string;
  experiencia_general: number | null;
  valorado_mas: string;
  momento_destacar: string;
  impacto_evento: string;
  recomendacion: string;
  autorizacion: 'nombre_completo' | 'anonimo' | '';
}

const RATING_OPTIONS = [
  { value: 1, label: '1', hint: 'Muy insatisfactoria' },
  { value: 2, label: '2', hint: '' },
  { value: 3, label: '3', hint: '' },
  { value: 4, label: '4', hint: '' },
  { value: 5, label: '5', hint: 'Excelente' },
] as const;

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
    experiencia_general: null,
    valorado_mas: '',
    momento_destacar: '',
    impacto_evento: '',
    recomendacion: '',
    autorizacion: '',
  });

  const totalSteps = 7; // 6 steps + success

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

  const canProceedStep1 = Boolean(
    formData.nombre.trim() &&
    formData.empresa.trim() &&
    formData.cargo.trim() &&
    formData.autorizacion
  );

  const canProceedStep2 = formData.experiencia_general !== null;

  const handleSubmit = async () => {
    if (isSubmitting || !formData.autorizacion) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/client-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          empresa: formData.empresa,
          cargo: formData.cargo,
          experiencia_general: formData.experiencia_general,
          valorado_mas: formData.valorado_mas,
          momento_destacar: formData.momento_destacar,
          impacto_evento: formData.impacto_evento,
          recomendacion: formData.recomendacion,
          experiencia: formData.recomendacion.trim() || null,
          autoriza_nombre_web: formData.autorizacion === 'nombre_completo',
          autoriza_experiencia_anonima: formData.autorizacion === 'anonimo',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al enviar el formulario');
      }

      setCurrentStep(7);
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
            <div className={styles.stepContentScrollable}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>CUÉNTANOS SOBRE TI</h2>
                <p className={styles.subtitleRevans}>Nombre, cargo y empresa</p>
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
                      placeholder="Cargo *"
                      value={formData.cargo}
                      onChange={(e) => updateFormData({ cargo: e.target.value })}
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
                </div>

                <div className={styles.authorizationSimple}>
                  <div className={styles.radioGroupVertical}>
                    <label className={styles.radioOptionAuth}>
                      <input
                        type="radio"
                        name="autorizacion"
                        value="nombre_completo"
                        checked={formData.autorizacion === 'nombre_completo'}
                        onChange={() => updateFormData({ autorizacion: 'nombre_completo' })}
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
                        onChange={() => updateFormData({ autorizacion: 'anonimo' })}
                      />
                      <span className={styles.radioLabelAuth}>
                        Prefiero que mi reseña aparezca de forma anónima junto al nombre de mi empresa
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>
                  EN UNA ESCALA DEL 1 AL 5, ¿CÓMO VALORARÍAS TU EXPERIENCIA GENERAL CON ETÉREA?
                </h2>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.ratingScale}>
                  {RATING_OPTIONS.map((option) => (
                    <label key={option.value} className={styles.ratingOption}>
                      <input
                        type="radio"
                        name="experiencia_general"
                        value={option.value}
                        checked={formData.experiencia_general === option.value}
                        onChange={() => updateFormData({ experiencia_general: option.value })}
                      />
                      <span className={styles.ratingValue}>{option.label}</span>
                      {option.hint ? (
                        <span className={styles.ratingHint}>{option.hint}</span>
                      ) : (
                        <span className={styles.ratingHintPlaceholder} aria-hidden="true" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>
                  ¿QUÉ FUE LO QUE MÁS VALORASTE DE TRABAJAR CON ETÉREA?
                </h2>
              </div>
              <div className={styles.stepBody}>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.valorado_mas}
                  onChange={(e) => updateFormData({ valorado_mas: e.target.value })}
                  className={styles.textareaLarge}
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
                <h2 className={styles.titleSmall}>
                  ¿HUBO ALGÚN MOMENTO, DETALLE O ASPECTO DEL SERVICIO QUE TE GUSTARÍA DESTACAR?
                </h2>
              </div>
              <div className={styles.stepBody}>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.momento_destacar}
                  onChange={(e) => updateFormData({ momento_destacar: e.target.value })}
                  className={styles.textareaLarge}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>
                  ¿HAY ALGÚN RESULTADO, SENSACIÓN O IMPACTO QUE DESTACARÍAS DESPUÉS DEL EVENTO?
                </h2>
              </div>
              <div className={styles.stepBody}>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.impacto_evento}
                  onChange={(e) => updateFormData({ impacto_evento: e.target.value })}
                  className={styles.textareaLarge}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className={styles.step}>
            <div className={styles.stepContent}>
              <div className={styles.titleGroup}>
                <h2 className={styles.titleSmall}>
                  SI RECOMENDARAS ETÉREA A OTRA PERSONA O EMPRESA, ¿QUÉ LE DIRÍAS?
                </h2>
              </div>
              <div className={styles.stepBody}>
                <textarea
                  placeholder="Cuéntanos..."
                  value={formData.recomendacion}
                  onChange={(e) => updateFormData({ recomendacion: e.target.value })}
                  className={styles.textareaLarge}
                />

                {submitError && (
                  <div className={styles.errorMessage}>
                    {submitError}
                  </div>
                )}

                <div className={styles.submitButtonContainer}>
                  <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className={`${styles.step} ${styles.thankYouStep}`}>
            <div className={styles.thankYouContainer}>
              <div className={styles.thankYouLeft}>
                <div className={styles.titleGroup}>
                  <h2 className={`${styles.title} ${styles.titleLeft}`}>GRACIAS POR CONFIAR EN NOSOTRAS.</h2>
                  <p className={styles.subtitleHedvig}>
                    Y por dedicar unos minutos a contarnos cómo lo viviste.
                    <br />
                    <br />
                    Tus palabras nos ayudan a seguir afinando lo que a veces no se ve, pero siempre se siente.
                  </p>
                </div>
                <p className={styles.thankYouSignature}>
                  Con cariño, el equipo de Etérea.
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

  const isLastInteractiveStep = currentStep === 6;

  const canGoNext = () => {
    if (currentStep === 1) return canProceedStep1;
    if (currentStep === 2) return canProceedStep2;
    return true;
  };

  return (
    <div className={styles.feedbackForm}>
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

        {currentStep < 7 && (
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

              {!isLastInteractiveStep ? (
                <button
                  className={styles.navButton}
                  onClick={handleNext}
                  disabled={!canGoNext()}
                  aria-label="Siguiente paso"
                >
                  →
                </button>
              ) : (
                <div className={styles.navPlaceholder} />
              )}
            </div>

            <div className={styles.progress}>
              <div className={styles.progressLine}>
                {Array.from({ length: 6 }, (_, i) => (
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
