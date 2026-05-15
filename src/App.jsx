import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Careers from './pages/Careers';
import HelpCenter from './pages/HelpCenter';
import TrustSafety from './pages/TrustSafety';
import Contact from './pages/Contact';
import ListSpace from './pages/ListSpace';
import Spaces from './pages/Spaces';
import Blogs from './pages/Blogs';
import SpaceDetail from './pages/SpaceDetail';
import ScrollToTop from './components/ScrollToTop';
import ChatWindow from './components/Chatbot/ChatWindow';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/spaces/:id" element={<SpaceDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/trust" element={<TrustSafety />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-space" element={<ListSpace />} />
        </Routes>
        <Footer />
      </div>
      <ChatWindow />
    </Router>
  );
}

export default App;
