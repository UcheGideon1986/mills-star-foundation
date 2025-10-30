import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div 
              className="flex items-center gap-3 mb-4 cursor-pointer"
              onClick={() => handleNavClick('admin')}
              title="Admin Access"
            >
              <img 
                src="/logo.png" 
                alt="Mills Star Foundation Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="font-semibold">Mills Star Foundation</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering disabled individuals through education, community engagement, and vocational training.
            </p>
            <p className="text-blue-400 text-sm font-semibold">WE SEE YOU!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('blog')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white mb-4">Our Programs</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Education & Reading</li>
              <li>Vocational Training</li>
              <li>Wheelchair Sports</li>
              <li>Community Engagement</li>
              <li>Health & Hygiene</li>
              <li>Mobility Equipment</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white mb-4">Connect With Us</h3>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:info@millsstarfoundation.org"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                info@millsstarfoundation.org
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/millsstarfoundation_usa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mills Star Foundation. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Operating in United States | Ghana | Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
