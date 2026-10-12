import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['全社', 'ベーカリー', 'プロデュース', 'システム開発', 'リスキリング']).default('全社'),
    image: z.string().optional(),
  }),
});

export const collections = { news };
