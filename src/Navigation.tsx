import { Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from './components/figma/ui/button';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/about', label: 'About' },
    { id: '/gallery', label: 'Gallery' },
    { id: '/blog', label: 'Upcoming Events' },
    { id: '/contact', label: 'Contact' },
  ];

  const handleNavClick = () => {
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Mills Star Foundation Logo" 
              className="h-16 w-16 object-contain"
            />
            <span className="text-blue-900 font-semibold text-xl">Mills Star Foundation</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                onClick={handleNavClick}
                className={`transition-colors ${
                  location.pathname === item.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/donate">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                onClick={handleNavClick}
                className={`block w-full text-left py-2 px-4 transition-colors ${
                  location.pathname === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link to="/donate" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
