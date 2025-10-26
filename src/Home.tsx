import { useState, useEffect } from 'react';
import { Heart, Users, BookOpen, Activity, Target, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './components/figma/ui/button';
import { Card, CardContent } from './components/figma/ui/card';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { fetchAllData } from './services/simpleStorage';

interface UploadedImage {
  id: string;
  url: string;
  title: string;
  category: string;
  uploadDate: string;
}

interface HomeProps {
  setCurrentPage?: (page: string) => void;
}

export function Home({ setCurrentPage }: HomeProps = {}) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [siteImages, setSiteImages] = useState<Record<string, string>>({});
  const [impactImages, setImpactImages] = useState<UploadedImage[]>([]);
  const [customImpactStats, setCustomImpactStats] = useState<any[]>([]);

  // Default fallback images
  const defaultGalleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1657145537587-bc61af46050c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwYmFza2V0YmFsbHxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Wheelchair Basketball',
    },
    {
      url: 'https://images.unsplash.com/photo-1740572497508-e5d62c77f4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwc3BvcnRzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MDY4NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Community Sports',
    },
    {
      url: 'https://images.unsplash.com/photo-1592106680408-e7e63efbc7ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHJlYWRpbmclMjBib29rc3xlbnwxfHx8fDE3NjA2MDMxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Reading Programs',
    },
    {
      url: 'https://images.unsplash.com/photo-1759756480941-7230dedf5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2NhdGlvbmFsJTIwdHJhaW5pbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Vocational Training',
    },
    {
      url: 'https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzJTIwaGVscGluZ3xlbnwxfHx8fDE3NjA2Mzg4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Community Outreach',
    },
    {
      url: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NjA2ODU2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Community Support',
    },
  ];

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
          // Get only the latest 6 images for home page
          setUploadedImages(localImages.slice(-6).reverse());
        } else {
          // Fallback to localStorage
          const storedImages = localStorage.getItem('millsStarImages');
          if (storedImages) {
            const images = JSON.parse(storedImages);
            setUploadedImages(images.slice(-6).reverse());
          }
        }
        
        if (data.siteImages && Object.keys(data.siteImages).length > 0) {
          setSiteImages(data.siteImages);
        } else {
          const storedSiteImages = localStorage.getItem('millsStarSiteImages');
          if (storedSiteImages) {
            setSiteImages(JSON.parse(storedSiteImages));
          }
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
        } else {
          const storedImpactImages = localStorage.getItem('millsStarImpactImages');
          if (storedImpactImages) {
            setImpactImages(JSON.parse(storedImpactImages));
          }
        }
      } catch (error) {
        console.error('Error loading from cloud:', error);
        // Fallback to localStorage
        const storedImages = localStorage.getItem('millsStarImages');
        if (storedImages) {
          const images = JSON.parse(storedImages);
          setUploadedImages(images.slice(-6).reverse());
        }
        
        const storedSiteImages = localStorage.getItem('millsStarSiteImages');
        if (storedSiteImages) {
          setSiteImages(JSON.parse(storedSiteImages));
        }

        const storedImpactImages = localStorage.getItem('millsStarImpactImages');
        if (storedImpactImages) {
          setImpactImages(JSON.parse(storedImpactImages));
        }
      }
      
      // Impact stats still from localStorage (not in cloud yet)
      const storedImpactStats = localStorage.getItem('millsStarImpactStats');
      if (storedImpactStats) {
        setCustomImpactStats(JSON.parse(storedImpactStats));
      }
    };

    loadImages();

    // Listen for storage changes and check periodically
    const handleStorageChange = () => loadImages();
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadImages, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Use impact images if available, otherwise use defaults
  const galleryImages = impactImages.length > 0 && impactImages.some(img => img.url)
    ? impactImages.filter(img => img.url) // Only show images that have been uploaded
    : defaultGalleryImages;

  const sports = [
    { icon: '🏀', name: 'Wheelchair Basketball' },
    { icon: '🎾', name: 'Wheelchair Tennis' },
    { icon: '⚾', name: 'Wheelchair Softball' },
    { icon: '🏓', name: 'Wheelchair Table Tennis' },
    { icon: '🏁', name: 'Wheelchair Racing' },
    { icon: '⚡', name: 'Wheelchair Power Nifty' },
  ];

  // Default impact stats
  const defaultImpactStats = [
    { number: '3', label: 'Countries', icon: 'Target' },
    { number: '1000+', label: 'Books Donated', icon: 'BookOpen' },
    { number: '500+', label: 'Lives Impacted', icon: 'Users' },
    { number: '6', label: 'Sports Programs', icon: 'Activity' },
  ];

  // Use custom stats if available, otherwise use defaults
  const impactStatsData = customImpactStats.length > 0 ? customImpactStats : defaultImpactStats;

  // Map icon names to components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="h-8 w-8" />;
      case 'BookOpen': return <BookOpen className="h-8 w-8" />;
      case 'Users': return <Users className="h-8 w-8" />;
      case 'Activity': return <Activity className="h-8 w-8" />;
      case 'Heart': return <Heart className="h-8 w-8" />;
      default: return <Target className="h-8 w-8" />;
    }
  };

  const impactStats = impactStatsData.map(stat => ({
    ...stat,
    icon: getIcon(stat.icon)
  }));

  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<string[]>([]);

  // Load hero slideshow images
  useEffect(() => {
    const storedSlides = localStorage.getItem('millsStarHeroSlides');
    if (storedSlides) {
      setHeroSlides(JSON.parse(storedSlides));
    } else {
      // Default slideshow images
      const defaultSlides = [
        siteImages['heroHome'] || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      ];
      setHeroSlides(defaultSlides);
    }
  }, [siteImages]);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Slideshow Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={slide}
              alt={`Mills Star Foundation - Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        
        {/* Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-white mb-6">Empowering the Differently Abled</h1>
          <p className="text-xl mb-8">
            Through education, community engagement, vocational training, and wheelchair sports
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Donate Now <Heart className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Arrows (only show if multiple slides) */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-blue-900 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-blue-900 mb-6">WE SEE YOU!</h2>
            <p className="text-gray-700 text-lg mb-4">
              Founded in 2020, Mills Star Foundation is a United States based organization focused on empowering disabled individuals through education, community engagement, vocational training and the provision of mobility devices and equipment.
            </p>
            <p className="text-gray-700">
              We currently operate in the U.S, Ghana and Nigeria with plans to expand throughout West Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-blue-900 mb-12">Our Impact in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative h-80 overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <p className="text-white p-6">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-blue-900 mb-4">Annual Sports Events</h2>
            <p className="text-gray-700">
              We organize wheelchair sports events once a year to develop talent and create opportunities
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sports.map((sport, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{sport.icon}</div>
                  <p className="text-gray-700 text-sm">{sport.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Photos Gallery */}
      {uploadedImages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-blue-900 mb-4">Recent Photos</h2>
              <p className="text-gray-700">
                Latest moments from our programs and events
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {uploadedImages.map((image) => (
                <div
                  key={image.id}
                  className="relative h-48 overflow-hidden rounded-lg shadow-lg group cursor-pointer"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-3 text-white w-full">
                      <p className="text-xs font-semibold truncate">{image.title}</p>
                      <p className="text-xs text-gray-300">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  if (setCurrentPage) {
                    setCurrentPage('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                View All Photos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Make a Difference Today</h2>
          <p className="text-xl mb-8">
            Your donation helps us provide education, training, and opportunities to the differently abled community
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            Donate Now <Heart className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
