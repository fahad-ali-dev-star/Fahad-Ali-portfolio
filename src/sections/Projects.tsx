import { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'Full-featured online shopping solution with Stripe payment integration, inventory management, and admin dashboard. Built with modern React and Node.js architecture.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
    liveUrl: 'https://lumina-luxe-e-commerce.vercel.app',
    githubUrl: 'https://github.com/fahad-ali-dev-star/lumina-luxe-e-commerce',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
  },
  {
    title: 'TaskFlow - Project Management',
    description:
      'Collaborative task management platform with real-time updates, team collaboration features, and advanced analytics. Used by 500+ active users.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600',
    liveUrl: 'https://taskflow-pr.vercel.app',
    githubUrl: 'https://github.com/fahad-ali-dev-star/taskflow-pr',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
  },
  {
    title: 'FitTracker Pro',
    description:
      'Comprehensive health and fitness mobile app with workout tracking, nutrition planning, and social features. Available on iOS and Android.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    liveUrl: 'https://fittracker-pro-nu.vercel.app/',
    githubUrl: 'https://github.com/fahad-ali-dev-star/fittracker-pro',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    title: 'AI Assistant Platform',
    description:
      'Intelligent chatbot platform with natural language processing, machine learning integration, and multi-platform deployment capabilities.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    liveUrl: 'https://nova-ai-intelligence-platform-ptwhea2kj.vercel.app',
    githubUrl: 'https://github.com/fahad-ali-dev-star/nova-ai---intelligence-platform',
    tech: ['React', 'Python', 'FastAPI', 'MongoDB', 'TensorFlow'],
  },
  {
    title: 'Fast Food Restaurant',
    description:
      'Modern fast food restaurant website with online ordering system, menu showcase, and responsive design. Features include interactive menu and customer reviews.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    liveUrl: 'https://fahad-ali-dev-star.github.io/Resturent-wesite/',
    githubUrl: 'https://github.com/fahad-ali-dev-star/Resturent-wesite',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express'],
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Modern, responsive portfolio website with 3D animations, interactive elements, and smooth scrolling. Showcases projects, skills, and experience.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
    liveUrl: 'https://fahad-ali-dev-star.github.io/shahid-portfolio/',
    githubUrl: 'https://github.com/fahad-ali-dev-star/shahid-portfolio',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Three.js'],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card, index) => {
      if (card) {
        const trigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
              }
            );
          },
          once: true,
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Showcasing my expertise through real-world applications and
            innovative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="card-3d opacity-0 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#00d4ff] transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#00d4ff] transition-colors duration-300"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
