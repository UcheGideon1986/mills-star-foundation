import { Routes, Route, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Navigation />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}
