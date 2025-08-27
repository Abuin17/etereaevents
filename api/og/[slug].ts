import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Datos de las tarjetas de visita
const cardData = {
  natalia: {
    fullName: 'NATALIA DEL RÍO PÉREZ',
    role: 'Fundadora y Directora Creativa',
    description: 'Conecta con NATALIA DEL RÍO PÉREZ de ETÉREA EVENTS. Fundadora y Directora Creativa especializada en eventos de lujo y experiencias únicas.',
    image: 'natalia.jpg'
  },
  virginia: {
    fullName: 'VIRGINIA DE LA HOZ GONZÁLEZ',
    role: 'Responsable de Producción y Experiencia',
    description: 'Conecta con VIRGINIA DE LA HOZ GONZÁLEZ de ETÉREA EVENTS. Responsable de Producción y Experiencia especializada en eventos de lujo y experiencias únicas.',
    image: 'virginia.jpg'
  }
};

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detectar si es un bot conocido
  const isBot = /whatsapp|telegram|facebookexternalhit|twitterbot|slackbot|discord|linkedin/i.test(userAgent);
  
  // Si no es un bot, redirigir a la SPA
  if (!isBot) {
    return NextResponse.redirect(new URL(`/card/${slug}`, request.url), 307);
  }
  
  // Verificar que el slug es válido
  if (!cardData[slug as keyof typeof cardData]) {
    return NextResponse.redirect(new URL(`/card/${slug}`, request.url), 307);
  }
  
  const card = cardData[slug as keyof typeof cardData];
  const baseUrl = 'https://etereaevents.com';
  const imageUrl = `${baseUrl}/og/${card.image}?v=${process.env.VERCEL_GIT_COMMIT_SHA || 'latest'}`;
  const pageUrl = `${baseUrl}/card/${slug}`;
  
  // HTML estático con meta tags Open Graph
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- DIAG: OG-EDGE ${slug.toUpperCase()} v1 -->
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${card.fullName} - ${card.role} | ETÉREA EVENTS">
    <meta property="og:description" content="${card.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:alt" content="Retrato de ${card.fullName}, ${card.role}">
    <meta property="og:site_name" content="ETÉREA EVENTS">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${card.fullName} - ${card.role} | ETÉREA EVENTS">
    <meta name="twitter:description" content="${card.description}">
    <meta name="twitter:image" content="${imageUrl}">
    
    <!-- SEO Meta Tags -->
    <link rel="canonical" href="${pageUrl}">
    <meta name="robots" content="noindex, nofollow">
    <meta name="author" content="${card.fullName}">
    <meta name="theme-color" content="#393431">
    
    <title>${card.fullName} - ${card.role} | ETÉREA EVENTS</title>
</head>
<body>
    <div style="display: none;">
        <h1>${card.fullName}</h1>
        <p>${card.role} | ETÉREA EVENTS</p>
        <p>${card.description}</p>
    </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=600',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

export async function HEAD(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detectar si es un bot conocido
  const isBot = /whatsapp|telegram|facebookexternalhit|twitterbot|slackbot|discord|linkedin/i.test(userAgent);
  
  // Si no es un bot, redirigir a la SPA
  if (!isBot) {
    return NextResponse.redirect(new URL(`/card/${slug}`, request.url), 307);
  }
  
  // Verificar que el slug es válido
  if (!cardData[slug as keyof typeof cardData]) {
    return NextResponse.redirect(new URL(`/card/${slug}`, request.url), 307);
  }
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=600',
      'X-Content-Type-Options': 'nosniff',
      'Content-Length': '0'
    }
  });
}
