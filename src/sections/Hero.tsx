import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Volume2, VolumeX, ArrowDown, Code2 } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef    = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const roleRef    = useRef<HTMLParagraphElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const socialRef  = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  const [isMuted,    setIsMuted]    = useState(true);
  const [showPoster, setShowPoster] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  /* ── sync isMuted state to DOM element ── */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  /* ── mute toggle ── */
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      // Force play when unmuting to prevent mobile browsers from pausing the video
      videoRef.current.play().catch(() => {});
    }
  };

  /* ── autoplay (try unmuted first, fallback to muted, unmute on interaction) ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing unmuted first (often succeeds on page refresh if user previously interacted)
    video.muted = false;
    video.volume = 1.0;

    const onEnded = () => setShowPoster(true);
    const onCanPlay = () => setVideoReady(true);

    video.addEventListener('ended', onEnded);
    video.addEventListener('canplay', onCanPlay);

    // Try playing unmuted
    video.play()
      .then(() => {
        setIsMuted(false);
      })
      .catch((err) => {
        console.warn("Autoplay unmuted blocked by browser policy. Falling back to muted autoplay.", err);
        // Fallback to muted autoplay so video is visible and playing
        if (video) {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        }
      });

    // Unmute on first user interaction if it had to fallback to muted
    const unmuteOnInteraction = () => {
      if (video && video.muted) {
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
        video.play().catch(() => {});
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      document.removeEventListener('click', unmuteOnInteraction);
      document.removeEventListener('touchstart', unmuteOnInteraction);
      document.removeEventListener('keydown', unmuteOnInteraction);
      document.removeEventListener('wheel', unmuteOnInteraction);
    };

    document.addEventListener('click', unmuteOnInteraction);
    document.addEventListener('touchstart', unmuteOnInteraction);
    document.addEventListener('keydown', unmuteOnInteraction);
    document.addEventListener('wheel', unmuteOnInteraction);

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('canplay', onCanPlay);
      cleanupListeners();
    };
  }, []);

  /* ── GSAP staggered entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.from(badgeRef.current, {
        opacity: 0, y: -20, duration: 0.5, ease: 'back.out(1.7)',
      })
        .from(headingRef.current, {
          opacity: 0, x: -60, duration: 0.7, ease: 'power3.out',
        }, '-=0.2')
        .from(nameRef.current, {
          opacity: 0, x: -60, duration: 0.7, ease: 'power3.out',
        }, '-=0.45')
        .from(roleRef.current, {
          opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .from(descRef.current, {
          opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .from(ctaRef.current, {
          opacity: 0, y: 20, duration: 0.5, ease: 'power2.out',
        }, '-=0.25')
        .from(socialRef.current, {
          opacity: 0, y: 20, duration: 0.5, ease: 'power2.out',
        }, '-=0.25')
        .from(scrollRef.current, {
          opacity: 0, y: 10, duration: 0.5, ease: 'power2.out',
        }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () =>
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Video / Poster background ── */}
      <div className="absolute inset-0">
        {!showPoster ? (
          <video
            ref={videoRef}
            src="/intro-video.mp4"
            poster="/intro-poster.png"
            playsInline
            webkitPlaysInline
            muted={isMuted}
            className="w-full h-full object-cover pointer-events-none"
            style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
          />
        ) : (
          <img
            src="/intro-poster.png"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        )}

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(6,0,2,0.85) 0%, rgba(6,0,2,0.55) 55%, rgba(6,0,2,0.25) 100%), ' +
              'linear-gradient(to top,  rgba(6,0,2,0.90) 0%, rgba(6,0,2,0.20) 40%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Mute / Unmute control ── */}
      {!showPoster && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="absolute top-24 right-6 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            color: isMuted ? 'rgba(255,255,255,0.45)' : '#ff0844',
          }}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}

      {/* ── Hero content ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32">
        <div className="max-w-2xl">

          {/* Animated badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,8,68,0.10)',
              border: '1px solid rgba(255,8,68,0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Code2 size={14} className="text-[#ff0844]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#ff4b60]">
              Full Stack Developer
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0844] animate-pulse" />
          </div>

          {/* Greeting */}
          <h1 ref={headingRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-2 leading-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="gradient-text">Hello,</span>
          </h1>

          {/* Name */}
          <h2 ref={nameRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            I'm{' '}
            <span className="relative inline-block">
              Fahad Ali
              <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full"
                style={{ background: 'linear-gradient(90deg,#ff0844,#ff4b60)' }}
              />
            </span>
          </h2>

          {/* Role pill */}
          <p ref={roleRef}
            className="text-base sm:text-lg font-semibold tracking-wide mb-4"
            style={{ color: '#ff4b60' }}
          >
            MERN Stack &nbsp;·&nbsp; AI Integration &nbsp;·&nbsp; Clean Code
          </p>

          {/* Description */}
          <p ref={descRef}
            className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          >
            I craft scalable, production-ready web applications powered by the
            MERN stack and enhanced with artificial intelligence — turning ideas
            into elegant digital experiences.
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <button
              onClick={scrollToProjects}
              className="btn-primary flex items-center gap-2 group"
            >
              View My Work
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
            </button>

            <a
              href="mailto:gabruff633@gmail.com"
              className="relative font-semibold text-base transition-colors duration-300 group"
              style={{ color: 'rgba(255,255,255,0.70)' }}
            >
              gabruff633@gmail.com
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: '#ff0844' }}
              />
            </a>
          </div>

          {/* Social links */}
          <div ref={socialRef} className="flex items-center gap-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
              Connect
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com/fahad-ali-dev-star', icon: <Github size={17} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/fahad-ali-733b04333',  icon: <Linkedin size={17} />, label: 'LinkedIn' },
                { href: 'mailto:gabruff633@gmail.com', icon: <Mail size={17} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#ff0844';
                    (e.currentTarget as HTMLElement).style.borderColor = '#ff0844';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(255,8,68,0.35)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={scrollToProjects}
      >
        <div className="flex flex-col items-center gap-1.5 group">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-500 group-hover:text-[#ff0844] transition-colors duration-300">
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full border flex justify-center pt-1.5"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <div className="w-1 h-2 bg-[#ff0844] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
