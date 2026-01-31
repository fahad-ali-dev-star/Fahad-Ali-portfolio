import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(contentRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 gradient-text">
              Hello
            </h1>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              I'm Fahad Ali
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Full Stack Developer with 1+ years of experience specializing in 
              MERN stack applications enhanced with artificial intelligence.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={scrollToProjects}
                className="btn-primary flex items-center gap-2 group"
              >
                View Projects
              </button>

              <a
                href="mailto:gabruff633@gmail.com"
                className="text-gray-300 hover:text-[#00d4ff] transition-colors duration-300 relative group"
              >
                gabruff633@gmail.com
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00d4ff] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <span className="text-sm text-gray-400">Follow me:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/fahad-ali-dev-star"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/fahad-ali-733b04333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:gabruff633@gmail.com"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div
            ref={imageRef}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Outer Glow Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4ff] via-[#ff0055] to-[#9d4edd] blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -inset-4 rounded-full border border-[#00d4ff]/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute -inset-8 rounded-full border border-dashed border-[#ff0055]/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              
              {/* Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 float-element">
                <img
                  src="/fahad.jpg"
                  alt="Fahad Ali"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                  }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 cursor-pointer hover:border-[#00d4ff] transition-colors duration-300"
          onClick={scrollToProjects}
        >
          <div className="w-1.5 h-3 bg-[#00d4ff] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
