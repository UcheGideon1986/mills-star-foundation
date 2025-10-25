# 🚀 Netlify Deployment Guide

## ✅ Ready to Deploy!

Your Mills Star Foundation website is ready for Netlify deployment!

---

## 📦 **What's Been Prepared**

### **✅ Instagram Link Added:**
- Footer now links to: https://www.instagram.com/millsstarfoundation_usa
- Click the Instagram icon to visit your page

### **✅ Netlify Configuration:**
- `netlify.toml` file created
- Build command configured
- Redirects set up for SPA routing

### **✅ Deployment Package:**
- Zip file created: `/Users/mac/CascadeProjects/mills-star-foundation-netlify.zip`
- Excludes: node_modules, .git, dist
- Ready for upload

---

## 🎯 **Option 1: Deploy from GitHub (RECOMMENDED)**

### **Step 1: Connect to Netlify**

1. Go to **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select repository: **`UcheGideon1986/mills-star-foundation`**

### **Step 2: Configure Build Settings**

Netlify will auto-detect settings from `netlify.toml`, but verify:

```
Build command: npm run build
Publish directory: dist
```

### **Step 3: Add Environment Variables**

Click **"Show advanced"** → **"New variable"**

Add these environment variables:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

**Get these from your Cloudinary dashboard:**
- Cloud name: Dashboard → Account Details
- Upload preset: Settings → Upload → Upload presets

### **Step 4: Deploy!**

1. Click **"Deploy site"**
2. Wait 2-3 minutes for build
3. ✅ Your site is live!

### **Step 5: Custom Domain (Optional)**

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `millsstarfoundation.org` (or your domain)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic)

---

## 🎯 **Option 2: Deploy from Zip File**

### **Step 1: Upload Zip**

1. Go to **https://app.netlify.com**
2. Drag and drop: `/Users/mac/CascadeProjects/mills-star-foundation-netlify.zip`
3. Wait for upload and build
4. ✅ Site deployed!

### **Step 2: Configure Environment**

1. Go to **Site settings** → **Environment variables**
2. Add Cloudinary credentials:
   ```
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```
3. Click **"Save"**
4. Trigger redeploy: **Deploys** → **Trigger deploy** → **Deploy site**

---

## 🔐 **Environment Variables Setup**

### **Required Variables:**

```bash
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
```

### **How to Get Cloudinary Credentials:**

1. **Cloud Name:**
   - Login to Cloudinary
   - Dashboard → Top left corner
   - Copy "Cloud name"

2. **Upload Preset:**
   - Settings → Upload tab
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Name: `mills-star-foundation`
   - Signing mode: **Unsigned**
   - Folder: `mills-star-foundation`
   - Save
   - Copy preset name

---

## 📊 **Deployment Checklist**

### **Before Deploying:**

- ✅ Instagram link added to footer
- ✅ Netlify.toml configuration file
- ✅ Code pushed to GitHub
- ✅ Cloudinary account ready
- ✅ Environment variables noted

### **After Deploying:**

- ✅ Test all pages
- ✅ Test admin login (password: admin123)
- ✅ Test image upload
- ✅ Test blog post creation
- ✅ Test Instagram link
- ✅ Test on mobile devices

---

## 🎨 **Post-Deployment Steps**

### **1. Change Admin Password**

The default password is `admin123`. To change it:

1. Edit `src/Admin.tsx`
2. Find line: `if (password === 'admin123')`
3. Change to: `if (password === 'your_new_password')`
4. Commit and push
5. Netlify auto-deploys

### **2. Add Custom Domain**

1. Purchase domain (e.g., millsstarfoundation.org)
2. In Netlify: **Domain settings** → **Add custom domain**
3. Update DNS records at your registrar:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```
4. Wait for DNS propagation (up to 48 hours)
5. Enable HTTPS in Netlify (automatic)

### **3. Set Up Continuous Deployment**

Already configured! Every push to GitHub main branch will:
1. Trigger Netlify build
2. Run `npm run build`
3. Deploy to production
4. ✅ Site updated automatically

---

## 🔧 **Troubleshooting**

### **Build Fails:**

**Error: Missing dependencies**
```bash
# Solution: Netlify will install from package.json
# Ensure package.json is in the zip/repo
```

**Error: Build command failed**
```bash
# Check netlify.toml:
[build]
  command = "npm run build"
  publish = "dist"
```

### **Images Not Uploading:**

**Check environment variables:**
1. Site settings → Environment variables
2. Verify VITE_CLOUDINARY_CLOUD_NAME
3. Verify VITE_CLOUDINARY_UPLOAD_PRESET
4. Redeploy site

### **Admin Page Not Working:**

**Check routing:**
- Netlify.toml has redirects configured
- All routes redirect to index.html
- SPA routing should work

### **Instagram Link Not Working:**

**Verify:**
1. Check Footer.tsx line 127
2. URL should be: https://www.instagram.com/millsstarfoundation_usa...
3. Opens in new tab
4. Test after deployment

---

## 📈 **Netlify Features to Use**

### **1. Deploy Previews**

- Every pull request gets a preview URL
- Test changes before merging
- Automatic cleanup after merge

### **2. Forms (Optional)**

Add to contact form:
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- Your form fields -->
</form>
```

### **3. Functions (Optional)**

Create serverless functions:
```
netlify/functions/
  └── hello.js
```

### **4. Analytics**

- Enable in Site settings
- Track visitors
- View page views
- Monitor performance

---

## 🎯 **Deployment URLs**

### **After Deployment:**

**Netlify URL:**
```
https://your-site-name.netlify.app
```

**Custom Domain (if configured):**
```
https://millsstarfoundation.org
https://www.millsstarfoundation.org
```

---

## 📝 **Quick Deploy Commands**

### **From GitHub (Automatic):**

```bash
# Make changes
git add .
git commit -m "your changes"
git push origin main

# Netlify auto-deploys!
```

### **Manual Deploy:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## ✅ **Summary**

### **What's Ready:**

- ✅ Instagram link: https://www.instagram.com/millsstarfoundation_usa
- ✅ Netlify config: netlify.toml
- ✅ Deployment zip: mills-star-foundation-netlify.zip
- ✅ GitHub repo: https://github.com/UcheGideon1986/mills-star-foundation
- ✅ All code committed and pushed

### **Next Steps:**

1. **Deploy to Netlify** (Option 1 or 2 above)
2. **Add environment variables** (Cloudinary)
3. **Test the site**
4. **Add custom domain** (optional)
5. **Change admin password**

---

## 🎉 **Ready to Deploy!**

### **Recommended Path:**

1. Go to **https://app.netlify.com**
2. Click **"Import from Git"**
3. Select **GitHub** → **UcheGideon1986/mills-star-foundation**
4. Add **environment variables**
5. Click **"Deploy"**
6. ✅ **Your site is live!**

---

## 📞 **Need Help?**

### **Netlify Support:**
- Docs: https://docs.netlify.com
- Community: https://answers.netlify.com
- Status: https://www.netlifystatus.com

### **Common Issues:**

1. **Build fails**: Check build logs in Netlify dashboard
2. **Env vars missing**: Add in Site settings → Environment
3. **404 errors**: Check netlify.toml redirects
4. **Slow build**: Normal for first deploy (2-3 min)

---

**Your Mills Star Foundation website is ready to go live on Netlify!** 🚀

**Follow the steps above to deploy!** ✨

---

## 📍 **File Locations**

- **Zip file**: `/Users/mac/CascadeProjects/mills-star-foundation-netlify.zip`
- **Project**: `/Users/mac/CascadeProjects/windsurf-project-2`
- **GitHub**: https://github.com/UcheGideon1986/mills-star-foundation
- **Instagram**: https://www.instagram.com/millsstarfoundation_usa
