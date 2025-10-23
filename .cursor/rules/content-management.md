# Content Management Rules

## Bilingual Consistency
- **ALWAYS** maintain bilingual consistency
- Every English page must have a Russian equivalent
- Test both language versions after changes
- Use `lang` attribute in frontmatter for language detection

## Real Data Only
- **NEVER USE MOCK DATA** - Always work with real data from live APIs
- **NO FALLBACKS TO SAMPLE DATA** - If API fails, fix the integration
- Data is always available, servers are running, APIs are working
- Use actual jewelry photos from `public/images/`
- Reference real product information from Tribute API

## Photo Metadata Structure
```typescript
// src/content/photos/jewelry-piece.json
{
  "title": "Diamond Facechain",
  "alt": "Golden diamond facechain with geometric patterns",
  "lang": "en",
  "slug": "diamond-facechain",
  "category": "facechains",
  "price": "$299",
  "description": "Handcrafted 3D printed facechain featuring sacred geometry",
  "tags": ["facechain", "diamond", "geometric", "3d-printed"]
}
```

## Bilingual Content Rules
- **English**: `src/content/photos/jewelry-piece.json`
- **Russian**: `src/content/photos/jewelry-piece-ru.json`
- **Slugs**: Use descriptive English slugs (e.g., `diamond-facechain`)
- **Alt Text**: Always provide descriptive alt text for accessibility

## SEO Optimization
```astro
---
// Frontmatter for SEO
const title = "Rediant Art - Contemporary Jewelry with 3D Printing";
const description = "Discover unique facechains, headchains, and bodychains crafted with 3D printing technology. Bilingual jewelry gallery.";
const keywords = "jewelry, facechain, headchain, bodychain, 3D printing, contemporary art";
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="/images/hero-jewelry.webp" />
</head>
```

## Content Collections
```typescript
// src/content/config.ts - Extend for photos
const photos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    alt: z.string(),
    lang: z.enum(['en', 'ru']),
    slug: z.string(),
    category: z.string(),
    price: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});
```

## Tribute API Integration
- **API Key**: `fa40da4f-b3de-4008-9601-1c065735` (stored in Vercel environment)
- **Endpoint**: `https://tribute.tg/api/v1/products`
- **Server-side Rendering**: Products fetched during build time for SEO
- **Static Site Generation**: Full rebuild on git push to main branch
- **API Routes**: 
  - `/api/products` - Fetches products from Tribute API
- **Environment Variables**: 
  - `TRIBUTE_API_KEY` - Stored in Vercel dashboard

## Product Data Rules
- **Real Images**: Use actual product photos from Tribute
- **Live Prices**: Display real pricing from Tribute
- **Working Links**: All buy buttons must link to real Tribute purchase flows
- **No Sample Data**: Never use placeholder or sample products
- **Product Filtering**: Filter out test products, drafts, and private items

## AI Suggestions
- Suggest bilingual slugs (e.g., `diamond-facechain` for EN, `almaznaya-maska` for RU)
- Recommend SEO-friendly meta descriptions
- Propose alt text for jewelry photos
- Suggest category organization for jewelry pieces
- Recommend content structure for bilingual pages
