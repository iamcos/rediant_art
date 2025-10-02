# Rediant Art - Vercel CLI Deployment Guide

## Overview

This guide explains how to deploy the Rediant Art website using Vercel CLI instead of GitHub-based deployment. The site is now configured for Vercel deployment with optimized settings for performance and security.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm i -g vercel`
3. **Node.js**: Version 18+ recommended
4. **Git**: For version control

## Initial Setup (First Time Only)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate with your Vercel account.

### 3. Link Your Project
```bash
vercel link
```
This will:
- Create a `.vercel` directory with project configuration
- Link your local project to a Vercel project
- Set up deployment settings

### 4. Configure Project Settings
When prompted, choose:
- **Project Name**: `rediant-art` (or your preferred name)
- **Framework**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Deployment Commands

### Production Deployment
```bash
npm run deploy
```
This deploys to your production domain (e.g., `rediant-art2.vercel.app`).

### Preview Deployment
```bash
npm run deploy:preview
```
This creates a preview deployment for testing changes before going live.

### Check Deployment Status
```bash
npm run deploy:check
```
Lists all deployments and their status.

## Development Workflow

### 1. Make Changes
```bash
# Start development server
npm run dev

# Make your changes
# Test locally at http://localhost:4321
```

### 2. Build and Test
```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### 3. Deploy
```bash
# Deploy to production
npm run deploy

# Or deploy preview first
npm run deploy:preview
```

## Configuration Files

### `vercel.json`
Contains Vercel-specific configuration:
- Build settings
- Security headers
- Redirects for Russian language support
- Cache optimization
- Rewrites for SPA routing

### `astro.config.mjs`
Updated for Vercel deployment:
- Site URL: `https://rediant-art2.vercel.app`
- Static output
- Image domain configuration

## Environment Variables

If you need environment variables:

1. **Local Development**: Create `.env.local`
2. **Vercel Dashboard**: Add variables in project settings
3. **CLI**: Use `vercel env add <name> <value>`

## Custom Domain Setup

To use a custom domain (e.g., `rediant.art`):

1. **Add Domain in Vercel Dashboard**:
   - Go to your project settings
   - Add domain in "Domains" section
   - Follow DNS configuration instructions

2. **Update Configuration**:
   - Update `astro.config.mjs` site URL
   - Update `vercel.json` if needed

## Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check build locally
   npm run build
   
   # Check Vercel logs
   vercel logs
   ```

2. **Deployment Issues**:
   ```bash
   # Check deployment status
   vercel ls
   
   # View specific deployment
   vercel inspect <deployment-url>
   ```

3. **Environment Issues**:
   ```bash
   # Check environment variables
   vercel env ls
   ```

### Debug Commands

```bash
# View deployment logs
vercel logs

# Inspect deployment
vercel inspect <deployment-url>

# List all deployments
vercel ls

# Remove deployment
vercel remove <deployment-url>
```

## Performance Optimization

The current configuration includes:

- **Security Headers**: XSS protection, content type options
- **Cache Headers**: Optimized caching for static assets
- **Image Optimization**: Automatic image optimization
- **Static Generation**: Pre-built static files for fast loading

## Monitoring

- **Vercel Dashboard**: Monitor deployments, performance, and errors
- **Analytics**: Built-in analytics for traffic and performance
- **Logs**: Access deployment and runtime logs

## Backup Strategy

1. **Git Repository**: Keep all code in Git
2. **Regular Commits**: Commit changes before deployment
3. **Environment Variables**: Document all environment variables
4. **Configuration**: Keep `vercel.json` and `astro.config.mjs` in version control

## Best Practices

1. **Test Locally**: Always test with `npm run build` and `npm run preview`
2. **Preview First**: Use `npm run deploy:preview` for testing
3. **Monitor Deployments**: Check Vercel dashboard for issues
4. **Keep Dependencies Updated**: Regularly update npm packages
5. **Environment Variables**: Use Vercel dashboard for sensitive data

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **Project Issues**: Check GitHub issues or create new ones

---

**Last Updated**: January 2025
**Version**: 1.0
**Maintainer**: Rediant Art Development Team

