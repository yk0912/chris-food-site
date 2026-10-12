import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { shops } from '../lib/data';

export const GET: APIRoute = async ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  const paths = [
    '/', '/about/', '/business/', '/food/', '/bakery/', '/bakery/concept/', '/bakery/menu/', '/bakery/shops/',
    ...shops.map((s) => `/bakery/shops/${s.slug}/`),
    '/produce/', '/system/', '/reskilling/', '/news/',
    ...(await getCollection('news')).map((n) => `/news/${n.id}/`),
    '/recruit/', '/contact/', '/privacy/', '/sitemap/',
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
