# Rediant Art - Development Rules

## CRITICAL RULE: Always Verify Browser Changes

**After making ANY website edits, ALWAYS verify changes in the browser to check:**

### ✅ Required Browser Verification Checklist:

1. **Text Readability & Hierarchy**
   - Are headings properly sized and spaced?
   - Is text easy to read with good contrast?
   - Does the typography hierarchy make sense?
   - Are paragraphs properly spaced?

2. **Image Display & Positioning**
   - Do images load correctly?
   - Are images properly sized and positioned?
   - Do images look good on both desktop and mobile?
   - Are image aspect ratios maintained?

3. **Mobile Responsiveness**
   - Test on mobile viewport (375px, 768px, 1024px)
   - Check navigation menu on mobile
   - Check text readability on mobile
   - Verify touch targets are large enough

4. **Overall Page Appearance**
   - Does the page look professional?
   - Are colors and spacing consistent?
   - Do sections flow well together?
   - Are there any visual glitches?

5. **Navigation Functionality**
   - Do all navigation links work?
   - Is the mobile menu working properly?
   - Does the language switcher work?
   - Are active states showing correctly?

6. **Cross-Device Compatibility**
   - Test on different screen sizes
   - Check both English and Russian versions
   - Verify all pages work consistently
   - Test on actual mobile devices if possible

### 🚨 NEVER ASSUME EDITS WORK WITHOUT VERIFICATION

- Always open the browser after making changes
- Test the specific page you edited
- Check both desktop and mobile views
- Verify all interactive elements work
- Test the complete user journey

### 📱 Browser Testing Commands:
```bash
# Start development server
npm run dev

# Open browser to localhost:4321
# Test these pages specifically:
# - / (Home)
# - /about (Our Story)
# - /ru/about (Russian Our Story)
# - /shop
# - /contact
```

### 🔍 What to Look For:
- **Text**: Readable, well-spaced, proper hierarchy
- **Images**: Loading, positioned correctly, responsive
- **Layout**: Clean, professional, consistent spacing
- **Navigation**: Working, intuitive, mobile-friendly
- **Performance**: Fast loading, smooth interactions

### ⚠️ Common Issues to Check:
- Text too small or too large
- Images not loading or broken
- Mobile layout breaking
- Navigation not working
- Inconsistent spacing
- Poor color contrast
- Broken responsive design

## Remember: Code changes ≠ Visual changes
Always verify in browser before considering work complete!