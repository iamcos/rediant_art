# Deployment Rules

## Current Status
✅ **DEPLOYED AND WORKING**
- **Production URL**: https://rediant.art (primary domain)
- **Vercel URL**: https://rediant-art2.vercel.app (backup/deployment)
- **Status**: Live and functional

## Deployment Process

### 1. Git Push (Auto-Deploy)
```bash
git add -A
git commit -m "Your changes"
git push origin main
```
- Vercel automatically builds and deploys on `main` branch push
- Check build status in Vercel dashboard

### 2. Manual Deploy (CLI)
```bash
npm run build        # Test build locally
npx vercel --prod    # Deploy to production
```

### 3. Check Deployment
```bash
npx vercel ls                    # List deployments
npx vercel inspect <deployment>  # Check specific deployment
```

## Vercel Configuration
- **Platform**: Vercel with static site generation
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Node Version**: 18.x (specified in package.json)

## Environment Variables
```bash
# Add new env var
npx vercel env add VARIABLE_NAME production

# List env vars  
npx vercel env ls

# Remove env var
npx vercel env rm VARIABLE_NAME production
```

## Health Checks
- **Main site**: https://rediant.art
- **API**: https://rediant-art2.vercel.app/api/products
- **Shop pages**: 
  - English: https://rediant.art/shop
  - Russian: https://rediant.art/ru/shop

## Performance Optimization
- **Image Optimization**: Use Astro's `<Image>` component
- **Lazy Loading**: Implement `loading="lazy"` for images
- **WebP/AVIF**: Convert images to modern formats
- **Lighthouse Score**: Target > 90 for SEO and Performance

## Static Site Generation
- Products fetched from Tribute API at build time
- Full static site generation for optimal performance
- Manual regeneration via git push to main branch

## Caching Strategy
- **Static assets**: 1 year cache
- **API routes**: 5 minute cache
- **Images**: Long-term cache with immutable

## Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY  
- X-XSS-Protection: 1; mode=block

## Troubleshooting

### Common Issues
1. **Build Failures**
   - Check: `npm run build` locally first
   - Verify: All dependencies installed
   - Fix: Update package.json if needed

2. **API Routes**
   - Path: `/api/*` routes in `src/pages/api/`
   - Runtime: Auto-detected by Vercel
   - Status: ✅ Working

3. **Environment Variables**
   - Check: `npx vercel env ls`
   - Add: `npx vercel env add VARIABLE_NAME production`
   - Update: Use Vercel dashboard for changes

## AI Suggestions
- Recommend Lighthouse audits for SEO/performance
- Suggest image optimization techniques
- Propose build optimization strategies
- Check for broken links and missing images
- Verify environment variables are set correctly
