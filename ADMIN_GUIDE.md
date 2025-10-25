# Admin Panel Guide

## Quick Access

To access the admin panel, you need to manually navigate to it since it's not in the main navigation for security reasons.

### Method 1: Direct URL Access (Recommended for Production)
In a production environment, you would access the admin panel via a specific URL route.

### Method 2: Browser Console (Current Demo)
For this demo, open your browser's developer console (F12) and run:

```javascript
// In the browser console
window.location.hash = 'admin'
// Then manually trigger the page change in your app
```

### Method 3: Temporary Navigation Link
Add a temporary link in your Navigation component for easy access during development.

## Login Credentials

- **Password**: `admin123`

## How to Upload Images

### Step 1: Login
1. Access the admin panel
2. Enter the password: `admin123`
3. Click "Login"

### Step 2: Upload Images
1. Click on the **"Upload Images"** tab
2. Enter an **Image Title** (required)
3. Select a **Category**:
   - Gallery (default)
   - Events
   - Sports
   - Training
   - Community
4. Click the upload area or drag and drop images
5. Preview your selected images
6. Click **"Upload"** button

### Step 3: Verify Upload
1. Switch to the **"Manage Images"** tab
2. Your uploaded images will appear in the grid
3. Each image shows:
   - Thumbnail preview
   - Title
   - Category
   - Upload date
   - Action buttons (View/Delete)

## Viewing Images on the Website

After uploading images:

1. Navigate to the **Gallery** page from the main menu
2. Your uploaded images will automatically appear
3. Use category filters to view specific types of images
4. Click any image to view it in full-screen lightbox mode

## Managing Images

### View an Image
- Click the **"View"** button to open the image in a new tab
- Useful for checking image quality or sharing direct links

### Delete an Image
- Click the **trash icon** button
- Confirm the deletion
- The image will be removed from both admin and gallery

### Clear All Images
- Click the **"Clear All"** button in the Manage tab
- Confirm the action (this cannot be undone!)
- All images will be permanently deleted

## Tips & Best Practices

### Image Guidelines
- **Format**: JPG, PNG, GIF supported
- **Size**: Keep under 10MB for best performance
- **Dimensions**: Recommended 1920x1080 or similar aspect ratio
- **Quality**: Use high-quality images for professional appearance

### Naming Conventions
- Use descriptive titles: "Wheelchair Basketball Tournament 2024"
- Include location if relevant: "Ghana Community Outreach"
- Add dates for events: "Training Workshop - March 2024"

### Category Usage
- **Gallery**: General photos and highlights
- **Events**: Specific events and ceremonies
- **Sports**: Athletic activities and competitions
- **Training**: Vocational training sessions
- **Community**: Community engagement activities

### Storage Limitations
- Images are stored in browser localStorage
- Total storage limit: ~5-10MB (browser dependent)
- For production, implement cloud storage (AWS S3, Cloudinary, etc.)

## Troubleshooting

### Images Not Appearing
1. Check if you're logged into admin
2. Verify the upload was successful (check Manage tab)
3. Refresh the Gallery page
4. Clear browser cache if needed

### Upload Failed
1. Check image file size (must be under 10MB)
2. Ensure image format is supported (JPG, PNG, GIF)
3. Try uploading one image at a time
4. Check browser console for errors

### Lost Images After Browser Refresh
- This is normal - localStorage is browser-specific
- Images will persist in the same browser
- For production, use a proper database

## Security Recommendations for Production

⚠️ **Current Implementation is for Demo Only**

For production deployment:

1. **Backend Authentication**
   - Implement JWT or session-based auth
   - Use secure password hashing (bcrypt)
   - Add multi-factor authentication

2. **Image Storage**
   - Use cloud storage (AWS S3, Google Cloud Storage)
   - Implement CDN for faster delivery
   - Add image optimization

3. **Access Control**
   - Implement role-based access (admin, editor, viewer)
   - Add audit logs for all actions
   - Rate limiting for uploads

4. **Security Headers**
   - Enable HTTPS only
   - Add CORS policies
   - Implement CSP headers

5. **Validation**
   - Server-side file validation
   - Virus scanning for uploads
   - File size and type restrictions

## Support

For technical issues or questions:
- Check the main README.md
- Review browser console for errors
- Contact the development team

---

**Remember**: This admin panel is a demonstration. Always implement proper security measures for production use.
