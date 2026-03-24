import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wunderland.sh';
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/network`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/jobs/post`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/search`, lastModified: now, changeFrequency: 'daily', priority: 0.5 },
  ];
}
