#!/bin/bash

# Rediant Website Deployment Script
echo "🚀 Deploying Rediant website to GitHub Pages..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update Rediant website - $(date '+%Y-%m-%d %H:%M:%S')"

# Check if remote exists
if ! git remote | grep -q origin; then
    echo "🔗 Please add your GitHub repository as origin:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/rediant_art.git"
    echo "Then run this script again."
    exit 1
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Your website will be available at: https://YOUR_USERNAME.github.io/rediant_art/"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)' folder"
echo "5. Click Save"
echo ""
echo "🎉 Your Rediant website is now live!"

