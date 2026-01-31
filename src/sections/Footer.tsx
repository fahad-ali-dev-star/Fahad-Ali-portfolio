import { Github, Linkedin, Twitter, Dribbble, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/fahad-ali-dev-star',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/fahad-ali-733b04333',
      label: 'LinkedIn',
    },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Dribbble, href: '#', label: 'Dribbble' },
  ];

  return (
    <footer className="glass border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Social Links */}
          <div className="flex items-center gap-4 mb-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Email */}
          <a
            href="mailto:gabruff633@gmail.com"
            className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300 mb-6"
          >
            gabruff633@gmail.com
          </a>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>&copy; {currentYear} Fahad Ali.</span>
            <span>Made with</span>
            <Heart size={14} className="text-[#ff0055] fill-[#ff0055]" />
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
