import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  description: string;
  tech?: string;
}

const experiences: ExperienceItem[] = [
  {
    date: '2023 - 2024',
    title: 'Full Stack Developer',
    company: 'Freelance & Personal Projects',
    description:
      'Developing full-stack applications using MERN stack with AI integration. Built responsive web applications with modern frameworks, implemented RESTful APIs, and deployed projects on platforms like Netlify and Vercel. Specializing in AI-enhanced development workflows.',
  },
  {
    date: '2024 - 2025',
    title: 'Frontend Developer',
    company: 'Project-Based Work',
    description:
      'Created interactive user interfaces with React.js. Focused on responsive design, component architecture, and state management. Collaborated on team projects implementing modern frontend practices and performance optimization.',
    tech: 'React.js, TypeScript',
  },
  {
    date: '2026 - Ongoing',
    title: 'Web Development Intern',
    company: 'Learning & Skill Development',
    description:
      'Intensive self-learning and project development phase. Mastered modern web technologies through building practical applications. Developed foundational skills in HTML5, CSS3, JavaScript, and began exploring backend development with Node.js and Express.',
    tech: 'HTML/CSS, JavaScript, Node.js Basics',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    itemsRef.current.forEach((item, index) => {
      if (item) {
        const trigger = ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              item,
              { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: index * 0.15,
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
    <section id="experience" ref={sectionRef} className="section py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My career journey and accomplishments
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="timeline-item opacity-0"
            >
              <div className="timeline-date">{exp.date}</div>
              <div className="timeline-content">
                <h3 className="text-xl font-bold text-white mb-1">
                  {exp.title}
                </h3>
                <h4 className="text-[#00d4ff] font-medium mb-3">
                  {exp.company}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {exp.description}
                </p>
                {exp.tech && (
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
