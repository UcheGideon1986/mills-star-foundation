# 🎬 Hero Slideshow Feature - User Guide

## ✅ **New Feature Added!**

Your homepage now has an **automatic slideshow** in the hero section instead of a single static image!

---

## 🎯 **What You'll See**

### **On the Homepage:**
- ✅ Multiple images rotating automatically every 5 seconds
- ✅ Left/Right arrow buttons to navigate manually
- ✅ Dot indicators at the bottom to jump to specific slides
- ✅ Smooth fade transitions between images
- ✅ Professional, modern presentation

---

## 🎨 **How to Add/Manage Slideshow Images**

### **Step 1: Go to Admin Panel**

1. Visit: https://millsstarfounders.netlify.app/admin
2. Login with: `admin123`

### **Step 2: Navigate to Hero Slideshow Tab**

1. Look for the tabs at the top
2. Click on: **"Hero Slideshow"** tab
3. You'll see the slideshow management interface

### **Step 3: Upload Slideshow Images**

1. Click **"Choose Files"** button
2. Select one or more images (you can select multiple at once!)
3. Preview your selected images
4. Click **"Upload X Slide(s)"** button
5. Wait for upload to complete
6. ✅ Done! Images added to slideshow

### **Step 4: Manage Your Slides**

**Reorder Slides:**
- Use ↑ button to move slide up
- Use ↓ button to move slide down
- First slide shows first in rotation

**Delete Slides:**
- Click the red trash icon
- Confirm deletion
- Slide removed from slideshow

### **Step 5: Download JSON & Push**

After making changes:

```bash
cd /Users/mac/CascadeProjects/windsurf-project-2

# Download JSON from admin (green card at top)
cp ~/Downloads/images.json public/data/images.json

# Commit and push
git add public/data/images.json
git commit -m "Update hero slideshow images"
git push origin main
```

Or use the script:
```bash
./update-images.sh
```

---

## 📸 **Recommended Image Specifications**

### **Size:**
- **Width:** 1920px
- **Height:** 600px
- **Aspect Ratio:** 16:5 (or similar landscape)

### **Format:**
- JPG or PNG
- High quality
- Optimized for web (< 500KB per image)

### **Content:**
- Show your foundation's impact
- Wheelchair sports action shots
- Community engagement
- Success stories
- Diverse activities

---

## 🎯 **Best Practices**

### **Number of Slides:**
- **Recommended:** 3-5 slides
- **Minimum:** 1 slide (no slideshow, just static)
- **Maximum:** No limit, but 5-7 is ideal

### **Image Selection:**
- Use high-quality, professional photos
- Show variety (sports, education, community)
- Feature people and action
- Bright, engaging images
- Consistent style/quality

### **Order Matters:**
- Put your best/most impactful image first
- Vary the content (don't put similar images next to each other)
- End with a strong image (it loops back to first)

---

## 🔄 **How the Slideshow Works**

### **Automatic Rotation:**
- Changes every **5 seconds**
- Smooth fade transition (1 second)
- Continuous loop (goes back to first after last)

### **Manual Navigation:**
- **Left Arrow:** Go to previous slide
- **Right Arrow:** Go to next slide
- **Dot Indicators:** Click to jump to specific slide

### **Responsive:**
- Works on all devices (desktop, tablet, mobile)
- Arrows and dots adjust for screen size
- Touch-friendly on mobile

---

## 💡 **Tips for Great Slideshows**

### **Tell a Story:**
1. **Slide 1:** Show the problem/need
2. **Slide 2:** Show your solution/action
3. **Slide 3:** Show the impact/results
4. **Slide 4:** Show community involvement
5. **Slide 5:** Show future vision

### **Visual Variety:**
- Mix close-ups and wide shots
- Include people and activities
- Show different programs
- Vary colors and settings

### **Emotional Impact:**
- Capture genuine moments
- Show joy and achievement
- Include faces and expressions
- Tell stories through images

---

## 🎬 **Example Slideshow Setup**

### **Wheelchair Basketball Foundation:**

**Slide 1:** Team huddle before game (excitement)
**Slide 2:** Action shot during game (skill)
**Slide 3:** Celebration after winning (joy)
**Slide 4:** Community watching and cheering (support)
**Slide 5:** Athletes with medals (achievement)

This tells a complete story in 25 seconds!

---

## ⚙️ **Technical Details**

### **Where Images Are Stored:**
- **Cloudinary:** Actual image files
- **localStorage:** Slideshow URLs (your device)
- **JSON File:** Slideshow URLs (all devices after push)

### **How It Updates:**
1. Upload images in admin → Cloudinary
2. URLs saved to localStorage → Your device
3. Download JSON → Export data
4. Push to GitHub → Deploy to Netlify
5. ✅ All devices see slideshow

### **Performance:**
- Images lazy-loaded
- Smooth transitions
- No flickering
- Fast loading

---

## 🐛 **Troubleshooting**

### **Slideshow Not Showing:**

**Problem:** No slides uploaded yet

**Solution:**
1. Go to Hero Slideshow tab
2. Upload at least one image
3. Download JSON and push

### **Images Not Rotating:**

**Problem:** Only one slide uploaded

**Solution:**
- Upload more slides (need 2+ for rotation)
- Or it's working as designed (1 slide = static)

### **Arrows/Dots Not Showing:**

**Problem:** Only one slide

**Solution:**
- Navigation only appears with 2+ slides
- This is intentional (no need to navigate one image)

### **Changes Not Visible on Other Devices:**

**Problem:** Forgot to download JSON and push

**Solution:**
1. Download JSON from admin
2. Replace public/data/images.json
3. Push to GitHub
4. Wait for deployment

---

## 📊 **Current Setup**

### **Default State:**
- If no slides uploaded: Shows single hero image
- If 1 slide: Shows that slide (no navigation)
- If 2+ slides: Full slideshow with navigation

### **After You Upload:**
- Your wheelchair sports images will rotate
- Visitors see dynamic, engaging hero section
- Professional presentation of your work

---

## ✅ **Quick Checklist**

After uploading slideshow images:

- [ ] Uploaded 3-5 high-quality images
- [ ] Reordered slides in best sequence
- [ ] Previewed slideshow in admin
- [ ] Downloaded JSON file
- [ ] Replaced public/data/images.json
- [ ] Pushed to GitHub
- [ ] Waited for Netlify deployment
- [ ] Tested on homepage
- [ ] Checked on another device
- [ ] ✅ Slideshow working!

---

## 🎉 **Benefits**

### **For Your Foundation:**
- ✅ Showcase multiple programs
- ✅ Tell visual stories
- ✅ Engage visitors immediately
- ✅ Professional presentation
- ✅ Dynamic, not static

### **For Visitors:**
- ✅ See variety of your work
- ✅ Understand your impact
- ✅ Engaging experience
- ✅ Easy to navigate
- ✅ Mobile-friendly

---

## 🚀 **Next Steps**

### **Right Now:**

1. ✅ Go to admin panel
2. ✅ Click "Hero Slideshow" tab
3. ✅ Upload your wheelchair sports images
4. ✅ Reorder as desired
5. ✅ Download JSON
6. ✅ Push to GitHub
7. ✅ Test on homepage!

### **Ongoing:**

- Update slideshow seasonally
- Add new event photos
- Rotate featured programs
- Keep content fresh
- Tell new stories

---

**Your hero slideshow is ready to showcase your amazing work!** 🎉

**Upload those powerful wheelchair sports images and inspire visitors!** ✨

**Simple, professional, and impactful!** 🚀
