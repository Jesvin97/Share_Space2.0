import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import HelpCenter from './pages/HelpCenter';
import TrustSafety from './pages/TrustSafety';
import Contact from './pages/Contact';
import ListSpace from './pages/ListSpace';
import SignIn from './pages/SignIn';
import Spaces from './pages/Spaces';
import ScrollToTop from './components/ScrollToTop';

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
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/trust" element={<TrustSafety />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-space" element={<ListSpace />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
