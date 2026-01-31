import { useEffect, useRef } from 'react';
import {
  Code2,
  Server,
  Database,
  Bot,
  Workflow,
  Layout,
  FileCode,
  Globe,
  Layers,
  Cpu,
  GitBranch,
  Cog,
  Zap,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: { name: string; icon: React.ElementType }[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Layout,
    color: '#00d4ff',
    skills: [
      { name: 'React', icon: Code2 },
      { name: 'Vue.js', icon: Layout },
      { name: 'JavaScript', icon: FileCode },
      { name: 'TypeScript', icon: FileCode },
      { name: 'HTML5/CSS3', icon: Globe },
      { name: 'SASS', icon: Layers },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: '#ff0055',
    skills: [
      { name: 'Node.js', icon: Server },
      { name: 'Express', icon: Code2 },
      { name: 'Python', icon: FileCode },
      { name: 'Django', icon: Globe },
      { name: 'REST APIs', icon: Globe },
      { name: 'GraphQL', icon: Code2 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: '#9d4edd',
    skills: [
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Firebase', icon: Globe },
      { name: 'Redis', icon: Cpu },
    ],
  },
  {
    title: 'AI Tools',
    icon: Bot,
    color: '#00ff88',
    skills: [
      { name: 'DeepSeek', icon: Bot },
      { name: 'Git', icon: GitBranch },
      { name: 'ChatGPT', icon: Bot },
      { name: 'CI/CD', icon: Cog },
      { name: 'AI API Integration', icon: Globe },
    ],
  },
  {
    title: 'Workflow',
    icon: Workflow,
    color: '#ffaa00',
    skills: [
      { name: 'Rapid Prototyping', icon: Zap },
      { name: 'AI-Assisted Dev', icon: Bot },
      { name: 'Automated Testing', icon: Cog },
    ],
  },
];

const Skills = () => {
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
              { opacity: 0, y: 50, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
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
    <section id="skills" ref={sectionRef} className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I specialize in
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="card-3d opacity-0 p-6"
              style={{ borderColor: `${category.color}30` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${category.color}20`,
                    border: `1px solid ${category.color}40`,
                  }}
                >
                  <category.icon size={20} style={{ color: category.color }} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 group cursor-default"
                  >
                    <skill.icon
                      size={14}
                      className="text-gray-400 group-hover:text-white transition-colors duration-300"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
