// Netlify Blobs storage service
// This replaces localStorage with cloud storage so images work on all devices

const API_BASE = '/.netlify/functions';

export interface UploadedImage {
  id: string;
  url: string;
  alt: string;
  uploadedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

// Fetch all data from Netlify Blobs
export async function fetchAllData() {
  try {
    const response = await fetch(`${API_BASE}/get-images`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return {
      images: data.images || [],
      siteImages: data.siteImages || {},
      impactImages: data.impactImages || [],
      blogPosts: data.blogPosts || [],
    };
  } catch (error) {
    console.error('Error fetching data from Netlify Blobs:', error);
    // Fallback to localStorage if Netlify Blobs fails
    return {
      images: JSON.parse(localStorage.getItem('millsStarImages') || '[]'),
      siteImages: JSON.parse(localStorage.getItem('millsStarSiteImages') || '{}'),
      impactImages: JSON.parse(localStorage.getItem('millsStarImpactImages') || '[]'),
      blogPosts: JSON.parse(localStorage.getItem('millsStarBlogPosts') || '[]'),
    };
  }
}

// Save gallery images
export async function saveGalleryImages(images: UploadedImage[]) {
  try {
    const response = await fetch(`${API_BASE}/save-images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'gallery-images',
        data: images,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save gallery images');
    }
    
    // Also save to localStorage as backup
    localStorage.setItem('millsStarImages', JSON.stringify(images));
    
    return true;
  } catch (error) {
    console.error('Error saving gallery images:', error);
    // Fallback to localStorage only
    localStorage.setItem('millsStarImages', JSON.stringify(images));
    return false;
  }
}

// Save site images
export async function saveSiteImages(siteImages: Record<string, string>) {
  try {
    const response = await fetch(`${API_BASE}/save-images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'site-images',
        data: siteImages,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save site images');
    }
    
    // Also save to localStorage as backup
    localStorage.setItem('millsStarSiteImages', JSON.stringify(siteImages));
    
    return true;
  } catch (error) {
    console.error('Error saving site images:', error);
    // Fallback to localStorage only
    localStorage.setItem('millsStarSiteImages', JSON.stringify(siteImages));
    return false;
  }
}

// Save impact images
export async function saveImpactImages(impactImages: UploadedImage[]) {
  try {
    const response = await fetch(`${API_BASE}/save-images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'impact-images',
        data: impactImages,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save impact images');
    }
    
    // Also save to localStorage as backup
    localStorage.setItem('millsStarImpactImages', JSON.stringify(impactImages));
    
    return true;
  } catch (error) {
    console.error('Error saving impact images:', error);
    // Fallback to localStorage only
    localStorage.setItem('millsStarImpactImages', JSON.stringify(impactImages));
    return false;
  }
}

// Save blog posts
export async function saveBlogPosts(blogPosts: BlogPost[]) {
  try {
    const response = await fetch(`${API_BASE}/save-images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'blog-posts',
        data: blogPosts,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save blog posts');
    }
    
    // Also save to localStorage as backup
    localStorage.setItem('millsStarBlogPosts', JSON.stringify(blogPosts));
    
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    // Fallback to localStorage only
    localStorage.setItem('millsStarBlogPosts', JSON.stringify(blogPosts));
    return false;
  }
}

// Migrate existing localStorage data to Netlify Blobs
export async function migrateLocalStorageToBlobs() {
  try {
    const images = JSON.parse(localStorage.getItem('millsStarImages') || '[]');
    const siteImages = JSON.parse(localStorage.getItem('millsStarSiteImages') || '{}');
    const impactImages = JSON.parse(localStorage.getItem('millsStarImpactImages') || '[]');
    const blogPosts = JSON.parse(localStorage.getItem('millsStarBlogPosts') || '[]');
    
    if (images.length > 0) {
      await saveGalleryImages(images);
    }
    if (Object.keys(siteImages).length > 0) {
      await saveSiteImages(siteImages);
    }
    if (impactImages.length > 0) {
      await saveImpactImages(impactImages);
    }
    if (blogPosts.length > 0) {
      await saveBlogPosts(blogPosts);
    }
    
    console.log('Successfully migrated localStorage data to Netlify Blobs');
    return true;
  } catch (error) {
    console.error('Error migrating data:', error);
    return false;
  }
}
