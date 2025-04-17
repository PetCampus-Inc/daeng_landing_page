import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://home.knockdog.net/sitemap.xml',
  };
}
