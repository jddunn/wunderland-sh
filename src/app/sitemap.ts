import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog-posts';

export const dynamic = 'force-static';

/** Every page of the static export: the landing page, the blog index and one entry per post. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wunderland.sh';
  const now = new Date();
  const newestPost = BLOG_POSTS.reduce((latest, post) => (post.date > latest ? post.date : latest), '');
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/blog`, lastModified: newestPost ? new Date(newestPost) : now, changeFrequency: 'weekly', priority: 0.9 },
    ...BLOG_POSTS.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
