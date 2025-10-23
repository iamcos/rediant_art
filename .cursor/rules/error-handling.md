# Error Handling Rules

## Error Analysis Process
1. **Identify Root Cause**: Analyze build errors, missing imports, broken images
2. **Log Solution Attempts**: Track what was tried and why it failed
3. **Validate Fixes**: Confirm pages load, images render, Lighthouse score > 90
4. **No Fake Success**: Only report success if all metrics are met

## Common Error Patterns

### Build Errors
```bash
# Import Errors
Error: Cannot resolve import './Layout.astro'
Solution: Check file paths and imports

# TypeScript Errors
Error: Property 'title' does not exist on type 'Props'
Solution: Update interface definitions
```

### Image Errors
```bash
# Missing Images
Error: Image not found: /images/jewelry.webp
Solution: Verify image exists in public/images/

# Alt Text Missing
Warning: Image missing alt attribute
Solution: Add descriptive alt text
```

### SEO Errors
```bash
# Missing Meta Tags
Warning: Missing meta description
Solution: Add description to frontmatter

# Missing Open Graph
Warning: Missing og:image
Solution: Add og:image meta tag
```

## Solution Tracking Template
```
Attempt 1: Added WebP image, failed due to missing alt text
Attempt 2: Updated frontmatter with alt text, failed due to wrong path
Attempt 3: Fixed image path and added alt text, success
```

## Validation Steps
1. Run `npm run build` - check for build errors
2. Run `npm run preview` - verify pages load
3. Check images render correctly
4. Run Lighthouse audit - target score > 90
5. Test both English and Russian pages

## Tribute API Integration Errors

### API Key Issues
```bash
# Check API Key
npx vercel env ls
# Should show: TRIBUTE_API_KEY

# Add API Key if missing
npx vercel env add TRIBUTE_API_KEY production
```

### Build Failures
```bash
# Check API Response
Error: Failed to fetch products from Tribute API
Solution: Verify API key and endpoint accessibility
```

### Product Filtering Issues
```bash
# Check IGNORE_PRODUCTS array in src/utils/index.ts
# Should contain: 'special shot', 'special shot 🔥', 'test product', 'draft', 'private'
```

## AI Error Suggestions
- Fix import paths for Astro components
- Add missing alt text for images
- Update meta tags for SEO
- Check bilingual content consistency
- Verify responsive design on all breakpoints
- Fix TypeScript interface definitions
- Resolve missing environment variables

## No Fallbacks Rule
- Assume all data (images, content) is available
- Failures are code-related, not data-related
- Fix the integration, don't use mock data
- Real jewelry photos must be used
- Tribute API must be working

## Error Prevention
- Always test locally with `npm run dev`
- Check build with `npm run build`
- Verify production with browser testing
- Use real data only, no mock data
- Maintain bilingual consistency
- Keep product filtering working

## Success Criteria
- Pages load without errors
- Images render correctly
- Lighthouse score > 90
- Both English and Russian versions work
- Product filtering excludes test products
- All navigation links work
- Responsive design functions on all devices
