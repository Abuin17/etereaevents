import React from 'react';
import './EventsInvisible.scss';
import Link from 'next/link';
import { eventProjects } from '../../lib/eventProjects';

const EventsInvisible: React.FC = () => {
  return (
    <section className="events-invisible">
      <div className="events-invisible__container">
        <div className="events__title">
          LO INVISIBLE COMO EXPERIENCIA
        </div>
        <div className="events-invisible__body">
          <p>Buen gusto y precisión.</p>
          <p>Nos inspiran las personas que saben lo que quieren, pero que se dejan sorprender.</p>
        </div>
      </div>

      <ul className="events-invisible__portfolio">
        {eventProjects.map((project) => (
          <li key={project.slug} className="events-invisible__portfolio-item">
            <Link href={`/eventos/${project.slug}`} className="events-invisible__portfolio-link">
              <div
                className="events-invisible__portfolio-image"
                style={{ backgroundImage: `url("${encodeURI(project.image)}")` }}
                role="img"
                aria-label={project.title}
              />
              <span className="events-invisible__portfolio-title">{project.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="events-invisible__showcase">
        <div className="events-invisible__separator">
          <div className="events-invisible__separator-line">
            <div className="events-invisible__separator-dots">
              <div className="events-invisible__separator-dot" />
              <div className="events-invisible__separator-dot" />
            </div>
          </div>
        </div>

        <div className="events-invisible__contact eterea-content-block">
          <div className="events__title eterea-title">EXTRAORDINARY BEGINS WHERE PERFECTION STOPS BEING ENOUGH</div>
          <Link href="/contacto" className="eterea-button eterea-button--auto">Contacto</Link>
        </div>
      </div>
    </section>
  );
};

export default EventsInvisible; 