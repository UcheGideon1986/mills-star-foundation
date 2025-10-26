import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './components/figma/ui/card';
import { Button } from './components/figma/ui/button';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { fetchAllData } from './services/simpleStorage';

interface UploadedImage {
  id: string;
  url: string;
  title: string;
  category: string;
  uploadDate: string;
}

export function Gallery() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<UploadedImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Load images from cloud (with localStorage fallback)
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Try to fetch from cloud first
        const data = await fetchAllData();
        if (data.images && data.images.length > 0) {
          const localImages = data.images.map((img: any) => ({
            id: img.id,
            url: img.url,
            title: img.alt || 'Image',
            category: 'gallery',
            uploadDate: img.uploadedAt || new Date().toISOString(),
          }));
          setImages(localImages);
        } else {
          // Fallback to localStorage
          const storedImages = localStorage.getItem('millsStarImages');
          if (storedImages) {
            setImages(JSON.parse(storedImages));
          }
        }
      } catch (error) {
        console.error('Error loading images from cloud:', error);
        // Fallback to localStorage
        const storedImages = localStorage.getItem('millsStarImages');
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      }
    };

    loadImages();

    // Listen for storage changes (when images are uploaded in admin)
    const handleStorageChange = () => {
      loadImages();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for updates
    const interval = setInterval(loadImages, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: UploadedImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (lightboxIndex + 1) % filteredImages.length
      : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NjA2ODU2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mills Star Foundation Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-white mb-4">Our Gallery</h1>
          <p className="text-xl">Moments of impact, hope, and empowerment</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Images Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images available yet</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <Card
                  key={image.id}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 text-white w-full">
                        <h3 className="font-semibold">{image.title}</h3>
                        <p className="text-sm text-gray-200">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold">{lightboxImage.title}</h3>
              <p className="text-gray-300 text-sm mt-1">
                {lightboxImage.category} • {new Date(lightboxImage.uploadDate).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-xs mt-2">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
