# Rediant Art - Cursor Development Rules

## Project Overview
Bilingual (English/Russian) jewelry gallery site using Astro 4.x, TypeScript, Tailwind CSS, and Vercel deployment.

## Rule Files
- `browser-testing.md` - **MANDATORY** browser verification after every change
- `astro-workflow.md` - Astro development, product filtering, price display
- `styling-conventions.md` - Tailwind CSS and responsive design
- `content-management.md` - Bilingual content, real data, SEO
- `deployment.md` - Vercel deployment and production workflow
- `error-handling.md` - Error analysis and solution tracking

## Critical Rules
- **Browser Testing**: MANDATORY after every change
- **Bilingual Consistency**: Every English page must have Russian equivalent
- **Real Data Only**: Never use mock data, always work with live APIs
- **Product Filtering**: "Special Shot 🔥" must NOT be displayed
- **Price Display**: Show both EUR and RUB when only one currency available

## Default Behavior
- Edit existing files only (e.g., `src/pages/index.astro`, `src/pages/ru/index.astro`)
- Use real jewelry images from `public/images/`
- Maintain bilingual consistency across all pages
- Optimize for SEO and performance (Lighthouse score > 90)
- Use Git for version control: `git add . && git commit -m "Update bilingual gallery"`

## Repository Information
- **GitHub Repository**: https://github.com/iamcos/rediant_art
- **SSH URL**: git@github.com:iamcos/rediant_art.git
- **Current Branch**: main
- **Latest Commit**: b3981f2 (Add modular .cursor/rules/ directory structure)
- **Owner**: iamcos

## Live Site URLs
- **Production**: https://rediant.art (primary domain)
- **Vercel**: https://rediant-art2.vercel.app (backup/deployment)
- **Development**: http://localhost:4321/ (local testing)

## File Editing Rules
- **Primary Files**: Edit `src/pages/*.astro`, `src/layouts/Layout.astro`, `src/components/*.astro`
- **Bilingual Structure**: Always maintain both English and Russian versions
- **No Mock Data**: All content must use real jewelry photos and metadata
- **Ban File Names**: No files with `_improved`, `_fixed`, `comprehensive_`, `extensive_`, `_final` prefixes/suffixes

## Workflow Commands
- **Development**: `npm run dev` for local preview
- **Build**: `npm run build` for static output
- **Preview**: `npm run preview` to test built site
- **Deploy**: `npm run deploy` for Vercel production

## Quality Assurance
- [ ] Browser testing completed
- [ ] Both English and Russian versions tested
- [ ] Shop pages tested (product filtering verified)
- [ ] Responsive design tested
- [ ] Navigation links tested
- [ ] Production site verified at https://rediant.art
