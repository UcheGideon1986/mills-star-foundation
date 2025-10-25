# 🚀 Cloudinary Setup - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Create Cloudinary Account (2 minutes)

1. Go to https://cloudinary.com/users/register/free
2. Sign up with email or Google
3. Verify your email
4. You'll be redirected to the dashboard

### Step 2: Get Your Credentials (1 minute)

1. In Cloudinary Dashboard, you'll see:
   - **Cloud Name** - Copy this (e.g., "dxyz123abc")
   
2. Go to **Settings** (gear icon) → **Upload**
3. Scroll to **Upload presets**
4. Click **Add upload preset**
5. Set:
   - **Preset name**: `mills_star_unsigned`
   - **Signing mode**: **Unsigned** (important!)
   - **Folder**: `mills-star-foundation` (optional)
6. Click **Save**
7. Copy the **preset name**

### Step 3: Configure Your Project (2 minutes)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   VITE_CLOUDINARY_UPLOAD_PRESET=mills_star_unsigned
   ```

3. Save the file

### Step 4: Test (30 seconds)

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to Admin page
3. Try uploading an image
4. Check Cloudinary dashboard → Media Library
5. Your image should appear there!

---

## ✅ Verification Checklist

- [ ] Cloudinary account created
- [ ] Cloud name copied
- [ ] Upload preset created (unsigned mode)
- [ ] .env file created with credentials
- [ ] Dev server restarted
- [ ] Test upload successful
- [ ] Image appears in Cloudinary dashboard

---

## 🎯 What You Get

### Free Tier Includes:
- ✅ **25 GB** storage
- ✅ **25 GB** bandwidth per month
- ✅ **Automatic optimization**
- ✅ **CDN delivery** worldwide
- ✅ **Image transformations**
- ✅ **Unlimited** uploads

### Perfect For:
- ✅ Small to medium websites
- ✅ Up to ~5,000 images
- ✅ ~100,000 page views/month
- ✅ Development and testing

---

## 🔧 Troubleshooting

### "Upload failed" error:
**Solution:** Check that upload preset is set to "Unsigned"

### "Cloudinary credentials not configured":
**Solution:** Make sure .env file exists and has correct values

### Images not appearing:
**Solution:** 
1. Check browser console for errors
2. Verify cloud name is correct
3. Restart dev server after changing .env

### "Invalid upload preset":
**Solution:** 
1. Go to Cloudinary Settings → Upload
2. Verify preset name matches exactly
3. Ensure it's set to "Unsigned"

---

## 📊 Monitor Usage

### Check Your Usage:
1. Go to Cloudinary Dashboard
2. Click on **Usage** tab
3. Monitor:
   - Storage used
   - Bandwidth used
   - Transformations
   - Credits remaining

### Set Up Alerts:
1. Go to Settings → Notifications
2. Enable email alerts for:
   - 80% quota usage
   - 90% quota usage
   - Quota exceeded

---

## 🎓 Next Steps

### After Setup:
1. ✅ Upload test images
2. ✅ Verify they display on website
3. ✅ Test image management (view, delete)
4. ✅ Deploy to production

### Optional Enhancements:
- [ ] Set up custom domain (CNAME)
- [ ] Configure automatic backups
- [ ] Add image transformations
- [ ] Implement lazy loading
- [ ] Set up analytics

---

## 💡 Pro Tips

1. **Organize with Folders**
   - Use folders in upload preset
   - Example: `mills-star-foundation/gallery`
   - Easier to manage images

2. **Use Tags**
   - Tag images by category
   - Example: `sports`, `events`, `training`
   - Better organization

3. **Enable Auto-Optimization**
   - Already enabled in the service
   - Saves bandwidth
   - Faster loading

4. **Monitor Regularly**
   - Check usage weekly
   - Delete unused images
   - Optimize storage

---

## 🆘 Need Help?

### Resources:
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Upload Presets**: https://cloudinary.com/documentation/upload_presets
- **Support**: https://support.cloudinary.com

### Common Questions:

**Q: Is it really free?**
A: Yes! 25GB storage and bandwidth/month forever.

**Q: What happens if I exceed the limit?**
A: Uploads will fail. You'll need to upgrade or delete old images.

**Q: Can I use my own domain?**
A: Yes, with paid plans you can use custom CNAME.

**Q: How do I delete images?**
A: Through Cloudinary dashboard or implement backend API.

---

## ✨ You're Ready!

Once you complete these steps:
- ✅ Images will be stored in the cloud
- ✅ Accessible from any device
- ✅ Fast CDN delivery
- ✅ Automatic optimization
- ✅ Production-ready!

**Total setup time: ~5 minutes** ⚡

---

**Mills Star Foundation**
*Empowering the Differently Abled Through Technology*
