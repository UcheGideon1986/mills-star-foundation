import React, { useState, useEffect } from 'react';
import { Heart, Users, BookOpen, Activity, Target, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Team from './Team';
import { Button } from './components/figma/ui/button';
import { Card, CardContent } from './components/figma/ui/card';
import { Link } from 'react-router-dom';
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
  const baseUrl = import.meta.env.BASE_URL || '';
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [siteImages, setSiteImages] = useState<Record<string, string>>({});
  const [impactImages, setImpactImages] = useState<UploadedImage[]>([]);
  const [customImpactStats, setCustomImpactStats] = useState<any[]>([]);

  // Gallery images - Only show Health Education on home page
  // Other images will be shown on the full gallery page
  const defaultGalleryImages = [
    {
      url: '/blog-images/health-education-ghana.jpg',
      title: 'Health Education',
      category: 'education'
    }
  ];

  // All gallery images for the full gallery page
  const allGalleryImages = [
    {
      url: '/blog-images/health-education-ghana.jpg',
      title: 'Health Education',
      category: 'education'
    },
    {
      url: '/blog-images/wheelchair-tennis-accra.jpg',
      title: 'Tennis in Accra',
      category: 'sports'
    },
    {
      url: '/blog-images/wheelchair-tennis-lagos.jpg',
      title: 'Tennis in Lagos',
      category: 'sports'
    },
    {
      url: `${baseUrl}images/young-stars/young-players.jpg`,
      title: 'Young Players',
      category: 'young-stars'
    },
    {
      url: `${baseUrl}images/young-stars/young-star-good-play.jpg`,
      title: 'Great Play',
      category: 'young-stars'
    },
    {
      url: `${baseUrl}images/young-stars/young-star-in-actoin.jpg`,
      title: 'Action Shot',
      category: 'young-stars'
    },
    {
      url: `${baseUrl}images/young-stars/young-star-shoot.jpg`,
      title: 'Perfect Shot',
      category: 'young-stars'
    },
    {
      url: `${baseUrl}images/young-stars/young-stars.jpg`,
      title: 'Young Stars Team',
      category: 'young-stars'
    },
    {
      url: `${baseUrl}images/young-stars/young-tennis-star.jpg`,
      title: 'Tennis Star',
      category: 'young-stars'
    }
  ];

  // Load images from cloud (with localStorage fallback)
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Try to fetch from cloud first
        const data = await fetchAllData();
        
        // Static images to be moved to recent photos
        const staticImages = [
          {
            id: 'img1',
            url: `${baseUrl}images/impact/wheelchair-sports.jpg`,
            title: 'Wheelchair Sports',
            category: 'sports',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img2',
            url: `${baseUrl}images/impact/books-donation.jpg`,
            title: 'Book Donation',
            category: 'education',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img3',
            url: `${baseUrl}images/impact/feeding-program.jpg`,
            title: 'Feeding Program',
            category: 'community',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img4',
            url: `${baseUrl}images/young-stars/young-players.jpg`,
            title: 'Young Players',
            category: 'young-stars',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img5',
            url: `${baseUrl}images/young-stars/young-star-good-play.jpg`,
            title: 'Great Play',
            category: 'young-stars',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img6',
            url: `${baseUrl}images/young-stars/young-star-in-actoin.jpg`,
            title: 'Action Shot',
            category: 'young-stars',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img7',
            url: `${baseUrl}images/young-stars/young-star-shoot.jpg`,
            title: 'Perfect Shot',
            category: 'young-stars',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img8',
            url: `${baseUrl}images/young-stars/young-stars.jpg`,
            title: 'Young Stars Team',
            category: 'young-stars',
            uploadDate: new Date().toISOString()
          },
          {
            id: 'img9',
            url: `${baseUrl}images/young-stars/young-tennis-star.jpg`,
            title: 'Tennis Star',
            category: 'young-stars',
            uploadDate: new Date().toISOString()
          }
        ];

        if (data.images && data.images.length > 0) {
          const localImages = [
            ...staticImages,
            ...data.images.map((img: any) => ({
              id: img.id,
              url: img.url,
              title: img.alt || 'Image',
              category: img.category || 'gallery',
              uploadDate: img.uploadedAt || new Date().toISOString(),
            }))
          ];
          // Get only the latest 12 images for home page (6 static + 6 from uploads)
          setUploadedImages(localImages.slice(-12).reverse());
        } else {
          // Fallback to localStorage
          const storedImages = localStorage.getItem('millsStarImages');
          if (storedImages) {
            const images = JSON.parse(storedImages);
            setUploadedImages([...staticImages, ...images].slice(-12).reverse());
          } else {
            // If no stored images, just use the static ones
            setUploadedImages(staticImages);
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

  // Use only default gallery images (original + young stars)
  const galleryImages = [...defaultGalleryImages];
  const uniqueGalleryImages = galleryImages; // No need for deduplication since we're not combining with impact images

  const sports = [
    { icon: '🏀', name: 'Wheelchair Basketball' },
    { icon: '🎾', name: 'Wheelchair Tennis' },
    { icon: '⚾', name: 'Wheelchair Softball' },
    { icon: '🏓', name: 'Wheelchair Table Tennis' },
    { icon: '🏁', name: 'Wheelchair Racing' },
    { icon: '🏸', name: 'Wheelchair Badminton' },
    { icon: '⚡', name: 'Wheelchair Power Nifty' },
  ];

  // Hero slideshow images - All images from hero-slides directory + young stars
  const heroSlides = [
    // Existing hero slides
    '/hero-slides/wheelchair-tennis-accra.jpg',
    // Newly added hero slides
    '/hero-slides/240757204_4414795455255639_2104738923654322957_n.jpg',
    '/hero-slides/839b7e40-662a-11ef-b737-11b40758ce69.jpg',
    '/hero-slides/FxyMa_UWYAAeCRD.jpeg',
    // Young stars images
    `${baseUrl}images/young-stars/young-players.jpg`,
    `${baseUrl}images/young-stars/young-star-good-play.jpg`,
    `${baseUrl}images/young-stars/young-star-in-actoin.jpg`,
    `${baseUrl}images/young-stars/young-star-shoot.jpg`,
    `${baseUrl}images/young-stars/young-stars.jpg`,
    `${baseUrl}images/young-stars/young-tennis-star.jpg`
  ];

  // Default impact stats
  const defaultImpactStats = [
    { number: '3', label: 'Countries', icon: 'Target' },
    { number: '1000+', label: 'Books Donated', icon: 'BookOpen' },
    { number: '2500+', label: 'Lives Impacted', icon: 'Users' },
    { number: '6', label: 'Sports Programs', icon: 'Activity' },
  ];

  // Use custom stats if available, but always ensure Lives Impacted is 2500+
  const impactStatsData = customImpactStats.length > 0 ? 
    customImpactStats.map(stat => 
      stat.label === 'Lives Impacted' ? { ...stat, number: '2500+' } : stat
    ) : defaultImpactStats;

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
  const [slides, setSlides] = useState<string[]>([]);

  // Load hero slideshow images
  useEffect(() => {
    // All slides including hero-slides and young stars
    const candidates = [
      '/hero-slides/wheelchair-table-tennis.jpg',
      '/hero-slides/wheelchair-tennis-accra.jpg',
      '/hero-slides/FxyMa_UWYAAeCRD.jpeg',
      '/hero-slides/whatsapp-2025-12-16-21-36-09-1.jpeg',
      '/hero-slides/whatsapp-2025-12-16-21-36-09-2.jpeg',
      '/hero-slides/whatsapp-2025-12-16-21-36-09-3.jpeg',
      '/hero-slides/whatsapp-2025-12-16-21-36-09.jpeg',
      '/hero-slides/whatsapp-2025-12-16-22-26-44-1.jpeg',
      '/hero-slides/whatsapp-2025-12-16-22-26-44.jpeg',
      '/hero-slides/whatsapp-2025-12-17-06-05-38-1.jpeg',
      '/hero-slides/whatsapp-2025-12-17-06-05-38-2.jpeg',
      '/hero-slides/whatsapp-2025-12-17-06-05-38.jpeg',
      `${baseUrl}images/young-stars/young-tennis-star.jpg`
    ];

    const preload = (src: string) =>
      new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
      });

    Promise.allSettled(candidates.map(preload)).then((results) => {
      const ok = results
        .filter((r) => r.status === 'fulfilled')
        .map((r: any) => r.value as string);
      setSlides(ok);
      console.log('Hero slides loaded:', ok);
    });
  }, []); // Removed impactImages dependency since we're not using them

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <section className="relative h-[80vh] min-h-[500px] max-h-[800px] overflow-hidden">
        {/* Slideshow Images */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={slide}
                alt={`Mills Star Foundation - Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              <div className="absolute top-4 right-4 z-30 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        {/* Subtle overlay for better text contrast (optional) */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* Navigation Arrows (only show if multiple slides) */}
        {slides.length > 1 && (
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
              {slides.map((_, index) => (
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

      {/* Welcome Ticker */}
      <div className="py-3 overflow-hidden bg-white">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-2xl font-bold mx-6 text-blue-900">WELCOME TO MILLS STAR FOUNDATION</span>
              <span className="text-2xl font-bold text-blue-900">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start">
            {/* Image - Left Side */}
            <div className="w-full md:w-1/2 order-1">
              <div className="relative">
                <img
                  src="/images/wheelchair-action.jpg"
                  alt="Wheelchair basketball players in action"
                  className="w-full h-auto max-h-[500px] object-cover object-left"
                  style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1608889825205-eeb9539a4389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                  }}
                />
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div className="w-full md:w-1/2 order-2 bg-white p-8">
              <h2 className="text-blue-900 text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">WE SEE YOU!</h2>
              <div className="space-y-6 text-gray-700 text-base leading-relaxed">
                <p>
                  Founded in 2020, Mills Star Foundation is a United States based organization focused on empowering disabled individuals through education, community engagement, vocational training and the provision of mobility devices and equipment.
                </p>
                <p>
                  We currently operate in the U.S, Ghana and Nigeria with plans to expand throughout West Africa and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact in Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-blue-900 mb-12">Our Impact in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Book Donation Impact */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={`${baseUrl}images/impact/books-donation.jpg`}
                  alt="Donated books to kids in school"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/1e40af/ffffff?text=Books+Donation';
                  }}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">1,000 Books Donated</h3>
                <p className="text-gray-700 mb-4">
                  We've distributed over 1,000 books to underprivileged schools, helping to build a culture of reading and learning among children in Ghana and Nigeria. Each book opens a new world of possibilities for these young minds.
                </p>
                <Button variant="link" className="text-blue-600 p-0 hover:underline">
                  Read more <ArrowRight className="ml-1 h-4 w-4 inline" />
                </Button>
              </div>
            </div>

            {/* Wheelchair Mobility Impact */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={`${baseUrl}images/impact/wheelchair-mary.jpg`}
                  alt="Mary with her new wheelchair"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/1e40af/ffffff?text=Wheelchair+Donation';
                  }}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Mobility for Mary</h3>
                <p className="text-gray-700 mb-4">
                  Mary from Jos North Local Government received a custom-fitted wheelchair, restoring her independence and mobility. Her smile says it all - this is more than just a chair, it's freedom and dignity restored.
                </p>
                <Button variant="link" className="text-blue-600 p-0 hover:underline">
                  Read Mary's story <ArrowRight className="ml-1 h-4 w-4 inline" />
                </Button>
              </div>
            </div>

            {/* Feeding Program Impact */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={`${baseUrl}images/impact/feeding-program.jpg`}
                  alt="Children receiving meals"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/1e40af/ffffff?text=Feeding+Program';
                  }}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">1,000+ Children Fed Annually</h3>
                <p className="text-gray-700 mb-4">
                  Our annual feeding program provides nutritious meals to over 1,000 children across Nigeria and Ghana. A well-fed child is better able to learn, grow, and thrive in school and in life.
                </p>
                <Button variant="link" className="text-blue-600 p-0 hover:underline">
                  Learn about our programs <ArrowRight className="ml-1 h-4 w-4 inline" />
                </Button>
              </div>
            </div>

            {/* School Chairs Impact */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={`${baseUrl}images/impact/school-chairs.jpg`}
                  alt="Students with new school chairs"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/1e40af/ffffff?text=School+Chairs';
                  }}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">500+ School Chairs Provided</h3>
                <p className="text-gray-700 mb-4">
                  We've supplied over 500 school chairs to educational institutions in need across Nigeria and Ghana, ensuring students have proper seating to focus on their education in comfort.
                </p>
                <Button variant="link" className="text-blue-600 p-0 hover:underline">
                  Support education <ArrowRight className="ml-1 h-4 w-4 inline" />
                </Button>
              </div>
            </div>

            {/* Feminine Hygiene Packs Distribution */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={`${baseUrl}images/impact/sanitary-pads.jpg`}
                  alt="Distribution of feminine hygiene packs"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/1e40af/ffffff?text=Feminine+Hygiene+Packs';
                  }}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">200 Feminine Hygiene Packs Distributed</h3>
                <p className="text-gray-700 mb-4">
                  We've distributed 200+ feminine hygiene packs to young female students in underserved communities, helping them stay in school and maintain their dignity during their menstrual cycles.
                </p>
                <Button variant="link" className="text-blue-600 p-0 hover:underline">
                  Support women's health <ArrowRight className="ml-1 h-4 w-4 inline" />
                </Button>
              </div>
            </div>

            {/* Wheelchair Sports Impact */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={baseUrl + 'images/impact/wheelchair-sports.jpg'}
                  alt="Annual wheelchair sports event"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/1e40af/ffffff?text=Wheelchair+Sports';
                  }}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Annual Wheelchair Sports</h3>
                <p className="text-gray-700 mb-4">
                  Our annual wheelchair sports event brings together athletes of all abilities to compete, build confidence, and break down barriers. It's more than a game - it's about empowerment and inclusion.
                </p>
                <Button variant="link" className="text-blue-600 p-0 hover:underline">
                  Join our next event <ArrowRight className="ml-1 h-4 w-4 inline" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View Full Impact Gallery <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
              <Link to="/gallery">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  View All Photos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      <Team />

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Make a Difference Today</h2>
          <p className="text-xl mb-8">
            Your donation helps us provide education, training, and opportunities to the differently abled community
          </p>
          <Link to="/donate">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              Donate Now <Heart className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
