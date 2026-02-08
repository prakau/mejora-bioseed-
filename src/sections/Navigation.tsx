import { useEffect, useState } from 'react';

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            Mejora
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
