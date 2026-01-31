import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
          );
          gsap.fromTo(
            infoRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gabruff633@gmail.com',
      href: 'mailto:gabruff633@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 0323-5016773',
      href: 'tel:+9203235016773',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Multan, MM Road',
      href: '#',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 opacity-0"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400 text-center">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6 opacity-0">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-start gap-4 glass rounded-xl p-6 hover:border-[#00d4ff]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                  <item.icon
                    size={20}
                    className="text-[#00d4ff] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    {item.label}
                  </h4>
                  <p className="text-white font-medium group-hover:text-[#00d4ff] transition-colors duration-300">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Availability Card */}
            <div className="glass rounded-xl p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <h4 className="text-white font-semibold">Available for Work</h4>
              </div>
              <p className="text-gray-400 text-sm">
                I'm currently open to new opportunities and freelance projects.
                Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
