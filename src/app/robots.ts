import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const host = 'https://capovape.ca';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/api/*', '/login'],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
