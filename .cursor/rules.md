# Rediant Art - Cursor Rules

## MANDATORY: Browser Verification After Every Change

### 🚨 CRITICAL RULE: Always Test in Browser
**EVERY TIME** you make code changes, you MUST:

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

## Project-Specific Rules

### Bilingual Consistency
- **ALWAYS** maintain bilingual consistency
- Every English page must have a Russian equivalent
- Test both language versions after changes

### Product Filtering
- **Special Shot 🔥** must NOT be displayed in shop
- Filtering is handled in `src/utils/index.ts` in `fetchProducts()` function
- IGNORE_PRODUCTS array contains: 'special shot', 'special shot 🔥', 'test product', 'draft', 'private'
- Test shop pages to verify filtering works

### Real Data Only
- **NEVER USE MOCK DATA** - Always work with real data from live APIs
- **NO FALLBACKS TO SAMPLE DATA** - If API fails, fix the integration
- Data is always available, servers are running, APIs are working

### Deployment
- Changes auto-deploy to Vercel on push to main
- Test both development and production environments
- Verify all functionality works in both environments

## Development Workflow

1. **Make Changes** → Code modifications
2. **Test Locally** → `npm run dev` + browser testing
3. **Test Production** → Verify live site functionality
4. **Document Issues** → Screenshot and note any problems
5. **Deploy** → Push to main for auto-deployment

## Quality Assurance

### Before Every Commit
- [ ] Browser testing completed
- [ ] Both English and Russian versions tested
- [ ] Shop pages tested (product filtering verified)
- [ ] Responsive design tested
- [ ] Navigation links tested
- [ ] Production site verified

### After Every Deploy
- [ ] Live site functionality confirmed
- [ ] Product filtering working correctly
- [ ] No broken links or functionality
- [ ] Performance acceptable

---

**Remember**: Browser testing is not optional - it's mandatory for every change!
