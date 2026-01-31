import { useEffect, useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Header from './components/Header';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a1a] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="loader mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Fahad<span className="text-[#ff0844]">.</span>
            <span className="text-[#00d4ff]">dev</span>
          </h2>
          <p className="text-gray-400 text-sm">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Content */}
      <div className="content-overlay">
        <Header />
        
        <main>
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
