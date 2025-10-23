# Browser Testing Rules - MANDATORY

## 🚨 CRITICAL RULE: Always Test in Browser
**EVERY TIME** you make code changes, you MUST:

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Browser and Test
- Navigate to: http://localhost:4321/
- Test main page functionality
- Test shop pages: `/shop` and `/ru/shop`
- Test product filtering (verify "Special Shot 🔥" is NOT displayed)
- Test responsive design on mobile/tablet/desktop
- Test language switcher functionality
- Test all navigation links

### 3. Production Verification
- Test live site: https://rediant.art
- Verify changes are reflected in production
- Check both English and Russian versions
- Test product filtering on live site

### 4. Document Results
- Screenshot any issues found
- Note any broken functionality
- Confirm all changes work as expected

## Why Browser Testing is Critical
- **Visual Confirmation**: See actual rendered output
- **User Experience**: Ensure changes don't break UX
- **Cross-Browser**: Verify compatibility
- **Responsive Design**: Test all screen sizes
- **Real Data**: Confirm API integrations work
- **Performance**: Check loading times and functionality

## Quality Assurance Checklist

### Before Every Commit
- [ ] Browser testing completed
- [ ] Both English and Russian versions tested
- [ ] Shop pages tested (product filtering verified)
- [ ] Responsive design tested
- [ ] Navigation links tested
- [ ] Production site verified at https://rediant.art

### After Every Deploy
- [ ] Live site functionality confirmed
- [ ] Product filtering working correctly
- [ ] No broken links or functionality
- [ ] Performance acceptable

## Development Workflow
1. **Make Changes** → Code modifications
2. **Test Locally** → `npm run dev` + browser testing
3. **Test Production** → Verify live site functionality at https://rediant.art
4. **Document Issues** → Screenshot and note any problems
5. **Deploy** → Push to main for auto-deployment

---

**Remember**: Browser testing is not optional - it's mandatory for every change!
