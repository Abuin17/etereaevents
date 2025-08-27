import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BusinessCard.scss';
import nataliaImage from '../../assets/images/natalia.jpg';
import virginiaImage from '../../assets/images/opt-virginia.jpg';
import etereaLogo from '../../assets/logos/ETÉREA_Logo_antracita.svg';

interface TeamMember {
  id: string;
  name: string;
  fullName: string;
  role: string;
  phone: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'natalia',
    name: 'Natalia',
    fullName: 'NATALIA DEL RÍO PÉREZ',
    role: 'Fundadora y Directora Creativa',
    phone: '+34697309380',
    image: nataliaImage
  },
  {
    id: 'virginia',
    name: 'Virginia',
    fullName: 'VIRGINIA DE LA HOZ GONZÁLEZ',
    role: 'Responsable de Producción y Experiencia',
    phone: '+34663575095',
    image: virginiaImage
  }
];

const BusinessCard: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  
  const member = teamMembers.find(m => m.id === memberId);
  
  console.log('BusinessCard Debug:', {
    memberId,
    member,
    teamMembers,
    nataliaImage,
    virginiaImage
  });

  useEffect(() => {
    if (!member) {
      navigate('/');
      return;
    }

    // Actualizar meta tags dinámicamente
    const updateMetaTags = () => {
      const title = `${member.fullName} - ${member.role} | ETÉREA EVENTS`;
      const description = `Conecta con ${member.fullName} de ETÉREA EVENTS. ${member.role} especializada en eventos de lujo y experiencias únicas.`;
      // Construir URL absoluta para las imágenes de Open Graph
      const imageUrl = member.id === 'natalia' 
        ? `${window.location.origin}/natalia.jpg`
        : `${window.location.origin}/virginia.jpg`;
      const pageUrl = `${window.location.origin}/card/${member.id}`;

      // Actualizar título
      document.title = title;

      // Open Graph
      updateMetaTag('og:title', title);
      updateMetaTag('og:description', description);
      updateMetaTag('og:type', 'website');
      updateMetaTag('og:url', pageUrl);
      updateMetaTag('og:image', imageUrl);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
      updateMetaTag('og:image:type', 'image/jpeg');
      updateMetaTag('og:site_name', 'ETÉREA EVENTS');

      // Twitter Cards
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', title);
      updateMetaTag('twitter:description', description);
      updateMetaTag('twitter:image', imageUrl);

      // Robots
      updateMetaTag('robots', 'noindex, nofollow');
      
      // Otros meta tags útiles
      updateMetaTag('author', member.fullName);
      updateMetaTag('theme-color', '#393431');
    };

    updateMetaTags();
  }, [member, navigate]);

  const updateMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) || 
               document.querySelector(`meta[name="${property}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property.startsWith('og:')) {
        meta.setAttribute('property', property);
      } else {
        meta.setAttribute('name', property);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  const handleCall = () => {
    window.location.href = `tel:${member?.phone}`;
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@etereaevents.com';
  };

  const handleSaveContact = () => {
    if (!member) return;

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${member.fullName}
ORG:ETÉREA EVENTS
TEL;TYPE=WORK,VOICE:${member.phone}
EMAIL;TYPE=WORK,INTERNET:info@etereaevents.com
URL:${window.location.origin}
TITLE:${member.role}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${member.name.toLowerCase()}-eterea.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/eterea.events?igsh=MWhvNDJxbHZoeXYzdQ==', '_blank', 'noopener,noreferrer');
  };

  if (!member) {
    return null;
  }

  return (
    <div className="business-card">
      <div className="business-card__container">
        {/* Header con logo */}
        <header className="business-card__header">
          <button 
            onClick={() => navigate('/')}
            className="business-card__logo-button"
            aria-label="Ir a la página principal de ETÉREA"
          >
            <img 
              src={etereaLogo} 
              alt="ETÉREA EVENTS" 
              className="business-card__logo"
            />
          </button>
        </header>

        {/* Contenido principal */}
        <main className="business-card__content">
          {/* Imagen */}
          <div className="business-card__image-container">
            <img 
              src={member.image} 
              alt={`Retrato de ${member.fullName}, ${member.role}`}
              className="business-card__image"
            />
          </div>

          {/* Información */}
          <div className="business-card__info">
            <h1 className="business-card__name">{member.fullName}</h1>
            <p className="business-card__role">{member.role}</p>
          </div>

          {/* Botones de acción */}
          <div className="business-card__actions">
            <button 
              onClick={handleCall}
              className="business-card-button business-card-button--auto"
              aria-label={`Llamar a ${member.name}`}
            >
              LLAMAR
            </button>
            
            <button 
              onClick={handleEmail}
              className="business-card-button business-card-button--auto"
              aria-label="Enviar correo electrónico"
            >
              ENVIAR CORREO
            </button>
            
            <button 
              onClick={handleSaveContact}
              className="business-card-button business-card-button--auto"
              aria-label="Guardar contacto en agenda"
            >
              GUARDAR CONTACTO
            </button>
          </div>

          {/* Enlaces */}
          <div className="business-card__links">
            <a 
              href="/"
              className="business-card__link"
              aria-label="Visitar la web de ETÉREA"
            >
              Web Etérea
            </a>
            
            <button 
              onClick={handleInstagram}
              className="business-card__link"
              aria-label="Seguir en Instagram"
            >
              Instagram
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusinessCard;
