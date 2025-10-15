# Rediant Art - Astro Website

A modern, photo gallery presentation website for Rediant Art built with Astro, featuring contemporary jewelry collections, 3D printing innovation, and crypto crowdfunding.

## 🎨 Features

- **Photo Gallery Presentation**: Background images and immersive photo galleries
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Bilingual Support**: English and Russian language versions
- **Modern Tech Stack**: Astro, TypeScript, Tailwind CSS
- **Performance**: Optimized images and fast loading times

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

```bash
# Deploy to Vercel (production)
npm run deploy

# Deploy preview to Vercel
npm run deploy:preview

# Check deployment status
npm run deploy:check
```

## 📁 Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # Main layout component
├── pages/
│   ├── index.astro           # Homepage
│   ├── collections.astro     # Collections page
│   ├── about.astro          # About page
│   ├── 3d-printing.astro    # 3D printing page
│   ├── crowdfunding.astro   # Crowdfunding page
│   ├── journal.astro        # Journal page
│   └── contact.astro        # Contact page
├── content/
│   ├── photos/              # Photo metadata
│   └── config.ts           # Content collections config
├── styles/
│   └── global.css          # Global styles and CSS variables
└── public/
    └── images/             # Optimized images
```

## 🎨 Design System

### Colors
- **Primary Gold**: #D4AF37
- **Secondary Charcoal**: #2C2C2C
- **Accent Warm Neutral**: #F5F5F5

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Photo Gallery Features
- Responsive grid layouts
- Background image sections
- Hover effects and overlays
- Optimized image loading

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

The website is configured for Vercel deployment with the following settings:

- **Production URL**: `https://rediant.art`
- **Framework**: Astro
- **Output**: Static files
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Vercel CLI Setup

1. Install Vercel CLI globally: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. Link project: `vercel link` (first time only)
4. Deploy: `npm run deploy`

### Deployment Commands

- **Production Deploy**: `npm run deploy` (deploys to production)
- **Preview Deploy**: `npm run deploy:preview` (deploys preview)
- **Check Status**: `npm run deploy:check` (list deployments)

## 📸 Image Optimization

All images are optimized using Astro's built-in image optimization:

- Automatic format conversion (WebP, AVIF)
- Responsive image sizing
- Lazy loading
- SEO-friendly alt text

## 🌐 Bilingual Support

The website supports both English and Russian languages:

- **English**: `/` (root)
- **Russian**: `/ru/`

Language switcher is integrated into the navigation menu.

## 🔧 Customization

### Adding New Photos

1. Add images to `public/images/`
2. Create metadata files in `src/content/photos/`
3. Update content collections as needed

### Styling

- Global styles in `src/styles/global.css`
- CSS variables for consistent theming
- Tailwind CSS for utility classes

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**: Optimized
- **Image Optimization**: Automatic
- **Bundle Size**: Minimal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

© 2024 Rediant Art. All rights reserved.

## 🔗 Links

- **Website**: https://rediant.art
- **Instagram**: @rediant.art
- **TikTok**: @rediant.art
- **Contact**: Via Telegram (@mizyre) or WhatsApp (+7 901 315-75-53)

---

Built with ❤️ using Astro, TypeScript, and Tailwind CSS.