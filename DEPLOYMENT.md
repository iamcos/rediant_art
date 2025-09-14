# GitHub Pages Deployment Guide

## 🚀 Quick Setup

### 1. Upload to GitHub
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial Rediant website launch"

# Add remote repository (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/rediant_art.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 3. Access Your Website
Your website will be available at:
`https://YOUR_USERNAME.github.io/rediant_art/`

## 📁 File Structure
```
rediant_art/
├── index.html              # English homepage
├── about.html              # English about page
├── collections.html        # English collections
├── 3d-printing.html        # English 3D printing
├── crowdfunding.html       # English crowdfunding
├── journal.html            # English journal
├── contact.html            # English contact
├── ru/                     # Russian language folder
│   └── index.html          # Russian homepage
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
└── DEPLOYMENT.md           # This file
```

## 🌐 Language Support

The website includes:
- **English** (default) - All pages in root directory
- **Russian** - Homepage in `/ru/` folder
- **Language Switcher** - Fixed position in top-right corner
- **Persistent Language** - Remembers user preference

## 📱 Mobile Optimization

Enhanced mobile responsiveness includes:
- **Breakpoints**: 1024px, 768px, 480px
- **Touch-friendly** buttons and navigation
- **Optimized typography** for small screens
- **Responsive images** and layouts
- **Mobile-first** design approach

## 🔧 Customization

### Adding New Languages
1. Create new language folder (e.g., `/fr/` for French)
2. Copy and translate HTML files
3. Update language switcher in all files
4. Add translations to `script.js`

### Updating Content
- **Text**: Edit HTML files directly
- **Styling**: Modify `styles.css`
- **Functionality**: Update `script.js`
- **Images**: Replace placeholder divs with actual images

### Adding Images
Replace placeholder divs:
```html
<!-- Before -->
<div class="image-placeholder">Image Description</div>

<!-- After -->
<img src="images/your-image.jpg" alt="Image Description" class="responsive-image">
```

## 🎨 Brand Colors
- **Primary Gold**: #D4AF37
- **Primary Silver**: #C0C0C0
- **Deep Red**: #8B0000
- **Charcoal**: #2C2C2C
- **Bronze**: #CD7F32
- **Tech Blue**: #4A90E2
- **Warm Neutral**: #F5F5DC

## 📊 SEO Features
- Semantic HTML structure
- Meta descriptions and keywords
- Responsive design
- Fast loading times
- Mobile-friendly
- Language support

## 🔄 Updates and Maintenance

### Regular Updates
1. Make changes to files locally
2. Test on different devices
3. Commit and push to GitHub
4. GitHub Pages automatically updates

### Adding New Pages
1. Create new HTML file
2. Copy navigation structure
3. Add page-specific CSS
4. Update navigation links
5. Test responsiveness

## 🆘 Troubleshooting

### Common Issues
- **Page not loading**: Check file paths and GitHub Pages settings
- **Styling issues**: Verify CSS file is linked correctly
- **Mobile problems**: Test on actual devices, not just browser dev tools
- **Language switching**: Clear browser cache and localStorage

### Support
- Check GitHub Pages documentation
- Verify repository settings
- Test locally before deploying
- Use browser developer tools for debugging

## 🎯 Next Steps

1. **Add Real Images**: Replace all placeholder divs with actual jewelry photos
2. **Complete Russian Translation**: Add remaining Russian pages
3. **Add More Languages**: Expand to French, Spanish, etc.
4. **SEO Optimization**: Add structured data and meta tags
5. **Analytics**: Integrate Google Analytics or similar
6. **Contact Form**: Add backend processing for contact forms
7. **E-commerce**: Integrate shop functionality when ready

---

**Your Rediant website is now ready for the world! 🌟**

