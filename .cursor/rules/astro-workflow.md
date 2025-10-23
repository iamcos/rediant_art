# Astro Workflow Rules

## File Editing Rules
- **Primary Files**: Edit `src/pages/*.astro`, `src/layouts/Layout.astro`, `src/components/*.astro`
- **Bilingual Structure**: Always maintain both English and Russian versions
- **TypeScript**: Use TypeScript in `<script>` tags for component logic
- **Static Generation**: Minimize JavaScript, optimize for fast builds

## Product Filtering Rules
- **Special Shot 🔥** must NOT be displayed in shop
- Filtering is handled in `src/utils/index.ts` in `fetchProducts()` function
- IGNORE_PRODUCTS array contains: 'special shot', 'special shot 🔥', 'test product', 'draft', 'private'
- Test shop pages to verify filtering works

## Price Display Rules
- **ALWAYS display prices in both EUR and RUB** when only one currency is available
- **Format**: Show native currency first, then approximation in brackets
- **Examples**:
  - `10,000 RUB (≈100 EUR)` for Russian products
  - `10,000 EUR (≈1,000,000 RUB)` for European products
- **Currency conversion rates**: Use approximate rates (1 EUR ≈ 100 RUB)
- **Implementation**: Update ProductCard component to show dual pricing
- **User experience**: Helps international customers understand pricing

## Astro Component Guidelines
```astro
---
// Use TypeScript for component logic
interface Props {
  title: string;
  lang: 'en' | 'ru';
}
const { title, lang } = Astro.props;
---

<!-- Use Astro directives for dynamic content -->
<div class:list={['container', lang === 'ru' ? 'rtl' : 'ltr']}>
  <h1>{title}</h1>
</div>
```

## Image Optimization
```astro
---
import { Image } from 'astro:assets';
import jewelryPhoto from '../public/images/diamond-necklace.webp';
---

<!-- Use Astro Image component for optimization -->
<Image 
  src={jewelryPhoto} 
  alt="Diamond necklace from Rediant collection"
  formats={['avif', 'webp']}
  loading="lazy"
  class="w-full h-auto"
/>
```

## Workflow Commands
- **Development**: `npm run dev` for local preview
- **Build**: `npm run build` for static output
- **Preview**: `npm run preview` to test built site
- **Deploy**: `npm run deploy` for Vercel production

## Bilingual Page Structure
- English: `src/pages/index.astro`
- Russian: `src/pages/ru/index.astro`
- Maintain consistent navigation and content structure
- Use `lang` attribute in frontmatter for language detection

## Real Data Integration
- **Tribute API**: Always fetch real products from Tribute API
- **Product Data**: Use actual product information, images, prices
- **No Sample Data**: Never use placeholder or sample products
- **Real Images**: Use actual product photos from Tribute
- **Live Prices**: Display real pricing from Tribute
- **Working Links**: All buy buttons must link to real Tribute purchase flows

## AI Suggestions
- Suggest Astro directives (`:class`, `:alt`) for dynamic content
- Recommend TypeScript types for component props
- Propose Tailwind classes for responsive layouts
- Suggest image optimization techniques
- Recommend bilingual content structure
