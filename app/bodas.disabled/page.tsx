// TEMPORARILY DISABLED - Bodas page causing SSR errors
// import React from 'react';
// import Bodas from '../../pages/Bodas/Bodas';
// import PageWrapper from '../../components/PageWrapper';

// export const dynamic = 'force-dynamic';

// export const metadata = {
//   title: 'Bodas — Etérea',
//   description: 'Bodas a medida. Desde la idea inicial hasta el último detalle. Escuchamos con atención, entendemos lo que importa.',
// };

// export default function BodasPage() {
//   return (
//     <PageWrapper>
//       <Bodas />
//     </PageWrapper>
//   );
// }

import { notFound } from 'next/navigation';

export default function BodasPage() {
  notFound();
}

