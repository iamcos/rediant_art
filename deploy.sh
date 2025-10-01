#!/bin/bash

# Rediant Art - Astro Website Deployment Script
# This script builds the Astro website and prepares it for GitHub Pages deployment

echo "🚀 Starting Rediant Art website deployment..."

# Build the Astro website
echo "📦 Building Astro website..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    # Copy built files to the root directory for GitHub Pages
    echo "📁 Copying built files to root directory..."
    cp -r dist/* ./
    
    # Create a simple index.html redirect if needed
    echo "🔗 Creating deployment redirects..."
    
    echo "✅ Deployment files ready!"
    echo "📝 Next steps:"
    echo "   1. Commit and push changes to GitHub"
    echo "   2. Enable GitHub Pages in repository settings"
    echo "   3. Set source to 'Deploy from a branch' -> 'main' -> '/ (root)'"
    echo "   4. Set custom domain to 'rediant.art' in GitHub Pages settings"
    echo "   5. Configure DNS records at your domain registrar"
    echo "   6. Your site will be available at: https://rediant.art"
    echo ""
    echo "📋 DNS Records needed:"
    echo "   A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153"
    echo "   CNAME: www -> iamcos.github.io"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi




