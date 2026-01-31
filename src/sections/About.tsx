import { useEffect, useRef } from 'react';
import { Cpu, Zap, Code2, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
          );
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    'Develop scalable web applications faster',
    'Integrate AI chatbots and smart features',
    'Optimize code quality and performance',
    'Deliver innovative solutions on schedule',
  ];

  const techHighlights = [
    { icon: Cpu, label: 'AI-Assisted Development', color: '#00d4ff' },
    { icon: Code2, label: 'MERN Stack', color: '#ff0055' },
    { icon: Zap, label: 'Fast Delivery', color: '#9d4edd' },
  ];

  return (
    <section id="about" ref={sectionRef} className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get to know the developer behind the code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="opacity-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              MERN Stack Developer &{' '}
              <span className="text-[#00d4ff]">AI-Enhanced</span> Solutions
              Architect
            </h3>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Full Stack Developer specializing in MERN stack applications
              enhanced with artificial intelligence. I build modern web
              solutions using MongoDB, Express, React, and Node.js while
              leveraging AI tools like DeepSeek, ChatGPT, and Gemini to
              accelerate development and integrate intelligent features.
            </p>

            {/* Education Card */}
            <div className="glass rounded-xl p-6 mb-8 border-l-4 border-[#00d4ff]">
              <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-2xl">🎓</span> Education
              </h4>
              <p className="text-gray-400">
                Bachelor's in Computer Science from{' '}
                <span className="text-[#ffb199] font-medium">
                  Gomal University Dera Ismail Khan
                </span>{' '}
                (2023–2027)
              </p>
            </div>

            <p className="text-gray-400 mb-4">
              My approach combines traditional coding expertise with AI
              assistance to:
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="w-6 h-6 rounded-full bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#00d4ff]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech Highlights */}
            <div className="flex flex-wrap gap-4">
              {techHighlights.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 glass px-4 py-2 rounded-full"
                  style={{ borderColor: tech.color, borderWidth: '1px' }}
                >
                  <tech.icon size={18} style={{ color: tech.color }} />
                  <span className="text-sm font-medium text-white">
                    {tech.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="flex justify-center opacity-0">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/30 via-[#ff0055]/20 to-[#9d4edd]/30 blur-3xl rounded-full" />

              {/* Main Image */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-white/10 float-element">
                <img
                  src="/fahad.jpg"
                  alt="Fahad Ali"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 glass px-4 py-3 rounded-xl">
                <div className="text-2xl font-bold text-[#00d4ff]">1+</div>
                <div className="text-xs text-gray-400">Years Experience</div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 glass px-4 py-3 rounded-xl"
                style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}
              >
                <div className="text-2xl font-bold text-[#ff0055]">10+</div>
                <div className="text-xs text-gray-400">Projects Built</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
