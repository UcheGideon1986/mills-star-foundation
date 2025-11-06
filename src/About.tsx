import { useState, useEffect } from 'react';
import { Target, Eye, BookOpen, Users, Wrench, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/figma/ui/card';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export function About() {
  const [siteImages, setSiteImages] = useState<Record<string, string>>({});

  // Load site images from localStorage
  useEffect(() => {
    const loadImages = () => {
      const storedSiteImages = localStorage.getItem('millsStarSiteImages');
      if (storedSiteImages) {
        setSiteImages(JSON.parse(storedSiteImages));
      }
    };

    loadImages();

    // Listen for storage changes
    const handleStorageChange = () => loadImages();
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadImages, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  const vocations = [
    'Computer programming/coding',
    'Tailoring',
    'Cobbler',
    'Food services',
    'Hair & Makeup',
    'Barbering',
    'Photography, Video & Photoshop/Final Cut Editing',
    'Auto Repairs',
  ];

  const programs = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Education & Reading Programs',
      description: 'Partnerships with local organizations help us donate thousands of books, bridging the access gap and building confidence.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Engagement',
      description: 'Annual events in Ghana and Nigeria educate on health and hygiene, providing personal and home products for cleanliness.',
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Vocational Training',
      description: 'Structured curriculums and apprenticeships in various trades to empower independence and self-sufficiency.',
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Wheelchair Sports',
      description: 'Development and growth of wheelchair sports across Africa, hosting events to discover and train athletes.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <ImageWithFallback
          src={siteImages['aboutHero'] || "https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwc3VwcG9ydHxlbnwxfHx8fDE3NjA2ODU2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"}
          alt="About Mills Star Foundation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-white mb-4">About Us</h1>
          <p className="text-xl">Empowering the differently abled since 2020</p>
        </div>
      </section>

      {/* Who Are We */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-blue-900 mb-6">Who Are We?</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2020, Mills Star Foundation is a United States based organization focused on empowering disabled individuals through education, community engagement, vocational training and the provision of mobility devices and equipment. We currently operate in the U.S, Ghana and Nigeria with plans to expand throughout West Africa and beyond.
              </p>
              <p className="text-gray-700 mb-4">
                Through annual events hosted in Ghana and Nigeria, we've been able to educate the 'differently abled' population on health and hygiene and provide the personal and home products needed to maintain cleanliness at home and in their communities.
              </p>
              <p className="text-gray-700 mb-4">
                Partnerships with local companies and organizations have been vital in developing reading programs that enable us to donate thousands of books, bridging the access gap, increasing individual reading abilities while building confidence and expanding the imaginations of those who are otherwise unseen or forgotten.
              </p>
              <p className="text-gray-700">
                We are also heavily involved in the development and growth of wheelchair sports in Nigeria, Ghana and across Africa. Various events are hosted throughout the year to highlight new talent while creating opportunities for current wheelchair athletes to sharpen and hone their skills for qualifier national and international tournaments.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src={siteImages['aboutWhoAreWe'] || "https://images.unsplash.com/photo-1657145537587-bc61af46050c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwYmFza2V0YmFsbCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"}
                alt="Wheelchair sports community - Mills Star Foundation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-blue-900 mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="flex justify-center text-blue-600 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">3</div>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="flex justify-center text-blue-600 mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">1000+</div>
              <p className="text-gray-600">Books Donated</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="flex justify-center text-blue-600 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">2500+</div>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="flex justify-center text-blue-600 mb-4">
                <Target className="h-10 w-10" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">6</div>
              <p className="text-gray-600">Sports Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-blue-900 mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="h-full transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    {program.icon}
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
              <ImageWithFallback
                src={siteImages['aboutVision'] || "https://images.unsplash.com/photo-1759756480941-7230dedf5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2NhdGlvbmFsJTIwdHJhaW5pbmclMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjA2ODU2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"}
                alt="Vocational training"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-10 w-10 text-blue-600" />
                <h2 className="text-blue-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 mb-6">
                To scale our operation and programs to establish a Mills Star Foundation Center. The Center will serve as a safe place for the differently abled to find refuge from the streets of their communities, receive support and have access to vocational training through structured curriculums and apprenticeship programs.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-blue-900 mb-4">Vocational Training Programs</h3>
                <ul className="space-y-2">
                  {vocations.map((vocation, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <Heart className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      {vocation}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700">
                The paramount goal is to show that the 'differently abled' can be contributing members of society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Banner */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">As we say here at Mills Star...</h2>
          <p className="text-4xl">WE SEE YOU!!</p>
        </div>
      </section>
    </div>
  );
}
