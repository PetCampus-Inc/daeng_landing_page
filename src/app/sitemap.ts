import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://home.knockdog.net',
      lastModified: new Date('2025-04-09'),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://home.knockdog.net/team',
      lastModified: new Date('2025-04-09'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
