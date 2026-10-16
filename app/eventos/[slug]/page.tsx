import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageWrapper from '../../../components/PageWrapper';
import { eventProjects } from '../../../lib/eventProjects';

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return eventProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = eventProjects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Etérea Events`,
    alternates: { canonical: `/eventos/${project.slug}` },
  };
}

export default function EventProjectPage({ params }: ProjectPageProps) {
  const project = eventProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <PageWrapper backgroundColor="#EFECE7">
      <section className="eterea-content-block" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '9.5rem 2rem' }}>
        <h1 className="eterea-title">{project.title}</h1>
        <Link href="/eventos" className="eterea-button eterea-button--auto">Eventos</Link>
      </section>
    </PageWrapper>
  );
}
