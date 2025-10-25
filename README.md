# Mills Star Foundation Website

A modern, responsive website for Mills Star Foundation - empowering the differently abled through education, community engagement, vocational training, and wheelchair sports.

## Features

- 🏠 **Home Page** - Hero section with impact statistics and sports programs
- ℹ️ **About Page** - Mission, vision, and program details
- 🖼️ **Gallery Page** - Dynamic image gallery with category filtering and lightbox
- 📝 **Blog Page** - News and updates with newsletter signup
- 📞 **Contact Page** - Contact form and location information
- 💝 **Donate Page** - Comprehensive donation page with multiple payment options
- 🔐 **Admin Panel** - Secure image upload and management system

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Admin Panel

### Accessing the Admin Panel

1. Navigate to the admin page by adding `/admin` to the URL or manually changing the page state
2. Login with the password: **admin123**

### Uploading Images

1. **Login** to the admin panel
2. Go to the **Upload Images** tab
3. Fill in the image details:
   - **Image Title**: Give your image a descriptive title
   - **Category**: Choose from Gallery, Events, Sports, Training, or Community
4. **Select Images**: Click the upload area or drag and drop images
5. **Preview**: Review your selected images
6. Click **Upload** to save the images

### Managing Images

1. Go to the **Manage Images** tab
2. View all uploaded images with their details
3. **View**: Click to open the image in a new tab
4. **Delete**: Remove individual images
5. **Clear All**: Remove all images at once (use with caution!)

### Image Storage

- Images are stored in the browser's **localStorage**
- Images are converted to base64 format for storage
- Maximum recommended size: 10MB per image
- Images persist across browser sessions
- Images are automatically displayed in the Gallery page

## Gallery Page

The Gallery page automatically displays all uploaded images:

- **Category Filtering**: Filter images by category (All, Gallery, Events, Sports, Training, Community)
- **Lightbox View**: Click any image to view it in full size
- **Navigation**: Use arrow keys or buttons to navigate between images
- **Real-time Updates**: New images appear automatically after upload

## Project Structure

```
src/
├── components/
│   └── figma/
│       ├── ui/           # Reusable UI components
│       └── ImageWithFallback.tsx
├── Admin.tsx             # Admin panel for image management
├── Gallery.tsx           # Public gallery page
├── Home.tsx              # Home page
├── About.tsx             # About page
├── Blog.tsx              # Blog page
├── Contacts.tsx          # Contact page
├── Donate.tsx            # Donation page
├── Navigation.tsx        # Main navigation
├── Footer.tsx            # Footer component
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Security Notes

⚠️ **Important**: The current admin authentication is for demonstration purposes only.

For production use, you should:
- Implement proper backend authentication
- Use a secure database for image storage
- Add user roles and permissions
- Implement HTTPS
- Add rate limiting
- Validate and sanitize all uploads

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a demonstration project for Mills Star Foundation. For contributions or inquiries, please contact the foundation directly.

## License

© 2024 Mills Star Foundation. All rights reserved.

---

**WE SEE YOU!**
