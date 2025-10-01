# Custom Domain Setup for rediant.art

This guide explains how to set up the custom domain `rediant.art` with GitHub Pages.

## ✅ What's Already Done

1. **CNAME File Created**: `public/CNAME` contains `rediant.art`
2. **Astro Config Updated**: Site URL changed to `https://rediant.art`
3. **Base Path Updated**: Changed from `/rediant_art/` to `/` (root)

## 🔧 Domain Configuration Steps

### Step 1: Domain Registrar Setup
At your domain registrar (where you bought `rediant.art`), add these DNS records:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: iamcos.github.io
```

### Step 2: GitHub Pages Configuration
1. Go to your repository: `https://github.com/iamcos/rediant_art`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Under **Custom domain**, enter: `rediant.art`
7. Check **Enforce HTTPS**

### Step 3: Deploy the Website
```bash
cd rediant-astro
./deploy.sh
git add .
git commit -m "Deploy for custom domain rediant.art"
git push origin main
```

## 🌐 DNS Propagation
- DNS changes can take 24-48 hours to propagate globally
- You can check propagation status at: https://dnschecker.org/
- Test your domain: https://rediant.art

## 🔍 Verification Steps

### 1. Check CNAME File
The `public/CNAME` file should contain:
```
rediant.art
```

### 2. Verify GitHub Pages Settings
- Repository: `iamcos/rediant_art`
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`
- Custom domain: `rediant.art`
- HTTPS: ✅ Enabled

### 3. Test the Website
- Visit: https://rediant.art
- Check all pages load correctly
- Verify images and assets load
- Test both English and Russian versions

## 🚨 Troubleshooting

### If Domain Doesn't Work:
1. **Check DNS Records**: Verify A records point to GitHub IPs
2. **Wait for Propagation**: DNS can take up to 48 hours
3. **Check GitHub Pages**: Ensure custom domain is set correctly
4. **Clear Browser Cache**: Try incognito/private browsing

### If HTTPS Issues:
1. **Enable HTTPS**: Check "Enforce HTTPS" in GitHub Pages settings
2. **Wait for Certificate**: Let's Encrypt certificate generation can take time
3. **Check CNAME**: Ensure `public/CNAME` contains only `rediant.art`

### If Images Don't Load:
1. **Check Paths**: All image paths should be relative (no `/rediant_art/` prefix)
2. **Rebuild**: Run `npm run build` and redeploy
3. **Check Public Folder**: Ensure images are in `public/images/`

## 📱 Testing Checklist

- [ ] Domain resolves: https://rediant.art
- [ ] HTTPS works: https://rediant.art (not http)
- [ ] Homepage loads: https://rediant.art/
- [ ] Collections page: https://rediant.art/collections/
- [ ] About page: https://rediant.art/about/
- [ ] Russian version: https://rediant.art/ru/
- [ ] Images load correctly
- [ ] Design switcher works
- [ ] Mobile responsive
- [ ] Fast loading times

## 🔄 Rollback Plan

If you need to revert to the GitHub Pages subdomain:
1. Change `astro.config.mjs`:
   ```js
   site: 'https://iamcos.github.io/rediant_art/',
   base: '/rediant_art/',
   ```
2. Remove `public/CNAME` file
3. Update GitHub Pages settings to remove custom domain
4. Redeploy

## 📞 Support

If you encounter issues:
1. Check GitHub Pages status: https://www.githubstatus.com/
2. Verify DNS propagation: https://dnschecker.org/
3. Test with different browsers/devices
4. Check browser console for errors

---

**Note**: The custom domain setup is now complete in the code. You just need to configure DNS at your domain registrar and update GitHub Pages settings.
