import React, { useState } from 'react';
import WeddingStep from './WeddingStep';
import WeddingProgress from './WeddingProgress';
import { submitToAirtable } from '../../utils/airtable';
import styles from './WeddingForm.module.scss';

export interface FormData {
  // Step 1: Contrayentes
  contrayente1: string;
  contrayente2: string;
  
  // Step 2: Info contrayente 1
  contrayente1_fechaNacimiento: {
    dia: string;
    mes: string;
    año: string;
  };
  contrayente1_ciudadNacimiento: string;
  contrayente1_ciudadResidencia: string;
  contrayente1_profesion: string;
  
  // Step 3: Info contrayente 2
  contrayente2_fechaNacimiento: {
    dia: string;
    mes: string;
    año: string;
  };
  contrayente2_ciudadNacimiento: string;
  contrayente2_ciudadResidencia: string;
  contrayente2_profesion: string;
  
  // Step 4: Texto libre (C1 sobre C2)
  contrayente1_sobre_contrayente2: string;
  
  // Step 5: Texto libre (C2 sobre C1)
  contrayente2_sobre_contrayente1: string;
  
  // Step 6: Historia
  historia: string;
  
  // Step 7: Momento del "sí"
  momento_si: string;
  
  // Step 8: Lugar con huella
  lugar_huella: string;
  
  // Step 9: Detalles del día (I)
  fecha: string;
  numero_invitados: string;
  tipo: 'Religiosa' | 'Civil';
  
  // Step 10: Detalles del día (II)
  localizacion: 'España' | 'Destination';
  duracion: 'Un día' | 'Fin de semana';
  
  // Step 11: Marco económico
  marco_economico: string;
  
  // Step 12: Contacto y consentimiento
  email: string;
  telefono: string;
  consentimiento_gdpr: boolean;
  consent: boolean; // Consentimiento RGPD obligatorio
  
  // Step 13: Agenda (no se guarda, solo se muestra el botón)
}

const WeddingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [formData, setFormData] = useState<FormData>({
    contrayente1: '',
    contrayente2: '',
    contrayente1_fechaNacimiento: { dia: '', mes: '', año: '' },
    contrayente1_ciudadNacimiento: '',
    contrayente1_ciudadResidencia: '',
    contrayente1_profesion: '',
    contrayente2_fechaNacimiento: { dia: '', mes: '', año: '' },
    contrayente2_ciudadNacimiento: '',
    contrayente2_ciudadResidencia: '',
    contrayente2_profesion: '',
    contrayente1_sobre_contrayente2: '',
    contrayente2_sobre_contrayente1: '',
    historia: '',
    momento_si: '',
    lugar_huella: '',
    fecha: '',
    numero_invitados: '',
    tipo: 'Religiosa',
    localizacion: 'España',
    duracion: 'Un día',
    marco_economico: '',
    email: '',
    telefono: '',
    consentimiento_gdpr: false,
    consent: false
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 13 && !isTransitioning) {
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

  const handleStepClick = (step: number) => {
    if (step >= 1 && step <= 12 && !isTransitioning) {
      setAnimationDirection(step > currentStep ? 'next' : 'prev');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentStep(step);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 400);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('🔍 DEBUG - FormData completo:', formData);
      console.log('🔍 DEBUG - contrayente1 específico:', formData.contrayente1);
      console.log('🔍 DEBUG - contrayente1 tipo:', typeof formData.contrayente1);
      console.log('🔍 DEBUG - contrayente1 longitud:', formData.contrayente1?.length);
      console.log('🔍 DEBUG - contrayente1 es string vacío?', formData.contrayente1 === '');
      console.log('🔍 DEBUG - contrayente1 es undefined?', formData.contrayente1 === undefined);
      console.log('Enviando datos a Airtable...', formData);
      
      const result = await submitToAirtable(formData);
      
      if (result.success) {
        console.log('✅ Datos enviados correctamente a Airtable');
        setCurrentStep(13); // Go to thank you step
      } else {
        console.error('❌ Error submitting form:', result.error);
        alert(`Error al enviar el formulario: ${result.error}`);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert(`Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WeddingStep
            title="EL COMPROMISO NACE DE LA UNION DE DOS PERSONAS"
          >
            <div className={styles.inputGroup}>
              <div className={styles.inputWithLabel}>
                <input
                  type="text"
                  placeholder="Contrayente 1"
                  value={formData.contrayente1}
                  onChange={(e) => updateFormData({ contrayente1: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              <div className={styles.inputWithLabel}>
                <input
                  type="text"
                  placeholder="Contrayente 2"
                  value={formData.contrayente2}
                  onChange={(e) => updateFormData({ contrayente2: e.target.value })}
                  className={styles.textInput}
                />
              </div>
            </div>
            <p className={styles.note}>Escribid vuestros nombres sin apellidos</p>
          </WeddingStep>
        );

      case 2:
        return (
          <WeddingStep
            title={`${formData.contrayente1.toUpperCase()}, QUEREMOS SABER DE TI`}
          >
            <div className={styles.inputGroup}>
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Fecha de nacimiento</label>
                <div className={styles.dateInputs}>
                  <div className={styles.dateInputGroup}>
                    <input
                      type="text"
                      placeholder="Día"
                      value={formData.contrayente1_fechaNacimiento.dia}
                      onChange={(e) => updateFormData({
                        contrayente1_fechaNacimiento: {
                          ...formData.contrayente1_fechaNacimiento,
                          dia: e.target.value
                        }
                      })}
                      className={styles.dateInput}
                    />
                  </div>
                  <div className={styles.dateInputGroup}>
                    <input
                      type="text"
                      placeholder="Mes"
                      value={formData.contrayente1_fechaNacimiento.mes}
                      onChange={(e) => updateFormData({
                        contrayente1_fechaNacimiento: {
                          ...formData.contrayente1_fechaNacimiento,
                          mes: e.target.value
                        }
                      })}
                      className={styles.dateInput}
                    />
                  </div>
                  <div className={styles.dateInputGroup}>
                    <input
                      type="text"
                      placeholder="Año"
                      value={formData.contrayente1_fechaNacimiento.año}
                      onChange={(e) => updateFormData({
                        contrayente1_fechaNacimiento: {
                          ...formData.contrayente1_fechaNacimiento,
                          año: e.target.value
                        }
                      })}
                      className={styles.dateInput}
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Ciudad de nacimiento</label>
                <input
                  type="text"
                  placeholder="¿Dónde naciste?"
                  value={formData.contrayente1_ciudadNacimiento}
                  onChange={(e) => updateFormData({ contrayente1_ciudadNacimiento: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Ciudad de residencia</label>
                <input
                  type="text"
                  placeholder="¿Dónde vives?"
                  value={formData.contrayente1_ciudadResidencia}
                  onChange={(e) => updateFormData({ contrayente1_ciudadResidencia: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Profesión</label>
                <input
                  type="text"
                  placeholder="¿A qué te dedicas?"
                  value={formData.contrayente1_profesion}
                  onChange={(e) => updateFormData({ contrayente1_profesion: e.target.value })}
                  className={styles.textInput}
                />
              </div>
            </div>
          </WeddingStep>
        );

      case 3:
        return (
          <WeddingStep
            title={`${formData.contrayente2.toUpperCase()}, QUEREMOS SABER DE TI`}
          >
            <div className={styles.inputGroup}>
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Fecha de nacimiento</label>
                <div className={styles.dateInputs}>
                  <div className={styles.dateInputGroup}>
                    <input
                      type="text"
                      placeholder="Día"
                      value={formData.contrayente2_fechaNacimiento.dia}
                      onChange={(e) => updateFormData({
                        contrayente2_fechaNacimiento: {
                          ...formData.contrayente2_fechaNacimiento,
                          dia: e.target.value
                        }
                      })}
                      className={styles.dateInput}
                    />
                  </div>
                  <div className={styles.dateInputGroup}>
                    <input
                      type="text"
                      placeholder="Mes"
                      value={formData.contrayente2_fechaNacimiento.mes}
                      onChange={(e) => updateFormData({
                        contrayente2_fechaNacimiento: {
                          ...formData.contrayente2_fechaNacimiento,
                          mes: e.target.value
                        }
                      })}
                      className={styles.dateInput}
                    />
                  </div>
                  <div className={styles.dateInputGroup}>
                    <input
                      type="text"
                      placeholder="Año"
                      value={formData.contrayente2_fechaNacimiento.año}
                      onChange={(e) => updateFormData({
                        contrayente2_fechaNacimiento: {
                          ...formData.contrayente2_fechaNacimiento,
                          año: e.target.value
                        }
                      })}
                      className={styles.dateInput}
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Ciudad de nacimiento</label>
                <input
                  type="text"
                  placeholder="¿Dónde naciste?"
                  value={formData.contrayente2_ciudadNacimiento}
                  onChange={(e) => updateFormData({ contrayente2_ciudadNacimiento: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Ciudad de residencia</label>
                <input
                  type="text"
                  placeholder="¿Dónde vives?"
                  value={formData.contrayente2_ciudadResidencia}
                  onChange={(e) => updateFormData({ contrayente2_ciudadResidencia: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Profesión</label>
                <input
                  type="text"
                  placeholder="¿A qué te dedicas?"
                  value={formData.contrayente2_profesion}
                  onChange={(e) => updateFormData({ contrayente2_profesion: e.target.value })}
                  className={styles.textInput}
                />
              </div>
            </div>
          </WeddingStep>
        );

      case 4:
        return (
          <WeddingStep
            title={`${formData.contrayente1.toUpperCase()}, CUÉNTANOS CÓMO ES ${formData.contrayente2.toUpperCase()} A TRAVÉS DE TU MIRADA.`}
            subtitle="¿Cómo es, qué te gusta de él/ella?"
            subtitleRevans={true}
          >
            <textarea
              placeholder={`${formData.contrayente1} es...`}
              value={formData.contrayente1_sobre_contrayente2}
              onChange={(e) => updateFormData({ contrayente1_sobre_contrayente2: e.target.value })}
              className={styles.textarea}
            />
          </WeddingStep>
        );

      case 5:
        return (
          <WeddingStep
            title={`${formData.contrayente2.toUpperCase()}, CUÉNTANOS CÓMO ES ${formData.contrayente1.toUpperCase()} A TRAVÉS DE TU MIRADA.`}
            subtitle="¿Cómo es, qué te gusta de él/ella?"
            subtitleRevans={true}
          >
            <textarea
              placeholder={`${formData.contrayente2} es...`}
              value={formData.contrayente2_sobre_contrayente1}
              onChange={(e) => updateFormData({ contrayente2_sobre_contrayente1: e.target.value })}
              className={styles.textarea}
            />
          </WeddingStep>
        );

      case 6:
        return (
          <WeddingStep
            title="¿CÓMO NACIÓ VUESTRA HISTORIA?"
            subtitle="En Etérea convertimos vuestra historia en un evento memorable. Por eso, todos estos detalles nos ayudan mucho a conoceros."
            subtitleRevans={true}
          >
            <textarea
              placeholder="Nuestra historia..."
              value={formData.historia}
              onChange={(e) => updateFormData({ historia: e.target.value })}
              className={styles.textarea}
            />
          </WeddingStep>
        );

      case 7:
        return (
          <WeddingStep
            title="¿QUÉ RECORDÁIS DEL MOMENTO DEL 'SÍ'?"
            subtitle="En ese instante empezó el proceso que os ha traído hasta aquí."
            subtitleRevans={true}
          >
            <textarea
              placeholder="El momento del 'sí'..."
              value={formData.momento_si}
              onChange={(e) => updateFormData({ momento_si: e.target.value })}
              className={styles.textarea}
            />
          </WeddingStep>
        );

      case 8:
        return (
          <WeddingStep
            title="¿QUÉ LUGAR HA DEJADO HUELLA EN VUESTRA HISTORIA?"
          >
            <input
              type="text"
              placeholder="País, ciudad, cultura..."
              value={formData.lugar_huella}
              onChange={(e) => updateFormData({ lugar_huella: e.target.value })}
              className={styles.textInput}
            />
          </WeddingStep>
        );

      case 9:
        return (
          <WeddingStep
            title="DETALLES DE VUESTRO DÍA"
            subtitle="Queremos saber más"
            subtitleRevans={true}
          >
            <div className={styles.inputGroup}>
              <div className={styles.inputWithLabel}>
                <input
                  type="text"
                  placeholder="Cuándo os gustaría casaros"
                  value={formData.fecha}
                  onChange={(e) => updateFormData({ fecha: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.inputWithLabel}>
                <input
                  type="text"
                  placeholder="Invitados aproximados"
                  value={formData.numero_invitados}
                  onChange={(e) => updateFormData({ numero_invitados: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.inputWithLabelRadio}>
                <label className={styles.label}>Tipo de ceremonia</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="tipo"
                    value="Religiosa"
                    checked={formData.tipo === 'Religiosa'}
                    onChange={(e) => updateFormData({ tipo: e.target.value as 'Religiosa' | 'Civil' })}
                  />
                  <span className={styles.radioLabel}>RELIGIOSA</span>
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="tipo"
                    value="Civil"
                    checked={formData.tipo === 'Civil'}
                    onChange={(e) => updateFormData({ tipo: e.target.value as 'Religiosa' | 'Civil' })}
                  />
                  <span className={styles.radioLabel}>CIVIL</span>
                </label>
              </div>
              </div>
            </div>
          </WeddingStep>
        );

      case 10:
        return (
          <WeddingStep
            title="DETALLES DE VUESTRO DÍA"
            subtitle="Queremos saber más"
            subtitleRevans={true}
          >
            <div className={styles.inputGroup}>
              <div className={styles.inputWithLabelRadio}>
                <label className={styles.label}>Localización</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="localizacion"
                      value="España"
                      checked={formData.localizacion === 'España'}
                      onChange={(e) => updateFormData({ localizacion: e.target.value as 'España' | 'Destination' })}
                    />
                    <span className={styles.radioLabel}>ESPAÑA</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="localizacion"
                      value="Destination"
                      checked={formData.localizacion === 'Destination'}
                      onChange={(e) => updateFormData({ localizacion: e.target.value as 'España' | 'Destination' })}
                    />
                    <span className={styles.radioLabel}>Wedding Destination</span>
                  </label>
                </div>
              </div>
              
              <div className={styles.inputWithLabelRadio}>
                <label className={styles.label}>Duración</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="duracion"
                      value="Un día"
                      checked={formData.duracion === 'Un día'}
                      onChange={(e) => updateFormData({ duracion: e.target.value as 'Un día' | 'Fin de semana' })}
                    />
                    <span className={styles.radioLabel}>UN DÍA</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="duracion"
                      value="Fin de semana"
                      checked={formData.duracion === 'Fin de semana'}
                      onChange={(e) => updateFormData({ duracion: e.target.value as 'Un día' | 'Fin de semana' })}
                    />
                    <span className={styles.radioLabel}>FIN DE SEMANA</span>
                  </label>
                </div>
              </div>
            </div>
          </WeddingStep>
        );

      case 11:
        return (
          <WeddingStep
            title="PRESUPUESTO ESTIMADO"
            subtitle="Definir el presupuesto nos permitirá soñar con los pies en la tierra."
            subtitleRevans={true}
          >
            <div className={styles.economicInputContainer}>
              <input
                type="text"
                placeholder="0"
                value={formData.marco_economico}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  updateFormData({ marco_economico: value });
                }}
                className={styles.economicInput}
              />
              <span className={styles.euroSymbol}>€</span>
            </div>
          </WeddingStep>
        );

      case 12:
        return (
          <WeddingStep
            title="PARA TERMINAR, DÉJANOS UN EMAIL Y TELÉFONO."
          >
            <div className={styles.inputGroup}>
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.inputWithLabel}>
                <label className={styles.label}>Teléfono</label>
                <input
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={formData.telefono}
                  onChange={(e) => updateFormData({ telefono: e.target.value })}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.consentBlock}>
                <label className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateFormData({ consent: e.target.checked })}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxLabel}>
                    He leído y acepto la <a href="/privacidad" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>Política de Privacidad</a> y autorizo el tratamiento de mis datos personales para que Etérea Events pueda contactar conmigo y gestionar mi solicitud de evento.
                  </span>
                </label>
              </div>
              
              <div className={styles.submitButtonContainer}>
                <button 
                  className={styles.submitButton} 
                  onClick={handleSubmit}
                  disabled={!formData.email || !formData.telefono || !formData.consent}
                >
                  ENVIAR
                </button>
              </div>
            </div>
          </WeddingStep>
        );

      case 13:
        return (
          <WeddingStep
            title="MUCHAS GRACIAS."
            subtitle="Hemos recibido tu solicitud y tu consentimiento para el tratamiento de datos."
            subtitleRevans={true}
            customSubmitButton={
              <div className={styles.thankYouButtons}>
                <button 
                  className={styles.submitButton}
                  onClick={() => {
                    // TODO: Integrar con Calendly o Google Calendar
                    console.log('Agendar cita clicked - integrar con Calendly');
                  }}
                >
                  AGENDAR CITA
                </button>
                <button 
                  className={styles.secondaryButton}
                  onClick={() => {
                    // Volver a la home
                    window.location.href = '/';
                  }}
                >
                  VOLVER
                </button>
              </div>
            }
          >
            <div className={styles.thankYouContent}>
              <p className={styles.thankYouSubtitle}>
                Las mejores experiencias comienzan con una conversación.<br />
                Agenda una cita con nosotras cuando quieras.
              </p>
            </div>
          </WeddingStep>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.weddingForm}>
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
        
        {/* Contenedor unificado para navegación y stepper */}
        <div className={styles.navigationContainer}>
          {/* Navegación */}
          <div className={styles.navigation}>
            {currentStep > 1 && currentStep < 13 ? (
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
            
            {currentStep < 12 ? (
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
          
          {/* Stepper */}
          {currentStep < 13 && (
            <WeddingProgress 
              currentStep={currentStep - 1} 
              totalSteps={11} 
              onStepClick={handleStepClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingForm;
