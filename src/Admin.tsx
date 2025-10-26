import { useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Trash2, Eye, Settings, Search, Filter, ChevronLeft, ChevronRight, BookOpen, Edit, ToggleLeft, ToggleRight, Target, Users, Activity, Heart, Cloud, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/figma/ui/card';
import { Button } from './components/figma/ui/button';
import { Input } from './components/figma/ui/input';
import { Label } from './components/figma/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/figma/ui/tabs';
import { cloudinaryService } from './services/cloudinaryService';
import { fetchAllData as fetchBlobData, saveGalleryImages, saveSiteImages, saveImpactImages, saveBlogPosts } from './services/blobStorage';
import { fetchAllData as fetchSimpleData, downloadDataAsJSON } from './services/simpleStorage';

interface UploadedImage {
  id: string;
  url: string;
  cloudinaryPublicId?: string;
  title: string;
  category: string;
  uploadDate: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  cloudinaryPublicId?: string;
  category: string;
  published: boolean;
}

interface SiteImage {
  key: string;
  label: string;
  description: string;
  currentUrl: string;
  section: string;
}

export function Admin() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imageTitle, setImageTitle] = useState('');
  const [imageCategory, setImageCategory] = useState('gallery');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [siteImages, setSiteImages] = useState<Record<string, string>>({});
  const [selectedSiteImageKey, setSelectedSiteImageKey] = useState<string>('');
  const [siteImageFile, setSiteImageFile] = useState<File | null>(null);
  const [siteImagePreview, setSiteImagePreview] = useState<string>('');
  
  // Pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState<string>('all');
  const imagesPerPage = 12;
  
  // Compression state
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState('');
  
  // Impact images state (Our Impact in Action section)
  const [impactImages, setImpactImages] = useState<UploadedImage[]>([]);
  const [selectedImpactSlot, setSelectedImpactSlot] = useState<number | null>(null);
  const [impactImageFile, setImpactImageFile] = useState<File | null>(null);
  const [impactImagePreview, setImpactImagePreview] = useState<string>('');
  const [impactImageTitle, setImpactImageTitle] = useState<string>('');
  
  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Mills Star Foundation');
  const [blogCategory, setBlogCategory] = useState('News');
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState('');
  const [blogPublished, setBlogPublished] = useState(true);
  
  // Impact stats state
  const [impactStats, setImpactStats] = useState([
    { number: '3', label: 'Countries', icon: 'Target' },
    { number: '1000+', label: 'Books Donated', icon: 'BookOpen' },
    { number: '500+', label: 'Lives Impacted', icon: 'Users' },
    { number: '6', label: 'Sports Programs', icon: 'Activity' },
  ]);
  
  // Blog hero state
  const [blogHeroTitle, setBlogHeroTitle] = useState('Our Blog');
  const [blogHeroTagline, setBlogHeroTagline] = useState('Stories of impact, hope, and empowerment');
  
  // Cloud sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  
  // Hero slideshow state
  const [heroSlides, setHeroSlides] = useState<string[]>([]);
  const [heroSlideFiles, setHeroSlideFiles] = useState<File[]>([]);
  const [heroSlidePreview, setHeroSlidePreview] = useState<string[]>([]);
  const [isUploadingSlides, setIsUploadingSlides] = useState(false);

  // Load images from localStorage on mount
  useEffect(() => {
    const storedImages = localStorage.getItem('millsStarImages');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
    
    const storedSiteImages = localStorage.getItem('millsStarSiteImages');
    if (storedSiteImages) {
      setSiteImages(JSON.parse(storedSiteImages));
    }
    
    const storedImpactImages = localStorage.getItem('millsStarImpactImages');
    if (storedImpactImages) {
      setImpactImages(JSON.parse(storedImpactImages));
    } else {
      // Initialize with 6 empty slots
      setImpactImages(Array(6).fill(null).map((_, index) => ({
        id: `impact-${index}`,
        url: '',
        title: `Impact Image ${index + 1}`,
        category: 'impact',
        uploadDate: new Date().toISOString(),
      })));
    }
    
    const storedBlogPosts = localStorage.getItem('millsStarBlogPosts');
    if (storedBlogPosts) {
      setBlogPosts(JSON.parse(storedBlogPosts));
    } else {
      // Initialize with default blog posts
      const defaultBlogPosts: BlogPost[] = [
        {
          id: 'blog-1',
          title: 'Wheelchair Basketball Tournament 2024: Celebrating Athletic Excellence',
          excerpt: 'Our annual wheelchair basketball tournament brought together athletes from across Nigeria and Ghana, showcasing incredible talent and determination.',
          content: 'Our annual wheelchair basketball tournament brought together athletes from across Nigeria and Ghana, showcasing incredible talent and determination. The event featured teams from multiple countries competing in a spirit of sportsmanship and excellence.',
          date: 'October 5, 2024',
          author: 'Mills Star Foundation',
          image: 'https://images.unsplash.com/photo-1657145537587-bc61af46050c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwYmFza2V0YmFsbHxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'Sports',
          published: true,
        },
        {
          id: 'blog-2',
          title: 'Empowering Communities Through Reading: 1,000 Books Donated',
          excerpt: 'Thanks to our partners, we have distributed over 1,000 books to differently abled individuals, opening doors to knowledge and imagination.',
          content: 'Thanks to our partners, we have distributed over 1,000 books to differently abled individuals, opening doors to knowledge and imagination. This initiative has transformed lives and created opportunities for learning and growth.',
          date: 'September 20, 2024',
          author: 'Mills Star Foundation',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxib29rcyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'Education',
          published: true,
        },
        {
          id: 'blog-3',
          title: 'Vocational Training Success Stories: Building Independent Futures',
          excerpt: 'Meet the graduates of our vocational training programs who are now running successful businesses and contributing to their communities.',
          content: 'Meet the graduates of our vocational training programs who are now running successful businesses and contributing to their communities. Their success stories inspire us to continue our mission of empowerment through education and training.',
          date: 'August 15, 2024',
          author: 'Mills Star Foundation',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2NhdGlvbmFsJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYwNjg1NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'Training',
          published: true,
        },
        {
          id: 'blog-4',
          title: 'Expanding Our Reach: New Programs Coming to West Africa',
          excerpt: 'We are excited to announce plans to expand our operations throughout West Africa, bringing hope and opportunity to more communities.',
          content: 'We are excited to announce plans to expand our operations throughout West Africa, bringing hope and opportunity to more communities. This expansion will allow us to serve more people and make a greater impact across the region.',
          date: 'July 28, 2024',
          author: 'Mills Star Foundation',
          image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2ElMjBtYXB8ZW58MXx8fHwxNzYwNjg1NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'News',
          published: true,
        },
        {
          id: 'blog-5',
          title: 'Health and Hygiene Education: Making a Lasting Impact',
          excerpt: 'Our annual health and hygiene education events provide essential knowledge and supplies to help communities maintain wellness.',
          content: 'Our annual health and hygiene education events provide essential knowledge and supplies to help communities maintain wellness. We believe that health education is fundamental to empowering individuals and creating sustainable change.',
          date: 'June 12, 2024',
          author: 'Mills Star Foundation',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBlZHVjYXRpb258ZW58MXx8fHwxNzYwNjg1NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'Health',
          published: true,
        },
        {
          id: 'blog-6',
          title: 'Wheelchair Tennis Championship: Rising Stars of Ghana',
          excerpt: 'Young athletes demonstrated remarkable skill and sportsmanship at this years wheelchair tennis championship in Accra.',
          content: 'Young athletes demonstrated remarkable skill and sportsmanship at this years wheelchair tennis championship in Accra. The tournament showcased the incredible talent and dedication of our athletes, inspiring the next generation.',
          date: 'May 3, 2024',
          author: 'Mills Star Foundation',
          image: 'https://images.unsplash.com/photo-1740572497508-e5d62c77f4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwc3BvcnRzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MDY4NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
          category: 'Sports',
          published: true,
        },
      ];
      setBlogPosts(defaultBlogPosts);
      localStorage.setItem('millsStarBlogPosts', JSON.stringify(defaultBlogPosts));
    }
    
    const storedImpactStats = localStorage.getItem('millsStarImpactStats');
    if (storedImpactStats) {
      setImpactStats(JSON.parse(storedImpactStats));
    }
    
    const storedBlogHero = localStorage.getItem('millsStarBlogHero');
    if (storedBlogHero) {
      const blogHero = JSON.parse(storedBlogHero);
      setBlogHeroTitle(blogHero.title);
      setBlogHeroTagline(blogHero.tagline);
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      try {
        localStorage.setItem('millsStarImages', JSON.stringify(images));
      } catch (error) {
        console.error('Failed to save images to localStorage:', error);
      }
    }
  }, [images]);

  // Save site images to localStorage
  useEffect(() => {
    if (Object.keys(siteImages).length > 0) {
      try {
        localStorage.setItem('millsStarSiteImages', JSON.stringify(siteImages));
        // Trigger a storage event to notify other components
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Failed to save site images to localStorage:', error);
      }
    }
  }, [siteImages]);

  // Save impact images to localStorage
  useEffect(() => {
    if (impactImages.length > 0) {
      try {
        localStorage.setItem('millsStarImpactImages', JSON.stringify(impactImages));
        // Trigger a storage event to notify other components
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Failed to save impact images to localStorage:', error);
      }
    }
  }, [impactImages]);

  // Save impact stats to localStorage
  useEffect(() => {
    if (impactStats.length > 0) {
      try {
        localStorage.setItem('millsStarImpactStats', JSON.stringify(impactStats));
        // Trigger a storage event to notify other components
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Failed to save impact stats to localStorage:', error);
      }
    }
  }, [impactStats]);

  // Save blog hero to localStorage
  useEffect(() => {
    try {
      const blogHero = { title: blogHeroTitle, tagline: blogHeroTagline };
      localStorage.setItem('millsStarBlogHero', JSON.stringify(blogHero));
      // Trigger a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Failed to save blog hero to localStorage:', error);
    }
  }, [blogHeroTitle, blogHeroTagline]);

  // Load hero slideshow images
  useEffect(() => {
    const storedSlides = localStorage.getItem('millsStarHeroSlides');
    if (storedSlides) {
      setHeroSlides(JSON.parse(storedSlides));
    }
  }, []);

  // Save hero slideshow images
  useEffect(() => {
    if (heroSlides.length > 0) {
      localStorage.setItem('millsStarHeroSlides', JSON.stringify(heroSlides));
    }
  }, [heroSlides]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection (in production, use proper authentication)
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // Sync localStorage data to Netlify Blobs (cloud storage)
  const handleSyncToCloud = async () => {
    setIsSyncing(true);
    setSyncStatus('Syncing to cloud...');
    
    try {
      // Get data from localStorage
      const localImages = JSON.parse(localStorage.getItem('millsStarImages') || '[]');
      const localSiteImages = JSON.parse(localStorage.getItem('millsStarSiteImages') || '{}');
      const localImpactImages = JSON.parse(localStorage.getItem('millsStarImpactImages') || '[]');
      const localBlogPosts = JSON.parse(localStorage.getItem('millsStarBlogPosts') || '[]');
      
      // Convert to cloud format and save
      const cloudImages = localImages.map((img: any) => ({
        id: img.id,
        url: img.url,
        alt: img.title || 'Image',
        uploadedAt: img.uploadDate || new Date().toISOString(),
      }));
      
      const cloudImpactImages = localImpactImages.map((img: any) => ({
        id: img.id,
        url: img.url,
        alt: img.title || 'Impact Image',
        uploadedAt: img.uploadDate || new Date().toISOString(),
      }));
      
      const cloudBlogPosts = localBlogPosts.map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.date,
        imageUrl: post.image,
      }));
      
      // Save to cloud
      await saveGalleryImages(cloudImages);
      await saveSiteImages(localSiteImages);
      await saveImpactImages(cloudImpactImages);
      await saveBlogPosts(cloudBlogPosts);
      
      setSyncStatus('✅ Successfully synced to cloud! Images now visible on all devices.');
      setTimeout(() => setSyncStatus(''), 5000);
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('❌ Sync failed. Please try again.');
      setTimeout(() => setSyncStatus(''), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Load data from Netlify Blobs (cloud storage)
  const handleLoadFromCloud = async () => {
    setIsSyncing(true);
    setSyncStatus('Loading from cloud...');
    
    try {
      const data = await fetchBlobData();
      
      // Convert cloud format back to local format
      if (data.images && data.images.length > 0) {
        const localImages = data.images.map((img: any) => ({
          id: img.id,
          url: img.url,
          title: img.alt || 'Image',
          category: 'gallery',
          uploadDate: img.uploadedAt || new Date().toISOString(),
        }));
        setImages(localImages);
        localStorage.setItem('millsStarImages', JSON.stringify(localImages));
      }
      
      if (data.siteImages && Object.keys(data.siteImages).length > 0) {
        setSiteImages(data.siteImages);
        localStorage.setItem('millsStarSiteImages', JSON.stringify(data.siteImages));
      }
      
      if (data.impactImages && data.impactImages.length > 0) {
        const localImpactImages = data.impactImages.map((img: any) => ({
          id: img.id,
          url: img.url,
          title: img.alt || 'Impact Image',
          category: 'impact',
          uploadDate: img.uploadedAt || new Date().toISOString(),
        }));
        setImpactImages(localImpactImages);
        localStorage.setItem('millsStarImpactImages', JSON.stringify(localImpactImages));
      }
      
      if (data.blogPosts && data.blogPosts.length > 0) {
        const localBlogPosts = data.blogPosts.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: post.date,
          image: post.imageUrl || '',
          category: 'News',
          published: true,
        }));
        setBlogPosts(localBlogPosts);
        localStorage.setItem('millsStarBlogPosts', JSON.stringify(localBlogPosts));
      }
      
      setSyncStatus('✅ Successfully loaded from cloud!');
      setTimeout(() => setSyncStatus(''), 5000);
    } catch (error) {
      console.error('Load error:', error);
      setSyncStatus('❌ Load failed. Please try again.');
      setTimeout(() => setSyncStatus(''), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }

    if (!imageTitle.trim()) {
      alert('Please enter an image title');
      return;
    }

    // Check if Cloudinary is configured
    if (!cloudinaryService.isConfigured()) {
      alert('Cloudinary is not configured. Please set up your credentials in the .env file.');
      return;
    }

    // Check capacity limit
    if (images.length + selectedFiles.length > 100) {
      alert(`Cannot upload ${selectedFiles.length} images. You can only store up to 100 images total. Current: ${images.length}. Please delete some images first.`);
      return;
    }

    setIsCompressing(true);
    setCompressionProgress('Uploading to cloud storage...');

    try {
      const newImages: UploadedImage[] = [];
      
      // Upload to Cloudinary
      for (let index = 0; index < selectedFiles.length; index++) {
        const file = selectedFiles[index];
        
        setCompressionProgress(`Uploading ${index + 1}/${selectedFiles.length}: ${file.name}`);
        
        try {
          // Upload to Cloudinary (it handles compression automatically)
          const result = await cloudinaryService.uploadImage(file, {
            folder: 'mills-star-foundation/gallery',
            tags: [imageCategory]
          });

          const newImage: UploadedImage = {
            id: result.public_id,
            url: result.secure_url,
            cloudinaryPublicId: result.public_id,
            title: selectedFiles.length > 1 ? `${imageTitle} ${index + 1}` : imageTitle,
            category: imageCategory,
            uploadDate: new Date().toISOString(),
          };

          newImages.push(newImage);
        } catch (error) {
          console.error('Error uploading file:', error);
          setIsCompressing(false);
          setCompressionProgress('');
          alert(`Failed to upload file: ${file.name}. ${error instanceof Error ? error.message : 'Unknown error'}`);
          return;
        }
      }

      // Save metadata to localStorage (just URLs and info, not the actual images)
      try {
        const updatedImages = [...images, ...newImages];
        
        // Try to save to localStorage
        try {
          localStorage.setItem('millsStarImages', JSON.stringify(updatedImages));
        } catch (quotaError) {
          // localStorage is full, try to clean up old data
          console.warn('localStorage quota exceeded, attempting cleanup...');
          
          // Clear old data that might be taking space
          const keysToCheck = ['millsStarImages', 'millsStarSiteImages', 'millsStarImpactImages', 'millsStarBlogPosts'];
          let freedSpace = false;
          
          for (const key of keysToCheck) {
            const data = localStorage.getItem(key);
            if (data && data.length > 100000) { // If data is larger than 100KB
              console.log(`Large data found in ${key}, attempting to optimize...`);
              // For images, keep only the most recent ones
              if (key === 'millsStarImages' && images.length > 50) {
                const recentImages = images.slice(-50); // Keep last 50 images
                localStorage.setItem(key, JSON.stringify(recentImages));
                freedSpace = true;
                break;
              }
            }
          }
          
          // Try saving again after cleanup
          if (freedSpace) {
            try {
              localStorage.setItem('millsStarImages', JSON.stringify(updatedImages));
            } catch (retryError) {
              throw new Error('Storage still full after cleanup. Please delete some old images.');
            }
          } else {
            throw new Error('Storage quota exceeded. Please delete some old images to free up space.');
          }
        }
        
        setImages(updatedImages);
        
        // Reset form
        setSelectedFiles([]);
        setPreviewUrls([]);
        setImageTitle('');
        
        setCompressionProgress(`✓ Successfully uploaded ${newImages.length} image(s) to cloud!`);
        setTimeout(() => {
          setCompressionProgress('');
          setIsCompressing(false);
        }, 2000);
      } catch (storageError) {
        console.error('localStorage error:', storageError);
        setIsCompressing(false);
        setCompressionProgress('');
        
        // More helpful error message
        const errorMessage = storageError instanceof Error ? storageError.message : 'Failed to save image metadata.';
        alert(`${errorMessage}\n\nTip: Try deleting some old images from the "Manage Images" tab to free up space.`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setIsCompressing(false);
      setCompressionProgress('');
      alert(`Failed to upload images. ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const handleDelete = (id: string) => {
    const imageToDelete = images.find(img => img.id === id);
    const imageName = imageToDelete?.title || 'this image';
    
    if (confirm(`Are you sure you want to delete "${imageName}"?\n\nThis will remove it from:\n• Gallery display\n• Your image library\n• All pages where it appears\n\nThis action cannot be undone.`)) {
      setImages(prev => prev.filter(img => img.id !== id));
      
      // Show success message
      alert(`✅ Image "${imageName}" has been deleted successfully!`);
    }
  };

  const clearAllImages = () => {
    const totalImages = images.length;
    
    if (confirm(`⚠️ WARNING: Delete ALL ${totalImages} Images?\n\nThis will permanently delete:\n• All ${totalImages} uploaded images\n• All gallery photos\n• All event images\n• All sports photos\n\nThis action CANNOT be undone!\n\nAre you absolutely sure?`)) {
      // Double confirmation for safety
      if (confirm(`Final confirmation: Delete all ${totalImages} images?\n\nClick OK to proceed with deletion.`)) {
        setImages([]);
        localStorage.removeItem('millsStarImages');
        alert(`✅ All ${totalImages} images have been deleted.`);
      }
    }
  };

  const handleSiteImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSiteImageFile(file);
      const url = URL.createObjectURL(file);
      setSiteImagePreview(url);
    }
  };

  const handleSiteImageUpload = async () => {
    if (!siteImageFile || !selectedSiteImageKey) {
      alert('Please select an image location and file');
      return;
    }

    // Check if Cloudinary is configured
    if (!cloudinaryService.isConfigured()) {
      alert('Cloudinary is not configured. Please set up your credentials in the .env file.');
      return;
    }

    setIsCompressing(true);
    setCompressionProgress('Uploading site image to cloud...');

    try {
      // Upload to Cloudinary
      const result = await cloudinaryService.uploadImage(siteImageFile, {
        folder: 'mills-star-foundation/site-images',
        tags: [selectedSiteImageKey]
      });

      try {
        const updatedSiteImages = {
          ...siteImages,
          [selectedSiteImageKey]: result.secure_url
        };
        
        localStorage.setItem('millsStarSiteImages', JSON.stringify(updatedSiteImages));
        setSiteImages(updatedSiteImages);
        
        // Reset form
        setSiteImageFile(null);
        setSiteImagePreview('');
        setSelectedSiteImageKey('');
        
        setCompressionProgress('✓ Site image updated successfully!');
        setTimeout(() => {
          setCompressionProgress('');
          setIsCompressing(false);
        }, 2000);
      } catch (storageError) {
        console.error('localStorage error:', storageError);
        setIsCompressing(false);
        setCompressionProgress('');
        alert('Failed to save image metadata. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setIsCompressing(false);
      setCompressionProgress('');
      alert(`Failed to upload image. ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const resetSiteImage = (key: string) => {
    if (confirm('Reset this image to default?')) {
      setSiteImages(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  // Impact images handlers
  const handleImpactImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImpactImageFile(file);
      const url = URL.createObjectURL(file);
      setImpactImagePreview(url);
    }
  };

  const handleImpactImageUpload = async () => {
    if (!impactImageFile || selectedImpactSlot === null) {
      alert('Please select an image slot and file');
      return;
    }

    if (!impactImageTitle.trim()) {
      alert('Please enter an image title');
      return;
    }

    // Check if Cloudinary is configured
    if (!cloudinaryService.isConfigured()) {
      alert('Cloudinary is not configured. Please set up your credentials in the .env file.');
      return;
    }

    setIsCompressing(true);
    setCompressionProgress('Uploading impact image to cloud...');

    try {
      // Upload to Cloudinary
      const result = await cloudinaryService.uploadImage(impactImageFile, {
        folder: 'mills-star-foundation/impact-images',
        tags: ['impact', `slot-${selectedImpactSlot}`]
      });

      try {
        const updatedImpactImages = [...impactImages];
        updatedImpactImages[selectedImpactSlot] = {
          id: result.public_id,
          url: result.secure_url,
          cloudinaryPublicId: result.public_id,
          title: impactImageTitle,
          category: 'impact',
          uploadDate: new Date().toISOString(),
        };
        
        localStorage.setItem('millsStarImpactImages', JSON.stringify(updatedImpactImages));
        setImpactImages(updatedImpactImages);
        
        // Reset form
        setImpactImageFile(null);
        setImpactImagePreview('');
        setSelectedImpactSlot(null);
        setImpactImageTitle('');
        
        setCompressionProgress('✓ Impact image updated successfully!');
        setTimeout(() => {
          setCompressionProgress('');
          setIsCompressing(false);
        }, 2000);
      } catch (storageError) {
        console.error('localStorage error:', storageError);
        setIsCompressing(false);
        setCompressionProgress('');
        alert('Failed to save image metadata. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setIsCompressing(false);
      setCompressionProgress('');
      alert(`Failed to upload image. ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const resetImpactImage = (index: number) => {
    if (confirm('Reset this impact image to default?')) {
      const updatedImpactImages = [...impactImages];
      updatedImpactImages[index] = {
        id: `impact-${index}`,
        url: '',
        title: `Impact Image ${index + 1}`,
        category: 'impact',
        uploadDate: new Date().toISOString(),
      };
      setImpactImages(updatedImpactImages);
    }
  };

  // Blog handlers
  const handleBlogImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogImageFile(file);
      const url = URL.createObjectURL(file);
      setBlogImagePreview(url);
    }
  };

  const resetBlogForm = () => {
    setEditingPost(null);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogAuthor('Mills Star Foundation');
    setBlogCategory('News');
    setBlogImageFile(null);
    setBlogImagePreview('');
    setBlogPublished(true);
  };

  const handleCreateOrUpdateBlog = async () => {
    if (!blogTitle.trim() || !blogExcerpt.trim() || !blogContent.trim()) {
      alert('Please fill in title, excerpt, and content');
      return;
    }

    setIsCompressing(true);
    setCompressionProgress(editingPost ? 'Updating blog post...' : 'Creating blog post...');

    try {
      let imageUrl = editingPost?.image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';
      let cloudinaryPublicId = editingPost?.cloudinaryPublicId;

      // Upload new image if selected and Cloudinary is configured
      if (blogImageFile) {
        if (cloudinaryService.isConfigured()) {
          setCompressionProgress('Uploading featured image...');
          try {
            const result = await cloudinaryService.uploadImage(blogImageFile, {
              folder: 'mills-star-foundation/blog',
              tags: blogCategory ? [blogCategory.toLowerCase()] : ['blog']
            });
            imageUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
            setCompressionProgress('Image uploaded successfully!');
          } catch (uploadError) {
            console.error('Image upload failed:', uploadError);
            const errorMessage = uploadError instanceof Error ? uploadError.message : 'Unknown error';
            
            // Show detailed error to help debug
            alert(`Image upload failed: ${errorMessage}\n\nPossible causes:\n• Image file too large (max 10MB)\n• Network connection issue\n• Cloudinary rate limit\n\nThe post will be created with a default image.\nYou can edit and upload the image later.`);
          }
        } else {
          alert('Cloudinary not configured. Post will be created with default image. Configure Cloudinary to upload custom images.');
        }
      }

      const blogPost: BlogPost = {
        id: editingPost?.id || `blog-${Date.now()}`,
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        date: editingPost?.date || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        author: blogAuthor || 'Mills Star Foundation',
        image: imageUrl,
        cloudinaryPublicId,
        category: blogCategory || 'News',
        published: blogPublished,
      };

      try {
        let updatedPosts;
        if (editingPost) {
          updatedPosts = blogPosts.map(post => 
            post.id === editingPost.id ? blogPost : post
          );
        } else {
          updatedPosts = [blogPost, ...blogPosts];
        }

        // Try to save to localStorage with intelligent cleanup and optimization
        try {
          // Optimize blog posts to save space - remove unnecessary fields
          const optimizedPosts = updatedPosts.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            date: post.date,
            author: post.author,
            image: post.image,
            category: post.category,
            published: post.published
            // cloudinaryPublicId removed to save space
          }));
          localStorage.setItem('millsStarBlogPosts', JSON.stringify(optimizedPosts));
        } catch (quotaError) {
          // localStorage is full, try to clean up
          console.warn('localStorage quota exceeded for blog posts, attempting cleanup...');
          
          // Try to free up space from other storage
          const keysToCheck = ['millsStarImages', 'millsStarSiteImages', 'millsStarImpactImages'];
          let freedSpace = false;
          
          for (const key of keysToCheck) {
            const data = localStorage.getItem(key);
            if (data && data.length > 100000) { // If data is larger than 100KB
              console.log(`Large data found in ${key}, attempting to optimize...`);
              // For images, keep only the most recent ones
              if (key === 'millsStarImages') {
                try {
                  const images = JSON.parse(data);
                  if (images.length > 10) {
                    const recentImages = images.slice(-10); // Keep last 10 images (optimized for 20+ blog posts)
                    localStorage.setItem(key, JSON.stringify(recentImages));
                    freedSpace = true;
                    console.log(`Reduced ${key} from ${images.length} to ${recentImages.length} items to allow 20+ blog posts`);
                    break;
                  }
                } catch (e) {
                  console.error('Error optimizing storage:', e);
                }
              }
            }
          }
          
          // Try saving again after cleanup
          if (freedSpace) {
            try {
              localStorage.setItem('millsStarBlogPosts', JSON.stringify(updatedPosts));
              console.log('Successfully saved after cleanup');
            } catch (retryError) {
              throw new Error('Storage still full after cleanup. Please delete some old images or blog posts.');
            }
          } else {
            throw new Error('Storage quota exceeded. Please delete some old images or blog posts to free up space.');
          }
        }
        
        setBlogPosts(updatedPosts);
        
        resetBlogForm();
        
        setCompressionProgress(editingPost ? '✓ Blog post updated successfully!' : '✓ Blog post created successfully!');
        setTimeout(() => {
          setCompressionProgress('');
          setIsCompressing(false);
        }, 2000);
      } catch (storageError) {
        console.error('localStorage error:', storageError);
        setIsCompressing(false);
        setCompressionProgress('');
        
        // More helpful error message
        const errorMessage = storageError instanceof Error ? storageError.message : 'Failed to save blog post.';
        alert(`${errorMessage}\n\nTip: Try deleting some old images from the "Manage Images" tab or old blog posts to free up space.`);
      }
    } catch (error) {
      console.error('Blog creation error:', error);
      setIsCompressing(false);
      setCompressionProgress('');
      alert(`Failed to ${editingPost ? 'update' : 'create'} blog post. ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingPost(post);
    setBlogTitle(post.title);
    setBlogExcerpt(post.excerpt);
    setBlogContent(post.content);
    setBlogAuthor(post.author);
    setBlogCategory(post.category);
    setBlogImagePreview(post.image);
    setBlogPublished(post.published);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post? This cannot be undone.')) {
      const updatedPosts = blogPosts.filter(post => post.id !== id);
      setBlogPosts(updatedPosts);
    }
  };

  const toggleBlogPublished = (id: string) => {
    const updatedPosts = blogPosts.map(post =>
      post.id === id ? { ...post, published: !post.published } : post
    );
    setBlogPosts(updatedPosts);
  };

  // Impact stats handlers
  const handleUpdateImpactStat = (index: number, field: 'number' | 'label', value: string) => {
    const updatedStats = [...impactStats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setImpactStats(updatedStats);
  };

  const handleChangeStatIcon = (index: number, icon: string) => {
    const updatedStats = [...impactStats];
    updatedStats[index] = { ...updatedStats[index], icon };
    setImpactStats(updatedStats);
  };

  const resetImpactStats = () => {
    if (confirm('Reset impact stats to default values?')) {
      const defaultStats = [
        { number: '3', label: 'Countries', icon: 'Target' },
        { number: '1000+', label: 'Books Donated', icon: 'BookOpen' },
        { number: '500+', label: 'Lives Impacted', icon: 'Users' },
        { number: '6', label: 'Sports Programs', icon: 'Activity' },
      ];
      setImpactStats(defaultStats);
    }
  };

  // Hero slideshow handlers
  const handleHeroSlideSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setHeroSlideFiles(files);

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setHeroSlidePreview(urls);
  };

  const handleUploadHeroSlides = async () => {
    if (heroSlideFiles.length === 0) {
      alert('Please select at least one image for the slideshow');
      return;
    }

    setIsUploadingSlides(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of heroSlideFiles) {
        const response = await cloudinaryService.uploadImage(file);
        uploadedUrls.push(response.secure_url);
      }

      // Add to existing slides
      setHeroSlides([...heroSlides, ...uploadedUrls]);

      // Clear selection
      setHeroSlideFiles([]);
      setHeroSlidePreview([]);

      alert(`Successfully uploaded ${uploadedUrls.length} slide(s)!`);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload slides. Please try again.');
    } finally {
      setIsUploadingSlides(false);
    }
  };

  const handleDeleteHeroSlide = (index: number) => {
    if (confirm('Remove this slide from the slideshow?')) {
      const updated = heroSlides.filter((_, i) => i !== index);
      setHeroSlides(updated);
    }
  };

  const moveSlideUp = (index: number) => {
    if (index === 0) return;
    const updated = [...heroSlides];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setHeroSlides(updated);
  };

  const moveSlideDown = (index: number) => {
    if (index === heroSlides.length - 1) return;
    const updated = [...heroSlides];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setHeroSlides(updated);
  };

  // Filter and paginate images
  const filteredImages = images.filter(img => {
    const matchesCategory = filterCategory === 'all' || img.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      img.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchQuery]);

  const siteImageDefinitions: SiteImage[] = [
    // Home Page
    {
      key: 'heroHome',
      label: 'Home Page Hero',
      description: 'Main hero image on the homepage',
      currentUrl: siteImages['heroHome'] || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      section: 'Home'
    },
    // About Page
    {
      key: 'aboutHero',
      label: 'About Page Hero',
      description: 'Hero banner image on About page',
      currentUrl: siteImages['aboutHero'] || 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NjA2ODU2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      section: 'About'
    },
    {
      key: 'aboutWhoAreWe',
      label: 'About - Who Are We Section',
      description: 'Image beside the "Who Are We?" text',
      currentUrl: siteImages['aboutWhoAreWe'] || 'https://images.unsplash.com/photo-1657145537587-bc61af46050c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwYmFza2V0YmFsbCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      section: 'About'
    },
    {
      key: 'aboutVision',
      label: 'About - Our Vision Section',
      description: 'Image beside the "Our Vision" text',
      currentUrl: siteImages['aboutVision'] || 'https://images.unsplash.com/photo-1759756480941-7230dedf5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2NhdGlvbmFsJTIwdHJhaW5pbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      section: 'About'
    },
    // Gallery Page
    {
      key: 'galleryHero',
      label: 'Gallery Page Hero',
      description: 'Hero banner image on Gallery page',
      currentUrl: siteImages['galleryHero'] || 'https://images.unsplash.com/photo-1657145537587-bc61af46050c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      section: 'Gallery'
    },
    {
      key: 'galleryFeatured1',
      label: 'Gallery Featured Image 1',
      description: 'First featured image in gallery grid',
      currentUrl: siteImages['galleryFeatured1'] || 'https://images.unsplash.com/photo-1657145537587-bc61af46050c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwYmFza2V0YmFsbHxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      section: 'Gallery'
    },
    {
      key: 'galleryFeatured2',
      label: 'Gallery Featured Image 2',
      description: 'Second featured image in gallery grid',
      currentUrl: siteImages['galleryFeatured2'] || 'https://images.unsplash.com/photo-1740572497508-e5d62c77f4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwc3BvcnRzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MDY4NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      section: 'Gallery'
    },
    {
      key: 'galleryFeatured3',
      label: 'Gallery Featured Image 3',
      description: 'Third featured image in gallery grid',
      currentUrl: siteImages['galleryFeatured3'] || 'https://images.unsplash.com/photo-1592106680408-e7e63efbc7ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rc3xlbnwxfHx8fDE3NjA2MDMxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      section: 'Gallery'
    },
    // Blog Page
    {
      key: 'blogHero',
      label: 'Blog Page Hero',
      description: 'Hero banner image on Blog page',
      currentUrl: siteImages['blogHero'] || 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      section: 'Blog'
    },
    // Contact Page
    {
      key: 'contactHero',
      label: 'Contact Page Hero',
      description: 'Hero banner image on Contact page',
      currentUrl: siteImages['contactHero'] || 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      section: 'Contact'
    },
    // Donate Page
    {
      key: 'donateHero',
      label: 'Donate Page Hero',
      description: 'Hero banner image on Donate page',
      currentUrl: siteImages['donateHero'] || 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      section: 'Donate'
    },
    {
      key: 'donateImpact',
      label: 'Donate - Impact Section',
      description: 'Image showing donation impact',
      currentUrl: siteImages['donateImpact'] || 'https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      section: 'Donate'
    }
  ];

  const filteredSiteImages = filterSection === 'all' 
    ? siteImageDefinitions 
    : siteImageDefinitions.filter(def => def.section === filterSection);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex flex-col items-center mb-4">
              <img 
                src="/logo.svg" 
                alt="Mills Star Foundation Logo" 
                className="h-20 w-20 mb-4"
              />
              <CardTitle className="text-center">Mills Star Foundation</CardTitle>
              <p className="text-sm text-gray-500 mt-2">Admin Login</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Demo password: admin123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {/* Simple Export/Import - Works Immediately! */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                  📥 Simple Export/Import (Works on All Devices!)
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Step 1:</strong> Upload your images above, then click "Download JSON" below.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Step 2:</strong> Replace <code className="bg-gray-200 px-1 rounded">public/data/images.json</code> with the downloaded file.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Step 3:</strong> Commit and push to GitHub. ✅ Images will show on all devices!
                </p>
                {syncStatus && (
                  <p className="mt-2 text-sm font-medium text-green-700">
                    {syncStatus}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    downloadDataAsJSON();
                    setSyncStatus('✅ JSON file downloaded! Now replace public/data/images.json and push to GitHub.');
                    setTimeout(() => setSyncStatus(''), 10000);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download JSON
                </Button>
                <Button
                  onClick={async () => {
                    setSyncStatus('Loading from JSON file...');
                    const data = await fetchSimpleData();
                    if (data.images.length > 0 || Object.keys(data.siteImages).length > 0) {
                      setSyncStatus(`✅ Found ${data.images.length} images in JSON file!`);
                    } else {
                      setSyncStatus('⚠️ No images found. Download JSON first, then update public/data/images.json');
                    }
                    setTimeout(() => setSyncStatus(''), 5000);
                  }}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Check JSON File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cloud Sync Controls (Advanced - Requires Setup) */}
        <details className="mb-6">
          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 mb-2">
            ⚙️ Advanced: Netlify Blobs Sync (Requires Configuration)
          </summary>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    Cloud Storage Sync (Requires Netlify Blobs Setup)
                  </h3>
                  <p className="text-sm text-gray-600">
                    This requires Netlify Blobs to be enabled on your Netlify site. Use the simple export/import above instead!
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSyncToCloud}
                    disabled={isSyncing}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Cloud className="mr-2 h-4 w-4" />
                    {isSyncing ? 'Syncing...' : 'Sync to Cloud'}
                  </Button>
                  <Button
                    onClick={handleLoadFromCloud}
                    disabled={isSyncing}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isSyncing ? 'Loading...' : 'Load from Cloud'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </details>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Images</TabsTrigger>
            <TabsTrigger value="manage">Manage Images ({images.length})</TabsTrigger>
            <TabsTrigger value="siteImages">
              <Settings className="mr-2 h-4 w-4" />
              Site Images
            </TabsTrigger>
            <TabsTrigger value="impactImages">
              <ImageIcon className="mr-2 h-4 w-4" />
              Impact Images (6)
            </TabsTrigger>
            <TabsTrigger value="blog">
              <BookOpen className="mr-2 h-4 w-4" />
              Blog Posts ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="impactStats">
              <Target className="mr-2 h-4 w-4" />
              Impact Stats (4)
            </TabsTrigger>
            <TabsTrigger value="heroSlideshow">
              <ImageIcon className="mr-2 h-4 w-4" />
              Hero Slideshow
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upload New Images</CardTitle>
                  <div className="text-sm">
                    <span className={`font-semibold ${images.length >= 90 ? 'text-red-600' : images.length >= 70 ? 'text-orange-600' : 'text-blue-600'}`}>
                      {images.length}/100
                    </span>
                    <span className="text-gray-500 ml-1">images</span>
                  </div>
                </div>
                {images.length >= 90 && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> You're approaching the 100 image limit. Consider deleting old images.
                    </p>
                  </div>
                )}
                {images.length >= 70 && images.length < 90 && (
                  <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                    <p className="text-sm text-orange-800">
                      <strong>Notice:</strong> You've used {images.length}% of your image storage capacity.
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="imageTitle">Image Title</Label>
                  <Input
                    id="imageTitle"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="Enter image title"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Choose where this image will be displayed
                  </p>
                  <select
                    id="category"
                    value={imageCategory}
                    onChange={(e) => setImageCategory(e.target.value)}
                    className="mt-2 w-full h-10 rounded-md border border-input bg-input-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="gallery">📸 Gallery - General photos and highlights</option>
                    <option value="events">🎉 Events - Special events and ceremonies</option>
                    <option value="sports">🏀 Sports - Athletic activities and competitions</option>
                    <option value="training">🎓 Training - Vocational training sessions</option>
                    <option value="community">🤝 Community - Community engagement activities</option>
                  </select>
                  <div className="mt-3 p-3 bg-green-50 rounded-md border border-green-200">
                    <p className="text-xs text-green-800 mb-2">
                      <strong>☁️ Cloud Storage Enabled:</strong>
                    </p>
                    <ul className="text-xs text-green-800 space-y-1 ml-4 list-disc">
                      <li><strong>Images uploaded to Cloudinary</strong> - Professional cloud storage</li>
                      <li>Automatic optimization and compression by Cloudinary</li>
                      <li>Upload images of ANY size - no limits!</li>
                      <li>Fast CDN delivery worldwide</li>
                      <li>Images are permanently stored and accessible from any device</li>
                    </ul>
                  </div>
                </div>

                {/* Compression Progress */}
                {compressionProgress && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      {isCompressing && (
                        <span className="inline-block w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
                      )}
                      {compressionProgress}
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="fileUpload">Select Images</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="fileUpload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                </div>

                {/* Preview Selected Images */}
                {previewUrls.length > 0 && (
                  <div>
                    <Label>Preview ({selectedFiles.length} files)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => {
                              setPreviewUrls(prev => prev.filter((_, i) => i !== index));
                              setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || !imageTitle.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {selectedFiles.length > 0 ? `${selectedFiles.length} Image${selectedFiles.length > 1 ? 's' : ''}` : 'Images'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <CardTitle>Manage Uploaded Images</CardTitle>
                    {images.length > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={clearAllImages}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear All
                      </Button>
                    )}
                  </div>
                  
                  {/* Statistics */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{images.length}</div>
                        <div className="text-xs text-gray-600">Total Images</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{images.filter(i => i.category === 'gallery').length}</div>
                        <div className="text-xs text-gray-600">Gallery</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{images.filter(i => i.category === 'events').length}</div>
                        <div className="text-xs text-gray-600">Events</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{images.filter(i => i.category === 'sports').length}</div>
                        <div className="text-xs text-gray-600">Sports</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-900">{images.filter(i => i.category === 'training').length + images.filter(i => i.category === 'community').length}</div>
                        <div className="text-xs text-gray-600">Other</div>
                      </div>
                    </div>
                  )}

                  {/* Search and Filter */}
                  {images.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search images by title..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pl-10 h-10 rounded-md border border-input bg-input-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          >
                            <option value="all">All Categories</option>
                            <option value="gallery">📸 Gallery</option>
                            <option value="events">🎉 Events</option>
                            <option value="sports">🏀 Sports</option>
                            <option value="training">🎓 Training</option>
                            <option value="community">🤝 Community</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {images.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No images uploaded yet</p>
                    <p className="text-sm text-gray-400 mt-2">Upload your first image to get started</p>
                  </div>
                ) : filteredImages.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No images match your search</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterCategory('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 text-sm text-gray-600">
                      Showing {startIndex + 1}-{Math.min(startIndex + imagesPerPage, filteredImages.length)} of {filteredImages.length} images
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedImages.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="relative h-48 bg-gray-100">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-sm mb-1 truncate">{image.title}</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            Category: {image.category}
                          </p>
                          <p className="text-xs text-gray-400 mb-3">
                            {new Date(image.uploadDate).toLocaleDateString()}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => window.open(image.url, '_blank')}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(image.id)}
                              title="Delete this image permanently"
                              className="hover:bg-red-700"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Images Tab */}
          <TabsContent value="siteImages">
            <Card>
              <CardHeader>
                <CardTitle>Manage Site Images</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Upload and replace images used throughout the website (hero sections, about page, etc.)
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload New Site Image */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-4">Upload/Replace Image</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="imageLocation">Select Image Location</Label>
                      <select
                        id="imageLocation"
                        value={selectedSiteImageKey}
                        onChange={(e) => setSelectedSiteImageKey(e.target.value)}
                        className="mt-2 w-full h-10 rounded-md border border-input bg-input-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="">-- Select where to use this image --</option>
                        {siteImageDefinitions.map((def) => (
                          <option key={def.key} value={def.key}>
                            {def.section} - {def.label}
                          </option>
                        ))}
                      </select>
                      {selectedSiteImageKey && (
                        <p className="text-xs text-gray-500 mt-2">
                          {siteImageDefinitions.find(d => d.key === selectedSiteImageKey)?.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="siteImageUpload">Select Image File</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="siteImageUpload"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          {siteImagePreview ? (
                            <img
                              src={siteImagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="h-12 w-12 text-gray-400 mb-4" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span>
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          )}
                          <input
                            id="siteImageUpload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleSiteImageSelect}
                          />
                        </label>
                      </div>
                    </div>

                    <Button
                      onClick={handleSiteImageUpload}
                      disabled={!siteImageFile || !selectedSiteImageKey}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload & Replace Image
                    </Button>
                  </div>
                </div>

                {/* Current Site Images */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Current Site Images ({filteredSiteImages.length})</h3>
                    <select
                      value={filterSection}
                      onChange={(e) => setFilterSection(e.target.value)}
                      className="h-10 rounded-md border border-input bg-input-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="all">All Sections</option>
                      <option value="Home">🏠 Home</option>
                      <option value="About">ℹ️ About</option>
                      <option value="Gallery">📸 Gallery</option>
                      <option value="Blog">📝 Blog</option>
                      <option value="Contact">📞 Contact</option>
                      <option value="Donate">💝 Donate</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredSiteImages.map((def) => (
                      <Card key={def.key} className="overflow-hidden">
                        <div className="relative h-48 bg-gray-100">
                          <img
                            src={def.currentUrl}
                            alt={def.label}
                            className="w-full h-full object-cover"
                          />
                          {siteImages[def.key] && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                              Custom
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="mb-2">
                            <span className="text-xs font-semibold text-blue-600">{def.section}</span>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{def.label}</h4>
                          <p className="text-xs text-gray-500 mb-3">{def.description}</p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setSelectedSiteImageKey(def.key);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              Replace
                            </Button>
                            {siteImages[def.key] && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => resetSiteImage(def.key)}
                              >
                                Reset
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Images Tab - Our Impact in Action Section */}
          <TabsContent value="impactImages">
            <Card>
              <CardHeader>
                <CardTitle>Manage "Our Impact in Action" Images</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  These 6 images appear in the "Our Impact in Action" section on the home page
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Form */}
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900">Upload/Replace Impact Image</h3>
                  
                  {compressionProgress && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800 flex items-center gap-2">
                        {isCompressing && (
                          <span className="inline-block w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {compressionProgress}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="impactSlot">Select Image Slot</Label>
                      <select
                        id="impactSlot"
                        value={selectedImpactSlot ?? ''}
                        onChange={(e) => setSelectedImpactSlot(e.target.value ? parseInt(e.target.value) : null)}
                        className="mt-2 w-full h-10 rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="">Choose a slot...</option>
                        {impactImages.map((img, index) => (
                          <option key={index} value={index}>
                            Slot {index + 1} - {img.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="impactTitle">Image Title</Label>
                      <Input
                        id="impactTitle"
                        type="text"
                        value={impactImageTitle}
                        onChange={(e) => setImpactImageTitle(e.target.value)}
                        placeholder="e.g., Wheelchair Basketball"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="impactFile">Select Image File</Label>
                    <input
                      id="impactFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImpactImageSelect}
                      className="mt-2 w-full"
                    />
                  </div>

                  {impactImagePreview && (
                    <div>
                      <Label>Preview</Label>
                      <img
                        src={impactImagePreview}
                        alt="Preview"
                        className="mt-2 w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <Button
                    onClick={handleImpactImageUpload}
                    disabled={!impactImageFile || selectedImpactSlot === null || !impactImageTitle.trim() || isCompressing}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload & Replace Image
                  </Button>
                </div>

                {/* Current Impact Images Grid */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Current Impact Images (6 slots)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {impactImages.map((image, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-48 bg-gray-100">
                            {image.url ? (
                              <img
                                src={image.url}
                                alt={image.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                                  <p className="text-sm">No image uploaded</p>
                                </div>
                              </div>
                            )}
                            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                              Slot {index + 1}
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{image.title}</p>
                              {image.url && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Updated: {new Date(image.uploadDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => {
                                  setSelectedImpactSlot(index);
                                  setImpactImageTitle(image.title);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                              >
                                Replace
                              </Button>
                              {image.url && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => resetImpactImage(index)}
                                >
                                  Reset
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Share stories of impact, hope, and empowerment from your programs and events
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Blog Form */}
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-blue-900">
                      {editingPost ? 'Editing: ' + editingPost.title : 'New Blog Post'}
                    </h3>
                    {editingPost && (
                      <Button variant="outline" size="sm" onClick={resetBlogForm}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>

                  {compressionProgress && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800 flex items-center gap-2">
                        {isCompressing && (
                          <span className="inline-block w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {compressionProgress}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="blogTitle">Blog Title *</Label>
                      <Input
                        id="blogTitle"
                        type="text"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g., Wheelchair Basketball Tournament 2024"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="blogCategory">Category *</Label>
                      <select
                        id="blogCategory"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="mt-2 w-full h-10 rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="News">📰 News</option>
                        <option value="Sports">🏀 Sports</option>
                        <option value="Education">📚 Education</option>
                        <option value="Training">🎓 Training</option>
                        <option value="Health">🏥 Health</option>
                        <option value="Events">🎉 Events</option>
                        <option value="Success Stories">⭐ Success Stories</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="blogAuthor">Author *</Label>
                      <Input
                        id="blogAuthor"
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        placeholder="Mills Star Foundation"
                        className="mt-2"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="blogExcerpt">Excerpt (Short Summary) *</Label>
                      <textarea
                        id="blogExcerpt"
                        value={blogExcerpt}
                        onChange={(e) => setBlogExcerpt(e.target.value)}
                        placeholder="A brief summary that appears on the blog listing page..."
                        className="mt-2 w-full min-h-[80px] rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        maxLength={200}
                      />
                      <p className="text-xs text-gray-500 mt-1">{blogExcerpt.length}/200 characters</p>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="blogContent">Full Content *</Label>
                      <textarea
                        id="blogContent"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Write the full blog post content here..."
                        className="mt-2 w-full min-h-[200px] rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="blogImage">Featured Image (Optional)</Label>
                      <p className="text-xs text-gray-500 mt-1 mb-2">
                        Upload a custom image or leave empty to use default. Max 10MB.
                      </p>
                      <input
                        id="blogImage"
                        type="file"
                        accept="image/*"
                        onChange={handleBlogImageSelect}
                        className="mt-2 w-full"
                      />
                      {blogImagePreview && (
                        <div className="mt-3">
                          <img
                            src={blogImagePreview}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      {!blogImagePreview && editingPost?.image && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">Current image:</p>
                          <img
                            src={editingPost.image}
                            alt="Current"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="blogPublished"
                        checked={blogPublished}
                        onChange={(e) => setBlogPublished(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="blogPublished" className="cursor-pointer">
                        Publish immediately (uncheck to save as draft)
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (confirm('This will reduce gallery images to 10 to maximize space for blog posts (20+ posts). Continue?')) {
                          try {
                            const storedImages = localStorage.getItem('millsStarImages');
                            if (storedImages) {
                              const images = JSON.parse(storedImages);
                              if (images.length > 10) {
                                const recentImages = images.slice(-10);
                                localStorage.setItem('millsStarImages', JSON.stringify(recentImages));
                                setImages(recentImages);
                                alert(`Freed up space for 20+ blog posts! Reduced from ${images.length} to ${recentImages.length} gallery images.`);
                              } else {
                                alert('Gallery already has 10 or fewer images. Space optimized for 20+ blog posts!');
                              }
                            }
                          } catch (error) {
                            alert('Failed to free up space. Try manually deleting images.');
                          }
                        }
                      }}
                      className="flex-shrink-0"
                    >
                      🧹 Free Up Space (20+ Posts)
                    </Button>
                    <Button
                      onClick={handleCreateOrUpdateBlog}
                      disabled={!blogTitle.trim() || !blogExcerpt.trim() || !blogContent.trim() || isCompressing}
                      className="flex-1"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {editingPost ? 'Update Blog Post' : 'Create Blog Post'}
                    </Button>
                  </div>
                </div>

                {/* Existing Blog Posts */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Existing Blog Posts ({blogPosts.length})
                  </h3>
                  {blogPosts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600">No blog posts yet. Create your first post above!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                                      {post.category}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                      {post.published ? 'Published' : 'Draft'}
                                    </span>
                                  </div>
                                  <h4 className="font-semibold text-lg text-gray-900 mb-2">{post.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                                  <p className="text-xs text-gray-500">
                                    {post.date} • By {post.author}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditBlog(post)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleBlogPublished(post.id)}
                                >
                                  {post.published ? (
                                    <><ToggleRight className="h-4 w-4 mr-1" /> Unpublish</>
                                  ) : (
                                    <><ToggleLeft className="h-4 w-4 mr-1" /> Publish</>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteBlog(post.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Stats Tab */}
          <TabsContent value="impactStats">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Manage Impact Statistics</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Update the 4 statistics that appear on the home page
                    </p>
                  </div>
                  <Button variant="outline" onClick={resetImpactStats}>
                    Reset to Defaults
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {impactStats.map((stat, index) => (
                    <Card key={index} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">Stat {index + 1}</h3>
                          <div className="text-blue-600">
                            {stat.icon === 'Target' && <Target className="h-8 w-8" />}
                            {stat.icon === 'BookOpen' && <BookOpen className="h-8 w-8" />}
                            {stat.icon === 'Users' && <Users className="h-8 w-8" />}
                            {stat.icon === 'Activity' && <Activity className="h-8 w-8" />}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`stat-number-${index}`}>Number/Value</Label>
                          <Input
                            id={`stat-number-${index}`}
                            type="text"
                            value={stat.number}
                            onChange={(e) => handleUpdateImpactStat(index, 'number', e.target.value)}
                            placeholder="e.g., 1000+ or 3"
                            className="mt-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Use numbers with + for "more than" (e.g., 1000+)
                          </p>
                        </div>

                        <div>
                          <Label htmlFor={`stat-label-${index}`}>Label</Label>
                          <Input
                            id={`stat-label-${index}`}
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleUpdateImpactStat(index, 'label', e.target.value)}
                            placeholder="e.g., Lives Impacted"
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`stat-icon-${index}`}>Icon</Label>
                          <select
                            id={`stat-icon-${index}`}
                            value={stat.icon}
                            onChange={(e) => handleChangeStatIcon(index, e.target.value)}
                            className="mt-2 w-full h-10 rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          >
                            <option value="Target">🎯 Target</option>
                            <option value="BookOpen">📚 Book Open</option>
                            <option value="Users">👥 Users</option>
                            <option value="Activity">📊 Activity</option>
                            <option value="Heart">❤️ Heart</option>
                            <option value="Award">🏆 Award</option>
                            <option value="Globe">🌍 Globe</option>
                            <option value="Briefcase">💼 Briefcase</option>
                          </select>
                        </div>

                        <div className="pt-4 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-center text-blue-600 mb-2">
                              {stat.icon === 'Target' && <Target className="h-8 w-8" />}
                              {stat.icon === 'BookOpen' && <BookOpen className="h-8 w-8" />}
                              {stat.icon === 'Users' && <Users className="h-8 w-8" />}
                              {stat.icon === 'Activity' && <Activity className="h-8 w-8" />}
                              {stat.icon === 'Heart' && <Heart className="h-8 w-8" />}
                            </div>
                            <div className="text-3xl font-bold text-blue-900 mb-1">{stat.number}</div>
                            <p className="text-gray-600">{stat.label}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">💡 Tips for Impact Stats:</h3>
                  <ul className="text-sm text-green-800 space-y-1 ml-4 list-disc">
                    <li>Keep numbers concise and impactful (e.g., "1000+" instead of "1,234")</li>
                    <li>Use clear, short labels (2-3 words max)</li>
                    <li>Update regularly to reflect current achievements</li>
                    <li>Choose icons that match the statistic meaning</li>
                    <li>Changes appear immediately on the home page</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">📊 Current Stats on Home Page:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {impactStats.map((stat, index) => (
                      <div key={index} className="text-center p-3 bg-white rounded">
                        <div className="flex justify-center text-blue-600 mb-2">
                          {stat.icon === 'Target' && <Target className="h-6 w-6" />}
                          {stat.icon === 'BookOpen' && <BookOpen className="h-6 w-6" />}
                          {stat.icon === 'Users' && <Users className="h-6 w-6" />}
                          {stat.icon === 'Activity' && <Activity className="h-6 w-6" />}
                        </div>
                        <div className="text-xl font-bold text-blue-900">{stat.number}</div>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blog Hero Section */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Blog Page Hero Section</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Customize the title and tagline that appear on the blog page hero banner
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="blogHeroTitle">Blog Title</Label>
                      <Input
                        id="blogHeroTitle"
                        type="text"
                        value={blogHeroTitle}
                        onChange={(e) => setBlogHeroTitle(e.target.value)}
                        placeholder="e.g., Our Blog"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="blogHeroTagline">Blog Tagline</Label>
                      <Input
                        id="blogHeroTagline"
                        type="text"
                        value={blogHeroTagline}
                        onChange={(e) => setBlogHeroTagline(e.target.value)}
                        placeholder="e.g., Stories of impact, hope, and empowerment"
                        className="mt-2"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-2">Preview:</h3>
                      <div className="text-center p-6 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg text-white">
                        <h1 className="text-3xl font-bold mb-2">{blogHeroTitle}</h1>
                        <p className="text-lg">{blogHeroTagline}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setBlogHeroTitle('Our Blog');
                          setBlogHeroTagline('Stories of impact, hope, and empowerment');
                        }}
                      >
                        Reset to Defaults
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Slideshow Tab */}
          <TabsContent value="heroSlideshow">
            <Card>
              <CardHeader>
                <CardTitle>Manage Hero Slideshow</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Upload and manage images for the homepage hero slideshow. Images will auto-rotate every 5 seconds.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload New Slides */}
                <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="hero-slides">Upload Slideshow Images</Label>
                        <Input
                          id="hero-slides"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleHeroSlideSelect}
                          className="mt-2"
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          Select one or more images. Recommended size: 1920x600px
                        </p>
                      </div>

                      {/* Preview Selected Images */}
                      {heroSlidePreview.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {heroSlidePreview.map((url, index) => (
                            <div key={index} className="relative aspect-video rounded-lg overflow-hidden border-2 border-blue-200">
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                                New
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button
                        onClick={handleUploadHeroSlides}
                        disabled={isUploadingSlides || heroSlideFiles.length === 0}
                        className="w-full"
                      >
                        {isUploadingSlides ? 'Uploading...' : `Upload ${heroSlideFiles.length} Slide(s)`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Slideshow */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Current Slideshow ({heroSlides.length} {heroSlides.length === 1 ? 'slide' : 'slides'})
                  </h3>

                  {heroSlides.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No slideshow images yet. Upload some above!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {heroSlides.map((slide, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="relative aspect-video">
                            <img
                              src={slide}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Slide {index + 1}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => moveSlideUp(index)}
                                  disabled={index === 0}
                                  title="Move up"
                                >
                                  ↑
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => moveSlideDown(index)}
                                  disabled={index === heroSlides.length - 1}
                                  title="Move down"
                                >
                                  ↓
                                </Button>
                              </div>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteHeroSlide(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tips */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Slideshow Tips:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Images automatically rotate every 5 seconds</li>
                    <li>• Use high-quality images (1920x600px recommended)</li>
                    <li>• Show your foundation's impact with powerful photos</li>
                    <li>• Reorder slides using the ↑ ↓ buttons</li>
                    <li>• Visitors can manually navigate using arrows</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
