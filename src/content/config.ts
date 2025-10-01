import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['en', 'ru']),
    order: z.number().optional(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
  }),
});

const photos = defineCollection({
  type: 'data',
  schema: z.object({
    filename: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(['portrait', 'lifestyle', 'detail', 'group', 'product']),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    alt: z.string(),
    usage: z.array(z.string()),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'ru']),
  }),
});

export const collections = {
  pages,
  photos,
  blog,
};

