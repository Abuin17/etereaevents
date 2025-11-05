import React, { useRef, useEffect } from 'react';
import styles from './Slider.module.scss';

interface SliderProps {
  slides: {
    image: string;
    title: string;
    description: string;
  }[];
  slideHeight?: number;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({ 
  slides, 
  slideHeight = 700,
  className = ''
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    sliderEl.style.removeProperty('display');
    sliderEl.style.removeProperty('flex-direction');
    sliderEl.style.removeProperty('overflow-x');
    sliderEl.style.removeProperty('scroll-snap-type');
    sliderEl.style.removeProperty('width');
    sliderEl.style.removeProperty('height');
    sliderEl.style.removeProperty('gap');
    sliderEl.style.removeProperty('box-sizing');
    sliderEl.style.removeProperty('padding');
    sliderEl.style.removeProperty('justify-content');

    sliderEl.classList.add(styles['slider__track']);
  }, []);

  const SLIDER_SCROLL_LENGTH = slides.length * slideHeight;

  useEffect(() => {
    const handleScroll = () => {
      // Implementar lógica de scroll si es necesaria
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slides.length]);

  return (
    <div
      style={{ height: `${SLIDER_SCROLL_LENGTH}px`, position: 'relative' }}
      className={`slider-scroll-wrapper ${className}`}
    >
      <section
        className="slider slider--sticky"
        style={{
          position: 'sticky',
          top: 0,
          height: `${slideHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          zIndex: 2,
        }}
      >
        <div
          ref={sliderRef}
          className={`${styles['slider__custom-track']} slider-component__track`}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`${styles['slider__slide']} slider-component__slide`}
              style={{
                minWidth: '76vw',
                maxWidth: '76vw',
                height: '100%',
                scrollSnapAlign: 'center',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              <div className={styles['slider__polaroid']}>
                <div className={styles['slider__polaroid-window']} />
                <div className={styles['slider__polaroid-caption']}>
                  <div className={styles['slider__polaroid-title']}>{slide.title}</div>
                  <div className={styles['slider__polaroid-body']}>{slide.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles['slider__stepper']} style={{ marginTop: '56px', alignSelf: 'center' }}>
          <div className={styles['slider__stepper-dots']}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={styles['slider__stepper-dot']}
                style={{ 
                  border: '1px solid #393431',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#F7F6F4'
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slider; 