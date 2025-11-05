import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Permitir que los bots de redes sociales accedan a /card/ para previews
        userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp', 'TelegramBot'],
        allow: ['/card/'],
      },
    ],
    sitemap: 'https://www.etereaevents.com/sitemap.xml',
  };
}

