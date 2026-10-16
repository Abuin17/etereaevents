import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageWrapper from '../../../../components/PageWrapper';
import ProjectFolder from '../../../../components/ProjectDetail/ProjectFolder';
import { eventProjects } from '../../../../lib/eventProjects';

// Variante experimental (carpeta + recorte con clip + hoja). No enlazada ni indexada.
export const metadata: Metadata = { robots: { index: false, follow: false } };

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return eventProjects.filter((p) => p.details).map((p) => ({ slug: p.slug }));
}

export default function EventProjectFolderPage({ params }: Props) {
  const project = eventProjects.find((p) => p.slug === params.slug);
  if (!project || !project.details) notFound();

  return (
    <PageWrapper backgroundColor="#FFFFFF" hideFooter>
      <ProjectFolder project={project} />
    </PageWrapper>
  );
}
