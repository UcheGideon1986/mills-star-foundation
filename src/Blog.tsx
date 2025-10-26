import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/figma/ui/card';
import { Button } from './components/figma/ui/button';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  published: boolean;
}

export function Blog() {
  const [customBlogPosts, setCustomBlogPosts] = useState<BlogPost[]>([]);
  const [blogHeroTitle, setBlogHeroTitle] = useState('Our Blog');
  const [blogHeroTagline, setBlogHeroTagline] = useState('Stories of impact, hope, and empowerment');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Load blog posts and hero text from JSON file first, then localStorage
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        // Try to load from JSON file first (for cross-device sync)
        const response = await fetch('/data/images.json');
        const data = await response.json();
        
        if (data.blogPosts && data.blogPosts.length > 0) {
          // Only show published posts
          const publishedPosts = data.blogPosts.filter((post: BlogPost) => post.published !== false);
          setCustomBlogPosts(publishedPosts);
        }
      } catch (error) {
        console.log('Could not load blog posts from JSON, trying localStorage');
        
        // Fallback to localStorage
        const storedPosts = localStorage.getItem('millsStarBlogPosts');
        if (storedPosts) {
          const posts = JSON.parse(storedPosts);
          // Only show published posts
          setCustomBlogPosts(posts.filter((post: BlogPost) => post.published));
        }
      }

      // Load blog hero text from localStorage (not in JSON yet)
      const storedBlogHero = localStorage.getItem('millsStarBlogHero');
      if (storedBlogHero) {
        const blogHero = JSON.parse(storedBlogHero);
        setBlogHeroTitle(blogHero.title);
        setBlogHeroTagline(blogHero.tagline);
      }
    };

    loadBlogData();

    // Listen for storage changes
    const handleStorageChange = () => loadBlogData();
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadBlogData, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Default blog posts (fallback)
  const defaultBlogPosts = [
    {
      id: 'blog-1',
      title: 'Wheelchair Basketball Tournament 2024: Celebrating Athletic Excellence',
      excerpt: 'Our annual wheelchair basketball tournament brought together athletes from across Nigeria and Ghana, showcasing incredible talent and determination.',
      content: 'Our annual wheelchair basketball tournament brought together athletes from across Nigeria and Ghana, showcasing incredible talent and determination.',
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
      content: 'Thanks to our partners, we have distributed over 1,000 books to differently abled individuals, opening doors to knowledge and imagination.',
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
      content: 'Meet the graduates of our vocational training programs who are now running successful businesses and contributing to their communities.',
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
      content: 'We are excited to announce plans to expand our operations throughout West Africa, bringing hope and opportunity to more communities.',
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
      content: 'Our annual health and hygiene education events provide essential knowledge and supplies to help communities maintain wellness.',
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
      content: 'Young athletes demonstrated remarkable skill and sportsmanship at this years wheelchair tennis championship in Accra.',
      date: 'May 3, 2024',
      author: 'Mills Star Foundation',
      image: 'https://images.unsplash.com/photo-1740572497508-e5d62c77f4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwc3BvcnRzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MDY4NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Sports',
      published: true,
    },
  ];

  // Use custom posts if available, otherwise use defaults
  const blogPosts = customBlogPosts.length > 0 ? customBlogPosts : defaultBlogPosts;

  // Show full post modal
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="outline"
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2"
            >
              ← Back to Blog
            </Button>
          </div>
        </div>

        {/* Full Post Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {selectedPost.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {selectedPost.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {selectedPost.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {selectedPost.author}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6 font-medium">
              {selectedPost.excerpt}
            </p>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {selectedPost.content}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t">
            <Button
              onClick={() => setSelectedPost(null)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              ← Back to All Posts
            </Button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1577896871498-dec05865b48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhYmlsaXR5JTIwZW1wb3dlcm1lbnQlMjBlZHVjYXRpb258ZW58MXx8fHwxNzYwNjg1NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mills Star Foundation Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-white mb-4">{blogHeroTitle}</h1>
          <p className="text-xl">{blogHeroTagline}</p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600"
                    onClick={() => setSelectedPost(post)}
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-blue-900 mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-8">
            Subscribe to our newsletter to receive the latest stories and updates from Mills Star Foundation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
