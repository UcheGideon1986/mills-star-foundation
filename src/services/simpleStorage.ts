// Simple storage service using static JSON file
// This works immediately without any Netlify configuration

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

interface StorageData {
  images: UploadedImage[];
  siteImages: Record<string, string>;
  impactImages: UploadedImage[];
  blogPosts: BlogPost[];
  heroSlides?: string[];
  lastUpdated: string;
}

// Fetch data from static JSON file
export async function fetchAllData(): Promise<StorageData> {
  try {
    const response = await fetch('/data/images.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return {
      images: data.images || [],
      siteImages: data.siteImages || {},
      impactImages: data.impactImages || [],
      blogPosts: data.blogPosts || [],
      lastUpdated: data.lastUpdated || '',
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return empty data if fetch fails
    return {
      images: [],
      siteImages: {},
      impactImages: [],
      blogPosts: [],
      lastUpdated: '',
    };
  }
}

// Export current localStorage data as JSON
// Admin can copy this and update the images.json file
export function exportLocalStorageData(): string {
  const images = JSON.parse(localStorage.getItem('millsStarImages') || '[]');
  const siteImages = JSON.parse(localStorage.getItem('millsStarSiteImages') || '{}');
  const impactImages = JSON.parse(localStorage.getItem('millsStarImpactImages') || '[]');
  const blogPosts = JSON.parse(localStorage.getItem('millsStarBlogPosts') || '[]');
  const heroSlides = JSON.parse(localStorage.getItem('millsStarHeroSlides') || '[]');
  
  // Convert to cloud format
  const cloudImages = images.map((img: any) => ({
    id: img.id,
    url: img.url,
    alt: img.title || 'Image',
    uploadedAt: img.uploadDate || new Date().toISOString(),
  }));
  
  const cloudImpactImages = impactImages.map((img: any) => ({
    id: img.id,
    url: img.url,
    alt: img.title || 'Impact Image',
    uploadedAt: img.uploadDate || new Date().toISOString(),
  }));
  
  const cloudBlogPosts = blogPosts.map((post: any) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    date: post.date,
    imageUrl: post.image || post.imageUrl || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  }));
  
  const data: StorageData = {
    images: cloudImages,
    siteImages: siteImages,
    impactImages: cloudImpactImages,
    blogPosts: cloudBlogPosts,
    heroSlides: heroSlides.length > 0 ? heroSlides : undefined,
    lastUpdated: new Date().toISOString(),
  };
  
  return JSON.stringify(data, null, 2);
}

// Download the JSON file
export function downloadDataAsJSON() {
  const jsonString = exportLocalStorageData();
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'images.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
