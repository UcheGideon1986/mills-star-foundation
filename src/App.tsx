import { useState } from 'react';
import { Home } from './Home';
import { About } from './About';
import { Blog } from './Blog';
import { Contact } from './Contacts';
import { Donate } from './Donate';
import { Gallery } from './Gallery';
import { Admin } from './Admin';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'donate':
        return <Donate />;
      case 'gallery':
        return <Gallery />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  // Don't show Navigation and Footer on admin page
  const isAdminPage = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isAdminPage && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
}
