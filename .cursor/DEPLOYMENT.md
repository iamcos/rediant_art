# Rediant Art - Vercel Deployment Guide

## Updated Cleanup Report - 3D Printing Content Strategy

### **3D Printing Content: Keep for Future, No Page Needed Yet**

**Current Status**: 3D printing is mentioned in context files and some website content, but we're not ready for a dedicated page yet.

**Strategy**: 
- ✅ **Keep all 3D printing context content** - it's valuable for future use
- ✅ **Keep 3D printing mentions in existing pages** - shows innovation direction
- ❌ **Don't create dedicated 3D printing page yet** - we're not there yet
- ✅ **Use placeholder content** - "Coming soon" or "In development" messaging

**Implementation**:
- Keep `Context/3D_Printing_Innovation.md` - valuable future content
- Keep 3D printing mentions in About page and other content
- Add "Coming soon" or "In development" messaging where appropriate
- Remove 3D printing page from navigation until ready

## **NEW CROWDFUNDING STRATEGY: PROJECT AURORA - 3D PRINTING STUDIO**

### **Project Aurora: 3D Printing Studio for Lost-Wax Casting**

**Vision**: Transform Rediant into a hub for 3D-printed metal art by establishing a professional 3D printing studio for lost-wax casting patterns.

**Core Concept**: Use 3D printing to create detailed burnout patterns from castable materials that burn away cleanly during metal casting, enabling complex, organic shapes impossible with traditional carving.

### **Campaign Structure**

#### **Phase 1: Basic Setup ($2,000-3,000)**
- **Goal**: 3 SLA resin printers for pattern creation
- **Equipment**: Elegoo Mars 4 or Saturn 3 printers
- **Materials**: Castable resins (Formlabs Castable Wax 40, Polymaker PolyCast)
- **Accessories**: Washing stations, UV curing, safety gear
- **Shipping**: Russia delivery costs included

#### **Phase 2: Professional Studio ($10,000-15,000)**
- **Goal**: Multiple printer setups, advanced materials
- **Equipment**: Formlabs Form 4 printers
- **Materials**: Premium castable resins, larger build volumes
- **Accessories**: Professional washing/curing stations, kiln setup

#### **Phase 3: Direct Metal Printing ($100,000+ stretch goal)**
- **Goal**: Desktop metal 3D printer
- **Equipment**: AO Metal printer or Xact Metal XM200C
- **Materials**: Metal powders (steel, titanium, bronze)
- **Accessories**: Inert gas system, sintering furnace, safety equipment

### **Campaign Messaging**

**Problem**: Traditional lost-wax casting is time-consuming (weeks) and expensive, limiting artistic creativity.

**Solution**: 3D printing enables complex patterns in days, reducing costs by 75% and unlocking new artistic possibilities.

**Community Impact**: 
- Shared designs and tutorials
- Artist collaboration hub
- Educational workshops
- Affordable metal art production

### **Reward Tiers**

#### **🌱 Pattern Supporter (0.01 BTC)**
- Digital certificate
- Early access to 3D patterns
- Behind-the-scenes updates

#### **🌿 Studio Supporter (0.05 BTC)**
- Digital art print
- 10% discount on future pieces
- Virtual studio tour

#### **🌳 Creator Supporter (0.1 BTC)**
- 3D-printed prototype piece
- Personal consultation with Svetlana
- Exclusive design access

#### **🌟 Aurora Supporter (0.5 BTC)**
- Custom facechain from first batch
- Lifetime 20% discount
- Studio naming rights

#### **💫 Legacy Supporter (1+ BTC)**
- Named collection piece
- Executive producer credit
- Private studio access

### **Technical Specifications**

#### **Phase 1 Setup**
- **Printers**: 3x Elegoo Mars 4 ($300-500 each)
- **Materials**: Castable resins ($150-200/liter)
- **Accessories**: Washing/curing stations ($200-300)
- **Total**: $650-1,000 per setup

#### **Process Workflow**
1. **Design**: CAD software (Blender, Rhino)
2. **Print**: Hollow patterns with vent holes
3. **Invest**: Attach sprues, invest in slurry
4. **Burnout**: Kiln at 800-1000°C
5. **Cast**: Pour molten metal
6. **Finish**: Polish and detail

#### **Shipping to Russia**
- **Basic Setup**: $200-500 (5kg printer + accessories)
- **Materials**: $55-110 (1-2kg resin)
- **Duties**: 20-30% additional
- **Total**: $300-800 per setup

### **Campaign Timeline**

#### **Month 1-2**: Campaign Launch
- Social media promotion
- Artist community outreach
- Educational content about 3D printing in art

#### **Month 3-4**: Equipment Acquisition
- Order printers and materials
- Set up studio space
- Test printing and casting process

#### **Month 5-6**: Studio Launch
- First batch of 3D-printed jewelry
- Community workshops
- Artist collaborations

### **Website Integration**

#### **Crowdfunding Page Updates**
- Replace current 3 projects with single Project Aurora
- Add technical specifications
- Include process videos and images
- Show progress tracking

#### **Content Strategy**
- Blog posts about 3D printing in jewelry
- Behind-the-scenes studio content
- Educational tutorials
- Artist spotlights

### **Payment Integration**

#### **Telegram Wallet Integration**
- **Primary Method**: Telegram's built-in @wallet bot for easy donations
- **User Experience**: Donors can pay directly through Telegram without leaving the app
- **Security**: Telegram's secure payment system with user verification
- **Accessibility**: Works for anyone with Telegram account

#### **Payment Options**
1. **Telegram @wallet**: Direct payments through Svetlana's personal Telegram
2. **Contact Method**: @mizyre_keyer for direct donations
3. **Alternative**: WhatsApp +7 901 315-75-53 for international donors

#### **Donation Process**
1. **Contact Svetlana**: Message @mizyre_keyer on Telegram
2. **Specify Amount**: Choose reward tier or custom amount
3. **Payment**: Use Telegram's @wallet bot for secure transfer
4. **Confirmation**: Receive digital receipt and reward access

#### **Progress Tracking**
- **Manual Updates**: Svetlana updates progress on crowdfunding page
- **Transparency**: Public updates on funding milestones
- **Community Updates**: Regular Telegram channel announcements
- **Reward Fulfillment**: Direct communication for reward delivery

#### **Benefits of Telegram Integration**
- **User-Friendly**: No need to copy/paste addresses
- **Secure**: Telegram's built-in security
- **Instant**: Real-time payment processing
- **Personal**: Direct connection with Svetlana
- **Global**: Works worldwide with Telegram

## Current Status
✅ **DEPLOYED AND WORKING**
- Production URL: https://rediant-art2.vercel.app
- Custom Domain: https://rediant.art (configured)
- Status: Live and functional

## Working Configuration

### Project Setup
- **Framework**: Astro 4.16.19
- **Adapter**: @astrojs/vercel/static
- **Output**: static (static site generation)
- **Node.js**: 18.x (Vercel default, working)

### Key Files
```
vercel.json          # Vercel configuration
astro.config.mjs     # Astro configuration  
package.json         # Dependencies + Node engine
```

### Environment Variables (Production)
```
TRIBUTE_API_KEY      # API key for product fetching
REVALIDATE_SECRET    # Secret for manual revalidation
VERCEL_PROJECT_ID    # Auto-generated by Vercel
```

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

## Configuration Details

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/api/products",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=300, s-maxage=300"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/ru",
      "destination": "/ru/",
      "permanent": true
    }
  ]
}
```

### astro.config.mjs
```javascript
export default defineConfig({
  site: 'https://rediant.art',
  base: '/',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    vercel(),
  ],
  image: {
    domains: ['rediant.art'],
  },
});
```

### package.json
```json
{
  "name": "rediant-astro",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "deploy": "vercel --prod",
    "deploy:preview": "vercel",
    "deploy:check": "vercel ls"
  },
  "dependencies": {
    "@astrojs/partytown": "^2.1.4",
    "@astrojs/sitemap": "^3.0.0",
    "@astrojs/tailwind": "^5.1.0",
    "@astrojs/vercel": "^6.0.0",
    "astro": "^4.15.0",
    "resend": "^6.2.0",
    "sharp": "^0.33.5",
    "tailwindcss": "^3.4.0",
    "telegraf": "^4.15.6",
    "zod": "^3.22.4"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0"
  }
}
```

## Troubleshooting

### Common Issues

1. **Runtime Errors**
   - Problem: `nodejs18.x` runtime errors
   - Solution: Use default Vercel runtime (no custom functions config)
   - Status: ✅ Resolved

2. **Build Failures**
   - Check: `npm run build` locally first
   - Verify: All dependencies installed
   - Fix: Update package.json if needed

3. **API Routes**
   - Path: `/api/*` routes in `src/pages/api/`
   - Runtime: Auto-detected by Vercel
   - Status: ✅ Working

### Environment Variables
```bash
# Add new env var
npx vercel env add VARIABLE_NAME production

# List env vars  
npx vercel env ls

# Remove env var
npx vercel env rm VARIABLE_NAME production
```

## Performance Features

### Static Site Generation
- Products fetched from Tribute API at build time
- Full static site generation for optimal performance
- Manual regeneration via git push to main branch

### Caching
- Static assets: 1 year cache
- API routes: 5 minute cache
- Images: Long-term cache with immutable

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY  
- X-XSS-Protection: 1; mode=block

## Monitoring

### Build Logs
- Check Vercel dashboard for build status
- Monitor API route performance
- Watch for Tribute API integration issues

### Health Checks
- Main site: https://rediant-art2.vercel.app
- API: https://rediant-art2.vercel.app/api/products
- Shop pages: https://rediant-art2.vercel.app/shop and https://rediant-art2.vercel.app/ru/shop

## Recent Changes

### Contact Form → Messaging CTAs
- ✅ Removed email form
- ✅ Added Telegram direct: @mizyre_keyer
- ✅ Added WhatsApp with prefilled text
- ✅ Bilingual support (EN/RU)

### Background Images
- ✅ Changed from `cover` to `contain`
- ✅ Added `no-repeat` and dark fallback
- ✅ Full image visibility without cropping

### Deployment Fixes
- ✅ Removed problematic functions config
- ✅ Used Vercel auto-detection for runtime
- ✅ Added Node.js engine requirement
- ✅ Working production deployment

## Browser Verification Rule

### MANDATORY: Browser Testing After Changes
**EVERY TIME** code changes are made, the following browser verification steps MUST be completed:

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open Browser and Test**
   - Navigate to: http://localhost:4321/
   - Test main page functionality
   - Test shop pages: `/shop` and `/ru/shop`
   - Test product filtering (verify "Special Shot 🔥" is NOT displayed)
   - Test responsive design on mobile/tablet/desktop
   - Test language switcher functionality
   - Test all navigation links

3. **Production Verification**
   - Test live site: https://rediant-art2.vercel.app
   - Verify changes are reflected in production
   - Check both English and Russian versions
   - Test product filtering on live site

4. **Document Results**
   - Screenshot any issues found
   - Note any broken functionality
   - Confirm all changes work as expected

### Why Browser Testing is Critical
- **Visual Confirmation**: See actual rendered output
- **User Experience**: Ensure changes don't break UX
- **Cross-Browser**: Verify compatibility
- **Responsive Design**: Test all screen sizes
- **Real Data**: Confirm API integrations work
- **Performance**: Check loading times and functionality

## Next Steps

1. **DNS Migration**: Switch from `rediant-art2.vercel.app` to `rediant.art`
2. **AI Chat**: Implement chat assistant with Telegram summaries
3. **Image Optimization**: Convert to WebP/AVIF for better performance
4. **Analytics**: Add performance monitoring

---
*Last Updated: $(date)*
*Status: ✅ Production Ready*