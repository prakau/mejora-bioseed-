import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Show navigation after initial hero load
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(showTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const smoothScrollTo = (top: number) => {
    const start = window.scrollY;
    const delta = top - start;
    const durationMs = 900;
    const t0 = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs);
      window.scrollTo(0, start + delta * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const pinned = ScrollTrigger.getAll().find(
        (st) => st.vars?.pin && st.vars?.trigger === element
      );

      // For pinned sections, scroll to a stable point (midway through the pin range)
      // so the section feels like a fixed "page" instead of landing mid-transition.
      const targetTop = pinned
        ? pinned.start + (pinned.end - pinned.start) * 0.5 + 1
        : element.getBoundingClientRect().top + window.scrollY;

      smoothScrollTo(targetTop);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${isScrolled ? 'bg-mejora-espresso/80 backdrop-blur-md' : ''}`}
    >
      <div className="flex items-center justify-between px-[6vw] py-[2.5vh]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Circle logo mark */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <circle
              cx="22"
              cy="22"
              r="20"
              stroke="#F6F2EA"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="22"
              cy="22"
              r="14"
              stroke="#D6A23A"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <span className="font-display font-bold text-lg text-mejora-cream tracking-tight">
            MEJORA BIO-INDUSTRIES LTD
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Approach', id: 'opportunity' },
            { label: 'Operations', id: 'operations' },
            { label: 'Technology', id: 'technology' },
            { label: 'Impact', id: 'impact' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-link font-mono text-xs uppercase tracking-[0.12em] text-mejora-cream/90 hover:text-mejora-gold transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
